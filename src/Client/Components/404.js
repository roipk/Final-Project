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
            <div><h1 style={{
                min_height:"100vh",
                color:"white",
                text_align: "center",
                align_items: "center",
                justify_content:"center",
                position: "fixed",
                top: "50%",
                left:"40%",
                background: "black",
                padding: "50px 100px",


            }}>Page not found 404</h1></div>
        );
    }
}
