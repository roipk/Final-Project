import React, { Component } from "react";
import { logOut, loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import Select from "react-select";
import { url } from "./AllPages";
import SongDebugCard from "./SongDebugCard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {CSVDownload, CSVLink} from "react-csv";
import YoutubeData from "./YoutubeView";
// import DownloadUserCSVButton from "./DownloadData/csv"


var currentUser = {};
var headers = [
  {label:"Oid",key:"Oid"},
  {label: "artistName",key: "artistName"},
  {label: "isBrokenLink",key: "isBrokenLink"},
  {label: "isLowQualitySound",key: "isLowQualitySound"},
  {label: "isLowQualityVideo",key: "isLowQualityVideo"},
  {label: "isGoodLink",key: "isGoodLink"},
  {label: "isDuplicate",key: "isDuplicate"},
  {label: "isNoSound",key: "isNoSound"},
  {label: "isNoVideo",key: "isNoVideo"},
  {label: "playlist",key: "playlist"},
  {label: "playlistComments", key: "playlistComments"},
  {label: "songComments", key: "songComments"},
  {label: "title",key: "title"},
  {label: "year",key: "year"},
  {label: "videoId",key: "videoId"},
  {label: "_id",key: "_id"},
];
const genres = ["cla", "yid", "cha", "lad", "pra", "mid"];

var newSong={
  title:"",
  originTitle:"",
  year:"",
  artistName:"",
  youtube:{
    videoFullId:"",
    videoId:"",
  }
}

export default class MusicGuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      playlistsOptions: [],
      playlistToView: { value: "", label: "" },
      songs: [],
      DataReport:[],
      loading: false,
      newSong:newSong,
    };
  }

  async componentDidMount() {
    currentUser = await verifyUser("musicGuide");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
      return;
    }

    await this.getAllPlaylists().then(async (result) => {
      this.setState({
        playlistsOptions: result,
      });
    });
  }

  async getAllPlaylists() {
    var res = await axios.get(url + "/MusicGuide/getAllPlaylists");
    let playlists = [];
    res.data.forEach((playlist) => {
      if (
        playlist.name.split("-").length === 3 ||
        genres.includes(playlist.name) ||
        playlist.name === "arame" ||
        playlist.name === "arana" ||
        playlist.name === "spa"
      )
        playlists.push({
          value: playlist._id,
          label: playlist.name,
        });
    });
    return playlists;
  }

  setPlaylist = (selectedPlaylist) => {
    if (this.state.playlistToView.label.length != 0) {
      confirmAlert({
        title: "Are you sure you want to switch playlist?",
        message:
          "Please make sure you saved your changes, otherwise changes will not take effect",
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              this.getSongsForDebug(selectedPlaylist.label).then((result) => {
                this.setState({
                  playlistToView: {
                    value: selectedPlaylist.value,
                    label: selectedPlaylist.label,
                  },
                  songs: result,
                });
              });
            },
          },
          {
            label: "No",
            onClick: () => {
              return;
            },
          },
        ],
      });
    } else {
      this.getSongsForDebug(selectedPlaylist.label).then((result) => {
        this.setState({
          playlistToView: {
            value: selectedPlaylist.value,
            label: selectedPlaylist.label,
          },
          songs: result,
        });
      });
    }
  };

  getSongsByPlaylist(playlists) {
    var res;
    playlists.forEach(async (playlist) => {
      res = await axios.get(
        url + "/MusicGuide/getSongsByPlaylist/" + playlist.label
      );
    });

    return res.data;
  }
  dataFromListOfDataReport = () => {
    return this.state.DataReport;
  }

  getReport = (event, done) => {
    if(!this.state.loading) {
      this.setState({
        loading: true
      });
      axios.get(
          url + "/MusicGuide/getAllSongsForDebug/"
      ).then(async(res) =>
      {
        console.log(res.data)
        var data = res.data
        var DataReport = []
        await data.forEach(song => {
          DataReport.push({
            Oid: song.Oid,
            artistName: song.artistName,
            isBrokenLink: song.isBrokenLink,
            isLowQualitySound: song.isLowQualitySound,
            isLowQualityVideo: song.isLowQualityVideo,
            isGoodLink: song.isGoodLink,
            isDuplicate: song.isDuplicate,
            isNoSound: song.isNoSound,
            isNoVideo: song.isNoVideo,
            playlist: song.playlist,
            playlistComments: song.playlistComments,
            songComments: song.songComments,
            title: song.title,
            year: song.year,
            videoId: song.youtube.videoId,
            _id: song._id,
          })
        })
        this.setState({
          listOfData: DataReport,
          loading: false
        });

      }).catch(() => {
        this.setState({
          loading: false
        });
        done(false);
      });
    }
  }
  async getSongsForDebug(playlist) {
    var res = await axios.get(url + "/MusicGuide/getSongsForDebug/" + playlist);
    return res.data;
  }



  async addSong()
  {
    // var Oid = await axios.post(url + "/MusicGuide/addSong",this.state.newSong );
    // console.log(Oid)
    // console.log(Oid.data)
    var document = {
      Oid: 1111,//Oid.data.insertedId,
      title: this.state.newSong.title,
      artistName:this.state.newSong.artistName,
      year: this.state.newSong.year,
      playlist: this.state.playlistToView.label,
      youtube: this.state.newSong.youtube,
      comments: "",
      songComments: "",
      changeLink: "",
      playlistComments: "",
      isGoodLink: true,
      isDuplicate: false,
      isBrokenLink: false,
      isNoVideo: false,
      isLowQualityVideo: false,
      isNoSound: false,
      isLowQualitySound: false,
    };
    // var newId = await axios.post(url + "/MusicGuide/addSong",this.state.newSong );
    // document._id = newId.data.insertedId;

    let newSongs = this.state.songs;
    newSongs.push(document)
    this.setState({songs:newSongs})
  }


  render() {
    const {loading} = this.state;
    return (
      <div key={this.state.playlistToView}>
        <div className="container-researcher-edit" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              Music Guide Page
            </span>
            <div className="wrap-input100 input100-select">
              <span className="label-input100">Choose playlist to view </span>

              <div>
                <Select
                  options={this.state.playlistsOptions}
                  onChange={(selectedPlaylist) =>
                    this.setPlaylist(selectedPlaylist)
                  }
                  value={this.state.playlistToView}
                />
              </div>
              <span className="focus-input100"></span>
            </div>
            {this.state.songs.length != 0 ? (
                <div>
              <SongDebugCard
                key={this.state.playlistToView.label}
                songs={this.state.songs}
              ></SongDebugCard>
                  <table style={{"textAlign":"center","width":"50%"}}>
                    <thead>
                    <tr>
                      <th colSpan="2">הוספת שיר</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td style={{"width":"50%"}}>קישור יוטיוב לשיר</td>
                      <td style={{"width":"30%"}}>
                        <input placeholder={"הכנס קישור"} value={ this.state.newSong.youtube.videoFullId} onChange={(e)=>{
                          newSong = this.state.newSong
                          newSong.youtube.videoFullId = e.target.value
                          let id = e.target.value.split("?v=")[1]??""
                          newSong.youtube.videoId = id.split("&")[0]??""
                          if(newSong.youtube.videoId==="")
                          {
                            newSong.youtube.videoFullId = 'https://www.youtube.com/watch?v='+e.target.value
                            newSong.youtube.videoId = e.target.value
                          }
                          this.setState({newSong:newSong})
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td style={{"width":"50%"}}>שם</td>
                      <td style={{"width":"30%"}}>
                        <input placeholder={"הכנס שם שיר"} value={ this.state.newSong.title}onChange={(e)=>{
                          newSong = this.state.newSong
                          newSong.title = e.target.value
                          this.setState({newSong:newSong})
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td style={{"width":"50%"}}>שם האמן</td>
                      <td style={{"width":"30%"}}>
                        <input placeholder={"הכנס שם אמן"} value={ this.state.newSong.artistName}onChange={(e)=>{
                          newSong = this.state.newSong
                          newSong.artistName = e.target.value
                          this.setState({newSong:newSong})
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td style={{"width":"50%"}}>שנת הוצאה</td>
                      <td style={{"width":"30%"}}>
                        <input placeholder={"הכנס שנת הוצאה"} value={ this.state.newSong.year}onChange={(e)=>{
                          newSong = this.state.newSong
                          newSong.year = e.target.value
                          this.setState({newSong:newSong})
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <td style={{"width":"50%"}}>קישור יוטיוב id</td>
                      <td style={{"width":"30%"}}>
                        <input placeholder={"הכנס id של השיר"} value={this.state.newSong.youtube.videoId} onChange={(e)=>{
                          newSong = this.state.newSong
                          newSong.youtube.videoFullId = e.target.value
                          let id = e.target.value.split("?v=")[1]??""
                          newSong.youtube.videoId = id.split("&")[0]??""
                          if(newSong.youtube.videoId==="")
                          {
                            newSong.youtube.videoFullId = 'https://www.youtube.com/watch?v='+e.target.value
                            newSong.youtube.videoId = e.target.value
                          }
                          this.setState({newSong:newSong})
                        }}/>
                      </td>
                    </tr>
                    <tr>
                      <th colSpan="2">
                        {this.state.newSong.youtube.videoFullId.length>0?<YoutubeData
                            key={newSong.youtube.videoFullId}
                            url={newSong.youtube.videoFullId}
                            onReady={(e)=>{
                              console.log(e.target)
                              newSong = this.state.newSong
                              newSong.year = this.state.playlistToView.label.split("DC")[0]
                              let hundred = newSong.year.split("-")[1]??""
                              let decade = newSong.year.split("-")[2]??""
                              newSong.year = (parseInt(hundred)*100) - 100+parseInt(decade)+5
                              if(hundred ==="")
                                newSong.year=0
                              if(newSong.originTitle !== e.target.videoTitle)
                              {
                                newSong.originTitle = e.target.videoTitle
                                newSong.title = e.target.videoTitle
                                this.setState({newSong:newSong})
                              }
                            }
                            }
                        />:
                            "סרטון יוצג במקום זה"

                        }

                      </th>
                    </tr>
                    <tr>
                      <td style={{"width":"50%"}}>
                        <button style={{color:"blue"}} onClick={()=>{
                          console.log(this.state.newSong)
                          this.addSong()
                        }}>הוספה</button>
                      </td>
                      <td style={{"width":"30%"}}>
                        <button style={{color:"blue"}}onClick={()=>{
                          console.log("click clear")
                          newSong = {
                            title: "",
                            originTitle: "",
                            year: "",
                            artistName: "",
                            youtube: {
                              videoFullId: "",
                              videoId: "",
                            }
                          }
                          this.setState({newSong:newSong})
                        }}> איפוס</button>
                      </td>
                    </tr>
                    </tbody>
                  </table>





                 </div>
            ) : (
              "Playlist is empty"
            )}

            <div className="container-contact100-back-btn">
              <div className="wrap-contact100-back-btn">
                <div className="contact100-back-bgbtn"></div>
                {/*<CSVLink*/}
                {/*    data={this.dataFromListOfDataReport}*/}
                {/*    asyncOnClick={true}*/}
                {/*    onClick={this.getReport}*/}
                {/*>*/}
                {/*  {loading ? 'Loading csv...' : 'Download me'}*/}
                {/*</CSVLink>;*/}
                {/*<button*/}
                {/*    onClick={this.getReport}*/}
                {/*>*/}
                {/*  {loading ? 'Loading csv...' : 'Download me'}*/}
                {/*</button>;*/}

                {/*<DownloadUserCSVButton/>*/}
                <button id='main' type='button' className="contact100-back-btn" onClick={async () => {
                  let res = await axios.get(
                          url + "/MusicGuide/getAllSongsForDebug/"
                      );
                  var data = res.data
                  var DataReport=[]
                  await data.forEach(song=>{
                    DataReport.push({
                      Oid: song.Oid,
                      artistName: song.artistName,
                      isBrokenLink: song.isBrokenLink,
                      isLowQualitySound: song.isLowQualitySound,
                      isLowQualityVideo: song.isLowQualityVideo,
                      isNoSound: song.isNoSound,
                      isNoVideo: song.isNoVideo,
                      playlist: song.playlist,
                      playlistComments: song.playlistComments,
                      songComments: song.songComments,
                      title: song.title,
                      year:song.year,
                      videoId:song.youtube.videoId,
                    _id:song._id,
                  })
                  })
                    this.setState({DataReport:DataReport})
                    console.log("load done load ")
                  alert("the data ready to download")


                }}>
                 Load data
                </button>
                <CSVLink data={this.state.DataReport} headers={headers}  filename={"Songs Report"}  target="_blank">
                  Download Report
                </CSVLink>;
              </div>
            </div>

            <div className="container-contact100-back-btn">
              <div className="music-guide-wrap-btn" style={{ zIndex: 0 }}>
                <div className="container-contact100-form-btn">
                  <div className="wrap-contact100-form-btn">
                    <div className="research contact100-form-bgbtn"></div>
                    <button
                      id="logOut"
                      type="button"
                      className="contact100-form-btn"
                      onClick={() => {
                        if (this.state.playlistToView.label.length != 0) {
                          confirmAlert({
                            title: "Are you sure you want to logout?",
                            message:
                              "Please make sure you saved your changes, otherwise changes will not take effect",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () => {
                                  logOut(this.props);
                                },
                              },
                              {
                                label: "No",
                                onClick: () => {
                                  return;
                                },
                              },
                            ],
                          });
                        } else logOut(this.props);
                      }}
                    >
                      <span>
                        <i
                          className="fa fa-sign-out fa-lg fa-fw"
                          aria-hidden="true"
                          style={{ padding_right: "10px" }}
                        ></i>
                        &nbsp;&nbsp;&nbsp;&nbsp; LOG OUT
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
