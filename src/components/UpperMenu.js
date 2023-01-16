import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  GridColumn,
  Segment,
  Image,
  TransitionablePortal,
  Menu,
} from "semantic-ui-react";
import ResearchField from "./ResearchField";
import LogInButton from "./LogInButton";
import SignUpButton from "./SignUpButton";

export default class UpperMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { image: null, error: null, isPortalOpen: false };
  }

  handeSetTubeClick = () => this.props.onSetTubeClick("home");
  handleUserClick = () => {
    this.setState({ isPortalOpen: true });
  };
  handleErrorChange = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <Segment
        style={{
          borderTop: "0px",
          borderRight: "0px",
          borderBottom: "0px",
          borderLeft: "0px",
          marginBottom: "0px",
        }}
      >
        <Grid columns={1}>
          <GridColumn color="black" width={4} textAlign="left">
            <Button
              circular
              icon="list layout"
              color="grey"
              onClick={() => this.props.onClickChange(!this.props.visibility)}
            />
            <Button
              icon="youtube"
              size="large"
              color="youtube"
              content="SetTube"
              circular
              onClick={this.handeSetTubeClick}
            />
          </GridColumn>
          <GridColumn color="black" width={8} textAlign="center">
            <ResearchField></ResearchField>
          </GridColumn>
          <GridColumn color="black" width={4} textAlign="right">
            {this.props.user != null ? (
              <TransitionablePortal
                openOnTriggerClick
                closeOnTriggerClick
                closeOnDocumentClick={false}
                trigger={
                  <Button
                    circular
                    compact
                    children={
                      <Image
                        circular
                        src={
                          "data:image/png;base64," +
                          this.props.user.profilePicture
                        }
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                      ></Image>
                    }
                    style={{
                      width: "40px",
                      height: "40px",
                      paddingTop: "0px",
                      paddingRight: "0px",
                      paddingBottom: "0px",
                      paddingLeft: "0px",
                    }}
                    onClick={this.handleUserClick}
                  ></Button>
                }
              >
                <Segment
                  inverted
                  style={{
                    left: "87.5%",
                    position: "fixed",
                    top: "40px",
                    width: "12.5%",
                    height: "40px",
                    zIndex: 1000,
                  }}
                >
                  <Menu vertical>
                    <Menu.Item onClick={() => this.props.onUserChange(null)}>
                      Log Out
                    </Menu.Item>
                    <Menu.Item>Settings</Menu.Item>
                  </Menu>
                </Segment>
              </TransitionablePortal>
            ) : this.props.isAdmin ? (
              <Button inverted onClick={() => this.props.onAdminLogIn(null)}>
                Log Out
              </Button>
            ) : (
              <ButtonGroup>
                <LogInButton
                  onUserChange={this.props.onUserChange}
                  onAdminLogIn={this.props.onAdminLogIn}
                />
                <SignUpButton onUserChange={this.props.onUserChange} />
              </ButtonGroup>
            )}
          </GridColumn>
        </Grid>
      </Segment>
    );
  }
}
