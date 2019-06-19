import React from 'react';
import './App.scss'
import './Authorization.scss'
import logo from "./logo.svg";
import $ from "jquery";

const axios = require('axios');

export default class Authorization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: '',
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({secret: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const secret_json = { 'secret': this.state.secret };

        axios.post(
            "http://127.0.0.1:3000/balder/api/v1.0/check_secret",
            JSON.stringify(secret_json),
            {
                headers: {'Content-Type': 'application/json'}
            }
        )
        .then(
            response => {
                this.props.userHasAuthorized(true);
                this.setState({error: ''});
                this.props.history.push("/");
            }
        )
        .catch(
            error => {
                this.setState({error: 'Incorrect secret word!'});
            });
    }

    componentDidMount() {
        if(localStorage.getItem('isAuthorized')) this.props.history.push("/");
    }

    render() {
        return (
            <div className="auth_container">
                <div className="profile">
                    <button className="profile_avatar" id="toggleProfile">
                        <img src={logo} alt="logo"/>
                    </button>
                    <form className="profile_form" onSubmit={this.handleSubmit} method="POST">
                        <div className="profile_fields">
                            <div className="field">
                                <input
                                    id="secret"
                                    type="text"
                                    value={this.state.secret}
                                    onChange={this.handleChange}
                                />
                                <span className="error">{this.state.error}</span>
                            </div>
                            <div className="profile_footer">
                                <input type="submit" value="Enter" />
                                <span>Hit enter to confirm</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

$(function () {
   $('#toggleProfile').on('click', function () {
     $('div.profile').toggleClass('open');
   })
});