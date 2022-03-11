import React, { Component } from "react";

import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";

import { url } from "./AllPages";

import axios from "axios";
import collect from "collect.js";

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
      Session: i,
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

const elders = [];
// const temp;

export default class ResearchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   user: props.location.data,
      researchName: props.researchName,
      researchDetails: props.data,
      participantsElders: props.data.participantsElders,
      eldersDetails: [],
      userData: props.userdata,
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <DataGrid
        id="grid-container"
        dataSource={this.state.userData}
        keyExpr="FirstName"
        showBorders={true}
      >
        <Column dataField="FirstName" caption="First Name" />
        <Column dataField="LastName" caption="Last Name" />
        <Column
          dataField="YearAtTwenty"
          width={125}
          dataType="number"
          cssClass="grid-col-right"
        />
        <MasterDetail
          enabled={true}
          component={sessionsGrid}
          data={this.state.userData.Sessions + this.state.researchName}
        />
      </DataGrid>
    );
  }
}
