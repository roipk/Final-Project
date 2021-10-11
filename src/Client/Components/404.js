import React, { Component } from 'react';

export default class NotFound extends Component{

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
        };
    }

    render() {
        return(
            <div>404</div>
        );
    }
}
