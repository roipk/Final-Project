import React, {Component, useState} from 'react';
import axios from "axios";
import {loadPage, verifyUser} from "./ManagerComponents";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreateAdmin from "./Registers/admin";
import CreateResearcher from "./Registers/resarcher";
import CreateUser from "./Registers/oldMan";
import Allcountries, {languagesAll} from "countries-list"
import Carousel from "react-elastic-carousel";
// import {iso6393} from 'iso-639-3'

const animatedComponents = makeAnimated();

const countries = Object.entries(Allcountries.countries);
const languages = Object.entries(languagesAll);



const roles = [
    // { value: '', label: 'Admin' },
    { value: 'admin', label: 'Create Admin' },
    { value: 'researcher', label: 'Create Researcher' },
    { value: 'musicGuide', label: 'Create Music Guide' },
    { value: 'guide', label: 'Create Guide' },
    { value: 'user', label: 'Create User' }
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




var timeoutHandle = setTimeout( ()=> {} , 0);
export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:props.location.data,
            language:null,
            page:0,
            genere:null,

            //user
            first_name:'',
            last_name:'',
            id:'',
            email:'',
            user_name:'',
            password:'',
            type:'',


            //elder
            Genre1Select: "",
            Genre2Select: "",
            birthYear: "",
            countryAtTwenty: "",
            countryOrigin: "",
            department:"",
            entrance: 0,
            firstLangAtTwenty: "",
            firstName:"",
            group:"ARspa1959",
            languageOrigin: "spa",
            lastName: "SpaEngYidCla30",
            medicalProfile:"",
            nursingHome: "",
            // password:"SpaEngYidCla30",
            secondLangAtTwenty: "eng",
            userName:"SpaEngYidCla30",
            yearAtTwenty : "1959",
            yearOfImmigration:"",


        };
    }


    newUser()
    {
        let user={
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            id:this.state.id,
            email:this.state.email,
            user_name:this.state.user_name,
            password:this.state.password,
            type:this.state.type,
        }
        return user
    }

    newElderData()
    {

        let elderData= {
            Genre1Select:this.state.Genre1Select,
            Genre2Select:this.state.Genre2Select,
            birthYear: this.state.birthYear,
            countryAtTwenty: this.state.countryAtTwenty,
            countryOrigin: this.state.countryOrigin,
            department: this.state.department,
            entrance: 0,
            firstLangAtTwenty:this.state.firstLangAtTwenty,
            first_name: this.state.first_name,
            group: "ARspa1959",
            languageOrigin: "spa",
            last_name: "SpaEngYidCla30",
            medicalProfile: "",
            nursingHome: "",
            password: "SpaEngYidCla30",
            secondLangAtTwenty: "eng",
            userName: "SpaEngYidCla30",
            yearAtTwenty: "1959",
            yearOfImmigration: "",
        }
        return elderData
    }

    async componentDidMount() {

        let currentUser = await verifyUser("admin")
        if (currentUser)
            this.setState({user: currentUser})

    }

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

    registerUser(page)
    {

        if(page==0)
        return(
            <div>
                <h1>פרטי הזדהות עבור המערכת</h1>
                <br/>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">First name*</span>
                    <input value={this.state.first_name} id='firstName' className="input100" type="text" name='firstName'
                           onChange={ (e)=>{
                               this.setState({first_name:e.target.value})

                           }}
                           placeholder="Enter First Name" required/>
                    <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Last name*</span>
                    <input value={this.state.last_name} id='lastName' className="input100" type="text" name='lastName'
                           onChange={ (e)=>{
                               this.setState({last_name:e.target.value})
                           }}
                           placeholder="Enter Last Name" required/>
                    <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="ID is required">
                    <span className="label-input100">ID*</span>
                    <input value={this.state.id} id='id' className="input100" type="text" name="id"
                           onChange={ (e)=>{
                               this.setState({id: e.target.value})
                           }}
                           placeholder="Enter ID" required/>

                    <span className="focus-input100"></span>
                </div>
                <div hidden={this.state.type!='admin' && this.state.type!='researcher'} className="wrap-input100 validate-input" data-validate="Email is required">
                    <span className="label-input100">Email*</span>
                    <input value={this.state.email} id='email' className="input100" type="text" name="email"
                           onChange={ (e)=>{
                               this.setState({email : e.target.value})
                    }} placeholder="Enter Email" required/>
                    <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">

                    <span className="label-input100">User name*</span>

                    <input value={this.state.user_name} id='userName' className="input100" type="text" name='userName'
                           onChange={ (e)=>{
                               this.setState({user_name : e.target.value})
                           }}
                           placeholder="Enter User Name" required/>
                    <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="ID is required">
                    <span className="label-input100">Password*</span>
                    <input value={this.state.password} id='password' className="input100" type="password" name="password"
                           onChange={ (e)=>{
                               this.setState({password : e.target.value})
                           }}
                           placeholder="Enter Password" required/>
                    <span className="focus-input100"></span>
                </div>

                <div className="wrap-contact100-back-btn">
                    <div className="contact100-back-bgbtn"></div>
                    <button hidden={this.state.type==='user'} id='submit' type='button' className="contact100-back-btn"
                            onClick={()=>{
                                let user = this.newUser()
                            axios.post("http://localhost:5000/admin/createUser",user)
                                .then(res=>{
                                    console.log("add")
                                    console.log(res.data)
                                    // loadPage(this.props,"",this.state)
                                })
                            }}>submit
                        <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                        {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                    </button>
                    <button hidden={this.state.type!=='user'} id='next' type='button' className="contact100-back-btn"
                            onClick={()=>{
                                this.setState({page:page+1})
                            }}>next
                        <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                        {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                    </button>
                </div>
            </div>

        )
        else if(page==1)
            return(
                <div>
                    <h1>מידע על בית האבות</h1>
                    <br/>
                    <div className="wrap-input100 validate-input" data-validate="Nursing Home is required" required>
                        <span className="label-input100">Nursing Home*</span>
                        <input value={this.state.nursingHome} id='nursingHome' className="input100" type="text" name='nursingHome'
                               onChange={(e)=>{
                                   this.setState({nursingHome : e.target.value})
                               }}
                               placeholder="Enter Nursing Home"/>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input" data-validate="Department is required">
                            <span className="label-input100">Department</span>
                            <input value={this.state.department}  id='department' className="input100" type="text" name='department'
                                   onChange={(e)=>{
                                       this.setState({department : e.target.value})
                                   }}
                                   placeholder="Enter Department"/>
                            <span className="focus-input100"></span>
                        </div>
                    <div className="wrap-input100 validate-input" data-validate="Medical profile is required">
                            <span className="label-input100">Medical profile</span>
                            <input value={this.state.medicalProfile}  id='medicalProfile' className="input100" type="text" name='Medical profile'
                                   onChange={(e)=>{
                                       this.setState({medicalProfile : e.target.value})
                                   }}
                                   placeholder="Enter Medical profile"/>
                            <span className="focus-input100"></span>
                        </div>


                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button id='next2' type='button' className="contact100-back-btn"
                                onClick={()=>{
                                    this.setState({page:page+1})
                                }}>next
                            <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                        <div className="contact100-back-bgbtn"></div>
                        <button id='back' type='button' className="contact100-back-btn"
                                onClick={()=>{
                                    // console.log(this.state.roles?this.state.roles:[])
                                    this.setState({page:page-1})
                                }}>back
                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )

        else
            return(
                <div>

                    <h1>מידע כללי</h1>
                    <br/>

                    <div className="wrap-input100 input100-select">
                            <span className="label-input100">Year of birth</span>
                            <div>
                                <Select label="select year"
                                        onChange={e=>{
                                            console.log(e.value)
                                            this.setState({year:e.value})
                                        }}
                                        style={{zIndex:100}}
                                        closeMenuOnSelect={true}
                                        // defaultValue={{value:1949,label:1949}}
                                        value={{value:this.state.year,label:this.state.year}}
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
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
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
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
                                    closeMenuOnSelect={true}
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
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
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
                                    style={{zIndex:100}}
                                    isMulti
                                    className="basic-multi-select"
                                    closeMenuOnSelect={true}
                                    options={(this.state.language &&this.state.language.length >= maxSelectLanguage) ?
                                        this.state.language : getLanguageList()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    onChange={(e)=>{
                                        this.setState({language:e})
                                    }}
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 input100-select">
                        <span className="label-input100">Year of immigration to Israel</span>
                        <div>
                            <Select label="select year"
                                    onChange={e=>{}}
                                    style={{zIndex:100}}
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
                                    style={{zIndex:100}}
                                    isMulti
                                    className="basic-multi-select"
                                    closeMenuOnSelect={true}
                                    options={(this.state.genere && this.state.genere.length >= maxSelectGenere) ?
                                        this.state.genere : getGenre()}//start, end-> today year
                                    menuPlacement="auto"
                                    menuPosition="fixed"
                                    onChange={(e)=>{
                                        // console.log(e)
                                        this.setState({genere:e})
                                    }}
                            />
                        </div>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-contact100-back-btn">
                        <div className="contact100-back-bgbtn"></div>
                        <button hidden={this.state.type!=='user'} id='submit' type='button' className="contact100-back-btn"
                                onClick={()=>{
                                    let user = this.newUser()
                                    axios.post("http://localhost:5000/admin/createUser",user)
                                        .then(res=>{
                                            console.log("add")
                                            console.log(res.data)
                                            // loadPage(this.props,"",this.state)
                                        })
                                }}>submit
                            <i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>
                            {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                        </button>
                        <div className="contact100-back-bgbtn"></div>
                        <button id='back' type='button' className="contact100-back-btn"
                                onClick={()=>{
                                    // console.log(this.state.roles?this.state.roles:[])
                                    this.setState({page:page-1})
                                }}>back
                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            )

    }


    render() {

        return(
            <div className="container-contact100" style={{zIndex:-1}}>
                <div className="wrap-contact1100" style={{zIndex:0}}>
                    <form className="contact100-form validate-form" style={{zIndex:-1}}>
				<span className="contact100-form-title" translate="yes" lang="he">
					User Register
				</span>


                        <div>
                                {/*User name, First name, Last name, ID, Password*/}
                                <div style={{width:'100%'}} className="container-section-space">
                                    <div className="container-section">
                                        <div hidden={this.state.page>0} className="wrap-input100 validate-input" data-validate="Name is required">
                                        <div>

                                            <h1>
                                                Identification information for the {this.state.type} system
                                                <br/>
                                            </h1>
                                            <br/>
                                        </div>
                                            <span className="label-input100">type*</span>
                                            <Select label="select year"
                                                    style={{zIndex:100}}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={''}
                                                    // defaultValue={roles[3]}
                                                    options={roles}//start, end-> today year
                                                    onChange={e=>{
                                                        console.log(e.value)
                                                        this.setState({type:e.value})
                                                    }}
                                                    menuPlacement="auto"
                                                    menuPosition="fixed"
                                            />
                                        </div>
                                        <div hidden={this.state.type===''}>
                                            {this.registerUser(this.state.page)}
                                        </div>

                                        <div hidden={this.state.page>0} className="wrap-contact100-back-btn">
                                            <div className="contact100-back-bgbtn"></div>
                                            <button id='back' type='button' className="contact100-back-btn"
                                                    onClick={()=>{
                                                        // console.log(this.state.roles?this.state.roles:[])
                                                        loadPage(this.props,"admin",this.state.user)
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
}

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
    return new Intl.DisplayNames([language], { type: type });
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
