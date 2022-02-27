import React, { Component } from 'react';
import {loadPage} from "./ManagerComponents";
import axios from "axios";
import {url} from "./AllPages";
// import { MongoClient } from 'mongodb'
// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const dbName = 'mb';

export default class LoginAdminPage extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {

    }



    // async main() {
    //     // Use connect method to connect to the server
    //     await client.connect();
    //     console.log('Connected successfully to server');
    //     const db = client.db(dbName);
    //     const collection = db.collection('researchers');
    //
    //     // the following code examples can be pasted here...
    //
    //     console.log("connected")
    //     console.log(collection)
    // }


    render() {
        return(


            <div className="container-contact100">
                <div className="wrap-contact1100">
                    <form className="contact100-form validate-form">
				<span className="contact100-form-title">
					Admin Login
				</span>

                        <div className="wrap-input100 validate-input" data-validate="Name is required">
                            <span className="label-input100">Admin Id</span>
                            <input id='id' className="input100" type="text" name='id' placeholder="Enter id"
                                   onBlur={(e)=>{
                                       this.setState({userName:e.target.value})
                                        // console.log(e.target.value)
                                   }}/>

                                <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <span className="label-input100">Password</span>
                            <input id='password' className="input100" type="password" name="password"
                                   placeholder="Enter Password"
                                   onChange={(e)=>{
                                       this.setState({password:e.target.value})
                                       // console.log(e.target.value)
                                   }}
                                       />
                                <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                                <div className="contact100-form-bgbtn"></div>
                                <button id='login' type='button'
                                        className="contact100-form-btn" onClick={async ()=>{
                                     if( !this.state.password || !this.state.userName)
                                     {
                                         alert("password or user name empty or not correct")
                                         return
                                     }
                                    // var researcherData = {
                                    //     researcherId: this.state.userName,
                                    //     researcherPassword: this.state.password,
                                    // };


                                        // console.log(this.state.userName)
                                        const user = {
                                            userName:this.state.userName,
                                            password:this.state.password,
                                            // test:"123"
                                        }

                                        axios.post(url+"/users/add",user)
                                            .then(res=>{
                                                // console.log(res.data)
                                                // loadPage(this.props,"",this.state)
                                            }).catch(err => {});



                                    // loadPage(this.props,"",this.state)
                                }}>
                                    <span>
                            Login
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
