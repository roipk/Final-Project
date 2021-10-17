import React, { Component } from 'react';
import {loadPage, verifyUser} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";


var user;
export default class GuidePage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:props.location.data,
            loadData:false,
            notfound:false
        };

    }
    async componentDidMount() {
        let currentUser =await verifyUser("guide")
        if(currentUser) {
            this.setState({user: currentUser})
        }
        else {
            this.setState({notfound: true})
        }
    }



render() {
        return (
          <div>
              {
                  this.state.notfound ? <NotFound/> :
                      <div className="container-contact100">
                  <div className="wrap-contact1100-mobile">
                      <form className="contact100-form validate-form">
				<span className="contact100-form-title-mobile" id="guideTitle">
					Guide main Screen - Hello {this.state.user ? " " + this.state.user.first_name : ""}
				</span>

                          <div id="mainDiv">
                              <div className="container-section">
                                  <div className="container-contact100-form-btn">
                                      <div className="wrap-contact100-form-btn">
                                          <div className="user contact100-form-bgbtn"></div>
                                          <div id='patientHeader' className="contact100-form-btn">
                                              <i className="fa fa-blind fa-2x" aria-hidden="true"
                                                 style={{padding_right: '10px'}}></i>
                                              Patient
                                          </div>
                                      </div>
                                  </div>


                                  <div className="wrap-input100 validate-input"
                                       data-validate="Name is required">
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
                                          <button id='enterSession' type='button'
                                                  className="contact100-form-btn">
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
                          <button id='main' type='button' className="contact100-back-btn" onClick={() => {
                              loadPage(this.props, "register", this.state)
                          }}>
                              <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                          </button>
                      </div>
                  </div>
              </div>
              }</div>
        );
    }
}
