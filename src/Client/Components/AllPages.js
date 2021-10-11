import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import HomePage from "./Home";
import LoginPage from "./Login";
import LoginAdminPage from "./LoginAdminPage";
import SignUpPage from "./SignUp";
import NotFoundPage from "./404";

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
                    <Route exact path="/admin" component={LoginAdminPage}/>
                    <Route exact path="/signup" component={SignUpPage}/>
                    <Route exact path="/admin/:404" component={NotFoundPage}/>
                    {/*<Route exact path="/admin/" component={NotFoundPage}/>*/}
                </Switch>
            </Router>
        );
    }

}

export const loadPage = (props,page,data)=>
{
    props.history.push({
        pathname: `/${page}`,
        data: data // your data array of objects
    })
}
