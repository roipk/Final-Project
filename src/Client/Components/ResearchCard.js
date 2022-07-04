import React, { Component } from "react";

import DataGrid, {
  Column,
  Export,
  MasterDetail,
  FilterRow,
} from "devextreme-react/data-grid";
import PieChart from "../Diagrams/views/pie & funnel charts/Pie Chart";

const sessionDetailsGrid = (props) => {
  var songs = props.data.data.SessionSongs;
  var data = [];
  var temp = {};
  for (var i = 0; i < songs.length; i++) {
    temp = {
      OriginTitle: songs[i].originTitle,
      OriginArtistName: songs[i].originArtistName,
      Score: songs[i].score,
    };
    data.push(temp);
  }

  return (
    <DataGrid
      id="grid-container"
      dataSource={data}
      keyExpr="OriginTitle"
      showBorders={true}
    >
      <FilterRow visible={true} />

      <Column
        dataField="OriginTitle"
        caption="Origin Title"
        cssClass="grid-col-right"
      />
      <Column
        dataField="OriginArtistName"
        caption="Origin Artist Name"
        cssClass="grid-col-right"
      />
      <Column
        dataField="Score"
        caption="Score"
        cssClass="grid-col-right"
        dataType="number"
      />
    </DataGrid>
  );
};

const sessionsGrid = (props) => {
  var name = props.data.data.ResearchName;
  var sessions = props.data.data.Sessions[name].sessions;

  var data = [];
  var temp = {};
  for (var i = 0; i < sessions.length; i++) {
    temp = {
      ID: i,
      Session: i + 1,
      SessionSongs: sessions[i],
    };

    data.push(temp);
  }

  return (
    <DataGrid
      id="grid-container"
      dataSource={data}
      keyExpr="ID"
      showBorders={true}
    >
      <Column dataField="Session" caption="Session" cssClass="grid-col-right" />
      <MasterDetail enabled={true} component={sessionDetailsGrid} />
    </DataGrid>
  );
};
export default class ResearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researchName: this.props.data.researchName,
      researchDetails: this.props.data,
      participantsElders: this.props.data.participantsElders,
      eldersDetails: [],
      userData: [],
      currentData: [],
      onExport: this.props.onExport,
    };
  }
  async componentDidMount() {
    this.props.userdata.then((value) => {
      console.log(value);
      this.setState({
        userData: value,
      });
    });
  }

  export = (e) => {
    console.log(e);
    e.cancel = true;
    let dataToExport = e.component.getVisibleRows();
    this.props.onExport(dataToExport);
  };
  currentData = (e) => {
    console.log("0");
    console.log(e);
  };
  currentData1(e) {
    console.log("1");
    console.log(e.component.getVisibleRows());
    var currentData = e.component.getVisibleRows();
    var dat = [];

    currentData.forEach((d) => {
      let isLargeNumber = (element) => element.label === d.data.BirthYear;
      let exsist = dat.findIndex(isLargeNumber);
      if (exsist < 0) {
        dat.push({ y: 1, label: d.data.BirthYear });
      } else {
        dat[exsist].y += 1;
      }
      dat.sort((a, b) => {
        return b.label - a.label;
      });
      this.setState({ currentData: dat });
    });
  }

  render() {
    return (
      <div>
        <DataGrid
          id="grid-container"
          dataSource={this.state.userData}
          keyExpr="ID"
          showBorders={true}
          remoteOperations={true}
          wordWrapEnabled={true}
          onExporting={this.export}
          onFocusedCellChanging={this.currentData}
          // onFocusedCellChanging={(e)=>this.currentData1(e)}
        >
          <FilterRow visible={true} />
          <Column dataField="FirstName" caption="First Name" width={100} />
          <Column dataField="LastName" caption="Last Name" width={100} />
          <Column
            dataField="BirthYear"
            caption="Birth Year"
            width={80}
            dataType="number"
            cssClass="grid-col-right"
          />
          <Column dataField="Playlists" caption="Playlists" />

          <MasterDetail
            enabled={true}
            component={sessionsGrid}
            data={this.state.userData.Sessions + this.state.researchName}
          />
          <Export enabled={true} />
        </DataGrid>
      </div>
    );
  }
}
