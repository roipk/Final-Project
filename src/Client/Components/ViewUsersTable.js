import React, { Component } from "react";
import DataGrid, {
  Column,
  Export,
  MasterDetail,
  FilterRow,
  Pager,
  Paging,

} from "devextreme-react/data-grid";
import Button from "@mui/material/Button";
import {loadPage} from "./ManagerComponents";

var options = {
  cla: "Classical/Traditional",
  yid: "Yiddish",
  ara: "Arabic",
  lad: "Ladino",
  pra: "Prayer Songs (Piyutim)",
  mid: "Middle Eastern music",
};

const pageSizes = [10, 25, 50, 100];

var languageNames = DisplayNames("en", "language");

function DisplayNames(language, type) {
  return new Intl.DisplayNames([language], { type: type });
}

function getSring(user, type) {
  let s = " ";
  user[type].map((typeData) => {
    s += options[typeData]
      ? options[typeData] + ", "
      : languageNames.of(typeData)
      ? languageNames.of(typeData) + ", "
      : typeData + ", ";
  });
  s = s.substring(0, s.length - 2);
  return s;
}

export default class ViewUsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser:this.props.currentUser,
      type: this.props.type,
      users: [],
      dataForGrid: [],
    };
  }

  componentDidMount() {
    console.log("mount");
    let users = [];
    this.props.users.forEach((usersArr) => {
      usersArr.forEach((user) => {
        users.push(user);
      });
    });

    this.setState({ users: users });
  }

  renderGrid(isInit) {
    console.log("renderGrid");
    console.log(this.state.users);
    if (isInit) {
      let dataForGrid = [];
      let temp = {};
      let ID = 1;
      if (this.state.type === "user") {
        this.state.users.forEach((user) => {
          temp = {
            ID: ID,
            FirstName: user.first_name,
            LastName: user.last_name,
            UserName: user.userName,
            Age: new Date().getFullYear() - user.birthYear,
            Languages: getSring(user, "LanguageAtTwenty"),
            Genres: getSring(user, "Geners"),
            Edit: <button>click</button>,
            View: "view",
            Delete: "delete",
            user:user,
          };
          ID++;
          dataForGrid.push(temp);
        });
        console.log(dataForGrid)
        ID = 1;
        return (
          <DataGrid
            id="grid-container"
            dataSource={dataForGrid}
            keyExpr="ID"
            showBorders={true}
            wordWrapEnabled={true}
          >
            <FilterRow visible={true} />

            <Column
              dataField="FirstName"
              caption="First Name"
              cssClass="grid-col-right"
              width={100}
            />
            <Column
              dataField="LastName"
              caption="Last Name"
              cssClass="grid-col-right"
              width={100}
            />
            <Column
              dataField="UserName"
              caption="User Name"
              cssClass="grid-col-right"
              dataType="number"
              width={150}
            />
            <Column
              dataField="Age"
              caption="Age"
              cssClass="grid-col-center"
              dataType="number"
              width={80}
            />
            <Column
              dataField="Languages"
              caption="Languages"
              cssClass="grid-col-right"
              dataType="number"
              width={150}
            />
            <Column
              dataField="Genres"
              caption="Genres"
              cssClass="grid-col-right"
              dataType="number"
              width={150}
            />


            <Column
                dataField="Edit"
                caption="Edit"
                cssClass="grid-col-right"
                cellRender={(data)=>{

                  return (
                      <div>
                        <Button
                            size="small"
                            onClick={(e) => {
                              data.data.user.editor = false;
                              loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                            }}
                        >
                          <i
                              className="fa fa-address-card fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp;View &nbsp;
                        </Button>
                      <Button
                      size="small"
                      onClick={(e) => {
                        data.data.user.editor = true;
                        loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                      }}
                  >
                    <i
                        className="fa fa-pencil fa-2x"
                        aria-hidden="true"
                        style={{ padding_right: "10px" }}
                    ></i>
                    &nbsp;Edit &nbsp;
                  </Button>

                        <Button
                            size="small"
                            onClick={() => {
                              alert("do you want remove this user?");

                              axios.get(url + "/admin/DeleteUser/" + data.data.user.Oid).then((res) => {
                                console.log("the user removed");
                                alert("the user removed");
                                loadPage(
                                    this.props.props,
                                    "ViewUsers",
                                    this.state.currentUser,
                                    this.state.currentUser,
                                );

                                // alert("successful\n the user " + this.state.first_name + "\n" +
                                //     "add to system with id -  " + res.data.insertedId + "\n" +
                                //     "type " + this.state.type)
                                // loadPage(this.props, "admin", this.state.user,this.state.user)
                                // loadPage(this.props,"",this.state,this.state.user)
                              });
                            }}
                        >
                          <i
                              className="fa fa-trash fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp; Delete
                        </Button>
                        </div>)
                }
                }
                width={270}
            />


            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        );
      }
      else if (this.state.type === "researcher") {
        this.state.users.forEach((researcher) => {
          temp = {
            ID: ID,
            FirstName: researcher.first_name,
            LastName: researcher.last_name,
            Email: researcher.email,
            UserName: researcher.user_name,
            Researches: researcher.Researches,
            user:researcher,
          };
          ID++;
          dataForGrid.push(temp);
        });
        ID = 1;
        return (
          <DataGrid
            id="grid-container"
            dataSource={dataForGrid}
            keyExpr="ID"
            showBorders={true}
            wordWrapEnabled={true}
          >
            <Column
              dataField="FirstName"
              caption="First Name"
              cssClass="grid-col-right"
              width={130}
            />
            <Column
              dataField="LastName"
              caption="Last Name"
              cssClass="grid-col-right"
              width={130}
            />
            <Column
              dataField="Email"
              caption="Email"
              cssClass="grid-col-right"
              dataType="number"
            />
            <Column
              dataField="UserName"
              caption="User Name"
              cssClass="grid-col-right"
              dataType="number"
              width={150}
            />
            {/* <Column
              dataField="Researches"
              caption="Researches"
              cssClass="grid-col-right"
              dataType="number"
            /> */}
            <Column
                dataField="Edit"
                caption="Edit"
                cssClass="grid-col-right"
                cellRender={(data)=>{

                  return (
                      <div>
                        <Button
                            size="small"
                            onClick={(e) => {
                              data.data.user.editor = false;
                              loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                            }}
                        >
                          <i
                              className="fa fa-address-card fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp;View &nbsp;
                        </Button>
                        <Button
                            size="small"
                            onClick={(e) => {
                              data.data.user.editor = true;
                              loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                            }}
                        >
                          <i
                              className="fa fa-pencil fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp;Edit &nbsp;
                        </Button>

                        <Button
                            size="small"
                            onClick={() => {
                              alert("do you want remove this user?");

                              axios.get(url + "/admin/DeleteUser/" + data.data.user.Oid).then((res) => {
                                console.log("the user removed");
                                alert("the user removed");
                                loadPage(
                                    this.props.props,
                                    "ViewUsers",
                                    this.state.currentUser,
                                    this.state.currentUser,
                                );

                                // alert("successful\n the user " + this.state.first_name + "\n" +
                                //     "add to system with id -  " + res.data.insertedId + "\n" +
                                //     "type " + this.state.type)
                                // loadPage(this.props, "admin", this.state.user,this.state.user)
                                // loadPage(this.props,"",this.state,this.state.user)
                              });
                            }}
                        >
                          <i
                              className="fa fa-trash fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp; Delete
                        </Button>
                      </div>)
                }
                }
                width={270}
            />
            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        );
      }
      else {
        this.state.users.forEach((other) => {
          temp = {
            ID: ID,
            FirstName: other.first_name,
            LastName: other.last_name,
            Email: other.email,
            UserName: other.user_name,
            user:other,
          };
          ID++;
          dataForGrid.push(temp);
        });
        ID = 1;

        return (
          <DataGrid
            id="grid-container"
            dataSource={dataForGrid}
            keyExpr="ID"
            showBorders={true}
            wordWrapEnabled={true}
          >
            <Column
              dataField="FirstName"
              caption="First Name"
              cssClass="grid-col-right"
              width={130}
            />
            <Column
              dataField="LastName"
              caption="Last Name"
              cssClass="grid-col-right"
              width={130}
            />
            <Column
              dataField="Email"
              caption="Email"
              cssClass="grid-col-right"
              dataType="number"
            />
            <Column
              dataField="UserName"
              caption="User Name"
              cssClass="grid-col-right"
              dataType="number"
              width={150}
            />
            <Column
                dataField="Edit"
                caption="Edit"
                cssClass="grid-col-right"
                cellRender={(data)=>{

                  return (
                      <div>
                        <Button
                            size="small"
                            onClick={(e) => {
                              data.data.user.editor = false;
                              loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                            }}
                        >
                          <i
                              className="fa fa-address-card fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp;View &nbsp;
                        </Button>
                        <Button
                            size="small"
                            onClick={(e) => {
                              data.data.user.editor = true;
                              loadPage(this.props.props, "edit", this.state.currentUser, data.data.user);
                            }}
                        >
                          <i
                              className="fa fa-pencil fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp;Edit &nbsp;
                        </Button>

                        <Button
                            size="small"
                            onClick={() => {
                              alert("do you want remove this user?");

                              axios.get(url + "/admin/DeleteUser/" + data.data.user.Oid).then((res) => {
                                console.log("the user removed");
                                alert("the user removed");
                                loadPage(
                                    this.props.props,
                                    "ViewUsers",
                                    this.state.currentUser,
                                    this.state.currentUser,
                                );

                                // alert("successful\n the user " + this.state.first_name + "\n" +
                                //     "add to system with id -  " + res.data.insertedId + "\n" +
                                //     "type " + this.state.type)
                                // loadPage(this.props, "admin", this.state.user,this.state.user)
                                // loadPage(this.props,"",this.state,this.state.user)
                              });
                            }}
                        >
                          <i
                              className="fa fa-trash fa-2x"
                              aria-hidden="true"
                              style={{ padding_right: "10px" }}
                          ></i>
                          &nbsp; Delete
                        </Button>
                      </div>)
                }
                }
                width={270}
            />
            <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
          </DataGrid>
        );
      }
    }
  }

  render() {
    console.log("render");
    return this.renderGrid(this.state.users ? true : false);
  }
}
