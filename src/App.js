import React, { Component } from "react";
import "./App.css";
import SideMenu from "./components/SideMenu";
import UpperMenu from "./components/UpperMenu";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: true, user: null, page: "home" };
  }

  handleVisibilityChange = (clicked) => this.setState({ visible: clicked });
  handleLogIn = (user) => this.setState({ user: user });
  handleSignUp = (user) => this.setState({ user: user });
  handlePage = (page) => this.setState({ page: page });

  render() {
    const isVisible = this.state.visible;
    return (
      <React.StrictMode>
        <UpperMenu
          onClickChange={this.handleVisibilityChange}
          onLogIn={this.handleLogIn}
          onSignUp={this.handleSignUp}
          onSetTubeClick={this.handlePage}
          visibility={isVisible}
          user={this.state.user}
        />
        <SideMenu
          visibility={isVisible}
          page={this.state.page}
          handlePage={this.handlePage}
          user={this.state.user}
          onLogIn={this.handleLogIn}
          onSignUp={this.handleSignUp}
        />
      </React.StrictMode>
    );
  }
}
