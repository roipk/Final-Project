import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {loadPage} from "./ManagerComponents";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {languagesAll} from "countries-list";
import {experimentalStyled as styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import {url} from "./AllPages";
const languages = Object.entries(languagesAll);

var options =
    {
        'cla': 'Classical/Traditional',
        'yid': 'Yiddish' ,
        'ara': 'Arabic',
        'lad': 'Ladino',
        'pra':'Prayer Songs (Piyutim)',
        'mid':'Middle Eastern music'

    }
// var languageNames  = DisplayNames(navigator.language.split('-')[0],'language');
var languageNames  = DisplayNames("en",'language');

function DisplayNames(language,type) {
    return new Intl.DisplayNames([language], { type: type });
}

function getSring(user,type)
{

        let s =" "
        user[type].map((typeData)=>{
            s +=options[typeData]?options[typeData]+', '
                :languageNames.of(typeData)?languageNames.of(typeData)+', '
                :typeData+', '
        })
        s = s.substring(0, s.length - 2);
        return s
}

export default function MediaCard(user) {

    var props = user.props
    var currentUser = user.user
    user = user.userView
    console.log(props)
    console.log(user)


    return (
        <Card sx={{ maxWidth: 500,margin:'3%'}}>
            <CardContent>
                <Typography gutterBottom variant="div" component="div">
                    {
                        user ?<div><h5>
                                {user.first_name +" " +user.last_name}
                            </h5></div>:
                            <div>
                             <h5>First Name + Last Name</h5>
                            </div>

                    }
                </Typography>
                <Typography variant="div" color="text.secondary">
                    {

                        !user? <p>  Age : Age <br/> Languages : Lang1, lang2<br/>generes : genere1, genere2</p>:
                        user.type!=="user" ?<p>
                                Email :{" "+user.email}<br/>
                                Type :{" "+user.type}<br/>
                            </p> :
                            <p>
                                    Age : {new Date().getFullYear()-user.birthYear} <br/>
                                    generes :{getSring(user,"Geners")}<br/>
                                    Languages :{getSring(user,"LanguageAtTwenty")}
                                </p>


                    }
                </Typography>
                <CardActions>
                    <Button size="small" onClick={(e)=> {
                        user.editor=false
                        loadPage(props, "edit", currentUser, user)
                    }}>
                        <i className="fa fa-address-card fa-2x" aria-hidden="true"
                           style={{padding_right: '10px'}}></i>
                        &nbsp;View</Button>


                    <Button size="small" onClick={(e)=>{
                        user.editor=true
                        loadPage(props,"edit",currentUser,user)
                    }
                    }>
                        <i className="fa fa-pencil fa-2x" aria-hidden="true"
                           style={{padding_right: '10px'}}></i>
                        &nbsp;Edit</Button>


                    <Button  size="small"
                             onClick={() => {
                                 alert("do you want remove this user?")

                                 axios.get(url+"/admin/DeleteUser/"+user.Oid)
                                     .then(res => {
                                         console.log("the user removed")
                                         alert("the user removed")
                                         loadPage(this.props, "ViewUsers", this.state.user,this.state.user)


                                         // alert("successful\n the user " + this.state.first_name + "\n" +
                                         //     "add to system with id -  " + res.data.insertedId + "\n" +
                                         //     "type " + this.state.type)
                                         // loadPage(this.props, "admin", this.state.user,this.state.user)
                                         // loadPage(this.props,"",this.state,this.state.user)
                                     })
                             }}>
                        <i className="fa fa-trash fa-2x" aria-hidden="true"
                           style={{padding_right: '10px'}}></i>
                        &nbsp;  Delete</Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
