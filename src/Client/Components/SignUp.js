import React, { Component, useState } from "react";
import axios from "axios";
import Config from "../../Config.json";
import { loadPage, verifyUser } from "./ManagerComponents";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Switch from "react-switch";
// import CreateAdmin from "./Registers/admin";
// import CreateResearcher from "./Registers/resarcher";
// import CreateUser from "./Registers/oldMan";
import { iso6392 } from "iso-639-2";
import Allcountries, { languagesAll } from "countries-list";
// import Carousel from "react-elastic-carousel";
// import * as mongoose from "mongoose";
import { url } from "./AllPages";
// import {iso6393} from 'iso-639-3'

const animatedComponents = makeAnimated();

const countries = Object.entries(Allcountries.countries);
// const languages = Object.entries(languagesAll);
const languages = Object.entries(iso6392);

var selectLanguage = [];
var selectCountries = [];

// var CryptoJS = require("crypto-js");
// var bytes2 = CryptoJS.AES.decrypt('U2FsdGVkX1/BwIZMRt1gsR6PwQb2exz6oLuuL9zix68=', 'Password');
// var decrypted2 = bytes2.toString(CryptoJS.enc.Utf8);
// console.log(decrypted2)
//

init();

function init() {
  getLanguageList();
  getCountriesList();
}
const algo = [
  // { value: '', label: 'Admin' },
  { value: "History", label: "History" },
  // { value: 'Family', label: 'Family' },
];
const roles = [
  // { value: '', label: 'Admin' },
  { value: "admin", label: "Create Admin" },
  { value: "researcher", label: "Create Researcher" },
  { value: "musicGuide", label: "Create Music Guide" },
  { value: "guide", label: "Create Guide" },
  { value: "user", label: "Create User" },
];
// const Cognitive = [
//   // { value: '', label: 'Admin' },
//   { value: 5, label: "Very Low Cognitive" },
//   { value: 8, label: "Low Cognitive" },
//   { value: 11, label: "Normal Cognitive" },
//   { value: 12, label: "Good Cognitive" },
//   { value: 15, label: "Excellent Cognitive" },
// ];

function timefomat(timestamp) {
  let unix_timestamp = timestamp;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

  // console.log(formattedTime);
  return formattedTime;
}

export function findArrayData(array, selectOptions) {
  let data = [];
  let options = selectOptions;
  if (!Array.isArray(array))
    return options[options.findIndex((x) => x.value === array)];
  array.forEach((i) => {
    let index = options.findIndex((x) => x.value === i);
    data.push(options[index]);
  });
  return data;
}

let maxSelectLanguage = 2;
let maxSelectGenere = 2;

var timeoutHandle = setTimeout(() => {}, 0);

