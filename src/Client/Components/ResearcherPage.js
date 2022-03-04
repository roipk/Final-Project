import React, { Component } from "react";
import { loadPage, verifyUser, url } from "./ManagerComponents";
import { Link } from "react-router-dom";
import NotFound from "./404";

export default class ResearcherPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.location.data,
      notfound: false,
    };
  }

  async componentDidMount() {
    let currentUser = await verifyUser("researcher");
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
                              console.log("in (48)");
                              console.log(this.state.user);
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

                      <div className="container-contact100-form-btn">
                        <div className="wrap-contact100-form-btn">
                          <div className="research contact100-form-bgbtn"></div>
                          <button
                            id="editResearch"
                            type="button"
                            className="contact100-form-btn"
                            onClick={() => {
                              console.log("in (76)");
                              console.log(this.state.user);
                              loadPage(
                                this.props,
                                "researcher/edit-research/",
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
                              // loadPage(this.props, "edit", this.state.user)
                            }}
                          >
                            <i
                              className="fa fa-pencil fa-lg"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                            ></i>
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;My Researches</span>
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
                          loadPage(this.props, "", this.state.user);
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
