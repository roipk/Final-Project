import React, { Component } from "react";
import { logOut, loadPage, verifyUser } from "./ManagerComponents";
import { Link } from "react-router-dom";
import NotFound from "./404";
import axios from "axios";
import { url } from "./AllPages";

export default class ResearcherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      notfound: false,
      currentUserDetails: {},
    };
  }

  async componentDidMount() {
    let currentUser = await verifyUser("researcher");
    console.log(currentUser);
    if (currentUser) {
      this.setState({ user: currentUser });
    } else {
      this.setState({ notfound: true });
    }
    let res = await axios.get(
      url + "/researcher/getResearcherDetails/" + currentUser._id
    );
    // console.log(res)
    this.setState({ currentUserDetails: res.data });
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
                    Researcher Screen - Hello{" "}
                    {this.state.user ? " " + this.state.user.first_name : ""}
                  </span>
                  <div className="container-section-space">
                    <div className="container-section">
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="createResearch"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "researcher/new-research",
                                this.state.user
                              );
                              // loadPage(this.props, "register", this.state.user)

                              // <Link to='/register'></Link>
                            }}
                          >
                            <span>
                              <i
                                className="fa fa-users fa-lg fa-fw"
                                aria-hidden="true"
                                style={{ padding_right: "10px" }}
                              ></i>
                              Create Research
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* <div className="container-contact100-form-btn" hidden={this.state.currentUserDetails.isViewerResearcher}> */}
                      <div
                        className="container-contact100-form-btn"
                        hidden={true}
                      >
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="editResearch"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "researcher/edit-research/",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <i
                              className="fa fa-pencil fa-lg"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                            ></i>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;Edit Research</span>
                          </button>
                        </div>
                      </div>

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="editResearch"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              loadPage(
                                this.props,
                                "researcher/view-researches/",
                                this.state.user,
                                this.state.user
                              );
                            }}
                          >
                            <i
                              className="fa fa-search"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                            ></i>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;My Researches</span>
                          </button>
                        </div>
                      </div>
                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="logOut"
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
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
