import React, { Component } from "react";
import DataGrid, {
  Column,
  Export,
  MasterDetail,
  FilterRow,
} from "devextreme-react/data-grid";

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
            <FilterRow visible={true} />

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
            />
          </DataGrid>
        );
      } else if (this.state.type === "researcher") {
        this.state.users.forEach((researcher) => {
          temp = {
            ID: ID,
            FirstName: researcher.first_name,
            LastName: researcher.last_name,
            Email: researcher.email,
            UserName: researcher.user_name,
            Researches: researcher.Researches,
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
          </DataGrid>
        );
      } else {
        this.state.users.forEach((other) => {
          temp = {
            ID: ID,
            FirstName: other.first_name,
            LastName: other.last_name,
            Email: other.email,
            UserName: other.user_name,
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
