import React, { Component } from "react";

import Select, { components } from "react-select";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import he from "date-fns/locale/he";
registerLocale("he", he);

import DurationPicker from "react-duration-picker";

import { findArrayData } from "./SignUp";
import MultiSelect from "./MultiSelect";
import { loadPage, verifyUser } from "./ManagerComponents";

const Option = (props) => {
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

const algo = [
  // { value: '', label: 'Admin' },
  { value: "History", label: "History" },
  // { value: 'Family', label: 'Family' },
];

const ValueContainer = ({ children, ...props }) => {
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

const MultiValue = (props) => {
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

const dummyOptions = [
  { value: "Elder1", label: "Elder1" },
  { value: "Elder2", label: "Elder2" },
  { value: "Elder3", label: "Elder3" },
  { value: "Elder4", label: "Elder4" },
  { value: "Elder5", label: "Elder5" },
];

export default class CreateResearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      optionSelected: null,
      researchName: "",
      startDate: new Date(),
      endDate: new Date(),
      researchDuration: "",
      participents: [],
      currentAlgorithm: "",
    };
  }

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

  setDurationHandler = (duration) => {
    const { hours, minutes, seconds } = duration;
    this.setState({ hours, minutes, seconds });
  };

  multiSelectHandler = (selectedOption) => {
    this.setState({
      optionSelected: selectedOption,
    });
  };

  render() {
    return (
      <div className="container-contact100" style={{ zIndex: -1 }}>
        <div className="wrap-contact1100" style={{ zIndex: 0 }}>
          <span className="contact100-form-title" translate="yes" lang="he">
            New Research
          </span>
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
                    type="text"
                    name="researchName"
                    
                    placeholder="Enter Research Name"
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
                        onSelect={this.setStartDateHandler}
                        dateFormat="dd/MM/yyyy"
                        locale={he}
                        showTimeSelect
                      ></DatePicker>
                    </div>
                    <div className="grid-item">
                      <span className="label-input100">End Date:</span>
                      <DatePicker
                        selected={this.state.endDate}
                        onSelect={this.setEndDateHandler}
                        dateFormat="dd/MM/yyyy"
                        locale={he}
                      ></DatePicker>
                    </div>
                    <div className="grid-item">
                      <span className="label-input100">Session Duration:</span>
                      <DurationPicker
                        onChange={this.setDurationHandler}
                        initialDuration={{ hours: 1, minutes: 0, seconds: 0 }}
                        // maxHours={5}
                      ></DurationPicker>
                    </div>
                  </div>
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Name is required"
                >
                  <span className="label-input100">Participents Elders</span>

                  <MultiSelect
                    options={dummyOptions}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{
                      Option,
                      MultiValue,
                      ValueContainer,
                    }}
                    isSearchable
                    onChange={this.multiSelectHandler}
                    allowSelectAll={true}
                    value={this.state.optionSelected}
                    // styles={colourStyles}
                  />
                </div>

                <div className="wrap-input100 input100-select">
                  <span className="label-input100">Algorithm </span>

                  <div>
                    <Select
                      // onChange={e=>{}}

                      style={{ zIndex: 100 }}
                      className="basic-multi-select"
                      closeMenuOnSelect={true}
                      value={
                        this.state.currentAlgorithm
                          ? findArrayData(this.state.currentAlgorithm, algo)
                          : null
                      }
                      options={algo} 
                      menuPlacement="auto"
                      menuPosition="fixed"
                      onChange={(e) => {
                        this.setState({ currentAlgorithm: e.value });
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
                      type="button"
                      id="signup"
                      className="contact100-form-btn"
                      onClick={() => {
                        if (
                          !(
                            this.state.firstName ||
                            this.state.lastName ||
                            this.state.password
                          )
                        )
                          return alert("Fill in all required fields");
                        // console.log(this.state.firstName)
                        const user = {
                          first_name: this.state.firstName,
                          last_name: this.state.lastName,
                          password: this.state.password,
                          type: this.state.type,
                          timeOut: 0,
                          permissions: this.state.roles ? this.state.roles : [],
                        };
                        axios
                          .post("http://localhost:5000/admin/createUser", user)
                          .then((res) => {
                            console.log("in");
                            console.log(res.data);
                            // loadPage(this.props,"",this.state)
                          });

                        //     axios.post("http://localhost:5000/users/register",user)
                        //     .then(res=>{
                        //         // console.log(res.data)
                        //         loadPage(this.props,"",this.state)
                        //     })
                      }}
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
                        // console.log(this.state.roles?this.state.roles:[])
                        loadPage(this.props, "researcher", this.state);
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
        </div>
      </div>
    );
  }
}
