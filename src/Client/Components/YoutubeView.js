import YouTube from "react-youtube";
import React, {Component,useCallback } from "react";
import {verifyUser} from "./ManagerComponents";
import axios from "axios";
import {url} from "./AllPages";


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
var _user={}
var _algorithm=null

export function YoutubeView (userID,algorithm,videos,sessionNumber){

    // constructor(props) {
    //     super(props);
    //     console.log(props)
    //     this.state = {
    //         videos: props.videos,
    //         session: props.session // personal,family, research1, research2
    //         // videos: [{nameSong: "linkin park - numb", id: "kXYiU_JCYtU"}],
    //     };
    // }
    console.log(videos)
    _user=userID
    _algorithm=algorithm

    return (
        <div>
            {
               videos.map((item, index) => {
                    // console.log('item')
                    return (
                        <div key={index}
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
                                         onReady(e.target)
                                     }}
                                     onPlay={(e) => {
                                         onPlay(e.target)
                                     }}
                                     onPause={(e) => {
                                         onPause(e.target)
                                     }}
                                     onEnd={(e) => {
                                         onEnd(e.target)
                                     }}


                            />
                            <div>
                                <button style={{
                                    fontSize: '400%',
                                    textAlign: 'center',
                                    borderStyle: item.score === 1 ? "solid" : ""
                                }} className="buttonDes" type="button" value={1}
                                        onClick={(e) => {
                                            rated(e, item.RecordDisplayId, index, sessionNumber)
                                        }} name="verySad"
                                        id={"verySad" + item.RecordDisplayId}
                                >😟
                                </button>
                                <button style={{
                                    fontSize: '400%',
                                    textAlign: 'center',
                                    borderStyle: item.score === 2 ? "solid" : ""
                                }} className="buttonDes" type="button" value={2}
                                        onClick={(e) => {
                                            rated(e, item.RecordDisplayId, index, sessionNumber)
                                        }} name="Sad" id={"Sad" + item.RecordDisplayId}
                                >🙁
                                </button>
                                <button style={{
                                    fontSize: '400%',
                                    textAlign: 'center',
                                    borderStyle: item.score === 3 ? "solid" : ""
                                }} className="buttonDes" type="button" value={3}
                                        onClick={(e) => {
                                            rated(e, item.RecordDisplayId, index, sessionNumber)
                                        }} name="Indifferent"
                                        id={"Indifferent" + item.RecordDisplayId}
                                >😐
                                </button>
                                <button style={{
                                    fontSize: '400%',
                                    textAlign: 'center',
                                    borderStyle: item.score === 4 ? "solid" : ""
                                }} className="buttonDes" type="button" value={4}
                                        onClick={(e) => {
                                            rated(e, item.RecordDisplayId, index, sessionNumber)
                                        }} name="happy" id={"happy" + item.RecordDisplayId}
                                >😀
                                </button>
                                <button style={{
                                    fontSize: '400%',
                                    textAlign: 'center',
                                    borderStyle: item.score === 5 ? "solid" : ""
                                }} className="buttonDes" type="button" value={5}
                                        onClick={(e) => {
                                            rated(e, item.RecordDisplayId, index, sessionNumber)
                                        }} name="Joyful"
                                        id={"Joyful" + item.RecordDisplayId}
                                >😆
                                </button>

                            </div>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>

    )
}


function YoutubeData({url,onReady})
{
    const onItemTest = useCallback(event => {
        console.log('You clicked ', event.target.getVideoData().title);
        onReady = event.target.getVideoData().title
    }, [onReady]);



    const indexStart = url.indexOf("=")>0?url.indexOf("=")+1:0;
    const indexEnd = url.indexOf("&")===-1?url.length:url.indexOf("&");
    url = url.slice(indexStart,indexEnd)
    var d = " hi "

    return(
        <YouTube  id={url} videoId={url}
                 opts={opts}
                    onReady={onReady}
                 // onReady={(e) => {
                 //    d = e.target.getVideoData().title
                 //     console.log(e.target.getVideoData().title)
                 //    props.onReady = e
                 //     // onReady(e.target)
                 // }}
                 // onPlay={(e) => {
                 //     onPlay(e.target)
                 // }}
                 // onPause={(e) => {
                 //     onPause(e.target)
                 // }}
                 // onEnd={(e) => {
                 //     onEnd(e.target)
                 // }}
        />
    )
}

export default  React.memo(YoutubeData)
//
//
//
//     //class="ytp-chrome-top ytp-show-cards-title"
//     //ytp-impression-link
    function onReady(player) {

        // player.seekTo(80,true)

        // player.pauseVideo()
        // player.playVideo()
        console.log("onReady")
    }

function onPlay(player) {

        // console.log(e)

        console.log(player)
        console.log(player.getVideoData().title)
        videoData.forEach(video => {
            if (video !== player)
                video.pauseVideo();
        })
        console.log("onPlay")
    }

function  onPause(player) {
        // player.loadVideoById({videoId:"eVTXPUF4Oz4",
        //     startSeconds:30,//start clip in sec
        //     // endSeconds:35//end clip
        // })
        console.log(player)
        console.log(player.getDuration())
        var time = convert(player.getCurrentTime())
        // console.log("you paused "+ time +"\n "+this.convertHMS(time) +"sec")
        console.log(`you paused  ${time} \n ${convertHMS(time)} sec`)
    }

function onEnd(player) {

        console.log("onEnd")
        // console.log(player.getDuration())
        player.seekTo(player.getDuration() - 1, true)
        // player.pauseVideo()
        player.stopVideo()
    }

function convert(SECONDS) {
        if (SECONDS < 3600)
            return new Date(SECONDS * 1000).toISOString().substr(14, 5)
        return new Date(SECONDS * 1000).toISOString().substr(11, 8)

    }

function convertHMS(timeString) {
        if (timeString.length < 6)
            timeString = "00:" + timeString
        const arr = timeString.split(":");
        const seconds = arr[0] * 3600 + arr[1] * 60 + (+arr[2]);
        return seconds;

    }

    async function rated(e, id, index,sessionNumber) {
        var state = e.target.style.borderStyle
        // console.log( document.getElementById('verySad'+index))
        document.getElementById('verySad' + id).style.borderStyle = ""
        document.getElementById('Sad' + id).style.borderStyle = ""
        document.getElementById('Indifferent' + id).style.borderStyle = ""
        document.getElementById('happy' + id).style.borderStyle = ""
        document.getElementById('Joyful' + id).style.borderStyle = ""
        e.target.style.borderStyle = state === "solid" ? "" : "solid"
        var rate = {
            sesionNumber: sessionNumber,
            songNumber: index,
            score: e.target.style.borderStyle === "solid" ? parseInt(e.target.value) : 0
        }
        console.log(_user)
        var t = await axios.post(url + "/user/RateSession/" + _user+"/"+_algorithm, rate)
        alert("thanks for rate")

    }
