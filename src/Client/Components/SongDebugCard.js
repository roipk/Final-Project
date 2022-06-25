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
    // console.log(props)
    this.state = {
      user: props.user,
      currentSong: props.songs[0],
      currentIndex: 0,
      songComments: props.songs[0].songComments,
      playlistComments: props.songs[0].playlistComments,
      isBrokenLink: props.songs[0].isBrokenLink,
      isGoodLink: props.songs[0].isGoodLink,
      isDuplicate: props.songs[0].isDuplicate,
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

  setSongComments(event) {
    this.setState({
      songComments: event.target.value,
    });
  }

  setPlaylistComments(event) {
    this.setState({
      playlistComments: event.target.value,
    });
  }

  setBrokenLinkCheckbox(event) {
    this.setState({
      isBrokenLink: event.target.checked,
    });
  }

  setGoodLinkCheckbox(event) {
    this.setState({
      isGoodLink: event.target.checked,
    });
  }
    setDuplicateCheckbox(event) {
    this.setState({
      isDuplicate: event.target.checked,
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
    const document = {
      _id: this.state.currentSong._id,
      Oid: this.state.currentSong.Oid,
      title: this.state.currentSong.title,
      artistName: this.state.currentSong.artistName,
      year: this.state.currentSong.year,
      playlist: this.state.currentSong.playlist,
      youtube: this.state.currentSong.youtube,
      comments: this.state.comments,
      songComments: this.state.songComments,
      isBrokenLink: this.state.isBrokenLink,
      isGoodLink: this.state.isGoodLink,
      isDuplicate: this.state.isDuplicate,
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
      songComments: this.state.songs[index].songComments,
      isBrokenLink: this.state.songs[index].isBrokenLink,
      isGoodLink: this.state.songs[index].isGoodLink,
      isDuplicate: this.state.songs[index].isDuplicate,
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
      songComments: this.state.songComments,
      isBrokenLink: this.state.isBrokenLink,
      isGoodLink: this.state.isGoodLink,
      isDuplicate: this.state.isDuplicate,
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
      songComments: this.state.songs[index].songComments,
      isBrokenLink: this.state.songs[index].isBrokenLink,
      isGoodLink: this.state.songs[index].isGoodLink,
      isDuplicate: this.state.songs[index].isDuplicate,
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
      songComments: this.state.songComments,
      playlistComments: this.state.playlistComments,
      isGoodLink: this.state.isGoodLink,
      isDuplicate: this.state.isDuplicate,
      isBrokenLink: this.state.isBrokenLink,
      isNoVideo: this.state.isNoVideo,
      isLowQualityVideo: this.state.isLowQualityVideo,
      isNoSound: this.state.isNoSound,
      isLowQualitySound: this.state.isLowQualitySound,
    };

    let updatedSongs = [...this.state.songs];
    let updatedSong = document;
    updatedSongs[currentIndex] = updatedSong;

    updatedSongs = updatedSongs.map(
      (el) => (el = { ...el, playlistComments: updatedSong.playlistComments })
    );

    this.setState({
      songs: updatedSongs,
    });

    updatedSongs.map((song) => {
      if (this.state.songs[currentIndex].Oid === song.Oid) {
        this.updateSongForDebug(updatedSong);
      } else this.updateSongForDebug(song);
    });
    alert("Saved!");
  }

  async updateSongForDebug(document) {
    console.log(document)
    axios.post(url + "/MusicGuide/updateSongDebug/SongsDebug", document);
  }

  async getSongsForDebug(playlist) {
    var res = await axios.get(url + "/MusicGuide/getSongsForDebug/" + playlist);

    return res.data;
  }

  render() {
    return (
      <div key={this.state.currentSong.title}>
        <div>
          <div className="wrap-input100 validate-input">
            <div className="song-debug-grid">
              <span className="label-input100">
                Song Name: {this.state.currentSong.title}
              </span>
              <span className="label-input100" style={{ textAlign: "center" }}>
                Artist Name: {this.state.currentSong.artistName}
              </span>
              <span className="label-input100" style={{ textAlign: "right" }}>
                Year: {this.state.currentSong.year}
              </span>
            </div>
          </div>
        </div>
        <div className="song-grid-container">
          <div className="song-grid-item item1">
            <input
              type="checkbox"
              id="goodLink"
              defaultChecked={this.state.isGoodLink}
              onClick={(e) => this.setGoodLinkCheckbox(e)}
            ></input>
            <label htmlFor="goodLink">Good Link</label>
            <br></br>
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
            <input
                type="checkbox"
                id="duplicate"
                defaultChecked={this.state.isDuplicate}
                onClick={(e) => this.setDuplicateCheckbox(e)}
            ></input>
            <label htmlFor="duplicate">Delete Song</label>
            <br></br>
          </div>
          <div className="song-grid-item item2">
            {/* <p>{this.state.currentSong.title}</p> */}
            <YoutubeData
              key={this.state.currentSong.title}
              url={this.state.currentSong.youtube.videoId}
            />
          </div>
          <div className="song-grid-item item3">
            <label htmlFor="comments">הערות בנוגע לשיר:</label>
            <br></br>ֵֵ
            <TextareaAutosize
              cacheMeasurements
              minRows={3}
              value={this.state.songComments}
              onChange={(e) => this.setSongComments(e)}
            />
            <label htmlFor="comments">הערות כלליות על הפלייליסט:</label>
            <br></br>
            <TextareaAutosize
              cacheMeasurements
              minRows={3}
              value={this.state.playlistComments}
              onChange={(e) => this.setPlaylistComments(e)}
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
        </div>
      </div>
    );
  }
}
