import React, { Component } from 'react';
import makeAnimated from 'react-select/animated';
import CreateOldMan from "./Registers/oldMan"
import Select from "react-select";
import {loadPage} from "./ManagerComponents";


const animatedComponents = makeAnimated();



const roles = [
    // { value: '', label: 'Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'researcher', label: 'Researcher' },
    { value: 'guide', label: 'Guide' },
    { value: 'user', label: 'User' }
]






export default class userRegister extends Component{

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div className="container-contact100" style={{zIndex:-1}}>
                <div className="wrap-contact1100" style={{zIndex:0}}>
                    <form className="contact100-form validate-form" style={{zIndex:-1}}>
				<span className="contact100-form-title" translate="yes" lang="he">
					User Register
				</span>


                        <div>
                            <CreateOldMan/>
                        </div>


                    </form>
                </div>
            </div>



        );
    }
}

