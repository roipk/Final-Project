import React, { Component } from 'react';

export default class SignUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };
    }

    render() {
        return(
            <div>SignUp</div>
        );
    }
}
