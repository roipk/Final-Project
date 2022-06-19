// DownloadUserCSVButton
// import { CSVLink } from "react-csv";
// import axios from "axios";
// import {url} from "../AllPages";
// import React from "react";
//
// export default class
//     extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             listOfData: [],
//             loading: false
//         };
//     }
//
//     getData = async (event, done) => {
//         if(!this.state.loading) {
//             this.setState({
//                 loading: true
//             });
//             axios.get(
//                 url + "/MusicGuide/getAllSongsForDebug/"
//             ).then(async(res) =>
//             {
//                 var data = res.data
//                 var DataReport = []
//                 await data.forEach(song => {
//                     DataReport.push({
//                         Oid: song.Oid,
//                         artistName: song.artistName,
//                         isBrokenLink: song.isBrokenLink,
//                         isLowQualitySound: song.isLowQualitySound,
//                         isLowQualityVideo: song.isLowQualityVideo,
//                         isNoSound: song.isNoSound,
//                         isNoVideo: song.isNoVideo,
//                         playlist: song.playlist,
//                         playlistComments: song.playlistComments,
//                         songComments: song.songComments,
//                         title: song.title,
//                         year: song.year,
//                         videoId: song.youtube.videoId,
//                         _id: song._id,
//                     })
//                 })
//                 this.setState({
//                     listOfData: DataReport,
//                     loading: false
//                 });
//                 done(true);
//
//             }).catch(() => {
//                 this.setState({
//                     loading: false
//                 });
//                 done(false);
//             });
//         }
//     }
//
//     dataFromListOfUsersState = () => {
//         return this.state.listOfData;
//     }
//
//     render() {
//         const {loading} = this.state;
//         // return <CSVLink
//         //     // data={this.dataFromListOfUsersState}
//         //     // asyncOnClick={true}
//         //     // onClick={this.getData}
//         //     filename={"Songs Report.csv"}  target="_blank"
//         // >
//         //     {loading ? 'Loading csv...' : 'Download me'}
//         // </CSVLink>;
//         return <div>
//             <CSVLink
//                 data={data}
//                 asyncOnClick={true}
//                 onClick={(event, done) => {
//                     axios.post("/spy/user").then(() => {
//                         done();
//                     });
//                 }}
//             >
//                 Download me
//             </CSVLink>;
//         </div>
//     }
// }
import React, { Component } from "react";

import DataGrid, {
    Column,
    Export,
    MasterDetail,
    FilterRow,
} from "devextreme-react/data-grid";
// import PieChart from "../Diagrams/views/pie & funnel charts/Pie Chart";

const sessionDetailsGrid = (props) => {
    // var songs = props.data.data.SessionSongs;
    // var data = [];
    // var temp = {};
    // for (var i = 0; i < songs.length; i++) {
    //     temp = {
    //         OriginTitle: songs[i].originTitle,
    //         OriginArtistName: songs[i].originArtistName,
    //         Score: songs[i].score,
    //     };
    //     data.push(temp);
    // }
    var songs = props.data.data.listOfData;
    var data = [];
    var temp = {};
    for (var i = 0; i < songs.length; i++) {
        temp = {
            Oid: song[i].Oid,
            artistName: song[i].artistName,
            isBrokenLink: song[i].isBrokenLink,
            isLowQualitySound: song[i].isLowQualitySound,
            isLowQualityVideo: song[i].isLowQualityVideo,
            isNoSound: song[i].isNoSound,
            isNoVideo: song[i].isNoVideo,
            playlist: song[i].playlist,
            playlistComments: song[i].playlistComments,
            songComments: song[i].songComments,
            title: song[i].title,
            year: song[i].year,
            videoId: song[i].youtube.videoId,
            _id: song[i]._id,
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
                dataField="Oid"
                caption="Oid"
                cssClass="grid-col-right"
                // dataType="number"
            />
             <Column
                dataField="artistName"
                caption="artistName"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="isBrokenLink"
                caption="isBrokenLink"
                cssClass="grid-col-right"
                // dataType="number"
            />
              <Column
                dataField="isLowQualitySound"
                caption="isLowQualitySound"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="isLowQualityVideo"
                caption="isLowQualityVideo"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="isNoSound"
                caption="isNoSound"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="isNoVideo"
                caption="isNoVideo"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="playlist"
                caption="playlist"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="playlistComments"
                caption="playlistComments"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="songComments"
                caption="songComments"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="title"
                caption="title"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="year"
                caption="year"
                cssClass="grid-col-right"
                dataType="number"
            />
            <Column
                dataField="videoId"
                caption="videoId"
                cssClass="grid-col-right"
                // dataType="number"
            />
            <Column
                dataField="_id"
                caption="_id"
                cssClass="grid-col-right"
                // dataType="number"
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
            currentData:[],
            onExport: this.props.onExport,
        };
    }
    async componentDidMount() {
        this.props.userdata.then((value) => {
            this.setState({
                userData: value,
            });
        });
    }

    export = (e) => {
        console.log(e)
        e.cancel = true;
        let dataToExport = e.component.getVisibleRows();
        this.props.onExport(dataToExport);
    };
    currentData= (e) => {
        console.log("0")
        console.log(e)

    }
    currentData1(e){
        console.log("1")
        console.log(e.component.getVisibleRows())
        var currentData = e.component.getVisibleRows()
        var dat = []

        currentData.forEach((d) =>  {
            let isLargeNumber = (element) => element.label === d.data.BirthYear;
            let exsist = dat.findIndex(isLargeNumber);
            if(exsist<0)
            {
                dat.push({ y: 1, label:  d.data.BirthYear })
            }
            else
            {
                dat[exsist].y+=1
            }
            dat.sort((a, b) => {
                return b.label - a.label;
            });
            this.setState({currentData:dat})
        })

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
                    onFocusedCellChanging={(e)=>this.currentData1(e)}
                >
                    <FilterRow visible={true}/>
                    <Column dataField="FirstName" caption="First Name" width={100}  />
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
