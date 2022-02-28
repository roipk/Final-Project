import React, { Component } from 'react';
import {url} from "./AllPages";
import {loadPage,verifyUser} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import YouTube from "react-youtube";


const opts = {
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        // start:214, //This parameter causes the player to begin playing the video at the given number of seconds from the start of the video
        // autoplay: 0,// 0 - not autoplay / 1 - autoplay
        controls:1,// 0 - without controller / 1 - with controller
        disablekb:1,//0 - controller by keyboard / 0 disable keyboard
        rel:0,
        cc_load_policy:1,
        modestbranding:1,
        iv_load_policy:3,
        showinfo:0,
        ecver:2,
            frameborder:0,
        listType:'user_uploads',

        // cc_load_policy?: 1
        // autoplay?: 0 | 1
        // color?: 'red' | 'white';
        // controls?: 0 | 1 | 2;
        // disablekb?: 0 | 1;
        // enablejsapi?: 0 | 1;
        // end?: number;
        // fs?: 0 | 1;
        // hl?: string;
        // iv_load_policy?: 1 | 3;
        // list?: string;
        // listType?: 'playlist' | 'search' | 'user_uploads';
        // loop?: 0 | 1;
        // modestbranding?: 1;
        // origin?: string;
        // playlist?: string;
        // playsinline?: 0 | 1;
        // rel?: 0 | 1;
        // showinfo?: 0 | 1;
        // start?: number;
        // mute?: 0 | 1;




    },
    height: '390',
    width: '640',
}

var videoData=[]
export default class ElderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.location.data,
            notfound: false,
            session:"personal" // personal,family, research1, research2
            // videos: [{nameSong: "linkin park - numb", id: "kXYiU_JCYtU"}],
        };

    }

    async componentDidMount() {
        let currentUser = await verifyUser("user")
        if (currentUser) {
            let videos = await this.getSession(currentUser._id)
            this.setState({user: currentUser,videos:videos})

        } else {
            this.setState({notfound: true})
        }


        var t= [{name:1,test:2},{name:2,test:2},{name:1,test:2},{name:1,test:2}]
        var tes = [1,2,3]
        console.log(await t.filter(x=>x.name in tes))

    }


    async getSession(id) {
        var youtube=[]
        let songs=await axios.get(url+"/user/session/"+id+"/"+this.state.session)
        // console.log(songs.data.length)
        console.log(songs.data)
        // songs.data.forEach(song=>{
        //     console.log(song)
        //     song.forEach(id=>{
        //         youtube.push(id)
        //     })
        //     })
        // console.log(youtube)



        this.setState({sessionNumber: songs.data.sessionNumber})
        return songs.data.list
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
                                                    <h1>Session number {this.state.sessionNumber}</h1>

                                                </div>
                                            </div>
                                        </div>


                                        <div className="container-section-space">

                                            <div className="container-section">
                                                <div className="container-contact100-form-btn">
                                                    {this.state.videos ?
                                                        this.state.videos.map((item,index) => {
                                                            // console.log('item')
                                                            return (
                                                                <div  key={item.RecordDisplayId}
                                                                     className="container-contact100-form-btn" style={{
                                                                    display: 'block',
                                                                    padding: '10px',
                                                                    textAlign: 'center',
                                                                    // border: '10px solid black'
                                                                }}>

                                                                    <h4>{item.originTitle + " - " + item.originArtistName}</h4>
                                                                    <YouTube id={item.youtube.videoId} videoId={item.youtube.videoId}
                                                                             opts={opts}

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
                                                                            textAlign: 'center',
                                                                            borderStyle:item.score===1?"solid":""
                                                                        }} className="buttonDes" type="button" value={1}
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item.RecordDisplayId,index)
                                                                                }} name="verySad"
                                                                                id={"verySad" +item.RecordDisplayId}
                                                                        >😟
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center',
                                                                            borderStyle:item.score===2?"solid":""
                                                                        }} className="buttonDes" type="button" value={2}
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item.RecordDisplayId,index)
                                                                                }} name="Sad" id={"Sad" + item.RecordDisplayId}
                                                                        >🙁
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center',
                                                                            borderStyle:item.score===3?"solid":""
                                                                        }} className="buttonDes" type="button" value={3}
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item.RecordDisplayId,index)
                                                                                }} name="Indifferent"
                                                                                id={"Indifferent" + item.RecordDisplayId}
                                                                        >😐
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center',
                                                                            borderStyle:item.score===4?"solid":""
                                                                        }} className="buttonDes" type="button" value={4}
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item.RecordDisplayId,index)
                                                                                }} name="happy" id={"happy" + item.RecordDisplayId}
                                                                        >😀
                                                                        </button>
                                                                        <button style={{
                                                                            fontSize: '400%',
                                                                            textAlign: 'center',
                                                                            borderStyle:item.score===5?"solid":""
                                                                        }} className="buttonDes" type="button" value={5}
                                                                                onClick={(e) => {
                                                                                    this.rated(e, item.RecordDisplayId,index)
                                                                                }} name="Joyful"
                                                                                id={"Joyful" + item.RecordDisplayId}
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
                                                    <p/>
                                                    <button onClick={async ()=>{
                                                        alert("you have new session")
                                                        await axios.get(url+"/user/Create/session/"+this.state.user._id+"/"+this.state.session)
                                                        this.componentDidMount()
                                                    }}>click me</button>


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

         //class="ytp-chrome-top ytp-show-cards-title"
         //ytp-impression-link
         onReady(player) {

        // player.seekTo(80,true)

        // player.pauseVideo()
        // player.playVideo()
        console.log("onReady")
    }

    onPlay(player) {

        // console.log(e)

        console.log(player)
        videoData.forEach(video=>{
            if(video!==player)
                video.pauseVideo();
        })
        console.log("onPlay")
    }

    onPause(player) {
        // player.loadVideoById({videoId:"eVTXPUF4Oz4",
        //     startSeconds:30,//start clip in sec
        //     // endSeconds:35//end clip
        // })
        console.log(player)
        console.log(player.getDuration())
        var time  = this.convert(player.getCurrentTime())
        // console.log("you paused "+ time +"\n "+this.convertHMS(time) +"sec")
        console.log(`you paused  ${time} \n ${this.convertHMS(time)} sec`)
    }

    onEnd(player) {

        console.log("onEnd")
        // console.log(player.getDuration())
        player.seekTo( player.getDuration()-1,true)
        // player.pauseVideo()
        player.stopVideo()
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

   async rated(e,id,index){
        var state =   e.target.style.borderStyle
        // console.log( document.getElementById('verySad'+index))
        document.getElementById('verySad'+id).style.borderStyle =""
        document.getElementById('Sad'+id).style.borderStyle =""
        document.getElementById('Indifferent'+id).style.borderStyle =""
        document.getElementById('happy'+id).style.borderStyle =""
        document.getElementById('Joyful'+id).style.borderStyle =""
        e.target.style.borderStyle = state==="solid"? "":"solid"
       var rate = {
           sesionNumber:this.state.sessionNumber,
           songNumber:index,
           score :  e.target.style.borderStyle==="solid"?parseInt(e.target.value):0
       }
       console.log(this.state.user._id)
      var t= await axios.post(url+"/user/RateSession/"+this.state.user._id,rate)
       alert("thanks for rate")

    }
}


