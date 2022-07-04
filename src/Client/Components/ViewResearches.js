import { Component } from "react";
import MediaCard from "./MediaCard";
import { loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import { url } from "./AllPages";
import ResearchCard from "./ResearchCard";
// import { Select } from "@mui/material";
import Select from "react-select";
import collect from "collect.js";
const ExcelJS = require("exceljs");
import { saveAs } from "file-saver";

/*diagram*/

import ColumnChartwithIndexlabel from "../Diagrams/views/overview/Column Chart with Indexlabel";
import ChartWithCrosshair from "../Diagrams/views/overview/Chart with Crosshair";
import ChartWithZoom from "../Diagrams/views/overview/Chart with Zoom";
import AnimatedChart from "../Diagrams/views/overview/Animated Chart";
import MultiseriesChart from "../Diagrams/views/overview/Multiseries Chart";
import MultipleAxisChart from "../Diagrams/views/overview/Multiple Axis Chart";
import ChartWithScaleBreaks from "../Diagrams/views/overview/Chart with Scale Breaks";
import ChartWithLogarithmicAxis from "../Diagrams/views/overview/Chart with Logarithmic Axis";
import PerformanceDemo from "../Diagrams/views/overview/Performance Demo";
import ChartWithDrillDown from "../Diagrams/views/overview/Chart with Drilldown";

import LineChart from "../Diagrams/views/line charts/Line Chart";
import SplineChart from "../Diagrams/views/line charts/Spline Chart";
import StepLineChart from "../Diagrams/views/line charts/Step Line Chart";

import AreaChart from "../Diagrams/views/area charts/Area Chart";
import MultiSeriesAreaChart from "../Diagrams/views/area charts/Multi Series Area Chart";
import SplineAreaChart from "../Diagrams/views/area charts/Spline Area Chart";
import StepAreaChart from "../Diagrams/views/area charts/Step Area Chart";
import RangeAreaChart from "../Diagrams/views/area charts/Range Area Chart";
import RangeSplineAreaChart from "../Diagrams/views/area charts/Range Spline Area Chart";
import StackedAreaChart from "../Diagrams/views/area charts/Stacked Area Chart";
import StackedArea100Chart from "../Diagrams/views/area charts/Stacked Area 100 Chart";

import ColumnChart from "../Diagrams/views/column charts/Column Chart";
import BarChart from "../Diagrams/views/column charts/Bar Chart";
import RangeColumnChart from "../Diagrams/views/column charts/Range Column Chart";
import StackedColumnChart from "../Diagrams/views/column charts/Stacked Column Chart";
import StackedColumn100Chart from "../Diagrams/views/column charts/Stacked Column 100 Chart";
import RangeBarChart from "../Diagrams/views/column charts/Range Bar Chart";
import StackedBarChart from "../Diagrams/views/column charts/Stacked Bar Chart";
import StackedBar100Chart from "../Diagrams/views/column charts/Stacked Bar 100 Chart";
import WaterfallChart from "../Diagrams/views/column charts/Waterfall Chart";

import PieChart from "../Diagrams/views/pie & funnel charts/Pie Chart";
import PieChartWithCustomization from "../Diagrams/views/pie & funnel charts/Pie Chart with Customization";
import DoughnutChart from "../Diagrams/views/pie & funnel charts/Doughnut Chart";
import FunnelChart from "../Diagrams/views/pie & funnel charts/Funnel Chart";
import FunnelChartWithCustomNeck from "../Diagrams/views/pie & funnel charts/Funnel Chart with Custom Neck";
import PyramidChart from "../Diagrams/views/pie & funnel charts/Pyramid Chart";

import CandlestickChart from "../Diagrams/views/financial charts/Candlestick Chart";
import OhlcChart from "../Diagrams/views/financial charts/OHLC Chart";

import ScatterChart from "../Diagrams/views/scatter & bubble charts/Scatter Chart";
import ScatterChartWithCustomMarkers from "../Diagrams/views/scatter & bubble charts/Scatter Chart with Custom Markers";
import BubbleChart from "../Diagrams/views/scatter & bubble charts/Bubble Chart";

import BoxAndWhiskerChart from "../Diagrams/views/box & whisker charts/Box & Whisker Chart";
import BoxAndWhiskerChartWithCustomization from "../Diagrams/views/box & whisker charts/Box & Whisker Chart with Customization";

import ErrorChart from "../Diagrams/views/combination charts/Error Chart";
import ErrorLineChart from "../Diagrams/views/combination charts/Error Line Chart";
import ParetoChart from "../Diagrams/views/combination charts/Pareto Chart";
import ColumnLineAreaChart from "../Diagrams/views/combination charts/Column Line Area Chart";

/*diagram*/

var currentUser = {};

export default class ViewResearches extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      user: props.location.data,
      researchesName: [],
      researches: [],
      researchToView: {},
      researchDetails: {},
      sessions: [],
      researchName: "",
      currentResearcherDetails: {},
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

    await axios
      .get(url + "/researcher/getResearcherDetails/" + currentUser._id)
      .then((result) => {
        this.setState({ currentResearcherDetails: result.data });
      });

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
      algorithm: research.currentSession,
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
      let elders = researchDetails.participantsElders;
      let eldersCollection = collect(details.participantsElders);
      let userData = [];
      let temp = {};
      let ID = 1;
      let playlists = [];

      userData = new Promise((resolve, reject) => {
        let arra = [];
        eldersCollection.each(async (elder, index, arr) => {
          await this.getElderDetails(elder.value).then((result) => {
            // playlists = result.playlists.slice(0, result.playlists.length - 2);
            temp = {
              ID: ID,
              ResearchName: this.state.researchName,
              FirstName: result.firstName,
              LastName: result.lastName,
              BirthYear: parseInt(result.yearAtTwenty) - 20,
              Playlists: result.playlists,
              Sessions: result.sessions,
            };
            ID++;
            arra.push(temp);
          });
          if (arr.length - 1 === index) {
            resolve(arra);
          }
        });
      });
      console.log(userData);
      ID = 1;
      return (
        <ResearchCard
          key={this.state.researchName}
          data={researchDetails}
          userdata={userData}
          onExport={this.createExcelWorkbook}
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
                {console.log(this.state.researchDetails)}
                {console.log(this.state.currentResearcherDetails)}

                <span
                  className="edit-research-btn-label"
                  hidden={
                    this.state.currentResearcherDetails.isViewerResearcher &&
                    this.state.currentResearcherDetails.first_name !==
                      this.state.researchDetails.creator.first_name &&
                    this.state.currentResearcherDetails.last_name !==
                      this.state.researchDetails.creator.last_name
                  }
                >
                  Edit Research:{" "}
                  {
                    <button
                      className="edit-research-btn"
                      onClick={(e) => {
                        loadPage(
                          this.props,
                          "researcher/edit-research/",
                          this.state.user,
                          this.state.researchName
                        );
                      }}
                    >
                      edit
                    </button>
                  }{" "}
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

  async createExcelWorkbook(event) {
    let researchName = event[0].data.ResearchName;
    let userData = [];

    event.forEach((elder) => {
      userData.push({
        FirstName: elder.data.FirstName,
        LastName: elder.data.LastName,
        BirthYear: elder.data.BirthYear,
        Playlists: elder.data.Playlists.join(","),
        Sessions: elder.data.Sessions[elder.data.ResearchName].sessions,
      });
    });

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(researchName + " participants details");
    sheet.columns = [
      { header: "FirstName", key: "FirstName", width: 15 },
      { header: "LastName", key: "LastName", width: 15 },
      {
        header: "BirthYear",
        key: "BirthYear",
        width: 15,
        outlineLevel: 1,
      },
      { header: "Playlists", key: "Playlists" },
      { header: "", key: "nothing", width: 50 },
      { header: "", key: "nothing", width: 50 },
      { header: "", key: "nothing" },
    ];
    sheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "87CEFA" },
        bgColor: { argb: "87CEFA" },
      };
      cell.protection = {
        locked: false,
      };
    });
    sheet.mergeCells("D1:G1");
    userData.forEach((user) => {
      sheet
        .addRow([
          user.FirstName,
          user.LastName,
          user.BirthYear,
          user.Playlists,
          "",
          "",
          "",
        ])
        .eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E6E6FA" },
            bgColor: { argb: "E6E6FA" },
          };
          cell.alignment = {
            vertical: "middle",
            horizontal: "center",
          };
        });
      sheet.mergeCells(
        "D" + sheet.lastRow.number + ":" + "G" + sheet.lastRow.number
      );
      sheet.getCell("D" + sheet.lastRow.number).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      sheet
        .addRow([user.FirstName, "", "", "Session", "", "", ""])
        .eachCell((cell) => {
          if (cell.col === 1) {
            cell.font = {
              color: { argb: "FFFFFF" },
            };
          }
          if (cell.col > 3)
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "ADD8E6" },
              bgColor: { argb: "ADD8E6" },
            };
        });

      user.Sessions.forEach((s, i) => {
        sheet
          .addRow([user.FirstName, "", "", "   " + (i + 1) + ":", "", "", ""])
          .eachCell((cell) => {
            if (cell.col === 1) {
              cell.font = {
                color: { argb: "FFFFFF" },
              };
              cell.protection = {
                locked: true,
              };
            } else
              cell.protection = {
                locked: false,
              };
            if (cell.col > 3)
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "ADD8E6" },
                bgColor: { argb: "ADD8E6" },
              };
          });
        sheet
          .addRow([
            user.FirstName,
            "",
            "",
            "",
            "Origin Title",
            "Origin Artist Name",
            "Score",
          ])
          .eachCell((cell) => {
            if (cell.col === 1) {
              cell.font = {
                color: { argb: "FFFFFF" },
              };
            }
            if (cell.col > 4) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "4682B4" },
                bgColor: { argb: "4682B4" },
              };
            }
          });
        s.map((se) => {
          sheet
            .addRow([
              user.FirstName,
              "",
              "",
              "",
              se.originTitle,
              se.originArtistName,
              se.score,
            ])
            .eachCell((cell) => {
              if (cell.col === 1) {
                cell.font = {
                  color: { argb: "FFFFFF" },
                };
              }
            });
        });
        sheet.lastRow.eachCell((cell) => {
          if (cell.col <= 7) {
            cell.border = {
              bottom: { style: "thin" },
            };
          }
        });
      });
    });

    const col4 = sheet.getColumn(4);
    const col5 = sheet.getColumn(5);
    const col6 = sheet.getColumn(6);
    const col7 = sheet.getColumn(7);

    col4.eachCell((cell) => {
      if (
        cell.value !== "Sessions" &&
        cell.value !== null &&
        cell.value.length === 2
      ) {
        cell.alignment = { vertical: "middle", horizontal: "left" };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "ADD8E6" },
          bgColor: { argb: "ADD8E6" },
        };
      }
      if (cell.value === "Origin Title") {
        cell.alignment = { vertical: "middle", horizontal: "center" };
      }
    });

    col5.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left" };
    });

    col6.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left" };
    });

    col7.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "left" };
      if (cell.border === undefined) {
        cell.border = {
          right: { style: "thin" },
        };
      } else {
        cell.border = {
          right: { style: "thin" },
          bottom: { style: "thin" },
        };
      }
    });

    sheet.autoFilter = {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: sheet.lastRow,
        column: 1,
      },
    };

    sheet.protect("", {
      selectLockedCells: true,
      selectUnlockedCells: true,
      formatCells: false,
      autoFilter: true,
    });
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        researchName + ".xlsx"
      );
    });
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
                    loadPage(
                      this.props,
                      "researcher",
                      this.state.user,
                      this.state.user
                    );
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
