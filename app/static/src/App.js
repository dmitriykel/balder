import React from 'react';
import './App.css';
import Routes from "./Routes";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthorized: false
        };

        this.userHasAuthorized = this.userHasAuthorized.bind(this)
    }

    userHasAuthorized(authorized) {
      this.setState({ isAuthorized: authorized });
    }

    render() {
        const childProps = {
          isAuthenticated: this.state.isAuthorized,
          userHasAuthorized: this.userHasAuthorized
        };

        return (
            <div className="App">
                <Routes childProps={childProps} />
            </div>
        );
    }
}
