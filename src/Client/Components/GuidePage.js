import React, { Component } from 'react';
import {loadPage} from "./AllPages";
import axios from "axios";


var user;
export default class GuidePage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
        };
        user = props.location
    }

    async componentDidMount() {
        var href =  window.location.href.split("/",5)
        // console.log("in")
        user = JSON.parse(localStorage.getItem("user"));

        // console.log(user)
        if(!user)
            return;
        // console.log(user)
        user =  (await axios.post("http://localhost:5000/login",{user:user})).data.user
        // console.log(user)
        if(!user)
        {
            // return loadPage(this.props,`${user.data.item.type}/${user.data.item._id}`)
            return loadPage(this.props,"")
        }
        else if(href[4] !==  user._id || href[3] !== user.type)
        {
            return loadPage(this.props,"404")
        }
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({first_name:user.first_name})
        // console.log(this.state.first_name)
    }


    render() {
        return(
            <div>
                <div className="container-contact100">
                    <div className="wrap-contact1100-mobile">
                        <form className="contact100-form validate-form">
				<span className="contact100-form-title-mobile" id="guideTitle">
					Guide main Screen
				</span>

                            <div id="mainDiv">
                                <div className="container-section">
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="user contact100-form-bgbtn"></div>
                                            <div id='patientHeader' className="contact100-form-btn">
                                                <i className="fa fa-blind fa-2x" aria-hidden="true" style={{padding_right: '10px'}}></i>
                                                Patient
                                            </div>
                                        </div>
                                    </div>


                                    <div className="wrap-input100 validate-input" data-validate="Name is required">
                                        <span className="label-input100">Choose the patients</span>
                                    {/*    <select input id ='patientsIds' className="input100" type="text" name='patientsIds' placeholder="Select the patients Name" size=3>*/}
                                    {/*    <!-- <option value="" disabled selected>Select a patient</option>*/}
                                    {/*</select>*/}
                                    {/*            <input id ='patientsIds' className="input100" type="text" name="patientsIds" placeholder="Enter patients Name">-->*/}
                                    <span className="focus-input100"></span>
                                </div>


                                <div className="wrap-contact100-form-btn">
                                    <div className="research contact100-form-bgbtn"></div>
                                    <div id='selectSession' className="contact100-form-btn">
                            <span>
                                Select a Session
                            </span>
                                    </div>
                                </div>

                                {/*<div className="wrap-input100 validate-input">*/}
                                {/*    <br>*/}
                                {/*    /!*    <select input id='sessionsList' className="input100" type="text" name='sessionsList' size=4>*!/*/}
                                {/*    /!*</select>*!/*/}
                                {/*    <span className="focus-input100"></span>*/}
                                {/*</div>*/}


                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="contact100-form-bgbtn"></div>
                                            <button id='enterSession' type='button' className="contact100-form-btn">
                        <span>
                        <i className="fa fa-users fa-lg fa-fw" aria-hidden="true"></i>
                            Enter Session
                        </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div id="selectedSession">

                    </div>


                    <div className="container-contact100-back-btn">
                        <div className="wrap-contact100-back-btn">
                            <div className="contact100-back-bgbtn"></div>
                            <button id='main' type='button' className="contact100-back-btn"  onClick={()=>{
                                loadPage(this.props,"register",this.state)
                            }}>
                                <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
            </div>
            </div>



        );
    }
}
