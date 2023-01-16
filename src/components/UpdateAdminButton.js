import { Component } from "react";
import {
  Button,
  TransitionablePortal,
  Header,
  List,
  Form,
  Segment,
} from "semantic-ui-react";
import AdminService from "../services/AdminService";

export default class UpdateAdminButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleAdminUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.admin.id);
    AdminService.update(data).catch((error) => {
      if (error.response?.data?.message != null) {
        this.setState({ error: error.response.data.message });
      } else if (error.response?.data?.errors?.length !== 0) {
        this.setState({ error: error.response.data.errors });
      } else {
        this.setState({ error: error.response.data.status });
      }
    });
  };

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  render() {
    return (
      <TransitionablePortal
        openOnTriggerClick
        trigger={
          <Button inverted onClick={this.handleErrorChange}>
            Update
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
          <Form onSubmit={this.handleAdminUpdate}>
            <Header textAlign="center">Update Admin</Header>
            <Form.Field>
              <label>Username</label>
              <input
                type={"text"}
                name="Username"
                defaultValue={this.props.admin.username}
                placeholder="Username"
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type={"password"} name="Password" placeholder="Password" />
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