async function CreateSession(id) {
  let songs = await axios.get(url + "/user/Create/session/" + id + "/personal");
  return songs.data;
}

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.currentUser,
      language: null,
      page: 0,

      //user
      first_name: "",
      last_name: "",
      id: "",
      email: "",
      user_name: "",
      password: "",
      type: "",

      //elder
      Geners: [],
      LanguageAtTwenty: [],
      birthYear: 1925,
      countryAtTwenty: "",
      countryOrigin: "",
      department: "",
      entrance: 0,
      firstName: "",
      languageOrigin: "",
      lastName: "",
      medicalProfile: "",
      nursingHome: "",
      // password:"SpaEngYidCla30",
      userName: "",
      yearAtTwenty: "",
      yearOfImmigration: "",
      maxSession: 7,
      Cognitive: Config.HIGH_COGNITIVE,
        currentSession: "personal",
      checked: true,
    };
  }

  newUserAuthentication() {
    let user = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      id: this.state.id,
      email: this.state.email,
      user_name: this.state.user_name,
      password: this.state.password,
      type: this.state.type,
    };
    return user;
  }

  newResearcherData(id) {
    let authData = this.newUserAuthentication();
    let researcherData = {
      Oid: id,
      ...authData,
      researches: [],
    };
    return researcherData;
  }

  newElderData(id) {
    let elderData = {
      Oid: id,
        type:this.state.type,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      userName: this.state.user_name,
      languageOrigin: this.state.languageOrigin,

      department: this.state.department,
      medicalProfile: this.state.medicalProfile,
      nursingHome: this.state.nursingHome,

      birthYear: this.state.birthYear,
      yearOfImmigration: this.state.yearOfImmigration
        ? this.state.yearOfImmigration
        : this.state.birthYear,
      yearAtTwenty: this.state.birthYear + 20,

      countryOrigin: this.state.countryOrigin,
      countryAtTwenty: this.state.countryAtTwenty,

      Geners: this.state.Geners,
      LanguageAtTwenty: this.state.LanguageAtTwenty,

      entrance: 0,
      maxSession: this.state.maxSession,
      Cognitive: this.state.Cognitive, // 5, 8, 11, 12, 15
      maxSongs: this.state.Cognitive * this.state.maxSession, //max session*Cognitive
        currentSession: this.state.currentSession,
    };
    return elderData;
  }

  getDec(birthYear, LanguageAtTwenty) {
    let decade = [];
    let lastTime = new Date();
    lastTime = lastTime.getFullYear() - 20 - (lastTime.getFullYear() % 10);
    let birthYearDecade = birthYear - (birthYear % 10);
    LanguageAtTwenty.forEach((language) => {
      for (let i = birthYearDecade; i <= birthYearDecade + 30; i += 10) {
        let hundred = Math.floor(i / 100) + 1;
        let dc = i % 1000 === 0 ? "00" : i % 100;
        decade.push(language + "-" + hundred + "-" + dc + "DC");
      }
    });

    return decade;
  }

  newElderSessions(id) {
    const userSessionData = {
      Oid: id,
      firstName: this.state.first_name,
      lastName: this.state.last_name,
      userName: this.state.user_name,
      languages: this.state.languages,
      // genre:this.state.genre,
      yearAtTwenty: this.state.birthYear + 20,
      sessions: {
        personal: { isActive: true, sessions: [] },
        family: { isActive: true, sessions: [] },
      },
      // Geners:this.state.Geners,
      // LanguageAtTwenty:this.state.LanguageAtTwenty,
      playlists: this.getPlaylist(
        this.state.birthYear,
        this.state.LanguageAtTwenty,
        this.state.Geners
      ),

      entrance: 0,
      maxSession: 7,
      Cognitive: this.state.Cognitive, // 5, 8, 11, 12, 15
      maxSongs: this.state.Cognitive * this.state.maxSession, //max session*Cognitive
        currentSession: this.state.currentSession,
    };
    return userSessionData;
  }
  getPlaylist(birthYear, LanguageAtTwenty, genres) {
    var playlist = this.getDec(birthYear, LanguageAtTwenty);
    genres.forEach((genre) => {
      playlist.push(genre);
    });
      LanguageAtTwenty.forEach((Language) => {
          playlist.push(Language);
      });
      playlist = [...new Set(playlist)];
    return playlist;
  }

  async componentDidMount() {
    let currentUser = await verifyUser("admin");
    if (currentUser) this.setState({ user: currentUser });
  }

  // algorithm

  // let users = $.post('/users', {patientsIds}, async function (usersData){
  //     console.log(usersData);
  //     usersData = usersData.items;
  //     for(let i = 0; i < usersData.length; i++) {
  //         tamaringaId = usersData[i].tamaringaId;
  //         yearAtTwenty = usersData[i].yearAtTwenty;
  //         countryAtTwenty = usersData[i].countryAtTwenty;
  //         countryOrigin = usersData[i].countryOrigin;
  //         languageOrigin = usersData[i].languageOrigin;
  //         yearOfImmigration = usersData[i].yearOfImmigration;
  //         birthYear = usersData[i].birthYear;
  //
  //         //create decade for user
  //         let decade = getDec(birthYear);
  //
  //         let postingData = {
  //             decade: decade,
  //             countryAtTwenty: countryAtTwenty,
  //             yearAtTwenty: yearAtTwenty,
  //             researchId: researchId,
  //             meetingPerWeek: meetingPerWeek,
  //             numberOfWeeks: numberOfWeeks
  //         }
  //
  //
  //         let firstPlaylistNames = [];
  //         let secondPlaylistNames = [];
  //
  //         //create playlist names
  //         createPlaylistNames(firstPlaylistNames, secondPlaylistNames, postingData);
  //
  //         let playlistData1 = {
  //             name: firstPlaylistNames
  //         };
  //
  //         let playlistData2 = {
  //             name: secondPlaylistNames
  //         };
  //
  //         console.log("Getting decade playlists...");
  //
  //         //check if the decade playlists exist
  //         await ajaxAwait('/getDecadePlaylist', "post", playlistData1);
  //         await ajaxAwait('/getDecadePlaylist', "post", playlistData2);
  //
  //         //update userData
  //         let userData = {
  //             tamaringaId: tamaringaId,
  //             firstPlaylists: firstPlaylistNames,
  //             secondPlaylists: secondPlaylistNames,
  //             researchId: postingData.researchId.val(),
  //             maxSessionNum: postingData.numberOfWeeks.val() * postingData.meetingPerWeek.val(),
  //             sessionList: null
  //         };
  //         const getPlaylistLink = '/updateUserDataCollection';
  //         await ajaxAwait(getPlaylistLink, "post", userData);
  //     }
  //
  //
  //
  //
  //
  //     //create a new research
  //     let researchData = {
  //         researchName: researchName.val(),
  //         researchId: researchId.val(),
  //         researchersIds: researchersIds.val(),
  //         researchGroupId : researchGroupId.val(),
  //         description : description.val(),
  //         patientsIds: patientsIds,
  //         nursingHome: nursingHome.val(),
  //         department: department.val(),
  //         numberOfWeeks: numberOfWeeks.val(),
  //         meetingPerWeek: meetingPerWeek.val(),
  //         lengthOfSession: lengthOfSession.val(),
  //         algorithm:algorithm.val()
  //     };
  //
  //     const insertResearchUrl = '/insertResearch';
  //     await ajaxAwait(insertResearchUrl, "post", researchData);
  //     alert("Research Created '\n' The research Id is: " + researchId.val() +"\n Please wait a few seconds till the page will go back");
  //     const pathname = "/researchGroupMainPage"
  //     window.location.replace(pathname);
  // });

  // async componentDidUpdate(prevProps, prevState, snapshot) {
  //     let currentUser = await verifyUser("admin")
  //     if (currentUser) {
  //         // this.setState({user: currentUser,timeOut:currentUser.timeOut})
  //         var date = new Date(currentUser.timeOut);
  //         var now = Math.floor(Date.now() / 1000)
  //         clearTimeout(timeoutHandle)
  //         timeoutHandle = setTimeout(() => {
  //             alert("you disconnected in 1 min");
  //         }, (date - now - 60) * 1000);
  //         console.log("alert in " + (date - now - 60) + " sec")
  //     }
  // }

  registerUser(page) {
    if (page === 0)
      return (
        <div>
          <h1>פרטי הזדהות עבור המערכת</h1>
          <br />
          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span className="label-input100">First name*</span>
            <input
              value={this.state.first_name}
              disabled={false}
              id="firstName"
              className="input100"
              type="text"
              name="firstName"
              onChange={(e) => {
                this.setState({ first_name: e.target.value });
              }}
              placeholder="Enter First Name"
              required
            />
            <span className="focus-input100"></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span className="label-input100">Last name*</span>
            <input
              value={this.state.last_name}
              disabled={false}
              id="lastName"
              className="input100"
              type="text"
              name="lastName"
              onChange={(e) => {
                this.setState({ last_name: e.target.value });
              }}
              placeholder="Enter Last Name"
              required
            />
            <span className="focus-input100"></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="ID is required"
          >
            <span className="label-input100">ID*</span>
            <input
              value={this.state.id}
              id="id"
              disabled={false}
              className="input100"
              type="text"
              name="id"
              onChange={(e) => {
                this.setState({ id: e.target.value });
              }}
              placeholder="Enter ID"
              required
            />

            <span className="focus-input100"></span>
          </div>
          <div
            hidden={
              this.state.type !== "admin" && this.state.type !== "researcher"
            }
            className="wrap-input100 validate-input"
            data-validate="Email is required"
          >
            <span className="label-input100">Email*</span>
            <input
              value={this.state.email}
              id="email"
              disabled={false}
              className="input100"
              type="text"
              name="email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Enter Email"
              required
            />
            <span className="focus-input100"></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span className="label-input100">User name*</span>

            <input
              value={this.state.user_name}
              disabled={false}
              id="userName"
              className="input100"
              type="text"
              name="userName"
              onChange={(e) => {
                this.setState({ user_name: e.target.value });
              }}
              placeholder="Enter User Name"
              required
            />
            <span className="focus-input100"></span>
          </div>

          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <span className="label-input100">Password*</span>

            <input
              value={this.state.password}
              disabled={false}
              id="password"
              className="input100"
              type="password"
              name="password"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Enter Password"
              required
            />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-contact100-back-btn">
            <div className="contact100-back-bgbtn"></div>

            <button
              hidden={this.state.type === "user"}
              id="submit"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                let user = this.newUserAuthentication();
                console.log("done");
                axios
                  .post(url + "/admin/create/Authentication", user)
                  .then((res) => {
                    let id = res.data.insertedId;
                    console.log(res);
                    console.log(res.data);
                    alert(
                      "successful\n the user " +
                        this.state.first_name +
                        "\n" +
                        "add to system with id -  " +
                        res.data.insertedId +
                        "\n" +
                        "type " +
                        this.state.type
                    );
                    if (this.state.type === "researcher") {
                      console.log(id);
                      let researcherInfo = this.newResearcherData(id);
                      axios
                        .post(
                          url + "/admin/create/ResearchersInfo",
                          researcherInfo
                        )
                        .then((res) => {
                          alert("Added also to researcherInfo:" + res.data);
                        });
                      loadPage(this.props, "ViewUsers", this.state.user,this.state.user);
                    }
                    loadPage(this.props, "ViewUsers", this.state.user,this.state.user);
                    // loadPage(this.props, "admin", this.state.user)
                    // loadPage(this.props,"",this.state)
                  });
              }}
            >
              submit
              <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
              {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
            </button>
            <button
              hidden={this.state.type !== "user"}
              id="next"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                this.setState({ page: page + 1 });
              }}
            >
              next
              <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
              {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
            </button>
          </div>
        </div>
      );
    else if (page === 1)
      return (
        <div>
          <h1>מידע על בית האבות</h1>
          <br />
          <div
            className="wrap-input100 validate-input"
            data-validate="Nursing Home is required"
            required
          >
            <span className="label-input100">Nursing Home*</span>
            <input
              value={this.state.nursingHome}
              id="nursingHome"
              className="input100"
              type="text"
              name="nursingHome"
              onChange={(e) => {
                this.setState({ nursingHome: e.target.value });
              }}
              placeholder="Enter Nursing Home"
            />
            <span className="focus-input100"></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Department is required"
          >
            <span className="label-input100">Department</span>
            <input
              value={this.state.department}
              id="department"
              className="input100"
              type="text"
              name="department"
              onChange={(e) => {
                this.setState({ department: e.target.value });
              }}
              placeholder="Enter Department"
            />
            <span className="focus-input100"></span>
          </div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Medical profile is required"
          >
            <span className="label-input100">Medical profile</span>
            <input
              value={this.state.medicalProfile}
              id="medicalProfile"
              className="input100"
              type="text"
              name="Medical profile"
              onChange={(e) => {
                this.setState({ medicalProfile: e.target.value });
              }}
              placeholder="Enter Medical profile"
            />
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-contact100-back-btn">
            <div className="contact100-back-bgbtn"></div>
            <button
              id="next2"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                this.setState({ page: page + 1 });
              }}
            >
              next
              <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
              {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
            </button>
            <div className="contact100-back-bgbtn"></div>
            <button
              id="back1"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                // console.log(this.state.roles?this.state.roles:[])
                this.setState({ page: page - 1 });
              }}
            >
              back
              <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    else if (page === 2)
      return (
        <div>
          <h1>מידע כללי</h1>
          <br />

          <div className="wrap-input100 input100-select">
            <span className="label-input100">Year of birth</span>
            <div>
              <Select
                label="select year"
                onChange={(e) => {
                  // this.getDec(e.value)
                  console.log(e.value);
                  this.setState({ birthYear: e.value });
                }}
                style={{ zIndex: 100 }}
                closeMenuOnSelect={true}
                options={getOpt(1925)} //start, end-> today year
                value={
                  this.state.birthYear
                    ? findArrayData(this.state.birthYear, getOpt(1925))
                    : null
                }
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
          </div>
          <div className="wrap-input100 input100-select">
            <span className="label-input100">Country where you were born</span>
            <div>
              <Select
                label="select country born"
                onChange={(e) => {
                  console.log(e.value);
                  this.setState({ countryOrigin: e.value });
                }}
                value={
                  this.state.countryOrigin
                    ? findArrayData(this.state.countryOrigin, selectCountries)
                    : null
                }
                style={{ zIndex: 100 }}
                closeMenuOnSelect={true}
                options={selectCountries} //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
            <span className="focus-input100"></span>
          </div>
          <div className="wrap-input100 input100-select">
            <span className="label-input100">
              Country where you lived at ages 10-25
            </span>
            <div>
              <Select
                label="select Country"
                onChange={(e) => {
                  this.setState({ countryAtTwenty: e.value });
                  console.log(e);
                }}
                style={{ zIndex: 100 }}
                closeMenuOnSelect={true}
                value={
                  this.state.countryAtTwenty
                    ? findArrayData(this.state.countryAtTwenty, selectCountries)
                    : null
                }
                options={selectCountries} //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
            <span className="focus-input100"></span>
          </div>
          <div className="wrap-input100 input100-select">
            <span className="label-input100">Language spoken since birth</span>
            <div>
              <Select
                label="select year"
                onChange={(e) => {
                  this.setState({ languageOrigin: e.value });
                  console.log(e);
                }}
                style={{ zIndex: 100 }}
                value={
                  this.state.languageOrigin
                    ? findArrayData(this.state.languageOrigin, selectLanguage)
                    : null
                }
                closeMenuOnSelect={true}
                options={selectLanguage} //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
            <span className="focus-input100"></span>
          </div>
          <div className="wrap-input100 input100-select">
            <span className="label-input100">
              Languages spoken at Youth (ages 10-25)
            </span>
            <div>
              <Select
                label="select year"
                style={{ zIndex: 100 }}
                isMulti
                className="basic-multi-select"
                closeMenuOnSelect={true}
                value={
                  this.state.LanguageAtTwenty
                    ? findArrayData(this.state.LanguageAtTwenty, selectLanguage)
                    : null
                }
                options={
                  this.state.LanguageAtTwenty &&
                  this.state.LanguageAtTwenty.length >= maxSelectLanguage
                    ? []
                    : selectLanguage
                } //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
                onChange={(e) => {
                  let languageAtTwenty = [];
                  for (let i = 0; i < e.length; i++)
                    languageAtTwenty.push(e[i].value);
                  this.setState({
                    LanguageAtTwenty: languageAtTwenty,
                  });
                }}
              />
            </div>
            <span className="focus-input100"></span>
          </div>
          <div className="wrap-input100 input100-select">
            <span className="label-input100">
              Year of immigration to Israel
            </span>
            <div>
              <Select
                label="select year"
                onChange={(e) => {
                  this.setState({ yearOfImmigration: e.label });
                }}
                value={
                  this.state.yearOfImmigration
                    ? findArrayData(this.state.yearOfImmigration, getOpt(1925))
                    : null
                }
                style={{ zIndex: 100 }}
                closeMenuOnSelect={true}
                options={getOpt(1925)} //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
            <span className="focus-input100"></span>
          </div>

          <div className="wrap-contact100-back-btn">
            <div className="contact100-back-bgbtn"></div>
            <button
              id="next3"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                this.setState({ page: page + 1 });
              }}
            >
              next
              <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
              {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
            </button>
            <div className="contact100-back-bgbtn"></div>
            <button
              id="back2"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                // console.log(this.state.roles?this.state.roles:[])
                this.setState({ page: page - 1 });
              }}
            >
              back
              <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    else
      return (
        <div>
          <h1>רמת פעילות</h1>
          <br />

          <div className="wrap-input100 input100-select">
            <span className="label-input100">Genre 1</span>
            <div>
              <Select
                label="select year"
                // onChange={e=>{}}
                style={{ zIndex: 100 }}
                isMulti
                className="basic-multi-select"
                closeMenuOnSelect={true}
                options={
                  this.state.Geners &&
                  this.state.Geners.length >= maxSelectGenere
                    ? []
                    : getGenre()
                } //start, end-> today year
                menuPlacement="auto"
                menuPosition="fixed"
                value={
                  this.state.Geners
                    ? findArrayData(this.state.Geners, getGenre())
                    : null
                }
                onChange={(e) => {
                  let gener = [];
                  for (let i = 0; i < e.length; i++) {
                    gener.push(e[i].value);
                  }
                  this.setState({ Geners: gener });
                }}
              />
            </div>

            <span className="focus-input100"></span>
          </div>
          {/*<div className="wrap-input100 input100-select">*/}
          {/*    <span className="label-input100">sessions number per week*</span>*/}
          {/*    <div>*/}

          {/*        <Select label="select_sessions_number"*/}
          {/*            // onChange={e=>{}}*/}
          {/*                style={{zIndex:100}}*/}
          {/*                className="basic-multi-select"*/}
          {/*                closeMenuOnSelect={true}*/}
          {/*                value={this.state.maxSession?findArrayData(this.state.maxSession, getOpt(1,7)):null}*/}
          {/*                options={getOpt(1,7)}//start, end-> today year*/}
          {/*                menuPlacement="auto"*/}
          {/*                menuPosition="fixed"*/}
          {/*                onChange={(e)=>{*/}
          {/*                    console.log("in1")*/}
          {/*                    this.setState({maxSession: e.value})*/}
          {/*                }}*/}
          {/*        />*/}
          {/*    </div>*/}
          {/*    <span className="focus-input100"></span>*/}
          {/*</div>*/}
          <div className="wrap-input100 input100-select">
            <span className="label-input100">Good Cognitive</span>
            {/*<div>*/}

            {/*    <Select label="select sessions number"*/}
            {/*        // onChange={e=>{}}*/}
            {/*            style={{zIndex:100}}*/}
            {/*            className="basic-multi-select"*/}
            {/*            closeMenuOnSelect={true}*/}
            {/*            value={this.state.Cognitive?findArrayData(this.state.Cognitive, Cognitive):null}*/}
            {/*            options={Cognitive}//start, end-> today year*/}
            {/*            menuPlacement="auto"*/}
            {/*            menuPosition="fixed"*/}
            {/*            onChange={(e)=>{*/}
            {/*                this.setState({Cognitive: e.value})*/}
            {/*            }}*/}
            {/*    />*/}
            {/*</div>*/}
            <div>
              <Switch
                onChange={(check) => {
                  check
                    ? this.setState({
                        checked: check,
                        Cognitive: Config.HIGH_COGNITIVE,
                      })
                    : this.setState({
                        checked: check,
                        Cognitive: Config.LOW_COGNITIVE,
                      });
                }}
                checked={this.state.checked}
              />
            </div>
            <span className="focus-input100"></span>
          </div>
          {/*<div className="wrap-input100 input100-select">*/}
          {/*    <span className="label-input100">Algorithm*</span>*/}
          {/*    <div>*/}

          {/*        <Select label="select year"*/}
          {/*            // onChange={e=>{}}*/}

          {/*                style={{zIndex:100}}*/}
          {/*                className="basic-multi-select"*/}
          {/*                closeMenuOnSelect={true}*/}
          {/*                value={this.state.currentSession?findArrayData(this.state.currentAlgorithm, algo):null}*/}
          {/*                options={algo}//start, end-> today year*/}
          {/*                menuPlacement="auto"*/}
          {/*                menuPosition="fixed"*/}
          {/*                onChange={(e)=>{*/}
          {/*                    this.setState({currentSession: e.value})*/}
          {/*                }}*/}

          {/*        />*/}
          {/*    </div>*/}
          {/*    <span className="focus-input100"></span>*/}
          {/*</div>*/}

          <div className="wrap-contact100-back-btn">
            <div className="contact100-back-bgbtn"></div>
            {/* <button hidden={this.state.type!=='user'} id='submit' type='button' className="contact100-back-btn"
                                onClick={async ()=>{
                                    let userPlaylist = this.newElderSessions("61a8b86ca4e25312dbdce029")
                                }
                                }>
                            click me
                        </button> */}
            <button
              hidden={this.state.type !== "user"}
              id="submit"
              type="button"
              className="contact100-back-btn"
              onClick={async () => {
                let user = this.newUserAuthentication();

                let userId = await axios.post(
                  url + "/admin/create/Authentication",
                  user
                );

                let userData = this.newElderData(userId.data.insertedId);

                let userInfoId = await axios.post(
                  url + "/admin/create/UserInfo",
                  userData
                );

                let userPlaylist = this.newElderSessions(
                  userId.data.insertedId
                );

                let userPlaylistId = await axios.post(
                  url + "/admin/create/UserSessions",
                  userPlaylist
                );
                await axios.get(
                  url +
                    "/user/Create/session/" +
                    userId.data.insertedId +
                    "/personal"
                );

                // CreateSession(userId.data.insertedId)
                // userPlaylist.session.push()

                alert("the user " + this.state.first_name + " add to system");
                loadPage(this.props, "admin", this.state.user,this.state.user);
              }}
            >
              submit
              <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
              {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
            </button>
            <div className="contact100-back-bgbtn"></div>
            <button
              id="back"
              type="button"
              className="contact100-back-btn"
              onClick={() => {
                // console.log(this.state.roles?this.state.roles:[])
                this.setState({ page: page - 1 });
              }}
            >
              back
              <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
  }

  render() {
    return (
      <div className="container-contact100" style={{ zIndex: -1 }}>
        <div className="wrap-contact1100" style={{ zIndex: 0 }}>
          <form
            className="contact100-form validate-form"
            style={{ zIndex: -1 }}
          >
            <span className="contact100-form-title" translate="yes" lang="he">
              User Register
            </span>

            <div>
              {/*User name, First name, Last name, ID, Password*/}
              <div
                style={{ width: "100%" }}
                className="container-section-space"
              >
                <div className="container-section">
                  <div
                    hidden={this.state.page > 0}
                    className="wrap-input100 validate-input"
                    data-validate="Name is required"
                  >
                    <div>
                      <h1>
                        Identification information for the {this.state.type}{" "}
                        system
                        <br />
                      </h1>
                      <br />
                    </div>
                    <span className="label-input100">type*</span>
                    <Select
                      label="select year"
                      style={{ zIndex: 100 }}
                      closeMenuOnSelect={true}
                      defaultValue={""}
                      // defaultValue={roles[3]}
                      options={roles} //start, end-> today year
                      onChange={(e) => {
                        console.log(e.value);
                        this.setState({ type: e.value });
                      }}
                      menuPlacement="auto"
                      menuPosition="fixed"
                    />
                  </div>
                  <div hidden={this.state.type === ""}>
                    {this.registerUser(this.state.page)}
                  </div>

                  <div
                    hidden={this.state.page > 0}
                    className="wrap-contact100-back-btn"
                  >
                    <div className="contact100-back-bgbtn"></div>
                    <button
                      id="back"
                      type="button"
                      className="contact100-back-btn"
                      onClick={() => {
                        // console.log(this.state.roles?this.state.roles:[])
                        loadPage(this.props, "admin", this.state.user,this.state.user);
                      }}
                    >
                      back
                      <i
                        className="fa fa-arrow-left m-l-7"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>

              {/*</Carousel>*/}
            </div>

            {/*{*/}
            {/*    this.state.type==="admin"? <CreateAdmin/>:*/}
            {/*    this.state.type==="researcher"?<CreateResearcher/>:*/}
            {/*    this.state.type==="guide"?<CreateResearcher/>:*/}
            {/*    this.state.type==="user"?<CreateUser/>:<div></div>*/}
            {/*}*/}
          </form>
        </div>
      </div>
    );
  }
}

function getOpt(start, end = new Date().getFullYear()) {
  var options = [];
  for (var year = end; year >= start; year--) {
    options.push({ value: year, label: year });
  }
  return options;
}

function getLanguageList() {
  languages.map((language, index) => {
    selectLanguage.push({
      value: language[1].iso6392B,
      label: language[1].name,
    });
  });
  return selectLanguage;
}

function getCountriesList() {
  countries.map((country, index) => {
    selectCountries.push({ value: country[0], label: country[1].name });
  });
  return selectCountries;
}

function DisplayNames(language, type) {
  // return new Intl.DisplayNames([language], { type: type });
  return new Intl.DisplayNames(["en"], { type: type });
}

function getGenre() {
  var options = [
    { value: "cla", label: "Classical/Traditional" },
    { value: "yid", label: "Yiddish" },
    { value: "ara", label: "Arabic" },
    { value: "arana", label: "ArabicNA" },
    { value: "arame", label: "ArabicME" },
    { value: "lad", label: "Ladino" },
    { value: "pra", label: "Prayer Songs (Piyutim)" },
    { value: "mid", label: "Middle Eastern music" },
  ];

  return options;
}
