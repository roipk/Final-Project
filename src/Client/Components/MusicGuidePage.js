import React, { Component } from "react";
import { logOut, loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import Select from "react-select";
import { url } from "./AllPages";
import SongDebugCard from "./SongDebugCard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
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
              "Playlist is empty"
            )}
            {/* {this.viewSongs(this.state.songs.length != 0)} */}
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
