import React, { Component } from "react";
import CanvasJSReact from "../Diagrams/assets/canvasjs.react";
import "./portal.css";
import BarChart from "../Diagrams/views/column charts/Bar Chart";
import MultiseriesChart from "../Diagrams/views/overview/Multiseries Chart";
import PieChart from "../Diagrams/views/pie & funnel charts/Pie Chart";

const type = {
  spline: "spline",
  line: "line",
  stepLine: "stepLine",
  bar: "bar",
  column: "column",
  stackedColumn: "stackedColumn",
  pie: "pie",
};

var table = {};
var love = {
  data: [],
  type: type.column,
  text: { title: "Songs Love", axisX: "Name elders", axisY: "Number Songs" },
};
var hate = {
  data: [],
  type: type.column,
  text: {
    title: "Songs not like",
    axisX: "Name elders",
    axisY: "Number Songs",
  },
};
var notRated = {
  data: [],
  type: type.column,
  text: {
    title: "Songs not rated",
    axisX: "Name elders",
    axisY: "Number Songs",
  },
};
var notlisten = {
  data: [],
  type: type.column,
  text: {
    title: "Songs not listen",
    axisX: "Name elders",
    axisY: "Number Songs",
  },
};
var songRated = {
  data: [],
  type: type.spline,
  text: { title: "Songs Rated", axisX: "Number song", axisY: "Number rated" },
};
var optionPie = {
  data: [],
  type: type.pie,
  text: { title: "Playlist", axisX: "Number song", axisY: "Number rated" },
};

var usersDataView = [];

class PortalData extends Component {
  constructor(props) {
    super(props);
  }

  CreateChartData(DataView, index) {
    console.log(DataView);
    let data = DataView.map((item) => {
      return { y: item[index], label: item.fullName };
    });
    return data;
  }

  CreateChartDataLine(DataView, type) {
    console.log(DataView);
    var el = DataView.map((item) => {
      let sessions = [];

      for (var i = 0; i < item.sessions[0].length; i++) {
        sessions.push({
          y: item.sessions[0][i].score,
          label: "song " + (i + 1),
        });
      }
      let option = {
        type: type,
        name: item.fullName,
        showInLegend: true,
        dataPoints: sessions,
      };
      return option;
    });

    return el;
  }

  CreatePieChartData(data) {
    let options = [];
    Object.entries(data).map((item) => {
      options.push({ y: item[1] + "", label: item[0] + "" });
      return;
    });

    return options;
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log("componentWillReceiveProps");
    table = nextProps.table;
    usersDataView = nextProps.usersDataView;
    love.data = this.CreateChartData(usersDataView, "numberSongLike");
    hate.data = this.CreateChartData(usersDataView, "numberSongDisLike");
    notRated.data = this.CreateChartData(usersDataView, "numberSongNotRated");
    notlisten.data = this.CreateChartData(usersDataView, "numberSongNotlisten");
    songRated.data = this.CreateChartDataLine(usersDataView, type.spline);
    optionPie.data = this.CreatePieChartData(table.playlist);
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <table>
              <th>
                <tr>
                  <td>Number Of Songs Are Selected</td>
                  <td>{table.numberOfSong}</td>
                </tr>
                <tr>
                  <td>Number Songs Are Liked</td>
                  <td>{table.numberSongLike}</td>
                </tr>
                <tr>
                  <td>Number Songs Are Not Liked</td>
                  <td>{table.numberSongDisLike}</td>
                </tr>
                <tr>
                  <td>Number Song That Not Rated</td>
                  <td>{table.numberSongNotRated}</td>
                </tr>
                <tr>
                  <td>Number Song That Not listen</td>
                  <td>{table.numberSongNotlisten}</td>
                </tr>
                <tr>
                  <td>numberElder</td>
                  <td>{table.numberElder}</td>
                </tr>
              </th>
            </table>
          </div>

          {/*<CanvasJSChart options = {options1}/>*/}
          {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
        <div>
          <MultiseriesChart data={songRated} />
        </div>
        <div>
          <PieChart data={optionPie} />
        </div>
        <div>
          <BarChart data={love} />
        </div>
        <div>
          <BarChart data={hate} />
        </div>
        <div>
          <BarChart data={notRated} />
        </div>
        <div>
          <BarChart data={notlisten} />
        </div>
        x
      </div>
    );
  }
}

export default PortalData;
