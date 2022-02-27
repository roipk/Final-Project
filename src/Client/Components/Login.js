import React, { Component } from 'react';
import {url} from "./AllPages";
import {getServer, loadPage} from "./ManagerComponents";
import axios from "axios";


var user,token;
export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
            password:'',
        };
        // user = props.location
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
         token = localStorage.getItem("token");
    }

    async componentDidMount() {

      if(token)
      {
          try {
              user = await axios.get(url+"/login", {headers: {"x-access-token": token}})
              if (user&&user.data.token) {
                  localStorage.setItem("token", user.data.token)
              }
              else {
                  localStorage.removeItem("token")
                  console.log(user.data.massage)
              }
          }
          catch (e){
              console.log("need new token")
          }
      }
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
                                   placeholder="Enter First Name"
                                   value={this.state.first_name}
                                   onChange={(e)=>{this.setState({first_name:e.target.value})}}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input id='password' className="input100" type="password" name="password"  autoComplete="off"
                                   value={this.state.password}
                                   placeholder="Enter Password"
                                   onChange={(e)=>{this.setState({password:e.target.value})}}
                            />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                                <div className="contact100-form-bgbtn"></div>
                                <button type="button" id='login' className="contact100-form-btn"
                                        onClick={()=>{
                                            // console.log(this.state.first_name)
                                            if(!(this.state.first_name || this.state.password))
                                            {
                                                alert("first name and password required")
                                            }
                                            else{
                                                let page =url+'/login'
                                                let config = {headers:{
                                                        first_name:this.state.first_name,
                                                        password:this.state.password,
                                                    }}

                                                getServer(page,config).then(res=>{
                                                    console.log(res)
                                                    localStorage.setItem("token",res.data.token)
                                                    loadPage(this.props,`${res.data.user.type}`,res.data.user)
                                                }).catch(e=> {
                                                    console.log(e)
                                                    alert("user name or password not correct")
                                                })




                                            // let user = {
                                            //     first_name:this.state.first_name,
                                            //     password:this.state.password,
                                            // }
                                            //
                                            // axios.post('http://localhost:5000/login', {
                                            //     first_name: this.state.first_name,
                                            //     password: this.state.password,
                                            //     // Authorization: 'Bearer ' + token //the token is a variable which holds the token
                                            // }).then(res=>{
                                            //     // console.log(res.data.user)
                                            //     user = res.data.user
                                            //     localStorage.setItem("user",JSON.stringify(user))
                                            //     loadPage(this.props,`${user.type}/${user._id}`)
                                            // }).catch(e=>{
                                            //     console.log("Error "+e)
                                            // })
                                        }
                                        }}>

							<span>
								Log In
								<i className="fa fa-sign-in m-l-7" aria-hidden="true"></i>
							</span>
                                </button>
                            </div>
                        </div>

                        {/*<div className="container-contact100-back-btn">*/}
                        {/*    <div className="wrap-contact100-back-btn">*/}
                        {/*        <div className="contact100-back-bgbtn"></div>*/}
                        {/*        <button id='main' type='button' className="contact100-back-btn"*/}
                        {/*                onClick={()=>{*/}
                        {/*                loadPage(this.props,"",this.state)*/}
                        {/*                }}>*/}
                        {/*            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </form>
                </div>

            </div>

    );
    }
}
