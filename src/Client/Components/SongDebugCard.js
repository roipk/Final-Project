import React, { Component } from "react";
import TextareaAutosize from "react-textarea-autosize";
import YoutubeData, { YoutubeView } from "./YoutubeView";

export default class SongDebugCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      //   user: props.location.data,
      comments: "",
      isBrokenLink: false,
      isNoVideo: false,
      isLowQualityVideo: false,
      isNoSound: false,
      isLowQualitySound: false,
      songs: props.songs,
      songsReview: [],
      currentSong: props.songs[0],
      currentIndex: 0,
    };

    console.log(this.state.songs);
  }

  componentDidMount() {
    let len = this.state.songs.length;
    let temp = [];
    for (var i = 0; i < len; i++) {
      temp.push({
        comments: "",
        isBrokenLink: false,
        isNoVideo: false,
        isLowQualityVideo: false,
        isNoSound: false,
        isLowQualitySound: false,
        youtube: this.state.songs[i].youtube,
        title: this.state.songs[i].title,
        artistName: this.state.songs[i].artistName,
      });
    }
    this.setState({
      songsReview: temp,
    });

    console.log("Mount")
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
    //   console.log(currentSong)
    let index = currentIndex + 1;

    if (index == this.state.songs.length) index = 0;
    this.setState((prevState) => {
      console.log(prevState);
      let temp = prevState.songsReview[currentIndex];
      temp.isBrokenLink = this.state.isBrokenLink;
      temp.isNoVideo = this.state.isNoVideo;
      temp.isNoSound = this.state.isNoSound;
      temp.isLowQualitySound = this.state.isLowQualitySound;
      temp.isLowQualityVideo = this.state.isLowQualityVideo;
      temp.comments = this.state.comments;
      prevState.songsReview[currentIndex] = temp;
      return {
        currentIndex: index,
        currentSong: this.state.songs[index],
        songsReview: [...prevState.songsReview],
        isBrokenLink: this.state.songsReview[index].isBrokenLink,
        isNoVideo: this.state.songsReview[index].isNoVideo,
        isNoSound: this.state.songsReview[index].isNoSound,
        isLowQualitySound: this.state.songsReview[index].isLowQualitySound,
        isLowQualityVideo: this.state.songsReview[index].isLowQualityVideo,
        comments: this.state.songsReview[index].comments,
      };
    });
  }

  async showPrevSong(currentIndex, currentSong) {
    let index = currentIndex - 1;
    console.log(this.state.isBrokenLink);

    this.setState((prevState) => {
      console.log(prevState);
      let temp = prevState.songsReview[currentIndex];
      temp.isBrokenLink = this.state.isBrokenLink;
      temp.isNoVideo = this.state.isNoVideo;
      temp.isNoSound = this.state.isNoSound;
      temp.isLowQualitySound = this.state.isLowQualitySound;
      temp.isLowQualityVideo = this.state.isLowQualityVideo;
      temp.comments = this.state.comments;
      prevState.songsReview[currentIndex] = temp;
      return {
        currentIndex: index,
        currentSong: this.state.songs[index],
        songsReview: [...prevState.songsReview],
        isBrokenLink: this.state.songsReview[index].isBrokenLink,
        isNoVideo: this.state.songsReview[index].isNoVideo,
        isNoSound: this.state.songsReview[index].isNoSound,
        isLowQualitySound: this.state.songsReview[index].isLowQualitySound,
        isLowQualityVideo: this.state.songsReview[index].isLowQualityVideo,
        comments: this.state.songsReview[index].comments,
      };
    });
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
              //   onReady={(e) => {
              //     this.setState({ video: e.target.getVideoData() });
              //     console.log(e.target);
              //     console.log(e.target.getVideoData());
              //     console.log(e.target.getApiInterface());
              //     // console.log(e.target.showVideoInfo())
              //     console.log(e.target.getAvailableQualityLevels());
              //     console.log(e.target.getDuration());
              //     console.log(e.target.getSize());
              //     console.log(e.target.logImaAdEvent());
              //   }}
            />
          </div>
          <div className="song-grid-item item3">
            <label htmlFor="comments">הערות:</label>
            <br></br>
            {/* <textarea id="comments" name="comments" rows="3"></textarea> */}
            <TextareaAutosize
              cacheMeasurements
              //   value={this.state.songsReview[this.state.currentIndex].comments}
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

// export default SongDebugCard;
