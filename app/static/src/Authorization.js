import React from 'react';
import './App.css'
import './Authorization.css'
import logo from "./logo.svg";

const axios = require('axios');

export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {secret: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({secret: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const test = { 'secret': this.state.secret };

        axios.post(
            "http://127.0.0.1:3000/balder/api/v1.0/check_secret",
            JSON.stringify(test),
            {
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(
            response => {
                console.log(response.data['success'])
                this.props.userHasAuthorized(true);
                this.props.history.push("/");
            }
        )
        .catch(
            error => {
                console.log(error)
            });
    }

    render() {
        if(this.props.isAuthorized) this.props.history.push("/");
        return (
            <header className="App-header">
                <div className="Authorizarion">
                    <p className="head">Назови слово!</p>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <form onSubmit={this.handleSubmit} method="POST">
                        <input
                            id="secret"
                            type="text"
                            value={this.state.secret}
                            onChange={this.handleChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </header>
        );
    }
}