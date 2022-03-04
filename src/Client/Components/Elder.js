import React, { Component ,useCallback } from 'react';
import {url} from "./AllPages";
import {loadPage,verifyUser} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import YouTube from "react-youtube";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import YoutubeData , {YoutubeView} from "./YoutubeView";
import Select from "react-select";

var sessionOpt=[]
var currentUser={}


export default class ElderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            youtubeUrl: "",
            video:"",
            user: props.location.data,
            notfound: false,
            session: "personal" // personal,family, research1, research2
            // videos: [{nameSong: "linkin park - numb", id: "kXYiU_JCYtU"}],
        };

    }


    async componentDidMount() {
        currentUser = await verifyUser("user")
        if (currentUser) {
            console.log("in")
           let currentAlgorithm =  await this.getSessionsKey(currentUser._id)
            let videos = await this.getSession(currentUser._id, currentAlgorithm)


            this.setState({user: currentUser, videos: videos})
        } else {
            this.setState({notfound: true})
        }
    }


    async getSession(id, session) {
        console.log(this.state.session)
        console.log(url + "/user/session/" + id + "/" + session)
        let songs = await axios.get(url + "/user/session/" + id + "/" + session)
        console.log(songs)
        this.setState({session:session,sessionNumber: songs.data.sessionNumber})
        console.log(songs.data.sessionNumber)
        return songs.data.list
        // return []
    }

    async getSessionsKey(id) {
        let songs = await axios.get(url + "/user/session/" + id)
        console.log(songs.data)
        sessionOpt=[]
        await songs.data.keys.forEach(key => {
            sessionOpt.push({value: key, label: key})
        })
        return songs.data.currentAlgorithm

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
                                            <Tabs selectedIndex={this.state.tabIndex} onSelect={index => {
                                                console.log(index)
                                                this.setState({tabIndex: index})
                                            }}>
                                                <TabList>
                                                    <Tab>שירים</Tab>
                                                    <Tab>איזור אישי</Tab>
                                                    <Tab>איזור משפחתי</Tab>
                                                </TabList>

                                                <TabPanel>
                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                <h1>Session {this.state.session} number {this.state.sessionNumber}</h1>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container-section-space">
                                                        <div className="container-section">
                                                            <div className="container-contact100-form-btn">
                                                                {this.state.videos ?
                                                                    // <YoutubeView session={this.state.session}
                                                                    //              videos={this.state.videos}/> :
                                                                    YoutubeView(this.state.user._id, this.state.session, this.state.videos, this.state.sessionNumber) : "no found video for this session"
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
                                                        <div style={{width: '100%'}}
                                                             className="container-section-space">
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
                                                                            value={{
                                                                                value: this.state.session,
                                                                                label: this.state.session,
                                                                            }}
                                                                            defaultValue={sessionOpt[0]}
                                                                            onChange={async e => {
                                                                                // console.log(e.value)
                                                                                // console.log(currentUser)
                                                                                // await this.setState({session:e.value})
                                                                                // console.log(currentUser._id)
                                                                                let videos = await this.getSession(currentUser._id, e.value)
                                                                                // console.log(videos)
                                                                                this.setState({
                                                                                    videos: videos,
                                                                                    session: e.value
                                                                                })
                                                                                let currentSession = {currentSession:e.value}
                                                                                await axios.post(url+"/user/currentSession/"+this.state.user._id,currentSession)

                                                                                // alert(status)
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
                                                        <div className="container-section1">
                                                            <h1> הוספת שירים עבור הדייר</h1>
                                                            <div className="container-contact100-form-btn">

                                                                <div className="wrap-input100 validate-input"
                                                                     data-validate="Name is required">
                                                                    <span
                                                                        className="label-input100">song youtube*</span>
                                                                    <input value={this.state.youtubeUrl} id='youtubeUrl'
                                                                           className="input100" type="url"
                                                                           name='youtubeUrl'
                                                                           onChange={(e) => {
                                                                               this.setState({youtubeUrl: e.target.value})
                                                                               console.log(e.target.value)

                                                                           }}
                                                                           placeholder="Enter Youtube Song Url"
                                                                           required/>
                                                                    <span className="focus-input100"></span>
                                                                    {this.state.youtubeUrl ?
                                                                        <div>
                                                                            <h3>{this.state.video.title}</h3>
                                                                            <YoutubeData
                                                                                url={this.state.youtubeUrl}
                                                                                onReady={e => {
                                                                                    this.setState({video: e.target.getVideoData()})
                                                                                    console.log(e.target)
                                                                                    console.log(e.target.getVideoData())
                                                                                    console.log(e.target.getApiInterface())
                                                                                    // console.log(e.target.showVideoInfo())
                                                                                    console.log(e.target.getAvailableQualityLevels())
                                                                                    console.log(e.target.getDuration())
                                                                                    console.log(e.target.getSize())
                                                                                    console.log(e.target.logImaAdEvent())
                                                                                }}/>
                                                                            <div className="wrap-contact100-back-btn">
                                                                                <div className="contact100-back-bgbtn"></div>
                                                                                <button id='next3' type='button' className="contact100-back-btn"
                                                                                        onClick={async () => {
                                                                                            let newSong={
                                                                                                date:(new Date()).toLocaleString(),
                                                                                                originTitle:this.state.video.title,
                                                                                                youtube:{
                                                                                                    videoId:this.state.video.video_id,
                                                                                                    views:100000,
                                                                                                    videoFullId:this.state.youtubeUrl,
                                                                                                },
                                                                                                originArtistName:this.state.video.author,
                                                                                                score:-1
                                                                                            }
                                                                                            console.log(newSong)
                                                                                            console.log(url+"/user/session/"+this.state.user._id+"/family")
                                                                                            let status = await axios.post(url+"/user/session/"+this.state.user._id+"/family",newSong)
                                                                                            let videos = await this.getSession(this.state.user._id, this.state.session)
                                                                                            // console.log(videos)
                                                                                            this.setState({
                                                                                                videos: videos,
                                                                                            })
                                                                                            alert(status.data.massage)
                                                                                            this.setState({youtubeUrl:''})
                                                                                        }}>הוספת שיר
                                                                                    {/*<i className="fa fa-arrow-right m-l-7" aria-hidden="true"></i>*/}
                                                                                    {/*<i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>*/}

                                                                                </button>
                                                                            </div>

                                                                        </div> : <div/>
                                                                    }
                                                                </div>
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

