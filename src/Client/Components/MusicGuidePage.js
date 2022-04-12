import React, { Component } from "react";
import { loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import Select from "react-select";
import { url } from "./AllPages";
import collect from "collect.js";
import SongDebugCard from "./SongDebugCard";

var currentUser = {};

export default class MusicGuidePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      playlistsOptions: [],
      playlistToView: { value: "", label: "" },
      songs: [],
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
    // console.log(currentUser)
    var res = await axios.get(url + "/MusicGuide/getAllPlaylists");
    // var playlistsCollection = collect(res.data)
    // res.data.forEach((playlist) => {
    //   let records = playlist.records;
    //   records.forEach(async (song) => {
    //     const document = {
    //       Oid: song._id,
    //       title: song.title,
    //       artistName: song.artistName,
    //       year: song.year,
    //       playlist: playlist.name,
    //       youtube: song.youtube,
    //       comments: "",
    //       isBrokenLink: false,
    //       isNoVideo: false,
    //       isLowQualityVideo: false,
    //       isNoSound: false,
    //       isLowQualitySound: false,
    //     };
       
    //      axios.post(
    //       url + "/researcher/create/SongsDebug", document
    //     );
    //   });
    // });

   


    let playlists = [];
    res.data.forEach((playlist) => {
      // { value: 'user', label: 'Elder' }
      playlists.push({
        value: playlist._id,
        label: playlist.name,
      });
    });
    return playlists;
  }

  async addSongsDebugToDB() {
    console.log("test");
  }

  setPlaylist = (selectedPlaylist) => {
    console.log(selectedPlaylist);
    // this.setState({
    //   playlistToView: {
    //     value: selectedPlaylist.value,
    //     label: selectedPlaylist.label,
    //   },
    // });
    // console.log(this.state.playlistToView.label);
    

    this.getSongsForDebug(selectedPlaylist.label).then((result) => {
      // console.log(result);
      this.setState({
        playlistToView: {
          value: selectedPlaylist.value,
          label: selectedPlaylist.label,
        },
        songs: result,
      });
    });
    // this.viewSongs(this.state.songs.length != 0 ? true : false)
    // console.log(this.state.songs)
  };

  async getSongsByPlaylist(playlist) {
    //   console.log(playlist)
    var res = await axios.get(
      url + "/MusicGuide/getSongsByPlaylist/" + playlist
    );

    return res.data;
  }

  async getSongsForDebug(playlist) {
    //   console.log(playlist)
    var res = await axios.get(
      url + "/MusicGuide/getSongsForDebug/" + playlist
    );

    console.log(res.data)
    return res.data;
  }

  viewSongs(isInit) {
    if (isInit) {
     
      if (this.state.songs) {
        return (
          <SongDebugCard
            key={this.state.playlistToView.label}
            songs={this.state.songs}
            user={this.state.user}
          ></SongDebugCard>
        );
      } else {
        return <h1>No Songs Found</h1>;
      }
    }
  }

  render() {
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
              "Playlit is empty"
            )}
            {/* {this.viewSongs(this.state.songs.length != 0)} */}
            <div className="container-contact100-back-btn">
              <div className="wrap-contact100-back-btn" style={{ zIndex: 0 }}>
                <div className="contact100-back-bgbtn"></div>
                <button
                  id="main"
                  type="button"
                  className="contact100-back-btn"
                  onClick={() => {
                    loadPage(this.props, "", this.state.user);
                  }}
                >
                  <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
