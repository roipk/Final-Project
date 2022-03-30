import React, { Component } from "react";
import { loadPage, verifyUser } from "./ManagerComponents";
import Select from "react-select";
import collect from "collect.js";
import axios from "axios";
import { url } from "./AllPages";
const ExcelJS = require("exceljs");
import { saveAs } from "file-saver";
var currentUser = {};

import ViewResearches from "./ViewResearches";

export default class ExportData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      researches: [],
      researchesOptions: [],
      researchToExport: {},
    };
  }

  async componentDidMount() {
    currentUser = await verifyUser("admin");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
      return;
    }

    await this.getAllResearches();
  }

  async getAllResearches() {
    // console.log(currentUser)
    var res = await axios.get(url + "/researcher/getAllResearches");
    let researches = [];

    res.data.forEach((research) => {
      researches.push({
        value: research._id,
        label: research.researchName,
      });
    });
    // console.log(res.data);
    this.setState({
      researchesOptions: researches,
      researches: res.data,
    });
    // console.log(researches);
  }

  setResearch = (selectedResearch) => {
    let researchToExport = this.state.researches.find((research) => {
      if (research.researchName === selectedResearch.label) return research;
    });

    // console.log(researchToExport);
    this.setState({
      researchToExport: researchToExport,
    });
  };

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

  async createExcelWorkbook(event) {
    event.preventDefault();

    let participantsElders = this.state.researchToExport.participantsElders;
    let eldersCollection = collect(participantsElders);
    console.log(this.state.researchToExport);
    let researchName = this.state.researchToExport.researchName;
    let userData = [];
    let temp = {};
    Promise.all(
      participantsElders.map(async (elder) => {
        await new Promise((resolve) => {
          this.getElderDetails(elder.value).then((result) => {
            temp = {
              // ResearchName: researchName,
              FirstName: result.firstName,
              LastName: result.lastName,
              YearAtTwenty: result.yearAtTwenty,
              Sessions: result.sessions,
            };
            resolve(temp);
          });
        }).then((res) => userData.push(res));
      })
    ).then(() => {
      console.log(userData);
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Tomer");
      sheet.columns = [
        { header: "FirstName", key: "FirstName", width: 15 },
        { header: "LastName", key: "LastName", width: 15 },
        {
          header: "YearAtTwenty",
          key: "YearAtTwenty",
          width: 15,
          outlineLevel: 1,
        },
        { header: "Sessions", key: "Sessions", width: 10 },
        { header: "", key: "nothing", width: 50 },
        { header: "", key: "nothing", width: 50 },

      ];
      userData.forEach((user) => {
        sheet.addRow([user.FirstName, user.LastName, user.YearAtTwenty]);
        user.Sessions[researchName].sessions.forEach((s, i) => {
          sheet.addRow(["", "", "", i + 1 +":", "Origin Title", "Origin Artist Name"] );
          s.map((se) => {
            sheet.addRow(["", "", "", "", se.originTitle, se.originArtistName]);
          });
        });
      });

      const col5 = sheet.getColumn(5);
      const col6 = sheet.getColumn(6);

      col5.eachCell(cell =>{
        if(cell.value === "Origin Title")
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          else
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
      })

      col6.eachCell(cell =>{
        if(cell.value === "Origin Artist Name")
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          else
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
      })
      // sheet.getCell('E3').alignment = { vertical: 'middle', horizontal: 'center' };

     

      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "Test.xlsx"
        );
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container-researcher-edit" style={{ zIndex: -1 }}>
          <div className="wrap-contact1100" style={{ zIndex: 0 }}>
            <span className="contact100-form-title" translate="yes" lang="he">
              Export Research Data
            </span>
            <div className="wrap-input100 input100-select">
              <span className="label-input100">Choose research to view </span>

              <div>
                <Select
                  options={this.state.researchesOptions}
                  onChange={this.setResearch}
                  value={this.state.researchToView}
                />
              </div>
              <span className="focus-input100"></span>
            </div>

            {/* {this.viewResearch(
              this.state.researchName.length != 0 ? true : false,
              this.state.sessionDuration
            )} */}
            <div className="wrap-contact100-back-btn" style={{ zIndex: 0 }}>
              <button onClick={(e) => this.createExcelWorkbook(e)}>
                export
              </button>
            </div>
            <div className="container-contact100-back-btn">
              <div className="wrap-contact100-back-btn" style={{ zIndex: 0 }}>
                <div className="contact100-back-bgbtn"></div>
                <button
                  id="main"
                  type="button"
                  className="contact100-back-btn"
                  onClick={() => {
                    loadPage(this.props, "admin", this.state.user);
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
