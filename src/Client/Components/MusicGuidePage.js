import React, { Component } from "react";
import { logOut, loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import Select from "react-select";
import { url } from "./AllPages";
import SongDebugCard from "./SongDebugCard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {CSVDownload, CSVLink} from "react-csv";
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

export default class MusicGuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      playlistsOptions: [],
      playlistToView: { value: "", label: "" },
      songs: [],
      DataReport:[],
      loading: false
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
              <SongDebugCard
                key={this.state.playlistToView.label}
                songs={this.state.songs}
              ></SongDebugCard>
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
                  axios({
                    url: url + "/MusicGuide/getAllSongsForDebug/",
                    method: 'GET',
                    responseType: 'json', // important
                  }).then(async(res) => {
                    console.log(res.data)
                    var DataReport=[]
                    await res.data.forEach(song=>{
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
                        year:song.year,
                        videoId:song.youtube.videoId,
                      _id:song._id,
                    })
                    })
                    // <CSVLink data={this.state.DataReport} headers={headers}  filename={"Songs Report.xlsx"}  target="_blank">
                    //     Download Report
                    // </CSVLink>;
                    const url = window.URL.createObjectURL(new Blob(DataReport));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.csv'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                  });


                  // let res = await axios.get(
                  //         url + "/MusicGuide/getAllSongsForDebug/"
                  //     );
                  // var data = res.data
                  // var DataReport=[]
                  // await data.forEach(song=>{
                  //   DataReport.push({
                  //     Oid: song.Oid,
                  //     artistName: song.artistName,
                  //     isBrokenLink: song.isBrokenLink,
                  //     isLowQualitySound: song.isLowQualitySound,
                  //     isLowQualityVideo: song.isLowQualityVideo,
                  //     isNoSound: song.isNoSound,
                  //     isNoVideo: song.isNoVideo,
                  //     playlist: song.playlist,
                  //     playlistComments: song.playlistComments,
                  //     songComments: song.songComments,
                  //     title: song.title,
                  //     year:song.year,
                  //     videoId:song.youtube.videoId,
                  //   _id:song._id,
                  // })
                  // })
                  //   this.setState({DataReport:DataReport})
                  //   console.log("load done load ")


                }}>
                 Load data
                </button>
                <CSVLink data={this.state.DataReport} headers={headers}  filename={"Songs Report.xlsx"}  target="_blank">
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
