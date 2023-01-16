import { Component } from "react";
import {
  Button,
  Segment,
  Form,
  Header,
  TransitionablePortal,
  Input,
  List
} from "semantic-ui-react";
import UserService from "../services/UserService";

export default class AddUserButton extends Component {
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

  handleAddUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    UserService.add(data).catch((error) => {
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
        openOnTriggerClick
        trigger={
          <Button inverted onClick={this.handleErrorChange}>
            Add
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
          <Form onSubmit={this.handleAddUser}>
            <Header textAlign="center">Add User</Header>
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
