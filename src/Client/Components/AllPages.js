import Config from "../../ConfigServer.json";
import React, { Component, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import HomePage from "./Home";
import LoginPage from "./Login";
import LoginAdminPage from "./LoginAdminPage";
import SignUpPage from "./SignUp";
import NotFoundPage from "./404";
import AdminPage from "./AdminPage";
import GuidePage from "./GuidePage";
import axios from "axios";
import userRegister from "./userRegister";
import EditUsers from "./EditUsers";
import DeleteUsers from "./DeleteUsers";
import ElderPage from "./Elder";
import CameraTest from "./CameraTest";
import ViewUsers from "./ViewUsers";

import ResearcherPage from "./ResearcherPage";
import CreateResearch from "./CreateResearch";
import EditResearch from "./EditResearch";
import ViewResearches from "./ViewResearches";
import ExportData from "./ExportData";
import MusicGuidePage from "./MusicGuidePage";
import Login from "./Login";
//69666

export default class AllPages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          {/* <Route exact path="/" component={LoginPage} /> */}
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/camera" component={CameraTest} />
          <Route exact path="/youtube" component={HomePage} />
          <Route exact path="/adminLogin" component={LoginAdminPage} />
          <Route exact path="/register" component={SignUpPage} />
          <Route exact path="/edit" component={EditUsers} />
          <Route exact path="/remove" component={DeleteUsers} />
          <Route exact path="/user" component={ElderPage} />
          <Route exact path="/guide" component={GuidePage} />
          {/*<Route exact path="/guide/" component={NotFoundPage}/>*/}
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/admin/ViewUsers" component={ViewUsers}/>
          <Route exact path="/admin/register" component={SignUpPage} />
          <Route exact path="/admin/userRegister" component={userRegister} />
          {/*<Route exact path="/admin/:id" component={AdminPage}/>*/}
          {/*<Route exact path="/admin" component={NotFoundPage}/>*/}
          {/*<Route exact path="/404" component={NotFoundPage}/>*/}
          <Route exact path="/musicGuide" component={MusicGuidePage} />
      
          <Route exact path="/researcher" component={ResearcherPage} />
          <Route excat path="/researcher/new-research" component={CreateResearch} />
          <Route excat path="/researcher/edit-research" component={EditResearch} />
          <Route excat path="/researcher/view-researches" component={ViewResearches} />
          <Route exact path="/export-data" component={ExportData} />




          {/*<Route exact path="/admin/:404" component={NotFoundPage}/>*/}
        </Switch>
      </Router>
    );
  }
}

export const url=Config.HOST//"http://localhost:5000"
