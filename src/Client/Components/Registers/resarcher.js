import React, { Component } from 'react';



export default class CreateResearcher extends Component{

    constructor(props) {
        super(props);
        this.state = {
        //user: props.location.user
        };
        
    }

    async componentDidMount() {
    }


    render() {
        return(
            <div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Name</span>
                    <input id='researcherName' className="input100" type="text" name='researcherName'
                           placeholder="Enter Name"/>
                        <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">ID</span>
                    <input id='researcherId' className="input100" type="text" name="researcherId"
                           placeholder="Enter ID"/>
                        <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Password</span>
                    <input id='researcherPassword' className="input100" type="password" name="researcherPassword"
                           placeholder="Enter password"/>
                        <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Admin</span>
                    <input id='isAdmin' className="input100" type="checkbox" name="isAdmin"
                           placeholder="sign V if admin"/>
                        <span className="focus-input100"></span>
                </div>
            </div>
        );
    }
}
