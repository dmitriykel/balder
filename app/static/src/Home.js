import React, { Component } from "react";
import "./Home.css";


export default class Home extends Component {
  render() {
      if(!this.props.isAuthorized) this.props.history.push("/auth");
    return (
      <div className="Home">
        <div className="lander">
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
        </div>
      </div>
    );
  }
}