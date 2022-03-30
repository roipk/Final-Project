import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { loadPage, verifyUser } from "./ManagerComponents";

import { url } from "./AllPages";
import collect from "collect.js";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "date-fns/locale/he";
registerLocale("he", he);

// import DurationPicker from "react-duration-picker";
import Combobox from "react-widgets/Combobox";

// import DurationPicker from "./DurationPicker";
import MultiSelect from "./MultiSelect";
import { MultiValue, ValueContainer, algo, Option } from "./CreateResearch";

const hoursData = [];
const minutesData = [];
for (var i = 0; i < 60; i++) {
  if (i < 24) {
    hoursData.push(i);
  }
  minutesData.push(i);
}

var currentUser = {};

export default class EditResearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      researchToEdit: [],
      researchesOptions: [],
      researchName: "",
      startDate: new Date(),
      endDate: new Date(),
      numberOfSessions: 0,
      sessionDuration: { hours: 0, minutes: 0 },
      participantsElders: [],
      participantsResearchers: [],
      currentSession: "",
    };
  }

  async componentDidMount() {
    currentUser = await verifyUser("researcher");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
      return;
    }
    await this.getAllResearchesByResearcher().then((result) => {
      this.setState({
        researchesOptions: result,
      });
    });

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

  async getAllResearchesByResearcher() {
    // console.log(currentUser)
    var res = await axios.get(
      url + "/researcher/getAllResearchesByResearcher/" + currentUser._id
    );
    let researches = [];
    res.data[0].forEach((research) => {
      // { value: 'user', label: 'Elder' }
      researches.push({
        value: research.Oid,
        label: research.researchName,
      });
    });
    return researches;
  }

  async getResearchDetails(researchName) {
    var res = await axios.get(
      url + "/researcher/getResearchByName/" + researchName
    );

    this.setState({
      researchName: res.data[0].researchName,
      startDate: res.data[0].startDate,
      endDate: res.data[0].endDate,
      numberOfSessions: res.data[0].numberOfSessions,
      sessionDuration: res.data[0].sessionDuration,
      participantsElders: res.data[0].participantsElders,
      participantsEldersOld: res.data[0].participantsElders,
      participantsResearchers: res.data[0].participantsResearchers,
      participantsResearchersOld: res.data[0].participantsResearchers,
      currentSession: res.data[0].algorithm,
    });
  }

  setResearch = (selectedResearch) => {
    this.setState({
      researchToEdit: selectedResearch,
    });
    this.getResearchDetails(selectedResearch.label);

    // console.log(this.state.eldersOptions);
  };

  setStartDateHandler = (date) => {
    this.setState({
      startDate: date,
    });
    // console.log(typeof this.state.startDate)
  };

  setEndDateHandler = (date) => {
    this.setState({
      endDate: date,
    });
    // console.log(typeof this.state.startDate)
  };

  setNumberOfSessionsHandler = (number) => {
    this.setState({
      numberOfSessions: number,
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
    console.log(duration);
  };

  setParticipantsElders = (selectedEldersOption) => {
    this.setState({
      participantsElders: selectedEldersOption,
    });
    // console.log(selectedEldersOption)
  };

  setParticipantsResearchers = (selectedResearchersOption) => {
    this.setState({
      participantsResearchers: selectedResearchersOption,
    });
  };
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
    // console.log(users)
    return users;
  }

  addSessionToElder = async (Oid, researchName) => {
    await axios.get(url + "/user/Create/session/" + Oid + "/" + researchName);
  };

  setIsActive = async (Oid, researchName) => {
    await axios.get(url + "/user/update/session/" + Oid + "/" + researchName);
  };

  async updateResearchersInfo(researchers, researchName, researchOid, action) {
    let resarchersOid = [];
    researchers.forEach((researcher) => resarchersOid.push(researcher.value));
    console.log(resarchersOid);
    var res = await axios.get(
      url +
        "/researcher/updateResearchersInfo/" +
        resarchersOid +
        "/" +
        researchName +
        "/" +
        researchOid +
        "/" +
        action
    );
  }

  updateResearchHandler = (event) => {
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

    const updatedResearch = {
      researchName: this.state.researchName,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      numberOfSessions: this.state.numberOfSessions,
      sessionDuration: this.state.sessionDuration,
      participantsElders: this.state.participantsElders,
      participantsResearchers: this.state.participantsResearchers,
      currentSession: this.state.currentSession,
    };

    let oldElders = this.state.participantsEldersOld;
    let newElders = this.state.participantsElders;

    let oldResearchers = this.state.participantsResearchersOld;
    let newResearchers = this.state.participantsResearchers;

    let oldEldersCollection = collect(oldElders);
    let newEldersCollection = collect(newElders);

    let oldResearchersCollection = collect(oldResearchers);
    let newResearchersCollection = collect(newResearchers);

    oldEldersCollection.each((item) => {
      if (newEldersCollection.contains("label", item.label)) {
        console.log("do nothing with elder " + item.label);
      } else {
        console.log("need to set isActive to false for elder " + item.label);
        this.setIsActive(item.value, updatedResearch.researchName);
      }
    });

    newEldersCollection.each((item) => {
      if (oldEldersCollection.doesntContain("label", item.label)) {
        console.log("need to create session for elder " + item.label);
        this.addSessionToElder(item.value, updatedResearch.researchName);
      }
    });

    oldResearchersCollection.each((item) => {
      let researchersToUpdate = [];
      if (newResearchersCollection.contains("label", item.label)) {
        console.log("do nothing with researcher " + item.label);
      } else {
        console.log(
          "need to remove research from ResearcherInfo for researcher " +
            item.label
        );
        researchersToUpdate.push(item);
        this.updateResearchersInfo(
          researchersToUpdate,
          updatedResearch.researchName,
          this.state.researchToEdit.value,
          "Remove"
        );
      }
    });

    newResearchersCollection.each((item) => {
      let researchersToUpdate = [];
      if (oldResearchersCollection.doesntContain("label", item.label)) {
        console.log("need to add research to researcher " + item.label);
        researchersToUpdate.push(item);
        this.updateResearchersInfo(
          researchersToUpdate,
          updatedResearch.researchName,
          this.state.researchToEdit.value,
          "Add"
        );
      }
    });

    axios
      .post(url + "/researcher/updateResearch/Researches", updatedResearch)
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        alert(
          "successful\n the research " +
            this.state.researchName +
            "\n" +
            "Updated"
        );

        loadPage(this.props, "researcher", this.state.user,this.state.user);
      });
  };

  researchPage(isInit, duration) {
    if (isInit) {
      return (
        <form onSubmit={this.updateResearchHandler}>
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
                    // onChange={this.setResearchNameHandler}
                    type="text"
                    name="researchName"
                    placeholder="Enter Research Name"
                    required
                    // defaultValue={this.state.researchName}
                    value={this.state.researchName}
                    readOnly
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
                        selected={Date.parse(this.state.startDate)}
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
                            data={hoursData}
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
                        End Date:
                      </span>
                      <DatePicker
                        selected={Date.parse(this.state.endDate)}
                        onSelect={(Date) => this.setEndDateHandler(Date)}
                        dateFormat="dd/MM/yyyy"
                        locale={he}
                      ></DatePicker>
                    </div>
                    <div className="grid-item">
                      <span className="label-input100">Session Duration:</span>
                      <div className="duration-container">
                        <span className="duration-combobox">
                          <Combobox
                            defaultValue="0"
                            data={hoursData}
                            filter={false}
                            // ref={comboRef}
                            autoSelectMatches
                            onSelect={(val) => {
                              this.setDurationHandler(val, "hours");
                            }}
                            value={duration.hours}
                          />
                          <p className="label-input100">Hours</p>
                        </span>
                        <span className="duration-combobox">
                          <Combobox
                            defaultValue="0"
                            data={minutesData}
                            filter={false}
                            autoSelectMatches
                            //  ref={comboRef}
                            onSelect={(val) => {
                              this.setDurationHandler(val, "minutes");
                            }}
                            value={duration.minutes}
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

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Name is required"
                >
                  <span className="label-input100">Algorithm</span>
                  <input
                    id="algorithm"
                    className="input100"
                    // onChange={this.setResearchNameHandler}
                    type="text"
                    name="algorithm"
                    required
                    defaultValue={this.state.currentSession}
                    readOnly
                  />

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
                        Update Research
                        <i
                          className="fa fa-long-arrow-right m-l-7"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container-researcher-edit" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              Edit Research
            </span>
            <div className="wrap-input100 input100-select">
              <span className="label-input100">Choose research to edit </span>

              <div>
                <Select
                  options={this.state.researchesOptions}
                  onChange={this.setResearch}
                  value={this.state.researchToEdit}
                />
              </div>
              <span className="focus-input100"></span>
            </div>

            {this.researchPage(
              this.state.researchName.length != 0 ? true : false,
              this.state.sessionDuration
            )}
            <div className="container-contact100-back-btn">
              <div className="wrap-contact100-back-btn" style={{ zIndex: 0 }}>
                <div className="contact100-back-bgbtn"></div>
                <button
                  id="main"
                  type="button"
                  className="contact100-back-btn"
                  onClick={() => {
                    loadPage(this.props, "researcher", this.state.user,this.state.user);
                  }}
                >
                  <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
