import React, { Component } from "react";
import axios from "axios";
import Select, { components } from "react-select";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "date-fns/locale/he";
registerLocale("he", he);

import { url } from "./AllPages";
import Combobox from "react-widgets/Combobox";
import MultiSelect from "./MultiSelect";

import { findArrayData } from "./SignUp";
import { loadPage, verifyUser } from "./ManagerComponents";

export const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const allOption = {
  label: "Select all",
  value: "*",
};

export const algo = [
  // { value: '', label: 'Admin' },
  { value: "History", label: "History" },
  // { value: 'Family', label: 'Family' },
];

const hours = [];
const minutes = [];
for (var i = 0; i < 60; i++) {
  if (i < 24) {
    hours.push(i);
  }
  minutes.push(i);
}

var currentUser = {};

export const ValueContainer = ({ children, ...props }) => {
  const currentValues = props.getValue();
  let toBeRendered = children;
  if (currentValues.some((val) => val.value === allOption.value)) {
    toBeRendered = [[children[0][0]], children[1]];
  }

  return (
    <components.ValueContainer {...props}>
      {toBeRendered}
    </components.ValueContainer>
  );
};

export const MultiValue = (props) => {
  let labelToBeDisplayed = `${props.data.label}, `;
  if (props.data.value === allOption.value) {
    labelToBeDisplayed = "All is selected";
  }
  return (
    <components.MultiValue {...props}>
      <span>{labelToBeDisplayed}</span>
    </components.MultiValue>
  );
};

