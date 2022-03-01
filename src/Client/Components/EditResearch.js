import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { loadPage } from "./ManagerComponents";

export default class EditResearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      researchToEdit: [],
      researchesOptions: [],
      //   allResearches: [{value: "tomer", label: "tomer"}],
      // optionSelected: null,
      //   researchName: "",
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   sessionDuration: { hours: 0, minutes: 0, seconds: 0 },
      //   participantsElders: [],
      //   participantsResearchers: [],
      //   currentAlgorithm: "",
    };
  }

  componentDidMount() {
    this.getAllResearches().then((result) => {
      this.setState({
        researchesOptions: result,
      });
    });
  }

  async getAllResearches() {
    var res = await axios.get(
      "http://localhost:5000/researcher/getAllResearches/"
    );
    let researches = [];
    res.data.forEach((research) => {
      // { value: 'user', label: 'Elder' }
      researches.push({
        value: research._id,
        label: research.researchName,
      });
    });
    return researches;
  }

  setResearch = (selectedResearch) => {
    this.setState({
      researchToEdit: selectedResearch,
    });
  };

  move = () => {};

  render() {
    return (
      <div>
        <div className="container-contact100" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              Edit Research
            </span>
            <div className="wrap-input100 input100-select">
              <span className="label-input100">Choose research to edit </span>

              <div>
                <Select
                  options={this.state.researchesOptions}
                  onChange={this.setResearch}
                  value={this.state.researchToEdit}
                />
              </div>
              <span className="focus-input100"></span>
            </div>
          </div>
        </div>
        {console.log(this.state.researchToEdit.label)}
        {/* {this.state.researchToEdit.length != 0 &&
          loadPage(
            this.props,
            "researcher/edit-research/" + this.state.researchToEdit.label,
            this.state.user
          )} */}
      </div>
    );
  }
}
