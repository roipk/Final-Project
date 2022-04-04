import { Component } from "react";
import MediaCard from "./MediaCard";
import { loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import { url } from "./AllPages";
import ResearchCard from "./ResearchCard";
// import { Select } from "@mui/material";
import Select from "react-select";
import collect from "collect.js";

var currentUser = {};

export default class ViewResearches extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.location.data,
      researchesName: [],
      researches: [],
      researchToView: {},
      researchDetails: {},
      sessions: [],
      researchName: "",
    };
  }

  async componentDidMount() {
    currentUser = await verifyUser("researcher");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
      return;
    }
    await this.getAllResearchesByResearcher().then((result) => {
      this.setState({
        researchesName: result,
      });
    });
    // console.log(this.state.researchesName);
    let researchesDetails = [];
    this.state.researchesName.forEach(async (research) => {
      var researchDetails = await this.getResearchDetails(research.label);
      researchesDetails.push(researchDetails);
      this.setState({
        researches: researchesDetails,
      });
    });
  }

  async getAllResearchesByResearcher() {
    var res = await axios.get(
      url + "/researcher/getAllResearchesByResearcher/" + currentUser._id
    );
    console.log(res.data)
    let researches = [];
    res.data[0].forEach((research) => {
      // { value: 'user', label: 'Elder' }
      researches.push({
        value: research.Oid,
        label: research.researchName,
      });
    });
    return researches;
  }

  async getResearchDetails(researchName) {
    var res = await axios.get(
      url + "/researcher/getResearchByName/" + researchName
    );
    return res.data[0];
  }

  async getElderDetails(elderOid) {
    var res = await axios.get(url + "/researcher/getUserSessions/" + elderOid);
    return res.data;
  }

  getDetials(research) {
    let details = {
      researchName: research.researchName,
      startDate: new Date(research.startDate),
      endDate: new Date(research.endDate),
      numberOfSessions: research.numberOfSessions,
      sessionDuration: {
        hours: research.sessionDuration.hours,
        minutes: research.sessionDuration.minutes,
      },
      participantsElders: research.participantsElders,
      participantsResearchers: [],
      algorithm: research.algorithm,
    };

    research.participantsResearchers.forEach((researcher) => {
      details.participantsResearchers.push(researcher.label);
    });

    return details;
  }

  setResearch = (selectedResearch) => {
    this.getResearchDetails(selectedResearch.label).then((result) => {
      this.setState({
        researchToView: selectedResearch,
        researchDetails: result,
        researchName: selectedResearch.label,
      });
    });
  };

  eldersGrid(isInit, researchName, researchDetails) {
    if (isInit) {
      var details = this.getDetials(researchDetails);
      let eldersCollection = collect(details.participantsElders);
      let userData = [];
      let temp = {};
      eldersCollection.each((elder) => {
        this.getElderDetails(elder.value).then((result) => {
          temp = {
            ResearchName: researchName,
            FirstName: result.firstName,
            LastName: result.lastName,
            YearAtTwenty: result.yearAtTwenty,
            Sessions: result.sessions,
          };
          userData.push(temp);
        });
      });
      return (
        <ResearchCard
          key={researchName}
          data={researchDetails}
          userdata={userData}
        ></ResearchCard>
      );
    }
  }

  viewResearch(isInit) {
    if (isInit) {
      var details = this.getDetials(this.state.researchDetails);
      return (
        <div>
          <div
            className="wrap-input100 validate-input"
            data-validate="Name is required"
          >
            <div className="view-research-grid">
              <span className="label-input100">
                Start Date: {details.startDate.toLocaleDateString("fr")}{" "}
              </span>
              <span className="label-input100">
                End Date: {details.endDate.toLocaleDateString("fr")}{" "}
              </span>

              <span className="label-input100">
                Algorithm: {details.algorithm}{" "}
              </span>
            </div>
            <br></br>
            <div
              className="wrap-input100 validate-input"
              data-validate="Name is required"
            >
              <div className="view-research-grid">
                <span className="label-input100">
                  Number Of Sessions: {details.numberOfSessions}{" "}
                </span>
                <span className="label-input100">
                  Session Duration: {details.sessionDuration.hours} hours,{" "}
                  {details.sessionDuration.minutes} minutes{" "}
                </span>
              </div>
            </div>
            <span className="label-input100">Participants Elders </span>

            {this.eldersGrid(
              this.state.researchName.length != 0 ? true : false,
              this.state.researchName,
              this.state.researchDetails
            )}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div className="container-researcher-edit" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              View Research Details
            </span>
            <div className="wrap-input100 input100-select">
              <span className="label-input100">Choose research to view </span>

              <div>
                <Select
                  options={this.state.researchesName}
                  onChange={this.setResearch}
                  value={this.state.researchToView}
                />
              </div>
              <span className="focus-input100"></span>
            </div>
            {this.viewResearch(
              this.state.researchName.length != 0 ? true : false,
              this.state.sessionDuration
            )}

            <div className="container-contact100-back-btn">
              <div className="wrap-contact100-back-btn" style={{ zIndex: 0 }}>
                <div className="contact100-back-bgbtn"></div>
                <button
                  id="main"
                  type="button"
                  className="contact100-back-btn"
                  onClick={() => {
                    loadPage(this.props, "researcher", this.state.user,this.state.user);
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
