import axios from "axios";
import { Component } from "react";
import { url } from "./AllPages";

export default class EditResearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researchToEdit: this.props.research,
      // optionSelected: null,
      // researchName: "",
      // startDate: new Date(),
      // endDate: new Date(),
      // sessionDuration: { hours: 0, minutes: 0, seconds: 0 },
      // participantsElders: [],
      // participantsResearchers: [],
      // currentAlgorithm: "",
    };
  }

  async componentDidMount() {
    // console.log(this.props.research);
    
  }
  async componentDidUpdate(){
    console.log(this.props.research);

  }

 

  render() {
    return <div>
      <h1>tomer</h1>
    </div>;
  }
}
