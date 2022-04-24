import React, { Component } from "react";

import DataGrid, {
  Column,
  MasterDetail,
  Export,
} from "devextreme-react/data-grid";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

let test = [];


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
      Session: i+1,
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
    this.onExporting = this.onExporting.bind(this);
    this.state = {
      //   user: props.location.data,
      researchName: props.researchName,
      researchDetails: props.data,
      participantsElders: props.data.participantsElders,
      eldersDetails: [],
      userData: props.userdata,
    };
  }
  async componentDidMount() {
    
   test = this.props.userdata
   this.setState({
    userData: test,
  });
  }

  onExporting(e) {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");

    exportDataGrid({
      // component: this,
      //   component: sessionDetailsGrid,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
    e.cancel = true;
  }

  render() {
    // {console.log( this.state.userData)}
    // {console.log( employees)}
    // {console.log("render")}
    
    return (
      <DataGrid
        id="grid-container"
        dataSource={test}
        keyExpr="ID"
        showBorders={true}
        remoteOperations={true}
        wordWrapEnabled={true}
        onExporting={this.onExporting}
      >
        <Column dataField="FirstName" caption="First Name" width={100} />
        <Column dataField="LastName" caption="Last Name" width={100}/>
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
        {/* <Export enabled={true} allowExportSelectedData={false} /> */}
      </DataGrid>
    );
  }
}
