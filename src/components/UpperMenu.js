import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  GridColumn,
  Segment,
  Image
} from "semantic-ui-react";
import ResearchField from "./ResearchField";
import LogInButton from "./LogInButton";
import SignUpButton from "./SignUpButton";

export default class UpperMenu extends Component {
  constructor(props) {
    super(props);

    this.state = { image: null };
  }

  handeSetTubeClick = () => this.props.onSetTubeClick("home");

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
              <Button
                circular
                compact
                inverted
                size="tiny"
                children={<Image circular src={"data:image/png;base64,"+this.props.user.profilePicture} style={{
                  height: "40px",
                  width: "40px"
              }}></Image>}
                style={{
                  width: "40px",
                  height: "40px",
                  paddingTop: "0px",
                  paddingRight: "0px",
                  paddingBottom: "0px",
                  paddingLeft: "0px"
              }}
              ></Button>
            ) : (
              <ButtonGroup>
                <LogInButton onLogIn={this.props.onLogIn}/>
                <SignUpButton onSignUp={this.props.onSignUp}/>
              </ButtonGroup>
            )}
          </GridColumn>
        </Grid>
      </Segment>
    );
  }
}
