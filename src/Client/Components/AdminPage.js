import React, { Component } from "react";
import { logOut, loadPage, verifyUser, url } from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      notfound: false,
    };
  }

  async componentDidMount() {
    let currentUser = await verifyUser("admin");
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
    }
  }

  render() {
    return (
      <div>
        {this.state.notfound ? (
          <NotFound />
        ) : (
          <div>
            <div className="container-contact100">
              <div className="wrap-contact1100">
                <form className="contact100-form validate-form">
                  <span className="contact100-form-title">
                    Admin Screen - Hello{" "}
                    {this.state.user ? " " + this.state.user.first_name : ""}
                  </span>

                  <div className="container-section-space">
                    <div className="container-section">
                    
               

                 

                      <div className="container-section-space">
                        <div className="container-section">
                          <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                              <div className="user contact100-form-bgbtn"></div>
                              <button
                                type="button"
                                id="createUser"
                                className="contact100-form-btn"
                                onClick={() => {
                                  loadPage(
                                    this.props,
                                    "admin/ViewUsers",
                                    this.state.user,
                                    this.state.user
                                  );
                                }}
                              >
                                <span>
                                  <i
                                    className="fa fa-blind fa-2x"
                                    aria-hidden="true"
                                    style={{ padding_right: "10px" }}
                                  ></i>
                                  &nbsp;&nbsp;&nbsp;&nbsp;View Users
                                </span>
                              </button>
                            </div>
                          </div>

                          {/*                <div className="container-contact100-form-btn">*/}
                          {/*                    <div className="wrap-contact100-form-btn">*/}
                          {/*                        <div className="user contact100-form-bgbtn"></div>*/}
                          {/*                        <button type="button" id='createUser'*/}
                          {/*                                className="contact100-form-btn"*/}
                          {/*                                onClick={() => {*/}
                          {/*                                    loadPage(this.props, "register", this.state.user,this.state.user)*/}
                          {/*                                }}>*/}
                          {/*<span>*/}
                          {/*    <i className="fa fa-blind fa-2x" aria-hidden="true"*/}
                          {/*       style={{padding_right: '10px'}}></i>*/}
                          {/*    &nbsp;&nbsp;&nbsp;&nbsp;Create User*/}
                          {/*</span>*/}
                          {/*                        </button>*/}
                          {/*                    </div>*/}
                          {/*                </div>*/}

                          {/*            <div className="container-contact100-form-btn">*/}
                          {/*                <div className="wrap-contact100-form-btn">*/}
                          {/*                    <div className="user contact100-form-bgbtn"></div>*/}
                          {/*                    <button id='editUser' type='button'*/}
                          {/*                            className="contact100-form-btn"*/}
                          {/*                            onClick={() => {*/}
                          {/*                                loadPage(this.props, "edit", this.state.user,this.state.user)*/}
                          {/*                            }}>*/}
                          {/*                        <i className="fa fa-pencil fa-lg" aria-hidden="true"*/}
                          {/*                           style={{padding_right: '10px'}}></i>*/}
                          {/*                        <span>*/}
                          {/*    &nbsp;&nbsp;&nbsp;&nbsp;Edit User*/}
                          {/*</span>*/}
                          {/*                    </button>*/}
                          {/*                </div>*/}
                          {/*            </div>*/}

                          {/*            <div className="container-contact100-form-btn">*/}
                          {/*                <div className="wrap-contact100-form-btn">*/}
                          {/*                    <div className="user contact100-form-bgbtn"></div>*/}
                          {/*                    <button id='editUser' type='button'*/}
                          {/*                            className="contact100-form-btn"*/}
                          {/*                            onClick={() => {*/}
                          {/*                                loadPage(this.props, "remove", this.state.user,this.state.user)*/}
                          {/*                            }}>*/}
                          {/*                        <i className="fa fa-times fa-lg" aria-hidden="true"*/}
                          {/*                           style={{padding_right: '10px'}}></i>*/}
                          {/*                        <span>*/}
                          {/*    &nbsp;&nbsp;&nbsp;&nbsp;Delete User*/}
                          {/*</span>*/}
                          {/*                    </button>*/}
                          {/*                </div>*/}
                          {/*            </div>*/}
                        </div>
                      </div>

                      <div className="container-section-space">
                        <div className="container-section">
                          <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                              <div className="admin contact100-form-bgbtn"></div>
                              <button
                                type="button"
                                id="createPlaylist"
                                className="contact100-form-btn"
                                onClick={() => {
                                  loadPage(
                                    this.props,
                                    "register",
                                    this.state.user
                                  );
                                }}
                              >
                                <span>
                                  <i
                                    className="fa fa-list-ol fa-lg fa-fw"
                                    aria-hidden="true"
                                    style={{ padding_right: "10px" }}
                                  ></i>
                                  &nbsp;&nbsp;&nbsp;&nbsp;Create Playlist
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                              <div className="admin contact100-form-bgbtn"></div>
                              <button
                                type="button"
                                id="editPlaylist"
                                className="contact100-form-btn"
                                onClick={() => {
                                  loadPage(
                                    this.props,
                                    "register",
                                    this.state.user
                                  );
                                }}
                              >
                                <span>
                                  <i
                                    className="fa fa-list-ol fa-lg fa-fw"
                                    aria-hidden="true"
                                    style={{ padding_right: "10px" }}
                                  ></i>
                                  &nbsp;&nbsp;&nbsp;&nbsp; Edit Playlist
                                </span>
                              </button>
                            </div>
                          </div>
                          <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                              <div className="admin contact100-form-bgbtn"></div>
                              <button
                                type="button"
                                id="addMedia"
                                className="contact100-form-btn"
                                onClick={() => {
                                  loadPage(
                                    this.props,
                                    "register",
                                    this.state.user
                                  );
                                }}
                              >
                                <span>
                                  <i
                                    className="fa fa-music fa-lg fa-fw"
                                    aria-hidden="true"
                                    style={{ padding_right: "10px" }}
                                  ></i>
                                  &nbsp;&nbsp;&nbsp;&nbsp; Add Media
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container-section-space">
                        <div className="container-section">
                          <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                              <div className="admin contact100-form-bgbtn"></div>
                              <button
                                type="button"
                                id="getData"
                                className="contact100-form-btn"
                                onClick={() => {
                                  loadPage(
                                    this.props,
                                    "export-data",
                                    this.state.user
                                  );
                                }}
                              >
                                <span>
                                  <i
                                    className="fa fa-file-export"
                                    aria-hidden="true"
                                    style={{ padding_right: "10px" }}
                                  ></i>
                                  &nbsp;&nbsp;&nbsp;&nbsp;Export Research Data
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="createGuide"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-users fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp; Create Guide
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="createResearcher"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-users fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp;Create Researcher
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="createResearchGroup"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-users fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp;Create Research Group
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-section-space">
                    <div className="container-section">
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="admin contact100-form-bgbtn"></div>
                          <button
                            type="button"
                            id="createPlaylist"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-list-ol fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp;Create Playlist
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="admin contact100-form-bgbtn"></div>
                          <button
                            type="button"
                            id="editPlaylist"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-list-ol fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp; Edit Playlist
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="admin contact100-form-bgbtn"></div>
                          <button
                            type="button"
                            id="addMedia"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "register",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-music fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp; Add Media
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="container-section-space">
                    <div className="container-section">
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="admin contact100-form-bgbtn"></div>
                          <button
                            type="button"
                            id="addMedia"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "youtube",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-music fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp;Youtube
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="createGuide"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              logOut(this.props);
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-sign-out fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              &nbsp;&nbsp;&nbsp;&nbsp; LOG OUT
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
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
                            "",
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
          </div>
        )}
      </div>
    );
  }
}
