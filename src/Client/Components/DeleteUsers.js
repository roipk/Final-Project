import React, {Component, useState} from 'react';
import axios from "axios";
import {url} from "./AllPages"
import {loadloadPage, loadPage, verifyUser} from "./ManagerComponents";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import CreateAdmin from "./Registers/admin";
// import CreateResearcher from "./Registers/resarcher";
// import CreateUser from "./Registers/oldMan";
import Allcountries, {languagesAll} from "countries-list"
// import Carousel from "react-elastic-carousel";
// import * as mongoose from "mongoose";
// import {iso6393} from 'iso-639-3'

const animatedComponents = makeAnimated();

const countries = Object.entries(Allcountries.countries);
const languages = Object.entries(languagesAll);



const roles = [
    // { value: '', label: 'Admin' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'musicGuide', label: 'Music Guide' },
    { value: 'guide', label: 'Guide' },
    { value: 'user', label: 'Elder' }
]


function timefomat(timestamp)
{
    let unix_timestamp = timestamp
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
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    // console.log(formattedTime);
    return formattedTime
}

let maxSelectLanguage = 2;
let maxSelectGenere = 2;



export default class DeleteUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.location.data,
            language: null,
            page: 0,

            //user
            first_name: '',
            last_name: '',
            id: '',
            email: '',
            user_name: '',
            password: '',
            type: '',


            //elder
            Geners: [],
            LanguageAtTwenty: [],
            birthYear: "1925",
            countryAtTwenty: "",
            countryOrigin: "",
            department: "",
            entrance: 0,
            firstName: "",
            languageOrigin: "spa",
            lastName: "SpaEngYidCla30",
            medicalProfile: "",
            nursingHome: "",
            // password:"SpaEngYidCla30",
            userName: "SpaEngYidCla30",
            yearAtTwenty: "1959",
            yearOfImmigration: "",

        };


    }


    newUser() {
        let user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            id: this.state.id,
            email: this.state.email,
            user_name: this.state.user_name,
            password: this.state.password,
            type: this.state.type,
        }
        return user
    }

    newElderData(id) {

        let elderData = {
            Oid: id,
            Geners: this.state.Geners,
            LanguageAtTwenty: this.state.LanguageAtTwenty,
            birthYear: this.state.birthYear,
            countryAtTwenty: this.state.countryAtTwenty,
            countryOrigin: this.state.countryOrigin,
            department: this.state.department,
            entrance: 0,
            first_name: this.state.first_name,
            languageOrigin: this.state.languageOrigin,
            last_name: this.state.last_name,
            medicalProfile: this.state.medicalProfile,
            nursingHome: this.state.nursingHome,
            userName: this.state.user_name,
            yearAtTwenty: this.state.birthYear + 20,
            yearOfImmigration: this.state.yearOfImmigration ? this.state.yearOfImmigration : this.state.birthYear,
        }
        return elderData
    }



    getDec(birthYear, LanguageAtTwenty, coutry) {
        let decade = [];
        let lastTime = new Date()
        lastTime = lastTime.getFullYear() - 20 - lastTime.getFullYear() % 10
        let birthYearDecade = birthYear - birthYear % 10
        for (let i = birthYearDecade; i <= lastTime; i += 10) {
            decade.push(LanguageAtTwenty + coutry + i + "DC")
        }
        return decade
    }

    newElderPlaylist(id) {

        let playlists = {}

        for (let i = 0; i < this.state.LanguageAtTwenty.length; i++) {
            let dec = this.getDec(this.state.birthYear, this.state.LanguageAtTwenty[i], this.state.countryAtTwenty)
            playlists[`Language${i + 1}`] = {
                language: this.state.LanguageAtTwenty[i],
                playlists: {
                    History: dec,
                }
            }
        }

        // createPlaylistNames(firstPlaylistNames, secondPlaylistNames, postingData);
        playlists['genrePlaylists'] = this.state.Geners

        console.log(playlists)
        const userData = {
            Oid: id,
            firstName: this.state.first_name,
            lastName: this.state.last_name,
            userName: this.state.user_name,
            playlists: playlists,
            //playlists: req.body['playlists[]'], //need to added
            researchList: []
        };
        return userData
    }


    async componentDidMount() {

        let currentUser = await verifyUser("admin")
        if (currentUser)
            this.setState({user: currentUser})

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
    //         group = usersData[i].group;
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

        if (page == 0)
            return (
                <div>
                    <h1>פרטי הזדהות עבור המערכת</h1>
                    <br/>
                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">First name*</span>
                        <input value={this.state.first_name} disabled={true} id='firstName' className="input100" type="text"
                               name='firstName'
                               onChange={(e) => {
                                   this.setState({first_name: e.target.value})

                               }}
                               placeholder="Enter First Name" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                        <span className="label-input100">Last name*</span>
                        <input value={this.state.last_name} disabled={true} id='lastName' className="input100" type="text"
                               name='lastName'
                               onChange={(e) => {
                                   this.setState({last_name: e.target.value})
                               }}
                               placeholder="Enter Last Name" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="ID is required">
                        <span className="label-input100">ID*</span>
                        <input value={this.state.id} id='id'  disabled={true} className="input100" type="text" name="id"
                               onChange={(e) => {
                                   this.setState({id: e.target.value})
                               }}
                               placeholder="Enter ID" required/>

                        <span className="focus-input100"></span>
                    </div>
                    <div hidden={this.state.type != 'admin' && this.state.type != 'researcher'}
                         className="wrap-input100 validate-input" data-validate="Email is required">
                        <span className="label-input100">Email*</span>
                        <input disabled={true} value={this.state.email} id='email' className="input100" type="text" name="email"
                               onChange={(e) => {
                                   this.setState({email: e.target.value})
                               }} placeholder="Enter Email" required/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Name is required">

                        <span className="label-input100">User name*</span>

                        <input value={this.state.user_name} disabled={true} id='userName' className="input100" type="text"
                               name='userName'
                               onChange={(e) => {
                                   this.setState({user_name: e.target.value})
                               }}
                               placeholder="Enter User Name" required/>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button id='submit' type='button'
                                className="contact100-back-btn"
                                onClick={() => {
                                    alert("do you want remove this user?")

                                    axios.get(url+"/admin/DeleteUser/"+this.state.Oid)
                                        .then(res => {
                                            console.log("the user removed")
                                            loadPage(this.props, "admin", this.state.user,this.state.user)


                                            // alert("successful\n the user " + this.state.first_name + "\n" +
                                            //     "add to system with id -  " + res.data.insertedId + "\n" +
                                            //     "type " + this.state.type)
                                            // loadPage(this.props, "admin", this.state.user,this.state.user)
                                            // loadPage(this.props,"",this.state,this.state.user)
                                        })
                                }}>Delete User
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                    </div>

                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button id='next' type='button'
                                className="contact100-back-btn"
                                onClick={() => {
                                    this.setState({page: page + 1})
                                }}>next
                            <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                    </div>
                </div>

            )
        else if (page == 1)
            return (
                <div>
                    <h1>מידע על בית האבות</h1>
                    <br/>
                    <div className="wrap-input100 validate-input" data-validate="Nursing Home is required" required>
                        <span className="label-input100">Nursing Home*</span>
                        <input value={this.state.nursingHome} id='nursingHome' className="input100" type="text"
                               name='nursingHome'
                               onChange={(e) => {
                                   this.setState({nursingHome: e.target.value})
                               }}
                               placeholder="Enter Nursing Home"/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Department is required">
                        <span className="label-input100">Department</span>
                        <input value={this.state.department} id='department' className="input100" type="text"
                               name='department'
                               onChange={(e) => {
                                   this.setState({department: e.target.value})
                               }}
                               placeholder="Enter Department"/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Medical profile is required">
                        <span className="label-input100">Medical profile</span>
                        <input value={this.state.medicalProfile} id='medicalProfile' className="input100" type="text"
                               name='Medical profile'
                               onChange={(e) => {
                                   this.setState({medicalProfile: e.target.value})
                               }}
                               placeholder="Enter Medical profile"/>
                        <span className="focus-input100"></span>
                    </div>


                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button id='next2' type='button' className="contact100-back-btn"
                                onClick={() => {
                                    this.setState({page: page + 1})
                                }}>next
                            <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                        <div className="contact100-back-bgbtn"></div>
                        <button id='back' type='button' className="contact100-back-btn"
                                onClick={() => {
                                    // console.log(this.state.roles?this.state.roles:[])
                                    this.setState({page: page - 1})
                                }}>back
                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )

        else
            return (
                <div>

                    <h1>מידע כללי</h1>
                    <br/>

                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Year of birth</span>
                        <div>
                            <Select label="select year"
                                    onChange={e => {
                                        // this.getDec(e.value)
                                        console.log(e.value)
                                        this.setState({birthYear: e.value})
                                    }}
                                    style={{zIndex: 100}}
                                    closeMenuOnSelect={true}
                                    defaultValue={{value: "1925", label: "1925"}}
                                    value={{value: this.state.birthYear, label: this.state.birthYear}}
                                    options={getOpt(1925)}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Country where you were born</span>
                        <div>
                            <Select label="select year"
                                    onChange={e => {
                                        this.setState({countryAtTwenty: e.value})
                                    }}
                                    defaultValue={{value: this.state.countryAtTwenty, label: this.state.countryAtTwenty}}
                                    style={{zIndex: 100}}
                                    closeMenuOnSelect={true}

                                    options={getCountriesList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />

                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Country where you lived at ages 10-25</span>
                        <div>

                            <Select label="select year"
                                    onChange={e => {
                                        this.setState({countryOrigin: e.value})
                                    }}
                                    style={{zIndex: 100}}
                                    closeMenuOnSelect={true}
                                    defaultValue={{value: this.state.countryOrigin, label: this.state.countryOrigin}}
                                    options={getCountriesList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Language spoken since birth</span>
                        <div>
                            <Select label="select year"
                                    onChange={e => {
                                        this.setState({languageOrigin: e.label})
                                    }}
                                    style={{zIndex: 100}}
                                    defaultValue={{value: this.state.languageOrigin, label: this.state.languageOrigin}}
                                    closeMenuOnSelect={true}
                                    options={getLanguageList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Languages spoken at Youth (ages 10-25)</span>
                        <div>

                            <Select label="select year"
                                    style={{zIndex: 100}}
                                    isMulti
                                    className="basic-multi-select"
                                    closeMenuOnSelect={true}
                                    defaultValue={
                                        ()=>{
                                            let data=[]
                                            let lan = getLanguageList()
                                            this.state.LanguageAtTwenty.forEach(i=> {
                                                let index = lan.findIndex(x => x.label === i)
                                                data.push(lan[index])

                                            })
                                            return data
                                        }
                                    }

                                    options={(this.state.LanguageAtTwenty && this.state.LanguageAtTwenty.length >= maxSelectLanguage) ?
                                        [] : getLanguageList()}//start, end-> today year

                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    onChange={(e) => {

                                        let languageAtTwenty = []
                                        for (let i = 0; i < e.length; i++)
                                            languageAtTwenty.push(e[i].label)
                                        this.setState({
                                            LanguageAtTwenty: languageAtTwenty
                                        })
                                    }}
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Year of immigration to Israel</span>
                        <div>
                            <Select label="select year"
                                    onChange={e => {
                                        this.setState({yearOfImmigration: e.label})
                                    }}
                                    defaultValue={{value: this.state.yearOfImmigration, label: this.state.yearOfImmigration}}
                                    style={{zIndex: 100}}
                                    closeMenuOnSelect={true}
                                    options={getOpt(1930)}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Genre 1</span>
                        <div>

                            <Select label="select year"
                                // onChange={e=>{}}
                                    style={{zIndex: 100}}
                                    isMulti
                                    className="basic-multi-select"
                                    closeMenuOnSelect={true}
                                    options={(this.state.Geners && this.state.Geners.length >= maxSelectGenere) ?
                                        [] : getGenre()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    defaultValue={()=>{
                                        let data=[]
                                        let genere = getGenre()
                                        this.state.Geners.forEach(i=> {
                                            let index = genere.findIndex(x => x.value === i)
                                            data.push(genere[index])
                                        })
                                        return data
                                    }}
                                    onChange={(e) => {
                                        let gener = []
                                        for (let i = 0; i < e.length; i++) {
                                            gener.push(e[i].value)
                                        }
                                        this.setState({Geners: gener})
                                    }}
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button hidden={this.state.type !== 'user'} id='submit' type='button'
                                className="contact100-back-btn"
                                onClick={async () => {
                                    let UserSessions = this.newElderPlaylist("61a8b86ca4e25312dbdce029")
                                }
                                }>
                            click me
                        </button>
                        <button hidden={this.state.type !== 'user'} id='submit' type='button'
                                className="contact100-back-btn"
                                onClick={async () => {
                                    // let user = this.newUser()
                                    //
                                    // let userId = await axios.post(url+"/admin/createUser", user)
                                    //
                                    console.log(this.state.OidInfo)
                                    console.log(this.state.Oid)
                                    let userData = this.newElderData(this.state.Oid)
                                    console.log(userData)
                                    let userInfoId = await axios.post(url+"/admin/updateUserInfo", [userData,this.state.OidInfo])

                                    //
                                    // let UserSessions = this.newElderPlaylist(this.state.Oid)
                                    //
                                    // let userPlaylistId = await axios.post(url+"/admin/createUserPlaylist", UserSessions)
                                    //
                                    //
                                    // alert("the user " + this.state.first_name + " add to system")
                                    // loadPage(this.props, "admin", this.state.user,this.state.user)

                                }}>submit
                            <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                        <div className="contact100-back-bgbtn"></div>
                        <button id='back' type='button' className="contact100-back-btn"
                                onClick={() => {
                                    // console.log(this.state.roles?this.state.roles:[])
                                    this.setState({page: page - 1})
                                }}>back
                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )

    }


    render() {

        return (
            <div className="container-contact100" style={{zIndex: -1}}>
                <div className="wrap-contact1100" style={{zIndex: 0}}>
                    <form className="contact100-form validate-form" style={{zIndex: -1}}>
				<span className="contact100-form-title" translate="yes" lang="he">
					User Edit
				</span>


                        <div>
                            {/*User name, First name, Last name, ID, Password*/}
                            <div style={{width: '100%'}} className="container-section-space">
                                <div className="container-section">
                                    <div hidden={this.state.page > 0} className="wrap-input100 validate-input"
                                         data-validate="Name is required">
                                        <div>

                                            <h1>
                                                Identification information for the {this.state.type} system
                                                <br/>
                                            </h1>
                                            <br/>
                                        </div>
                                        <span className="label-input100">type*</span>
                                        <Select label="select year"
                                                style={{zIndex: 100}}
                                                closeMenuOnSelect={true}
                                                defaultValue={''}
                                            // defaultValue={roles[3]}
                                                options={roles}//start, end-> today year
                                                onChange={async e => {
                                                    console.log(e.value)
                                                    var users = await this.getAllUsers(e.value)
                                                    console.log(users)
                                                    this.setState({type:e.value,users:users})
                                                }}
                                                menuPlacement="auto"
                                                menuPosition="fixed"
                                        />
                                    </div>


                                    <div hidden={this.state.page > 0 && (this.state.type === '' || this.state.users.length <= 0)}>
                                        <span className="label-input100">select user*</span>
                                        <Select label="select year"
                                                style={{zIndex: 100}}
                                                closeMenuOnSelect={true}
                                                defaultValue={''}
                                            // defaultValue={roles[3]}
                                                options={this.state.users}//start, end-> today year
                                                onChange={async e => {
                                                    console.log(e.value)
                                                    this.setUserAuth(e.value)
                                                    let info = await this.getUserById(e.value._id)
                                                    console.log(info.data)
                                                    this.setUserInfo(info.data)



                                                }}
                                                menuPlacement="auto"
                                                menuPosition="fixed"
                                        />
                                        <hr/>
                                    </div>
                                    <div hidden={!this.state.userSelect}>
                                        {this.registerUser(this.state.page)}
                                    </div>

                                    <div hidden={this.state.page > 0} className="wrap-contact100-back-btn">
                                        <div className="contact100-back-bgbtn"></div>
                                        <button id='back' type='button' className="contact100-back-btn"
                                                onClick={() => {
                                                    // console.log(this.state.roles?this.state.roles:[])
                                                    loadPage(this.props, "admin", this.state.user,this.state.user)
                                                }}>back
                                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
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

    async getUserById(oid) {
        console.log(oid)
        var res =await axios.get(url+"/admin/getUserById/"+oid)
        console.log(res.data)
        return res
    }

    async getAllUsers(type) {
        // console.log(type)

        var res = await axios.get(url+"/admin/getAllUserByType/" + type)
        let users = []
        res.data.forEach(user => {
            console.log(user)
            // { value: 'user', label: 'Elder' }
            users.push({value: user, label: user.first_name + " " + user.last_name},)
        })
        console.log(users)
        return users
        // loadPage(this.props,"",this.state,this.state.user)
    }

    setUserAuth(auth) {
        this.setState({userSelect:auth,
            first_name:auth.first_name ,
            last_name: auth.last_name,
            id: auth.id,
            email: auth.email,
            user_name: auth.user_name,
            type: auth.type,
        })
    }

    setUserInfo(user){
        this.setState({
            Oid:user.Oid,
            Geners: user.Geners,
            LanguageAtTwenty: user.LanguageAtTwenty,
            birthYear: user.birthYear,
            countryAtTwenty: user.countryAtTwenty,
            countryOrigin: user.countryOrigin,
            department: user.department,
            entrance: user.entrance,
            firstName: user.firstName,
            languageOrigin: user.languageOrigin,
            lastName: user.lastName,
            medicalProfile: user.medicalProfile,
            nursingHome: user.nursingHome,
            // password:"SpaEngYidCla30",
            userName: user.userName,
            yearAtTwenty: user.yearAtTwenty,
            yearOfImmigration: user.yearOfImmigration,
            OidInfo:user._id
        })
    }
}

var timeoutHandle = setTimeout( ()=> {} , 0);

function getOpt(start,end=(new Date().getFullYear())) {
    var options =[]
    for(var year = end ; year >=start; year--){
        options.push({ value: year, label: year },)
    }
    return options
}


function getLanguageList() {
    let selectLanguage=[]
    var languageNames  = DisplayNames(navigator.language.split('-')[0],'language');
    languages.map((language,index)=>{
        // console.log(country)
        if(languageNames.of(language[0])!==language[0])
        {
            selectLanguage.push( { value: language[0], label:languageNames.of(language[0])})
        }
    })
    return selectLanguage
}

function getCountriesList() {
    let selectCountries=[]
    const regionNames = DisplayNames(navigator.language.split('-')[0],'region');
    countries.map((country,index)=>{
        selectCountries.push( { value: country[1].name, label:regionNames.of(country[0])},)

    })
    return selectCountries
}
function DisplayNames(language,type) {
    // return new Intl.DisplayNames([language], { type: type });
    return new Intl.DisplayNames(['en'], { type: type });
}


function getGenre() {
    var options =[
        { value: 'cla', label: 'Classical/Traditional' },
        { value: 'yid', label: 'Yiddish' },
        { value: 'ara', label: 'Arabic' },
        { value: 'lad', label: 'Ladino' },
        { value: 'pra', label: 'Prayer Songs (Piyutim)' },
        { value: 'mid', label: 'Middle Eastern music' },

    ]

    return options
}
