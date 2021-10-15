import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from "./Home";
import LoginPage from "./Login";
import LoginAdminPage from "./LoginAdminPage";
import SignUpPage from "./SignUp";
import NotFoundPage from "./404";
import AdminPage from "./AdminPage";
import GuidePage from "./GuidePage";
import axios from "axios";

//69666

export default class AllPages extends Component{

    constructor(props) {
        super(props);

    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/adminLogin" component={LoginAdminPage}/>
                    <Route exact path="/register" component={SignUpPage}/>
                    <Route exact path="/guide" component={GuidePage}/>
                    {/*<Route exact path="/guide/" component={NotFoundPage}/>*/}
                    <Route exact path="/admin" component={AdminPage}/>
                    <Route exact path="/admin/:id" component={AdminPage}/>
                    {/*<Route exact path="/admin" component={NotFoundPage}/>*/}
                    <Route exact path="/404" component={NotFoundPage}/>

                    {/*<Route exact path="/admin/:404" component={NotFoundPage}/>*/}
                </Switch>
            </Router>
        );
    }

}

export const url="http://localhost:5000"

export const loadPage = (props,page,data)=>
{
    props.history.push({
        pathname: `/${page}`,
        data: data // your data array of objects
    })
}


export const verifyUser = async(page)=>
{
    let token = localStorage.getItem("token");
    if(token)
    {
        try {
            let user = await axios.get(url+`/${page}`, {headers: {"x-access-token": token}})
            if (user&&user.data.token) {
                localStorage.setItem("token", user.data.token)
                return user.data.user
            }
            else {
                loadPage(this.props,"404")

            }
        }
        catch (e){
            window.location.href = "404"
            console.log("need new token")
        }
    }
}

