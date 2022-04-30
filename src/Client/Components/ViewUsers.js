import React, { Component } from "react";
import { url } from "./AllPages";
import { loadPage, verifyUser } from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import MediaCard from "./MediaCard";
import Select from "react-select";
import "react-toggle/style.css";
import Toggle from "react-toggle";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ViewUsersTable from "./ViewUsersTable";

var options = {
  cla: "Classical/Traditional",
  yid: "Yiddish",
  ara: "Arabic",
  lad: "Ladino",
  pra: "Prayer Songs (Piyutim)",
  mid: "Middle Eastern music",
};

var languageNames = DisplayNames("en", "language");

function DisplayNames(language, type) {
  return new Intl.DisplayNames([language], { type: type });
}

const roles = [
  { value: "admin", label: "Admin" },
  { value: "researcher", label: "Researcher" },
  { value: "musicGuide", label: "Music Guide" },
  { value: "guide", label: "Guide" },
  { value: "user", label: "Elder" },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      notfound: false,
      page: 0,
      users: null,
      type: "Admin",
      view: false,
    };
  }

  async componentDidMount() {
    // console.log("in");
    let currentUser = await verifyUser("admin");
    if (currentUser) {
      // console.log("in");
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
    }
  }

  async getResearchesInfo(Oid) {
    // console.log(Oid)
    let researches = [];

    var res = await axios.get(
      url + "/researcher/getAllResearchesByResearcher/" + Oid
    );
    res.data[0].forEach((research) => {
      researches.push(research.researchName);
    });

    return researches.join(",");
  }

  render() {
    // console.log(this.state.users)
    return (
      <div>
        {
          this.state.notfound ? (
            <NotFound />
          ) : (
            <div className="container-contact100" style={{ zIndex: -1 }}>
              <div className="wrap-contact1100" style={{ zIndex: 0 }}>
                <form
                  className="contact100-form validate-form"
                  style={{ zIndex: -1 }}
                >
                  <span
                    className="contact100-form-title"
                    translate="yes"
                    lang="he"
                  >
                    View User 
                  </span>

                  <div>
                    <Select
                      label="select year"
                      style={{ zIndex: 100 }}
                      closeMenuOnSelect={true}
                      options={roles} //start, end-> today year
                      onChange={async (e) => {
                        // console.log(e.value);
                        let users = [];
                        await this.getAllUsers(e.value).then((result) => {
                          users = result;
                          this.setState({ type: e.value, users: users });
                        });
                        // console.log(users);
                      }}
                      styles={{
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                    />

                    {this.state.users ? (
                      <div>
                        <div>
                          <br />
                          <label>
                            <span>Cards</span>
                            &nbsp; &nbsp;
                            <Toggle
                              defaultChecked={this.state.view}
                              icons={false}
                              onChange={(e) => {
                                this.setState({ view: e.target.checked });
                              }}
                            />
                            &nbsp; &nbsp;
                            <span>Table</span>
                          </label>
                        </div>
                        {/*view(false) ==> card , view(true) ==> table*/}
                        {!this.state.view ? (
                          this.state.users.map((user) => {
                            return (
                              <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={1} columns={16}>
                                  <Grid item xs={8}>
                                    <MediaCard
                                      props={this.props}
                                      user={this.state.user}
                                      userView={user[0]}
                                      key={user[0]._id}
                                    />
                                  </Grid>
                                  {user.length > 1 ? (
                                    <Grid item xs={8}>
                                      <MediaCard
                                        props={this.props}
                                        user={this.state.user}
                                        userView={user[1]}
                                        key={user[1]._id}
                                      />
                                    </Grid>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </Box>
                            );
                          })
                        ) : (
                          <ViewUsersTable
                            key={this.state.type}
                            type={this.state.type}
                            users={this.state.users}
                          ></ViewUsersTable>
                        )}
                      </div>
                    ) : (
                      <div>no user</div>
                    )}
                  </div>

                  <div className="container-contact100-back-btn">
                    <div className="wrap-contact100-back-btn">
                      <div className="contact100-back-bgbtn"></div>
                      <button
                        id="main"
                        type="button"
                        className="contact100-back-btn"
                        onClick={() => {
                          loadPage(
                            this.props,
                            "admin",
                            this.state.user,
                            this.state.user
                          );
                        }}
                      >
                        <i
                          className="fa fa-arrow-left m-l-7"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )
          // <div>
          //     <MediaCard user={123}/>
          // </div>
        }
      </div>
    );
  }

  async getAllUsers(type) {
    var res;
    if (type === "user")
      await axios
        .get(url + "/admin/getAllUserInfoByType/" + type)
        .then((value) => {
          res = value;
        });
    else
      await axios.get(url + "/admin/getAllUserByType/" + type).then((value) => {
        res = value;
      });

    if (type === "researcher") {
      console.log(res.data);
      res.data.forEach((researcher) => {
        this.getResearchesInfo(researcher._id).then((result) => {
          researcher.Researches = result;
        });
      });
    }
    // console.log(res);
    let users = [];
    let row = [];
    res.data.forEach((user) => {
      // console.log(user);
      // console.log(user);
      row.push(user);
      // { value: 'user', label: 'Elder' }
      if (row.length % 2 === 0) {
        users.push(row);
        row = [];
      }
    });
    if (row.length > 0) {
      users.push(row);
      row = [];
    }
    // console.log(users);
    return users;
    // loadPage(this.props,"",this.state)
  }
}