export default class CreateResearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      // optionSelected: null,
      researchName: "",
      startDate: new Date(),
      endDate: new Date(),
      numberOfSessions: 0,
      sessionDuration: { hours: 0, minutes: 0 },
      eldersOptions: [],
      participantsElders: [],
      researchersOptions: [],
      participantsResearchers: [],
      currentSession: "",
    };
  }

  async componentDidMount() {
    // console.log(this.state.user)
    currentUser = await verifyUser("researcher");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
      return;
    }
    await this.getAllUsers("user").then((result) => {
      this.setState({
        eldersOptions: result,
      });
    });
    await this.getAllUsers("researcher").then((result) => {
      this.setState({
        researchersOptions: result,
      });
    });
  }

  // async componentDidUpdate() {
  //   researchersOptions = await this.getAllUsers("researcher");
  // }

  async addResearchToResearchers(researchers, researchName, researchOid) {
    let resarchersOid = [];
    researchers.forEach((researcher) => resarchersOid.push(researcher.value));
    var res = await axios.get(
      url +
        "/researcher/updateResearchersInfo/" +
        resarchersOid +
        "/" +
        researchName +
        "/" +
        researchOid+
        "/"+"Add"
    );
  }

  async getAllUsers(type) {
    var res = await axios.get(url + "/researcher/getAllUserByType/" + type);
    let users = [];
    res.data.forEach((user) => {
      // { value: 'user', label: 'Elder' }
      users.push({
        value: user._id,
        label: user.first_name + " " + user.last_name,
      });
    });
    return users;
  }

  async isResearchExist(researchName) {
    var res = await axios.get(
      url + "/researcher/getResearchByName/" + researchName
    );
    return res.data.length == 1;
  }

  setResearchNameHandler = (event) => {
    this.setState({
      researchName: event.target.value,
    });
  };

  setStartDateHandler = (date) => {
    this.setState({
      startDate: date,
    });
  };

  setEndDateHandler = (date) => {
    this.setState({
      endDate: date,
    });
  };

  setDurationHandler = (duration, type) => {
    if (type === "hours")
      this.setState({
        sessionDuration: { ...this.state.sessionDuration, hours: duration },
      });
    if (type === "minutes") {
      this.setState({
        sessionDuration: { ...this.state.sessionDuration, minutes: duration },
      });
    }
  };

  setNumberOfSessionsHandler = (number) => {
    this.setState({
      numberOfSessions: number,
    });
  };

  setParticipantsElders = (selectedEldersOption) => {
    this.setState({
      participantsElders: selectedEldersOption,
    });
  };

  setParticipantsResearchers = (selectedResearchersOption) => {
    this.setState({
      participantsResearchers: selectedResearchersOption,
    });
  };

  validateForm = (newResearch) => {
    if (newResearch.participantsElders.length == 0) {
      console.log("Need to choose Elders");
    }
  };

  addSessionToElders = async (Oids, researchName) => {
    await Oids.forEach(async (Oid) => {
      await axios.get(
        url + "/user/Create/session/" + Oid.value + "/" + researchName
      );
    });
  };

  createResearchHandler = (event) => {
    event.preventDefault();

    let eldersParticipants = this.state.participantsElders;
    if (
      eldersParticipants.length > 0 &&
      eldersParticipants[0].label === "Select all"
    ) {
      eldersParticipants.splice(0, 1);
    }
    let researchersParticipants = this.state.participantsResearchers;
    if (
      researchersParticipants.length > 0 &&
      researchersParticipants[0].label === "Select all"
    ) {
      researchersParticipants.splice(0, 1);
    }
    const newResearch = {
      researchName: this.state.researchName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      numberOfSessions: this.state.numberOfSessions,
      sessionDuration: this.state.sessionDuration,
      participantsElders: this.state.participantsElders,
      participantsResearchers: this.state.participantsResearchers,
      currentSession: this.state.currentSession,
    };

    // this.validateForm(newResearch);

    this.isResearchExist(newResearch.researchName).then((isExist) => {
      if (!isExist) {
        axios
          .post(url + "/researcher/create/Researches", newResearch)
          .then((res) => {
            console.log(res);
            console.log(res.data);
            alert(
              "successful\n the research " +
                this.state.researchName +
                "\n" +
                "add to system"
            );
            this.addResearchToResearchers(
              newResearch.participantsResearchers,
              newResearch.researchName,
              res.data.insertedId
            );

            console.log(newResearch.participantsElders);
            this.addSessionToElders(
              newResearch.participantsElders,
              newResearch.researchName
            );

            loadPage(this.props, "researcher", this.state.user,this.state.user);
          });
      } else {
        alert("Research already exist");
      }
    });
    // console.log(newResearch);
  };

  render() {
    return (
      <div className="container-contact100" style={{ zIndex: -1 }}>
        <div className="wrap-contact1100" style={{ zIndex: 0 }}>
          <span className="contact100-form-title" translate="yes" lang="he">
            New Research
          </span>

          <form onSubmit={this.createResearchHandler}>
            <div style={{ width: "100%" }} className="container-section-space">
              <div className="container-section">
                <div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Name is required"
                  >
                    <span className="label-input100">Research Name</span>
                    <input
                      id="researchName"
                      className="input100"
                      onChange={this.setResearchNameHandler}
                      type="text"
                      name="researchName"
                      placeholder="Enter Research Name"
                      required
                    />

                    <span className="focus-input100"></span>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Name is required"
                  >
                    <span className="label-input100">Research Period</span>
                    <div className="grid-container">
                      <div className="grid-item">
                        <span className="label-input100">Start Date:</span>
                        <DatePicker
                          selected={this.state.startDate}
                          onSelect={(Date) => this.setStartDateHandler(Date)}
                          dateFormat="dd/MM/yyyy"
                          locale={he}
                          // showTimeSelect
                        ></DatePicker>
                      </div>

                      <div className="grid-item">
                        <span className="label-input100">
                          Number Of Sessions:
                        </span>
                        <div className="duration-container">
                          <span className="combobox">
                            <Combobox
                              defaultValue="0"
                              data={hours}
                              filter={false}
                              // ref={comboRef}
                              autoSelectMatches
                              onSelect={(val) => {
                                this.setNumberOfSessionsHandler(val);
                              }}
                              value={this.state.numberOfSessions}
                            />
                          </span>
                        </div>
                      </div>

                      <div className="grid-item">
                        <span className="label-input100" id="endDate">
                          End Date:{" "}
                        </span>
                        <DatePicker
                          selected={this.state.endDate}
                          onSelect={(Date) => this.setEndDateHandler(Date)}
                          dateFormat="dd/MM/yyyy"
                          locale={he}
                        ></DatePicker>
                      </div>

                      <div className="grid-item">
                        <span className="label-input100">
                          Session Duration:
                        </span>
                        <div className="duration-container">
                          <span className="duration-combobox">
                            <Combobox
                              defaultValue="0"
                              data={hours}
                              filter={false}
                              // ref={comboRef}
                              autoSelectMatches
                              onSelect={(val) => {
                                this.setDurationHandler(val, "hours");
                              }}
                              value={this.state.sessionDuration.hours}
                            />
                            <p className="label-input100">Hours</p>
                          </span>
                          <span className="duration-combobox">
                            <Combobox
                              defaultValue="0"
                              data={minutes}
                              filter={false}
                              autoSelectMatches
                              //  ref={comboRef}
                              onSelect={(val) => {
                                this.setDurationHandler(val, "minutes");
                              }}
                              value={this.state.sessionDuration.minutes}
                            />
                            <p className="label-input100">Minutes</p>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Name is required"
                  >
                    <span className="label-input100">Participants Elders</span>

                    <MultiSelect
                      options={this.state.eldersOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option,
                        MultiValue,
                        ValueContainer,
                      }}
                      isSearchable
                      onChange={this.setParticipantsElders}
                      allowSelectAll={true}
                      value={this.state.participantsElders}
                      // styles={colourStyles}
                    />
                  </div>

                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Name is required"
                  >
                    <span className="label-input100">
                    Participants Researchers
                    </span>

                    <MultiSelect
                      options={this.state.researchersOptions}
                      isMulti
                      closeMenuOnSelect={false}
                      hideSelectedOptions={false}
                      components={{
                        Option,
                        MultiValue,
                        ValueContainer,
                      }}
                      isSearchable
                      onChange={this.setParticipantsResearchers}
                      allowSelectAll={true}
                      value={this.state.participantsResearchers}
                      // styles={colourStyles}
                    />
                  </div>

                  <div className="wrap-input100 input100-select">
                    <span className="label-input100">Algorithm </span>

                    <div>
                      <Select
                        style={{ zIndex: 100 }}
                        className="basic-multi-select"
                        closeMenuOnSelect={true}
                        value={
                          this.state.currentSession
                            ? findArrayData(this.state.currentSession, algo)
                            : null
                        }
                        options={algo}
                        menuPlacement="auto"
                        menuPosition="fixed"
                        onChange={(e) => {
                          this.setState({ currentSession: e.value });
                        }}
                      />
                    </div>
                    <span className="focus-input100"></span>
                  </div>

                  <div className="container-contact100-form-btn">
                    <div
                      className="wrap-contact100-form-btn"
                      style={{ zIndex: 0 }}
                    >
                      <div className="contact100-form-bgbtn"></div>
                      <button
                        type="submit"
                        id="signup"
                        className="contact100-form-btn"
                      >
                        <span>
                          Create Research
                          <i
                            className="fa fa-long-arrow-right m-l-7"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="container-contact100-back-btn">
                    <div
                      className="wrap-contact100-back-btn"
                      style={{ zIndex: 0 }}
                    >
                      <div className="contact100-back-bgbtn"></div>
                      <button
                        id="main"
                        type="button"
                        className="contact100-back-btn"
                        onClick={() => {
                          loadPage(this.props, "researcher", this.state.user,this.state.user);
                        }}
                      >
                        <i
                          className="fa fa-arrow-left m-l-7"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
