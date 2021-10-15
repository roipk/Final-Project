import React, { Component } from 'react';
import {loadPage,verifyUser,url} from "./AllPages";
import axios from "axios";


export default class AdminPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user:props.location.data
        };
    }

    async componentDidMount() {
        let currentUser =await verifyUser("admin")
        if(currentUser) {
            this.setState({user: currentUser})
        }
        else
        {
            loadPage(this.props,"404")
        }
    }


    render() {
        return(
            <div>
                <div className="container-contact100">
                    <div className="wrap-contact1100">
                        <form className="contact100-form validate-form">
				<span className="contact100-form-title">
					Admin Screen - Hello {this.state.user?" "+this.state.user.first_name:""}
				</span>

                            <div className="container-section-space">
                                <div className="container-section">
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="user contact100-form-bgbtn"></div>
                                            <button type="button" id='createUser' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                <span>
                                    <i className="fa fa-blind fa-2x" aria-hidden="true" style={{padding_right: '10px'}}></i>
                                    Create User
                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="user contact100-form-bgbtn"></div>
                                            <button id='editUser' type='button' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                                <i className="fa fa-pencil fa-lg" aria-hidden="true"
                                                   style={{padding_right: '10px'}}></i>
                                                <span>
                                        Edit User
                                    </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="container-section-space">

                                <div className="container-section">
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="research contact100-form-bgbtn"></div>
                                            <button id='createGuide' type='button' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                <span>
                                    <i className="fa fa-users fa-lg fa-fw" aria-hidden="true"
                                       style={{padding_right: '10px'}}></i>
                                    Create Guide
                                </span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="research contact100-form-bgbtn"></div>
                                            <button id='createResearcher' type='button' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                <span>
                                    <i className="fa fa-users fa-lg fa-fw" aria-hidden="true"
                                       style={{padding_right: '10px'}}></i>
                                    Create Researcher
                                </span>
                                            </button>
                                        </div>
                                    </div>


                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="research contact100-form-bgbtn"></div>
                                            <button id='createResearchGroup' type='button'
                                                    className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                <span>
                                    <i className="fa fa-users fa-lg fa-fw" aria-hidden="true"
                                       style={{padding_right: '10px'}}></i>
                                    Create Research Group
                                </span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="container-section-space">
                                <div className="container-section">
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="admin contact100-form-bgbtn"></div>
                                            <button type="button" id='createPlaylist' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                    <span>
                                        <i className="fa fa-list-ol fa-lg fa-fw" aria-hidden="true"
                                           style={{padding_right: '10px'}}></i>
                                        Create Playlist
                                    </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="admin contact100-form-bgbtn"></div>
                                            <button type="button" id='editPlaylist' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                    <span>
                                        <i className="fa fa-list-ol fa-lg fa-fw" aria-hidden="true"
                                           style={{padding_right: '10px'}}></i>
                                        Edit Playlist
                                    </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="container-contact100-form-btn">
                                        <div className="wrap-contact100-form-btn">
                                            <div className="admin contact100-form-bgbtn"></div>
                                            <button type="button" id='addMedia' className="contact100-form-btn"
                                                    onClick={()=>{
                                                        loadPage(this.props,"register",this.state)
                                                    }}>
                                    <span>
                                        <i className="fa fa-music fa-lg fa-fw" aria-hidden="true"
                                           style={{padding_right: '10px'}}></i>
                                        Add Media
                                    </span>
                                            </button>
                                        </div>
                                    </div>
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
            </div>

        );
    }
}
