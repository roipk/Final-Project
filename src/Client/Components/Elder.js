import React, { Component } from 'react';
import {url} from "./AllPages";
import {loadPage,verifyUser} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import YouTube from "react-youtube";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import YoutubeView from "./YoutubeView";
import Select from "react-select";

var sessionOpt=[]
var currentUser={}
export default class ElderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.location.data,
            notfound: false,
            session: "personal" // personal,family, research1, research2
            // videos: [{nameSong: "linkin park - numb", id: "kXYiU_JCYtU"}],
        };

    }

    async componentDidMount() {
        currentUser = await verifyUser("user")
        if (currentUser) {
            let videos = await this.getSession(currentUser._id)
            await this.getSessionsKey(currentUser._id)

            this.setState({user: currentUser, videos: videos})
        } else {
            this.setState({notfound: true})
        }

    }

    async getSession(id) {
        console.log(this.state.session)
        let songs = await axios.get(url + "/user/session/" + id + "/" + this.state.session)
        this.setState({sessionNumber: songs.data.sessionNumber})
        console.log(songs.data.sessionNumber)
        return songs.data.list
        // return []
    }
    async getSessionsKey(id) {
        let songs = await axios.get(url + "/user/session/" + id)
        console.log(songs.data)

        await songs.data.forEach(key=>{
            sessionOpt.push({value:key,label:key})
        })

    }

    render() {
        return (
            <div>
                {
                    this.state.notfound ? <NotFound/> :

                        <div>
                            <div className="container-contact100">
                                <div className="wrap-contact1100">
                                    <form className="contact100-form validate-form">
                    <span className="contact100-form-title">
                    	Elder Screen - Hello {this.state.user ? " " + this.state.user.first_name : ""}
                    </span>
                                        {/*<div className="container-section-space">*/}
                                        {/*    <div className="container-section">*/}
                                        <div className="container-contact100-form-btn">
                                            <Tabs>
                                                <TabList>
                                                    <Tab>שירים</Tab>
                                                    <Tab>איזור אישי</Tab>
                                                    <Tab>איזור משפחתי</Tab>
                                                </TabList>

                                                <TabPanel>
                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                <h1>Session number {this.state.sessionNumber}</h1>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                {this.state.videos ?
                                                                    <YoutubeView session={this.state.session}
                                                                                 videos={this.state.videos}/> :
                                                                    "no found video for this session"
                                                                }

                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                <h1>write something for this end session</h1>
                                                                <p/>
                                                                <button onClick={async () => {
                                                                    alert("you have new session")
                                                                    await axios.get(url + "/user/Create/session/" + this.state.user._id + "/" + this.state.session)
                                                                    this.componentDidMount()
                                                                }}>click me
                                                                </button>


                                                            </div>
                                                        </div>
                                                    </div>

                                                </TabPanel>

                                                <TabPanel>

                                                    <div>
                                                        {/*User name, First name, Last name, ID, Password*/}
                                                        <div style={{width: '100%'}} className="container-section-space">
                                                            <div className="container-section">
                                                                <div className="wrap-input100 validate-input"
                                                                     data-validate="Name is required">
                                                                    <div>

                                                                        <h1>
                                                                            Identification information for the
                                                                            <br/>
                                                                        </h1>
                                                                        <br/>
                                                                    </div>
                                                                    <span className="label-input100">type*</span>
                                                                    <Select label="select year"
                                                                            style={{zIndex: 100}}
                                                                            closeMenuOnSelect={true}
                                                                            options={sessionOpt}
                                                                            value = {{value:this.state.session,label:this.state.session,}}
                                                                            defaultValue={sessionOpt[0]}
                                                                            onChange={async e => {
                                                                                console.log(e.value)
                                                                                await this.setState({session:e.value})
                                                                                console.log(currentUser._id)
                                                                                let videos = await this.getSession(currentUser._id)
                                                                                console.log(videos)
                                                                                this.setState({user: currentUse, videos: videos})
                                                                            }}
                                                                            menuPlacement="auto"
                                                                            menuPosition="fixed"
                                                                    />
                                                                </div>




                                                            </div>

                                                        </div>

                                                        {/*</Carousel>*/}
                                                    </div>

                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                <h1> הוספת שירים עבור הדייר</h1>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                        {/*    </div>*/}
                                        {/*</div>*/}


                                        <div className="container-contact100-back-btn">
                                            <div className="wrap-contact100-back-btn">
                                                <div className="contact100-back-bgbtn"></div>
                                                <button id='main' type='button' className="contact100-back-btn"
                                                        onClick={() => {
                                                            loadPage(this.props, "", this.state.user)
                                                        }}>
                                                    <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }


}

