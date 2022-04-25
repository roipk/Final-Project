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
    var res = await axios.get(url + "/MusicGuide/getAllPlaylists");

    let playlists = [];
    res.data.forEach((playlist) => {
      playlists.push({
        value: playlist._id,
        label: playlist.name,
      });
    });
    return playlists;
  }

  setPlaylist = (selectedPlaylist) => {
    // console.log(this.state.playlistToView.label.length)
    if (this.state.playlistToView.label.length != 0) {
      if (
        confirm(
          "Are you sure you want to switch playlist? Please make sure you saved your changes, otherwise changes will not take effect"
        )
      ) {
        this.getSongsForDebug(selectedPlaylist.label).then((result) => {
          this.setState({
            playlistToView: {
              value: selectedPlaylist.value,
              label: selectedPlaylist.label,
            },
            songs: result,
          });
        });
      } else {
        return;
      }
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

  async getSongsByPlaylist(playlist) {
    var res = await axios.get(
      url + "/MusicGuide/getSongsByPlaylist/" + playlist
    );

    return res.data;
  }

  async getSongsForDebug(playlist) {
    var res = await axios.get(url + "/MusicGuide/getSongsForDebug/" + playlist);
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
