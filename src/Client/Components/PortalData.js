import React, { Component } from 'react';
import CanvasJSReact from '../Diagrams/assets/canvasjs.react';
import collect from "collect.js";
import ResearchCard from "./ResearchCard";
import axios from "axios";
import {url} from "./AllPages";
import "./portal.css"
import {forEach} from "react-bootstrap/ElementChildren";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var status=""
var optionsData = []
var optionPie=[]
var table={}
var newOp=[]
class PortalData extends Component {
    constructor(props) {
        super(props);

        optionsData = this.Elders(props.elders)
       this.getElderData(props.elders,props.elderDataSong).then(res=>{
           optionPie = res
        })
        status = props.status
        newOp = props.op
        table = props.table
    }

    eldersGrid(researchName, researchDetails) {
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
                        playlists = result.playlists.slice(0, result.playlists.length - 2);
                        temp = {
                            ID: ID,
                            ResearchName: this.state.researchName,
                            FirstName: result.firstName,
                            LastName: result.lastName,
                            BirthYear: parseInt(result.yearAtTwenty) - 20,
                            Playlists: playlists,
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
            ID = 1;
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

    async getElderDetails(elderOid) {
        var res = await axios.get(url + "/researcher/getUserSessions/" + elderOid);
        return res.data;
    }



    async getResearchDetails(researchName) {
        var res = await axios.get(
            url + "/researcher/getResearchByName/" + researchName
        );
        return res.data[0];
    }

    async getElderData(elders,participantsEldersInfo)
    {

        table.numberOfSong = 0
        table.numberSongLike = 0
        table.numberSongDisLike = 0
        table.numberSongNotRated = 0
        table.numberSongNotlisten = 0
        table.numberElder = elders.length
        table.playlist = {}
        await participantsEldersInfo.map(async(data)=>{
            let found = false
            elders.some(element=>{
                if(element.value === data.user) {
                    found = true
                    return
                }
            })
            if(!found)
                return
            await data.researchDataUser.sessions.map(async songs=>{
                await songs.map(song=>{
                    table.numberOfSong++
                    if(song.score > 3)
                        table.numberSongLike++
                    else if(song.score < 3 && song.score > 0)
                        table. numberSongDisLike++
                    else if(song.score === 0)
                        table.numberSongNotRated++
                    else
                        table.numberSongNotlisten++

                    if(table.playlist[song.playlistName])
                        table.playlist[song.playlistName]++
                    else
                        table.playlist[song.playlistName]=1

                })
            })
        })

        let options =[]
        await Object.entries(table.playlist).map(item=>{
            options.push( { y: item[0]+"", label: item[1]+"" },)
            return
        })


        return options

    }

    Elders = (elders)=>{
        var el = elders.map((label)=>{
            let sessions =[];

            for(var i=1;i<=10;i++)
            {
                sessions.push({ y: Math.floor(Math.random() * 6) , label: "song "+i },)
            }
            let option = {
                type: "spline",
                //type: "line",
                //type: "stepLine",
                //type: "bar",
                // type: "column",
                // type: "stackedColumn",
                name: label.label,
                showInLegend: true,
                dataPoints:sessions
            }


            return option;
        })
        return el
    }
    // componentDidMount() {
    // 	var elders = props.elders.map((label)=>{
    // 		return label.label
    // 	})
    // }
    componentDidMount() {
        console.log("componentDidMount")

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps")
        console.log(nextProps)
        status = nextProps.status
        optionsData = this.Elders(nextProps.elders)
        // optionPie = this.getElderData(nextProps.elders,nextProps.elderDataSong)
        newOp = nextProps.op
        table = nextProps.table
    }



    render() {


        var options = {
            animationEnabled: true,
            title: {
                text: "Number of Elders",
            },
            axisY: {
                title: "Rate song in session 1",
                includeZero: false
            },
            toolTip: {
                shared: true
            },
            data: optionsData
        }
       console.log(newOp)
        var options1 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Website Traffic Sources"
            },
            data: [
                {
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y} songs",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y} songs",
                dataPoints:newOp

            },
            ]
        }


        return (
<div>
               <div>
                    <div>
                        <table>
                            <th>
                                <tr>
                                    <td>
                                        Number Of Songs Are Selected
                                    </td>
                                    <td>
                                        {table.numberOfSong}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Number Songs Are Liked
                                    </td>
                                    <td>
                                        {table.numberSongLike}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Number Songs Are Not Liked
                                    </td>
                                    <td>
                                        {table.numberSongDisLike}
                                    </td>
                                </tr>
                                <tr>
                                    <td>

                                        Number Song That Not Rated
                                    </td>
                                    <td>
                                        {table.numberSongNotRated}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Number Song That Not listen

                                    </td>
                                    <td>
                                        {table.numberSongNotlisten}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        numberElder
                                    </td>
                                    <td>
                                        {table.numberElder}
                                    </td>
                                </tr>
                            </th>
                        </table>
                    </div>


                    {/*<CanvasJSChart options = {options1}/>*/}
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                </div>
            <div><CanvasJSChart options = {options}/></div>
                <div><CanvasJSChart options = {options1}/></div>

</div>

        );
    }
}

export default PortalData;
