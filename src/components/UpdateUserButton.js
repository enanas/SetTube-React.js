import { Component } from "react";
import {
  Button,
  TransitionablePortal,
  Header,
  List,
  Form,
  Segment,
  Image,
  Input,
} from "semantic-ui-react";
import UserService from "../services/UserService";

export default class UpdateUserButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleUserUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.user.id);
    UserService.update(data).catch((error) => {
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
          <Form onSubmit={this.handleUserUpdate}>
            <Header textAlign="center">Update User</Header>
            <Form.Field>
              <label>Name</label>
              <input type={"text"} name="Name" defaultValue={this.props.user.name} placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <label>Surname</label>
              <input type={"text"} name="Surname" defaultValue={this.props.user.surname} placeholder="Surname" />
            </Form.Field>
            <Form.Field>
              <label>Username</label>
              <input type={"text"} name="Username" defaultValue={this.props.user.username} placeholder="Username" />
            </Form.Field>
            <Form.Field>
              <label>E-mail</label>
              <input type={"email"} name="Email" defaultValue={this.props.user.email} placeholder="E-mail" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type={"password"} name="Password" placeholder="Password" />
            </Form.Field>
            <Header as={"h5"} style={{marginTop: "0px", marginBottom: "4px", fontSize: ".92857143em"}}>Current Profile Picture</Header>
            <Image
              spaced
              avatar
              src={"data:image/png;base64," + this.props.user.profilePicture}
              style={{marginBottom: "4px"}}
            ></Image>
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
                  <List key={0} items={this.state.error.split("\n")}></List>
                ) : (
                  <List key={0} items={this.state.error}></List>
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
