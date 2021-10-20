import React, { Component } from 'react';
import axios from "axios";
import {loadPage} from "./ManagerComponents";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CreateAdmin from "./Registers/admin";
import CreateResearcher from "./Registers/resarcher";
import CreateUser from "./Registers/oldMan";
import Allcountries, {languagesAll} from "countries-list"
// import {iso6393} from 'iso-639-3'

const animatedComponents = makeAnimated();



const roles = [
    // { value: '', label: 'Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'guide', label: 'Guide' },
    { value: 'user', label: 'User' }
]


const countries = Object.entries(Allcountries.countries);
const languages = Object.entries(languagesAll);


var selectCountries = []
var selectLanguage = []
var selectLanguageSystem = []

var locationLang=20//English





export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            password:'',
            type:'user',
            permissions:[],
            language:'US'
        };



        const regionNames =this.getLan(navigator.language.split('-')[0],'region');
        var languageNames  = this.getLan(navigator.language.split('-')[0],'language');
        // console.log(languages)

        let count=0;
        languages.map((language,index)=>{
            // console.log(country)
            if(languageNames.of(language[0])!==language[0])
            {

                if(language[0]===navigator.language.split('-')[0])//find windows language
                    locationLang = count
                selectLanguage.push( { value: language[0], label:languageNames.of(language[0])})
                selectLanguageSystem.push( { value: language[0], label:language[1].native})
                count++;
            }
        })

        countries.map((country,index)=>{
            selectCountries.push( { value: country[1].name, label:regionNames.of(country[0])},)
        })

    }

    // type: 'language' || 'currency' || 'script'   - more details: https://v8.dev/features/intl-displaynames
    getLan(language,type)
    {
        return new Intl.DisplayNames([language], { type: type });
    }

    render() {
        return(
            <div className="container-contact100" style={{zIndex:-1}}>
                <div className="wrap-contact1100" style={{zIndex:0}}>
                    <form className="contact100-form validate-form" style={{zIndex:-1}}>
				<span className="contact100-form-title" translate="yes" lang="he">
					User Register
				</span>





                        {/*<h6> Language system &nbsp;</h6>*/}
                        {/*<Select*/}
                        {/*    style={{zIndex:100,width: '50px'}}*/}
                        {/*    closeMenuOnSelect={true}*/}
                        {/*    defaultValue={selectLanguageSystem[locationLang]}*/}
                        {/*    components={animatedComponents}*/}
                        {/*    options={selectLanguageSystem}*/}
                        {/*    menuPlacement="auto"*/}
                        {/*    menuPosition="fixed"*/}
                        {/*    onChange={async (e)=>{*/}
                        {/*        let lan = this.getLan(e.value,'language')*/}
                        {/*        selectLanguage=[]*/}
                        {/*        languages.map((language,index)=> {*/}

                        {/*            if (lan.of(language[0]) !== language[0]) {*/}
                        {/*                selectLanguage.push({value: language[0], label: lan.of(language[0])},)*/}
                        {/*                // selectLanguage.push({value: language.iso6393, label: language.name},)*/}
                        {/*            }*/}
                        {/*        })*/}
                        {/*        let countryLan = this.getLan(e.value,'region')*/}
                        {/*        selectCountries=[]*/}
                        {/*        await countries.map((country,index)=> {*/}
                        {/*            if (countryLan.of(country[0]) !== country[0]) {*/}
                        {/*                selectCountries.push({value: country[0], label: countryLan.of(country[0])},)*/}

                        {/*            }*/}
                        {/*        })*/}

                        {/*        this.setState({language:e.value,co:"",lan:""})*/}
                        {/*        console.log("done")*/}
                        {/*        // // this.setState({language:e.value})*/}
                        {/*    }}*/}

                        {/*/>*/}
                        {/*<br/>*/}
                        {/*<h6> Language &nbsp;</h6>*/}
                        {/*<Select*/}
                        {/*    value={this.state.lan}*/}
                        {/*    style={{zIndex:100,width: '50px'}}*/}
                        {/*    closeMenuOnSelect={true}*/}
                        {/*    // defaultValue={selectLanguage[13]}*/}
                        {/*    components={animatedComponents}*/}
                        {/*    options={selectLanguage}*/}
                        {/*    isMulti*/}
                        {/*    className="basic-multi-select"*/}
                        {/*    menuPlacement="auto"*/}
                        {/*    menuPosition="fixed"*/}
                        {/*    onChange={e=>{*/}
                        {/*        this.setState({lan:e})*/}
                        {/*    }}*/}

                        {/*/>*/}
                        {/*<br/>*/}
                        {/*<h6> Country &nbsp;</h6>*/}
                        {/*<Select*/}
                        {/*    value={this.state.co}*/}
                        {/*    style={{zIndex:100,width: '50px'}}*/}
                        {/*    closeMenuOnSelect={true}*/}
                        {/*    // defaultValue={selectCountries[232]}*/}
                        {/*    components={animatedComponents}*/}
                        {/*    options={selectCountries}*/}
                        {/*    menuPlacement="auto"*/}
                        {/*    menuPosition="fixed"*/}
                        {/*    isMulti*/}
                        {/*    className="basic-multi-select"*/}
                        {/*    onChange={e=>{*/}
                        {/*        this.setState({co:e})*/}
                        {/*    }}*/}

                        {/*/>*/}
                        {/*<br/>*/}

                        {/*<h6> role &nbsp;</h6>*/}
                        {/*<Select*/}
                        {/*    onChange={e=>{*/}
                        {/*        var newRole=[]*/}
                        {/*        roles.forEach(role=>{*/}
                        {/*            // console.log(role)*/}
                        {/*            if(role.value!==e.value)*/}
                        {/*                newRole.push(role)*/}
                        {/*        })*/}
                        {/*        this.setState({type:e.value,permissions:newRole})*/}
                        {/*        // console.log(e.value)*/}
                        {/*        // console.log(newRole)*/}

                        {/*    }}*/}
                        {/*    style={{zIndex:100}}*/}
                        {/*    closeMenuOnSelect={true}*/}
                        {/*    // defaultValue={roles[3]}*/}
                        {/*    components={animatedComponents}*/}
                        {/*    options={roles}*/}
                        {/*    menuPlacement="auto"*/}
                        {/*    menuPosition="fixed"*/}
                        {/*/>*/}
                        {/*<br/>*/}

                        {
                            this.state.type==="admin"? <CreateAdmin/>:
                            this.state.type==="researcher"?<CreateResearcher/>:
                            this.state.type==="guide"?<CreateResearcher/>:
                            this.state.type==="user"?<CreateUser/>:<div></div>
                        }
                    </form>
                </div>
            </div>


        );
    }
}



