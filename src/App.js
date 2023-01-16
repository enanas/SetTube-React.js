import React, { Component } from "react";
import SideMenu from "./components/SideMenu";
import UpperMenu from "./components/UpperMenu";
import AdminPage from "./pages/AdminPage";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      user: null,
      page: "home",
      admin: null,
    };
  }

  handleVisibilityChange = (clicked) => this.setState({ visible: clicked });
  handlePage = (page) => this.setState({ page: page });
  handleUserChange = (user) => this.setState({ user: user });
  handleAdminLogIn = (admin) => this.setState({ admin: admin });

  render() {
    const isVisible = this.state.visible;
    return (
      <>
        <UpperMenu
          onClickChange={this.handleVisibilityChange}
          onUserChange={this.handleUserChange}
          onSetTubeClick={this.handlePage}
          visibility={isVisible}
          user={this.state.user}
          onAdminLogIn={this.handleAdminLogIn}
          isAdmin={this.state.admin !== null}
        />
        {this.state.admin !== null ? (
          <AdminPage adminId={this.state.admin?.id} />
        ) : (
          <SideMenu
            visibility={isVisible}
            page={this.state.page}
            handlePage={this.handlePage}
            user={this.state.user}
            onUserChange={this.handleUserChange}
          />
        )}
      </>
    );
  }
}
