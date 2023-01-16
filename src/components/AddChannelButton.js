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
import ChannelService from "../services/ChannelService";

export default class AddChannelButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleAddChannel = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    ChannelService.add(data).catch((error) => {
      if (error.response?.data?.message != null) {
        this.setState({ error: error.response.data.message });
      } else if (error.response?.data?.errors?.length !== 0) {
        this.setState({ error: error.response.data.errors });
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
            top: "30%",
            width: "25%",
            zIndex: 1000,
          }}
        >
          <Form onSubmit={this.handleAddChannel}>
            <Header textAlign="center">Add Channel</Header>
            <Form.Field>
              <label>Channel Name</label>
              <input
                type={"text"}
                name="ChannelName"
                placeholder="Channel Name"
              />
            </Form.Field>
            <Form.Field>
              <label>User Id</label>
              <Input type={"text"} name="UserId" placeholder="User Id" />
            </Form.Field>
            <Form.Field>
              <label>Channel Picture</label>
              <Input
                icon={"picture"}
                type={"file"}
                name="ChannelPicture"
                accept="image/*"
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
