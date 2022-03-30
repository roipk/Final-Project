import React, { Component } from 'react';
import {url} from "./AllPages";
import {loadPage,verifyUser} from "./ManagerComponents";
import axios from "axios";
import NotFound from "./404";
import MediaCard from "./MediaCard";
import Select from "react-select";


import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'musicGuide', label: 'Music Guide' },
    { value: 'guide', label: 'Guide' },
    { value: 'user', label: 'Elder' }
]

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
export default class ViewUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.location.data,
            notfound: false,
            page: 0,
            users:null,
            type:"Admin"
        };
    }

    async componentDidMount() {
        console.log("in")
        let currentUser = await verifyUser("admin")
        if (currentUser) {
            console.log("in")
            this.setState({user: currentUser})
        } else {
            this.setState({notfound: true})
        }
    }


    render() {
        return (
            <div>
                {
                    this.state.notfound ? <NotFound/> :
                        <div className="container-contact100" style={{zIndex: -1}}>
                            <div className="wrap-contact1100" style={{zIndex: 0}}>
                                <form className="contact100-form validate-form" style={{zIndex: -1}}>
				<span className="contact100-form-title" translate="yes" lang="he">
					User Edit
				</span>

                                    <div>
                                        <Select label="select year"
                                                style={{zIndex: 100}}
                                                closeMenuOnSelect={true}
                                                options={roles}//start, end-> today year
                                                onChange={async e => {
                                                    console.log(e.value)
                                                    var users = await this.getAllUsers(e.value)
                                                    console.log(users)
                                                    this.setState({type: e.value, users: users})
                                                }}
                                                menuPlacement="auto"
                                                menuPosition="fixed"
                                        />

                                        {
                                            this.state.users ? this.state.users.map((user) => {
                                                return (
                                                    <Box sx={{flexGrow: 1}}>
                                                        <Grid container spacing={1} columns={16}>
                                                            <Grid item xs={8}>
                                                                <MediaCard props = {this.props} user = {this.state.user} userView={user[0]} key={user[0]._id}/>
                                                            </Grid>
                                                            {
                                                                user.length > 1 ?
                                                                    <Grid item xs={8}>
                                                                        <MediaCard props = {this.props} user = {this.state.user} userView={user[1]} key={user[1]._id}/>
                                                                    </Grid> : ""
                                                            }
                                                        </Grid>
                                                    </Box>

                                                )
                                            }) : <div>no user</div>
                                        }

                                    </div>

                                    <div hidden={this.state.page > 0} className="wrap-contact100-back-btn">
                                        <div className="contact100-back-bgbtn"></div>
                                        <button id='back' type='button' className="contact100-back-btn"
                                                onClick={() => {
                                                    // console.log(this.state.roles?this.state.roles:[])
                                                    loadPage(this.props, "admin", this.state.user,this.state.user)
                                                }}>back
                                            <i className="fa fa-arrow-left m-l-7" aria-hidden="true"></i>
                                        </button>
                                        <button id='back' type='button' className="contact100-back-btn"
                                                onClick={() => {
                                                    // console.log(this.state.roles?this.state.roles:[])
                                                    loadPage(this.props, "register", this.state.user,null)
                                                }}>Add User
                                            <i className="fa fa-blind fa-2x" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    // <div>
                    //     <MediaCard user={123}/>
                    // </div>
                }
            </div>
        )
    }


    async getAllUsers(type) {
        var res
        if(type === "user")
            res = await axios.get(url + "/admin/getAllUserInfoByType/" + type)
        else
            res = await axios.get(url + "/admin/getAllUserByType/" + type)

        let users = []
        let row = []
        res.data.forEach(user => {
            console.log(user)
            row.push(user)
            // { value: 'user', label: 'Elder' }
            if(row.length%2 === 0)
            {
                users.push(row)
                row=[];
            }

        })
        if(row.length > 0)
        {
            users.push(row)
            row=[];
        }
        console.log(users)
        return users
        // loadPage(this.props,"",this.state)
    }

}



