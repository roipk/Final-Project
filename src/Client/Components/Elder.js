import React, { Component } from 'react';
import {loadPage,verifyUser,url} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import YouTube from "react-youtube";


const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        // autoplay: 0,// 0 - not autoplay / 1 - autoplay
        controls:1,// 0 - without controller / 1 - with controller
        // start:214, //This parameter causes the player to begin playing the video at the given number of seconds from the start of the video
        rel:1,
        cc_load_policy:1,
        modestbranding:1,

    },
}


export default class ElderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.location.data,
            notfound: false,
            // videos: [{nameSong: "linkin park - numb", id: "kXYiU_JCYtU"}],
        };
    }

    async componentDidMount() {
        let currentUser = await verifyUser("user")
        if (currentUser) {
            let videos = await this.getSession(currentUser._id)
            console.log(videos)
            this.setState({user: currentUser,videos:videos})

        } else {
            this.setState({notfound: true})
        }


    }


    async getSession(id) {
        // let youtube=[]
        let songs=await axios.get("http://localhost:5000/user/session/"+id)
        console.log(songs.data.length)
        console.log(songs.data)
        // songs.data.forEach(song=>{
        //     console.log(song)
        //     song.forEach(id=>{
        //         youtube.push(id)
        //     })
        //     })
        // console.log(youtube)
        return songs.data
        // return []
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

                                        <div className="container-section-space">
                                            <div className="container-section">
                                                <div className="container-contact100-form-btn">
                                                    <h1>write something for this start session</h1>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="container-section-space">

                                            <div className="container-section">
                                                <div className="container-contact100-form-btn">
                                                    {this.state.videos ?
                                                        this.state.videos.map((item) => {
                                                            // console.log(index)

                                                            return (
                                                                <div key={item._id}
                                                                     className="container-contact100-form-btn" style={{
                                                                    display: 'block',
                                                                    padding: '10px',
                                                                    textAlign: 'center',
                                                                    // border: '10px solid black'
                                                                }}>

                                                                    <h4>{item.originTitle + " - " + item.originArtistName}</h4>
                                                                    <YouTube videoId={item.youtube.videoId} opts={opts}
                                                                             onReady={(e) => {
                                                                                 this.onReady(e.target)
                                                                             }}
                                                                             onPlay={(e) => {
                                                                                 this.onPlay(e.target)
                                                                             }}
                                                                             onPause={(e) => {
                                                                                 this.onPause(e.target)
                                                                             }}
                                                                             onEnd={(e) => {
                                                                                 this.onEnd(e.target)
                                                                             }}

                                                                    />
                                                                    <div>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center'
                                                                        }} className="buttonDes" type="button"
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item._id)
                                                                                }} name="verySad"
                                                                                id={"verySad" + item._id}
                                                                        >😟
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center'
                                                                        }} className="buttonDes" type="button"
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item._id)
                                                                                }} name="Sad" id={"Sad" + item._id}
                                                                        >🙁
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center'
                                                                        }} className="buttonDes" type="button"
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item._id)
                                                                                }} name="Indifferent"
                                                                                id={"Indifferent" + item._id}
                                                                        >😐
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center'
                                                                        }} className="buttonDes" type="button"
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item._id)
                                                                                }} name="happy" id={"happy" + item._id}
                                                                        >😀
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center'
                                                                        }} className="buttonDes" type="button"
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item._id)
                                                                                }} name="Joyful"
                                                                                id={"Joyful" + item._id}
                                                                        >😆
                                                                        </button>

                                                                    </div>
                                                                    <hr/>
                                                                </div>
                                                            )
                                                        }) : "no found video for this session"
                                                    }

                                                </div>

                                            </div>
                                        </div>


                                        <div className="container-section-space">
                                            <div className="container-section">
                                                <div className="container-contact100-form-btn">
                                                    <h1>write something for this end session</h1>
                                                </div>
                                            </div>
                                        </div>

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


    onReady(player) {
        // console.log(player)
        // player.seekTo(80,true)

        // player.pauseVideo()
        // player.playVideo()
        console.log("onReady")
    }

    onPlay(player) {
        console.log("onPlay")
    }

    onPause(player) {
        // player.loadVideoById({videoId:"eVTXPUF4Oz4",
        //     startSeconds:30,//start clip in sec
        //     // endSeconds:35//end clip
        // })
        var time  = this.convert(player.getCurrentTime())
        // console.log("you paused "+ time +"\n "+this.convertHMS(time) +"sec")
        console.log(`you paused  ${time} \n ${this.convertHMS(time)} sec`)
    }

    onEnd(player) {
        console.log("onEnd")
    }

    convert(SECONDS) {
        if(SECONDS<3600)
            return new Date(SECONDS * 1000).toISOString().substr(14, 5)
        return new Date(SECONDS * 1000).toISOString().substr(11, 8)

    }

    convertHMS(timeString){
        if(timeString.length < 6)
            timeString="00:"+timeString
        const arr = timeString.split(":");
        const seconds = arr[0]*3600+arr[1]*60+(+arr[2]);
        return seconds;

    }

    rated(e,index) {
        var state =   e.target.style.borderStyle
        // console.log( document.getElementById('verySad'+index))
        document.getElementById('verySad'+index).style.borderStyle =""
        document.getElementById('Sad'+index).style.borderStyle =""
        document.getElementById('Indifferent'+index).style.borderStyle =""
        document.getElementById('happy'+index).style.borderStyle =""
        document.getElementById('Joyful'+index).style.borderStyle =""

        e.target.style.borderStyle = state==="solid"? "":"solid"
    }
}


