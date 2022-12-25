import React, { Component } from "react";
import {
  TransitionablePortal,
  Button,
  Segment,
  Form,
  Header,
} from "semantic-ui-react";
import UserService from "../services/UserService"

export default class LogInButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleLogIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    UserService.logIn(data).then((response) =>
        {this.props.onLogIn(response.data.data);}
    ).catch( error =>{
        if(error.response.data.message!=null){
            this.setState({error: error.response.data.message});
        } else if(error.response.data.title!=null){
            this.setState({error: error.response.data.title});
        } else {
            this.setState({error: error.response.data.status});
        }
    });
  };

  render() {
    return (
      <TransitionablePortal
        closeOnTriggerClick
        openOnTriggerClick
        trigger={
          <Button inverted onClick={this.handleErrorChange}>
            Log In
          </Button>
        }
      >
        <Segment
          style={{
            left: "37.5%",
            position: "fixed",
            top: "30%",
            width: "25%",
            zIndex: 1000,
          }}
        >
          <Form onSubmit={this.handleLogIn}>
            <Header textAlign="center">Log In</Header>
            <Form.Field>
              <label>User Name</label>
              <input type={"text"} name="Username" placeholder="User Name" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type={"password"} name="Password" placeholder="Password" />
            </Form.Field>
            {this.state.error != null ? (
              <Header textAlign="center" color="red" size="small">
                {this.state.error}
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
