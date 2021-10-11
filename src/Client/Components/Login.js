import React, { Component } from 'react';
import {loadPage} from "./AllPages";
import axios from "axios";
export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };
    }

    render() {
        return(
            <div className="container-contact100">
                <div className="wrap-contact1100">
                    <form className="contact100-form validate-form">
				<span className="contact100-form-title">
					User Log In
				</span>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                            <span className="label-input100">User name</span>
                            <input id='userName' className="input100" type="text" name='userName'
                                   placeholder="Enter User name"/>
                                <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input id='password' className="input100" type="password" name="password"
                                   placeholder="Enter Password"/>
                                <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                                <div className="contact100-form-bgbtn"></div>
                                <button type="button" id='login' className="contact100-form-btn"
                                        onClick={()=>{
                                            console.log(this.state.userName)
                                            const user = {
                                                userName:this.state.userName,
                                            }
                                            axios.post("http://localhost:5000/users/add",user)
                                                .then(res=>{console.log(res.data)
                                            loadPage(this.props,"",this.state)
                                                })
                                        }}>
                                >
							<span>
								Log In
								<i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
							</span>
                                </button>
                            </div>
                        </div>

                        <div className="container-contact100-back-btn">
                            <div className="wrap-contact100-back-btn">
                                <div className="contact100-back-bgbtn"></div>
                                <button id='main' type='button' className="contact100-back-btn"
                                        onClick={()=>{
                                        loadPage(this.props,"",this.state)
                                        }}>
                                    <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

    );
    }
}
