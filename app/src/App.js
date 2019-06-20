import React from 'react';
import './App.scss';
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
      localStorage.setItem('isAuthorized', authorized)
    }

    componentDidMount() {
        const authorized = localStorage.getItem('isAuthorized');
        this.setState({ isAuthorized: authorized });
    }

    render() {
        const childProps = {
          isAuthorized: this.state.isAuthorized,
          userHasAuthorized: this.userHasAuthorized
        };
        return (
            <div className="App">
                <Routes childProps={childProps} />
            </div>
        );
    }
}
