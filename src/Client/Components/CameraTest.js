import React, { Component } from 'react';
import {url} from "./AllPages";
import {getServer, loadPage} from "./ManagerComponents";
import axios from "axios";



export default class CameraTest extends Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name:'',
            password:'',
        };
        // user = props.location
    }

    async componentDidMount() {

    }


    render() {


        return(
            <div className="container-contact100">
                <div className="wrap-contact1100">
                    <form className="contact100-form validate-form">
				<span className="contact100-form-title">
					User Camera
				</span>



                    </form>
                </div>

            </div>

        );
    }
}
