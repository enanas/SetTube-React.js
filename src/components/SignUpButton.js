import React, { Component } from "react";
import {
  TransitionablePortal,
  Button,
  Segment,
  Form,
  Header,
  Input,
  List,
} from "semantic-ui-react";
import UserService from "../services/UserService";

export default class SignUpButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null, image: null };
  }

  onImageChange = (item) => {
    this.setState({ image: item.target.files[0] });
  };
  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    UserService.add(data)
      .then((response) => {
        this.props.onUserChange(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message != null) {
          this.setState({ error: error.response.data.message });
        } else if (error.response.data.errors?.length !== 0) {
          this.setState({ error: Object.values(error.response.data.errors) });
        } else {
          this.setState({ error: error.response.data.status });
        }
      });
  };

  render() {
    return (
      <TransitionablePortal
        closeOnTriggerClick
        openOnTriggerClick
        trigger={
          <Button
            inverted
            style={{ marginLeft: "0.5em" }}
            onClick={this.handleErrorChange}
          >
            Sign Up
          </Button>
        }
      >
        <Segment
          style={{
            left: "37.5%",
            position: "fixed",
            top: "20%",
            width: "25%",
            zIndex: 1000,
          }}
        >
          <Form onSubmit={this.handleSignUp}>
            <Header textAlign="center">Sign Up</Header>
            <Form.Field>
              <label>Name</label>
              <input type={"text"} name="Name" placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <label>Surname</label>
              <input type={"text"} name="Surname" placeholder="Surname" />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input type={"text"} name="Username" placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input type={"email"} name="Email" placeholder="E-mail" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type={"password"} name="Password" placeholder="Password" />
            </Form.Field>
            <Form.Field>
              <label>Profile Picture</label>
              <Input
                icon={"picture"}
                type={"file"}
                name="ProfilePicture"
                accept="image/*"
                onChange={this.onImageChange}
              />
            </Form.Field>
            {this.state.error != null ? (
              <Header textAlign="center" color="red" size="small">
                {typeof this.state.error === "string" ? (
                  <List items={this.state.error.split("\n")}></List>
                ) : (
                  <List items={this.state.error}></List>
                )}
              </Header>
            ) : (
              <></>
            )}
            <Button fluid type="submit">
              Submit
            </Button>
          </Form>
        </Segment>
      </TransitionablePortal>
    );
  }
}
