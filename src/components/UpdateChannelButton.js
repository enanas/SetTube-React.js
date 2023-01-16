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
import ChannelService from "../services/ChannelService";

export default class UpdateChannelButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleChannelUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.channel.id);
    ChannelService.update(data).catch((error) => {
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
          <Form onSubmit={this.handleChannelUpdate}>
            <Header textAlign="center">Update Channel</Header>
            <Form.Field>
              <label>Channel Name</label>
              <input
                type={"text"}
                name="ChannelName"
                defaultValue={this.props.channel.channelName}
                placeholder="Channel Name"
              />
            </Form.Field>
            <Header as={"h5"} style={{marginTop: "0px", marginBottom: "4px", fontSize: ".92857143em"}}>Current Channel Picture</Header>
            <Image
              spaced
              avatar
              src={"data:image/png;base64," + this.props.channel.channelPicture}
              style={{marginBottom: "4px"}}
            ></Image>
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
