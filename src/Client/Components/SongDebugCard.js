import axios from "axios";
import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import YoutubeData, { YoutubeView } from "./YoutubeView";
import { url } from "./AllPages";
import { loadPage, verifyUser } from "./ManagerComponents";

let currentUser = {};

export default class SongDebugCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: props.user,
      currentSong: props.songs[0],
      currentIndex: 0,
      comments: props.songs[0].comments,
      isBrokenLink: props.songs[0].isBrokenLink,
      isNoVideo: props.songs[0].isNoVideo,
      isLowQualityVideo: props.songs[0].isLowQualityVideo,
      isNoSound: props.songs[0].isNoSound,
      isLowQualitySound: props.songs[0].isLowQualitySound,
      songs: props.songs,
      songsReview: [],
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
  }

  setComments(event) {
    this.setState({
      comments: event.target.value,
    });
  }

  setBrokenLinkCheckbox(event) {
    this.setState({
      isBrokenLink: event.target.checked,
    });
  }

  setNoVideoCheckbox(event) {
    this.setState({
      isNoVideo: event.target.checked,
    });
  }

  setLowQualityVideoCheckbox(event) {
    this.setState({
      isLowQualityVideo: event.target.checked,
    });
  }

  setNoSoundCheckbox(event) {
    this.setState({
      isNoSound: event.target.checked,
    });
  }

  setLowQualitySoundCheckbox(event) {
    this.setState({
      isLowQualitySound: event.target.checked,
    });
  }

  async showNextSong(currentIndex, currentSong) {
    let index = currentIndex + 1;
    console.log(this.state);
    const document = {
      _id: this.state.currentSong._id,
      Oid: this.state.currentSong.Oid,
      title: this.state.currentSong.title,
      artistName: this.state.currentSong.artistName,
      year: this.state.currentSong.year,
      playlist: this.state.currentSong.playlist,
      youtube: this.state.currentSong.youtube,
      comments: this.state.comments,
      isBrokenLink: this.state.isBrokenLink,
      isNoVideo: this.state.isNoVideo,
      isLowQualityVideo: this.state.isLowQualityVideo,
      isNoSound: this.state.isNoSound,
      isLowQualitySound: this.state.isLowQualitySound,
    };

    let updatedSongs = [...this.state.songs];
    let updatedSong = document;
    updatedSongs[currentIndex] = updatedSong;

    this.setState({
      songs: updatedSongs,
      currentIndex: index,
      currentSong: this.state.songs[index],
      comments: this.state.songs[index].comments,
      isBrokenLink: this.state.songs[index].isBrokenLink,
      isNoVideo: this.state.songs[index].isNoVideo,
      isLowQualityVideo: this.state.songs[index].isLowQualityVideo,
      isNoSound: this.state.songs[index].isNoSound,
      isLowQualitySound: this.state.songs[index].isLowQualitySound,
    });
  }

  async showPrevSong(currentIndex) {
    let index = currentIndex - 1;
    const document = {
      _id: this.state.currentSong._id,
      Oid: this.state.currentSong.Oid,
      title: this.state.currentSong.title,
      artistName: this.state.currentSong.artistName,
      year: this.state.currentSong.year,
      playlist: this.state.currentSong.playlist,
      youtube: this.state.currentSong.youtube,
      comments: this.state.comments,
      isBrokenLink: this.state.isBrokenLink,
      isNoVideo: this.state.isNoVideo,
      isLowQualityVideo: this.state.isLowQualityVideo,
      isNoSound: this.state.isNoSound,
      isLowQualitySound: this.state.isLowQualitySound,
    };

    let updatedSongs = [...this.state.songs];
    let updatedSong = document;
    updatedSongs[currentIndex] = updatedSong;

    this.setState({
      songs: updatedSongs,
      currentIndex: index,
      currentSong: this.state.songs[index],
      comments: this.state.songs[index].comments,
      isBrokenLink: this.state.songs[index].isBrokenLink,
      isNoVideo: this.state.songs[index].isNoVideo,
      isLowQualityVideo: this.state.songs[index].isLowQualityVideo,
      isNoSound: this.state.songs[index].isNoSound,
      isLowQualitySound: this.state.songs[index].isLowQualitySound,
    });
  }

  saveSongsToDebug(currentIndex) {
    const document = {
      _id: this.state.currentSong._id,
      Oid: this.state.currentSong.Oid,
      title: this.state.currentSong.title,
      artistName: this.state.currentSong.artistName,
      year: this.state.currentSong.year,
      playlist: this.state.currentSong.playlist,
      youtube: this.state.currentSong.youtube,
      comments: this.state.comments,
      isBrokenLink: this.state.isBrokenLink,
      isNoVideo: this.state.isNoVideo,
      isLowQualityVideo: this.state.isLowQualityVideo,
      isNoSound: this.state.isNoSound,
      isLowQualitySound: this.state.isLowQualitySound,
    };

    let updatedSongs = [...this.state.songs];
    let updatedSong = document;
    updatedSongs[currentIndex] = updatedSong;

    this.setState({
      songs: updatedSongs,
    });

    this.state.songs.map((song) => {
      if (this.state.songs[currentIndex].Oid === song.Oid) {
        this.updateSongForDebug(updatedSong);
      } else this.updateSongForDebug(song);
    });
    // console.log(this.state.user);
    // loadPage(this.props, "ֵmusicGuide", this.state.user,this.state.user);
    alert("Saved!");
  }

  async updateSongForDebug(document) {
    axios.post(url + "/MusicGuide/updateSongDebug/SongsDebug", document);
  }

  async getSongsForDebug(playlist) {
    var res = await axios.get(url + "/MusicGuide/getSongsForDebug/" + playlist);

    return res.data;
  }

  render() {
    return (
      <div key={this.state.currentSong.title}>
        <div className="song-grid-container">
          <div className="song-grid-item item1">
            <input
              type="checkbox"
              id="brokenLink"
              defaultChecked={this.state.isBrokenLink}
              onClick={(e) => this.setBrokenLinkCheckbox(e)}
            ></input>
            <label htmlFor="brokingLink">Broken Link</label>
            <br></br>
            <input
              type="checkbox"
              id="noVideo"
              defaultChecked={this.state.isNoVideo}
              onClick={(e) => this.setNoVideoCheckbox(e)}
            ></input>
            <label htmlFor="noVideo">No Video</label>
            <br></br>
            <input
              type="checkbox"
              id="videoLowQuality"
              defaultChecked={this.state.isLowQualityVideo}
              onClick={(e) => this.setLowQualityVideoCheckbox(e)}
            ></input>
            <label htmlFor="videoLowQuality">Low Quality Video</label>
            <br></br>
            <input
              type="checkbox"
              id="noSound"
              defaultChecked={this.state.isNoSound}
              onClick={(e) => this.setNoSoundCheckbox(e)}
            ></input>
            <label htmlFor="noSound">No Sound</label>
            <br></br>
            <input
              type="checkbox"
              id="soundLowQuality"
              defaultChecked={this.state.isLowQualitySound}
              onClick={(e) => this.setLowQualitySoundCheckbox(e)}
            ></input>
            <label htmlFor="soundLowQuality">Low Quality Sound</label>
          </div>
          <div className="song-grid-item item2">
            {/* <p>{this.state.currentSong.title}</p> */}
            <YoutubeData
              key={this.state.currentSong.title}
              url={this.state.currentSong.youtube.videoId}
            />
          </div>
          <div className="song-grid-item item3">
            <label htmlFor="comments">הערות:</label>
            <br></br>ֵֵ
            <TextareaAutosize
              cacheMeasurements
              minRows={3}
              value={this.state.comments}
              onChange={(e) => this.setComments(e)}
            />
            <div>
              <br></br>
              <div className="song-card-btn">
                <div className="song-card-btn-container" style={{ zIndex: 0 }}>
                  <div className="contact100-back-bgbtn"></div>
                  <button
                    type="button"
                    className="contact100-back-btn"
                    onClick={() =>
                      this.showNextSong(
                        this.state.currentIndex,
                        this.state.currentSong
                      )
                    }
                    hidden={
                      this.state.currentIndex == this.state.songs.length - 1
                    }
                  >
                    <i className="fa fa-arrow-right m-l-7" aria-hidden="true">
                      {" "}
                      Next
                    </i>
                  </button>
                </div>

                <div className="song-card-btn-container" style={{ zIndex: 0 }}>
                  <div className="contact100-back-bgbtn"></div>
                  <button
                    type="button"
                    className="contact100-back-btn"
                    id="save"
                    onClick={() =>
                      this.saveSongsToDebug(this.state.currentIndex)
                    }
                  >
                    <i aria-hidden="true"> Save Changes</i>
                  </button>
                </div>

                <div className="song-card-btn-container" style={{ zIndex: 0 }}>
                  <div className="contact100-back-bgbtn"></div>
                  <button
                    type="button"
                    className="contact100-back-btn"
                    id="prev"
                    onClick={() =>
                      this.showPrevSong(
                        this.state.currentIndex,
                        this.state.currentSong
                      )
                    }
                    hidden={this.state.currentIndex == 0}
                  >
                    <i className="fa fa-arrow-left m-l-7" aria-hidden="true">
                      {" "}
                      Prev
                    </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          ֵ
        </div>
      </div>
    );
  }
}
