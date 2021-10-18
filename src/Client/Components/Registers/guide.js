import React, { Component } from 'react';



export default class CreateGuide extends Component{

    constructor(props) {
        super(props);
        this.state = {
        };
        // user = props.location
    }

    async componentDidMount() {
    }


    render() {
        return(
            <div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Name</span>
                    <input id='guideName' className="input100" type="text" name='guideName' placeholder="Enter Name"/>
                        <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">ID</span>
                    <input id='guideId' className="input100" type="text" name="guideId" placeholder="Enter ID"/>
                        <span className="focus-input100"></span>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Name is required">
                    <span className="label-input100">Password</span>
                    <input id='guidePassword' className="input100" type="password" name="guidePassword"
                           placeholder="Enter password"/>
                        <span className="focus-input100"></span>
                </div>
            </div>
        );
    }
}
