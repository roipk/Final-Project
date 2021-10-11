import React, { Component} from 'react';
import {loadPage}from "./AllPages";
// import YouTube from "react-youtube";

export default class Home extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };

    }

    render() {
        // youtube options
        // const opts = {
        //     height: '390',
        //     width: '640',
        //     playerVars: {
        //         // https://developers.google.com/youtube/player_parameters
        //         autoplay: 0,// 0 - not autoplay / 1 - autoplay
        //         controls:1,// 0 - without controller / 1 - with controller
        //         // start:214, //This parameter causes the player to begin playing the video at the given number of seconds from the start of the video
        //         rel:1,
        //         cc_load_policy:1,
        //         modestbranding:1,
        //
        //     },
        // }

        return(



            <div className="container-contact100">
                <div className="wrap-contact1100">
				<span className="contact100-form-title">
					TAMARINGA
				</span>
                        <div className="container-section">
                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="user contact100-form-bgbtn"></div>

                                    <button id='playlist' type='button' className="contact100-form-btn"
                                            onClick={()=> {
                                                alert("click Login");
                                                loadPage(this.props,"login",this.state)
                                            }
                                            }>
                                             {/*onClick="location.href='/userLoginPage'">*/}
                                        <i className="fa fa-blind fa-2x" aria-hidden="true"></i>&nbsp;
                                        <span>
                                User Login
                            </span>
                                    </button>
                                </div>
                            </div>

                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="user contact100-form-bgbtn"></div>
                                    <button id='guideLogin' type='button' className="contact100-form-btn"
                                            onClick={()=> {
                                                // alert("click Login");
                                                loadPage(this.props,"signup",this.state)
                                            }
                                            }>
                                            {/*onClick="location.href='/guideLoginPage'">*/}

                                        <i className="fa fa-address-card-o fa-2x" aria-hidden="true"></i>&nbsp;
                                        <span>
                                &nbsp;&nbsp;Guide Login
                          </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="container-section-space"></div>

                        <div className="container-section">
                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="research contact100-form-bgbtn"></div>

                                    <button id='resarchers' type='button' className="contact100-form-btn"
                                            onClick={()=>{alert("click")}}>
                            <span>
                            <i className="fa fa-users fa-lg fa-fw" aria-hidden="true"></i>&nbsp;&nbsp;
                                Research Group
                            </span>
                                    </button>
                                </div>
                            </div>

                            <div className="container-contact100-form-btn">
                                <div className="wrap-contact100-form-btn">
                                    <div className="research contact100-form-bgbtn"></div>
                                    <button id='adminLogin' type='button' className="contact100-form-btn"
                                            onClick={()=>{
                                                loadPage(this.props,"admin",this.state)
                                            }}>
                         <span>
                             Admin Login
                            </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/*<h1>*/}
                    {/*    play from youtube*/}
                    {/*</h1>*/}

                    {/*<div>*/}
                    {/*<YouTube videoId="kXYiU_JCYtU" opts={opts}*/}
                    {/*         onReady={(e)=>{this.onReady(e.target)}}*/}
                    {/*         onPlay={(e)=>{this.onPlay(e.target)}}*/}
                    {/*         onPause={(e)=>{this.onPause(e.target)}}*/}
                    {/*         onEnd={(e)=>{this.onEnd(e.target)}}*/}

                    {/*/>*/}
                    {/*</div>*/}
                </div>

            </div>

        );
    }

    //
    // onReady(player) {
    //     console.log(player)
    //     player.seekTo(80,true)
    //
    //     // player.pauseVideo()
    //     // player.playVideo()
    //     console.log("onReady")
    //
    // }
    //
    // onPlay(player) {
    //     console.log("onPlay")
    // }
    //
    // onPause(player) {
    //     // player.loadVideoById({videoId:"eVTXPUF4Oz4",
    //     //     startSeconds:30,//start clip in sec
    //     //     // endSeconds:35//end clip
    //     // })
    //     var time  = this.convert(player.getCurrentTime())
    //     // console.log("you paused "+ time +"\n "+this.convertHMS(time) +"sec")
    //     console.log(`you paused  ${time} \n ${this.convertHMS(time)} sec`)
    // }
    //
    // onEnd(player) {
    //     console.log("onEnd")
    // }
    //
    // convert(SECONDS) {
    //     if(SECONDS<3600)
    //         return new Date(SECONDS * 1000).toISOString().substr(14, 5)
    //     return new Date(SECONDS * 1000).toISOString().substr(11, 8)
    //
    // }
    //
    // convertHMS(timeString){
    //     if(timeString.length < 6)
    //         timeString="00:"+timeString
    //     const arr = timeString.split(":");
    //     const seconds = arr[0]*3600+arr[1]*60+(+arr[2]);
    //     return seconds;
    //
    // }

}
