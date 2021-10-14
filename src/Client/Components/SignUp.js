import React, { Component } from 'react';
import axios from "axios";
import {loadPage} from "./AllPages";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'guide', label: 'Guide' },
    { value: 'user', label: 'User' }
]

export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            firstName:'',
            lastName:'',
            password:'',
            type:'user',
            permissions:[],
        };

    }


    render() {
        return(
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
                                        console.log(role)
                                        if(role.value!==e.value)
                                            newRole.push(role)
                                    })
                                    this.setState({type:e.value,permissions:newRole})
                                    console.log(e.value)
                                    console.log(newRole)

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
                                            console.log(this.state.firstName)
                                            const user = {
                                                first_name:this.state.firstName,
                                                last_name:this.state.lastName,
                                                password:this.state.password,
                                                type:this.state.type,
                                                permissions:this.state.roles?this.state.roles:[]
                                            }
                                            axios.post("http://localhost:5000/users/register",user)
                                                .then(res=>{console.log(res.data)
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
        );
    }
}