/*

  <div className="container-contact100">
                <div className="wrap-contact1100">
                    <form className="contact100-form validate-form">
				<span className="contact100-form-title">
					User Register
				</span>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                            <span className="label-input100">First Name</span>
                            <input id='firstName' className="input100" type="text" name='firstName'
                                   placeholder="Enter First Name" onChange={(e)=>{this.setState({firstName:e.target.value})}}/>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                            <span className="label-input100">Last Name</span>
                            <input id='lastName' className="input100" type="text" name='lastName'
                                   placeholder="Enter Last Name" onChange={(e)=>{this.setState({lastName:e.target.value})}}/>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input id='password' className="input100" type="password" name="password"
                                   placeholder="Enter Password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                            <span className="focus-input100"></span>
                        </div>

                        <h6> role &nbsp;</h6>
                        <Select
                                onChange={e=>{
                                    var newRole=[]
                                    roles.forEach(role=>{
                                        // console.log(role)
                                        if(role.value!==e.value)
                                            newRole.push(role)
                                    })
                                    this.setState({type:e.value,permissions:newRole})
                                    // console.log(e.value)
                                    // console.log(newRole)

                                }}
                                style={{zIndex:10}}
                                closeMenuOnSelect={true}
                                defaultValue={roles[3]}
                                components={animatedComponents}
                                options={roles}

                        />
                        <br/>
                        <div hidden={this.state.permissions.length<=0 ||this.state.type === "user"||this.state.type === "guide"}>
                        <h6> i want permission to &nbsp;</h6>
                        <Select style={{zIndex:10}}
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={this.state.permissions}
                                onChange={e=>{
                                    var newRole=[]
                                    e.forEach(role=>{
                                        newRole.push(role.value)
                                    })
                                    this.setState({roles:newRole})

                                }}
                        />
                        <br/>
                        </div>


                        <div className="container-contact100-form-btn" >
                            <div className="wrap-contact100-form-btn" style={{zIndex:0}}>
                                <div className="contact100-form-bgbtn"></div>
                                <button type="button" id='signup' className="contact100-form-btn"
                                        onClick={()=>{
                                            if(!(this.state.firstName||this.state.lastName||this.state.password))
                                                return alert("Fill in all required fields")
                                            // console.log(this.state.firstName)
                                            const user = {
                                                first_name:this.state.firstName,
                                                last_name:this.state.lastName,
                                                password:this.state.password,
                                                type:this.state.type,
                                                permissions:this.state.roles?this.state.roles:[]
                                            }
                                            axios.post("http://localhost:5000/users/register",user)
                                                .then(res=>{
                                                    // console.log(res.data)
                                                    loadPage(this.props,"",this.state)
                                                })
                                        }}>

                                    <span>
								Register
								<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
							</span>
                                </button>
                            </div>
                        </div>

                        <div className="container-contact100-back-btn">
                            <div className="wrap-contact100-back-btn" style={{zIndex:0}}>
                                <div className="contact100-back-bgbtn"></div>
                                <button id='main' type='button' className="contact100-back-btn"
                                        onClick={()=>{
                                            // console.log(this.state.roles?this.state.roles:[])
                                            loadPage(this.props,"",this.state)
                                        }}>
                                    <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>


             */

