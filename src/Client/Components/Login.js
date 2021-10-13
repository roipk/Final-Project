import React, { Component } from 'react';
import {loadPage} from "./AllPages";
import axios from "axios";
export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
            password:'',
        };
        var userData = {}
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
                            <span className="label-input100">First name</span>
                            <input id='userName' className="input100" type="text" name='firstName'
                                   placeholder="Enter First Name" onChange={(e)=>{this.setState({first_name:e.target.value})}}/>
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input id='password' className="input100" type="password" name="password"
                                   placeholder="Enter Password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                            <span className="focus-input100"></span>
                        </div>


                        <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                                <div className="contact100-form-bgbtn"></div>
                                <button type="button" id='login' className="contact100-form-btn"
                                        onClick={()=>{
                                            console.log(this.state.first_name)
                                            if(!(this.state.first_name || this.state.password))
                                            {
                                                this.userData = JSON.parse(localStorage.getItem('user'));
                                                console.log(this.userData)
                                                axios.post("http://localhost:5000/users/login",this.userData)
                                                    .then(res=>{
                                                        this.userData = res.data
                                                        localStorage.setItem("user", JSON.stringify(res.data));

                                                        console.log(res.data)
                                                        // loadPage(this.props,"",this.state)
                                                    })


                                            }
                                            else{
                                            const user = {
                                                first_name:this.state.first_name,
                                                password:this.state.password,
                                            }
                                            axios.post("http://localhost:5000/users/login",user)
                                                .then(res=>{
                                                    this.userData = res.data
                                                    localStorage.setItem("user", JSON.stringify(res.data));
                                                    console.log(this.userData)
                                            // loadPage(this.props,"",this.state)
                                                })
                                        }}}>
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
