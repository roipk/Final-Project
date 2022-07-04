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
import PortalData from "./PortalData";

const hoursData = [];
const minutesData = [];
const numOfSessions = [];
for (var i = 0; i <= 99; i++) {
  if (i <= 24) hoursData.push(i);
  if (i < 60) minutesData.push(i);
  numOfSessions.push(i);
}

var currentUser = {};
var table = {
  numberOfSong: 0,
  numberSongLike: 0,
  numberSongDisLike: 0,
  numberSongNotRated: 0,
  numberSongNotlisten: 0,
  numberElder: 0,
  playlist: {},
};

var elderTableData = [];

var currentResearchName = "";

export default class PortalPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      activeElders: [],
      user: props.history.location.currentUser,
      researchToEdit: props.history.location.data,
      researchesOptions: [],
      researchName: "",
      startDate: new Date(),
      endDate: new Date(),
      numberOfSessions: 0,
      sessionDuration: { hours: 0, minutes: 0 },
      participantsElders: [],
      participantsResearchers: [],
      currentSession: "",
      prevResearchName: ",",
      creatorResearcher: {},
      participantsEldersInfo: {},
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
    if (this.state.researchName === this.state.prevResearchName) return;

    await this.getAllResearchesByResearcher().then((result) => {
      this.setState({
        researchesOptions: result,
      });
      console.log(result);
    });

    await this.getAllUsers("user").then((result) => {
      this.setState({
        eldersOptions: result,
      });
    });

    await this.getAllUsers("researcher").then((result) => {
      // console.log(result);
      const currentResearcher =
        currentUser.first_name + " " + currentUser.last_name;
      let options = [];
      result.forEach((researcher) => {
        if (researcher.label != currentResearcher) options.push(researcher);
      });

      this.setState({
        researchersOptions: options,
      });
    });
    this.setResearch(this.props.history.location.data);
  }

  async getElderData(elders, participantsEldersInfo) {
    console.log(participantsEldersInfo);

    elderTableData = [];
    table.numberOfSong = 0;
    table.numberSongLike = 0;
    table.numberSongDisLike = 0;
    table.numberSongNotRated = 0;
    table.numberSongNotlisten = 0;
    table.numberElder = elders.length;
    table.playlist = {};
    await participantsEldersInfo.map(async (data) => {
      let found = false;
      let name = "";
      elders.some((element) => {
        if (element.value === data.Oid) {
          found = true;
          name = element.label;
          return;
        }
      });
      if (!found) return;

      var elderTableTemplate = {
        fullName: name,
        numberOfSong: 0,
        numberSessions: 0,
        numberSongLike: 0,
        numberSongDisLike: 0,
        numberSongNotRated: 0,
        numberSongNotlisten: 0,
        playlist: {},
        sessions: [],
      };

      elderTableTemplate.numberSessions =
        data.sessions[this.state.researchName].sessions.length;
      await data.sessions[this.state.researchName].sessions.map(
        async (songs) => {
          let session = [];
          await songs.map((song) => {
            session.push(song);
            elderTableTemplate.numberOfSong++;
            table.numberOfSong++;
            if (song.score > 3) {
              elderTableTemplate.numberSongLike++;
              table.numberSongLike++;
            } else if (song.score < 3 && song.score > 0) {
              elderTableTemplate.numberSongDisLike++;
              table.numberSongDisLike++;
            } else if (song.score === 0) {
              elderTableTemplate.numberSongNotRated++;
              table.numberSongNotRated++;
            } else {
              elderTableTemplate.numberSongNotlisten++;
              table.numberSongNotlisten++;
            }

            if (table.playlist[song.playlistName])
              table.playlist[song.playlistName]++;
            else table.playlist[song.playlistName] = 1;

            elderTableTemplate.playlist[song.playlistName] = 1;
          });
          elderTableTemplate.sessions.push(session);
        }
      );
      elderTableData.push(elderTableTemplate);
    });

    let options = [];
    await Object.entries(table.playlist).map((item) => {
      options.push({ y: item[1], label: item[0] + "" });
      return;
    });
    options = options.sort(function (a, b) {
      return a.label - b.label;
    });
    return options;
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
    let researchers = [];
    let usersInfoSession = [];
    console.log(researchName.label);
    var res = await axios.get(
      url + "/researcher/getResearchByName/" + researchName.label
    );
    console.log(res.data);
    let creatorResearcher = {};
    const currentResearcher =
      currentUser.first_name + " " + currentUser.last_name;
    if (res.data.length > 0 && res.data[0].participantsResearchers.length > 0) {
      res.data[0].participantsResearchers.forEach((researcher) => {
        if (researcher.label != currentResearcher) researchers.push(researcher);
        else creatorResearcher = researcher;
      });
    }

    let elders = res.data[0].participantsElders.map((elder) => {
      return elder.value;
    });

    var participantsEldersInfo = await axios.post(
      url + "/researcher/getAllUsersByResearch/" + researchName.label,
      elders
    );

   
    let participantsEldersOptions = await this.getElderData(
      res.data[0].participantsElders,
      participantsEldersInfo.data
    );

    this.setState({
      activeElders: res.data[0].participantsElders,
      researchName: res.data[0].researchName,
      startDate: res.data[0].startDate,
      endDate: res.data[0].endDate,
      numberOfSessions: res.data[0].numberOfSessions,
      sessionDuration: res.data[0].sessionDuration,
      participantsElders: res.data[0].participantsElders,
      participantsEldersInfo: participantsEldersInfo.data,
      participantsEldersOptions: participantsEldersOptions,
      participantsEldersOld: res.data[0].participantsElders,
      participantsResearchers: researchers,
      participantsResearchersOld: researchers,
      currentSession: res.data[0].currentSession,
      creatorResearcher: creatorResearcher,
      table: table,
      elderTableData: elderTableData,
    });
  }

  setResearch = (selectedResearch) => {
    console.log(selectedResearch);
    currentResearchName = selectedResearch.label;
    if (selectedResearch) {
      this.setState({
        researchToEdit: selectedResearch,
        researchName: selectedResearch.label,
      });
      this.getResearchDetails(selectedResearch).then((result) => {
        console.log(result);
        this.setState({
          researchToView: selectedResearch,
          researchDetails: result,
          researchName: selectedResearch.label,
          prevResearchName: this.state.researchName,
        });
      });
    }

    // console.log(this.state.eldersOptions);
  };

  // setResearch = (selectedResearch) => {
  //     this.getResearchDetails(selectedResearch.label).then((result) => {
  //         this.setState({
  //             researchToView: selectedResearch,
  //             researchDetails: result,
  //             researchName: selectedResearch.label,
  //         });
  //     });
  // };

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
    this.getElderData(
      selectedEldersOption,
      this.state.participantsEldersInfo
    ).then((res) => {
      this.setState({
        table: table,
        elderTableData: elderTableData,
        participantsElders: selectedEldersOption,
        participantsEldersOptions: res,
      });
    });
    // console.log(selectedEldersOption)
  };

  setParticipantsResearchers = (selectedResearchersOption) => {
    console.log(selectedResearchersOption);
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
  async getAllUsersInResearch(research) {
    var res = await axios.get(
      url + "/researcher/getAllUsersByResearch/" + research
    );
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

  async setUserCurrentSession(id) {
    await axios.post(url + "/user/setUserCurrentSession/" + id + "/personal");
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
    if (typeof researchersParticipants != "undefined") {
      if (
        researchersParticipants.length > 0 &&
        researchersParticipants[0].label === "Select all"
      ) {
        researchersParticipants.splice(0, 1);
      }
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

    if (typeof updatedResearch.participantsResearchers === "undefined")
      updatedResearch.participantsResearchers = [];
    // updatedResearch.participantsResearchers.push(this.state.creatorResearcher);
    console.log(updatedResearch);

    let oldElders = this.state.participantsEldersOld;
    let newElders = this.state.participantsElders;

    let oldResearchers = this.state.participantsResearchersOld;
    let newResearchers = this.state.participantsResearchers;
    if (typeof newResearchers === "undefined") newResearchers = [];
    newResearchers.push(this.state.creatorResearcher);

    let oldEldersCollection = collect(oldElders);
    let newEldersCollection = collect(newElders);

    let oldResearchersCollection = collect(oldResearchers);
    let newResearchersCollection = collect(newResearchers);

    oldEldersCollection.each((item) => {
      if (newEldersCollection.contains("label", item.label)) {
        // console.log("do nothing with elder " + item.label);
      } else {
        // console.log("need to set isActive to false for elder " + item.label);
        this.setIsActive(item.value, updatedResearch.researchName);
        this.setUserCurrentSession(item.value);
      }
    });

    newEldersCollection.each((item) => {
      if (oldEldersCollection.doesntContain("label", item.label)) {
        // console.log("need to create session for elder " + item.label);
        this.addSessionToElder(item.value, updatedResearch.researchName);
      }
    });

    oldResearchersCollection.each((item) => {
      let researchersToUpdate = [];
      if (newResearchersCollection.contains("label", item.label)) {
        // console.log("do nothing with researcher " + item.label);
      } else {
        // console.log(
        //   "need to remove research from ResearcherInfo for researcher " +
        //     item.label
        // );
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
        // console.log("need to add research to researcher " + item.label);
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
        alert(
          "successful\n the research " +
            this.state.researchName +
            "\n" +
            "Updated"
        );

        loadPage(this.props, "researcher", this.state.user, this.state.user);
      });
  };

  researchPage(isInit, duration) {
    if (isInit) {
      return (
        <div style={{ width: "100%" }} className="container-section-space">
          <div className="container-section">
            <div>
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
                    required
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
                            data={numOfSessions}
                            filter={false}
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
                    options={this.state.activeElders}
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

                {/*          <div className="container-contact100-form-btn">*/}
                {/*              <div*/}
                {/*                  className="wrap-contact100-form-btn"*/}
                {/*                  style={{ zIndex: 0 }}*/}
                {/*              >*/}
                {/*                  <div className="contact100-form-bgbtn"></div>*/}
                {/*                  <button*/}
                {/*                      type="submit"*/}
                {/*                      id="signup"*/}

                {/*                      className="contact100-form-btn"*/}
                {/*                  >*/}
                {/*<span>*/}
                {/*  test*/}
                {/*  <i*/}
                {/*      className="fa fa-long-arrow-right m-l-7"*/}
                {/*      aria-hidden="true"*/}
                {/*  ></i>*/}
                {/*</span>*/}
                {/*                  </button>*/}
                {/*              </div>*/}
                {/*          </div>*/}
                <div className="container-contact100-form-btn">
                  <div
                    className="wrap-contact100-form-btn"
                    style={{ zIndex: 0 }}
                  >
                    <div className="contact100-form-bgbtn"></div>
                    <button>
                      <span>
                        test
                        <i
                          className="fa fa-long-arrow-right m-l-7"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h1>portal</h1>
                <h1>General research info</h1>
                <PortalData
                  usersDataView={this.state.elderTableData}
                  table={this.state.table}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container-researcher-edit" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              Portal Researches
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
                    loadPage(
                      this.props,
                      "researcher",
                      this.state.user,
                      this.state.user
                    );
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
