import React, { Component } from "react";
import ChannelService from "../services/ChannelService";
import {
  Button,
  Container,
  Header,
  Form,
  TransitionablePortal,
  Segment,
  Input,
  Card,
  Image,
  Loader,
} from "semantic-ui-react";
import LogInButton from "../components/LogInButton";
import SignUpButton from "../components/SignUpButton";
import InfiniteScroll from "react-infinite-scroller";

export default class MyChannelsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      error: null,
      image: null,
      maxChannel: 5,
      records: -1,
      hasMore: true,
      channelNum: 5,
    };
  }

  handleChannelClick = (event, { children, ...data }) => {
    this.props.handlePage("channel");
    this.props.onChannelClick(data.id);
  };

  componentDidMount() {
    if (this.props.user != null) {
      ChannelService.getByUserId(this.props.user.id).then((res) => {
        this.setState({ channels: res.data.data });
      });
    }
    if (this.state.records > this.state.channels.length) {
      this.setState({ records: this.state.channels.length });
    } else {
      this.setState({ records: this.state.channelNum });
    }
  }

  componentDidUpdate() {
    if (this.props.user != null) {
      var user = this.props.user;
      ChannelService.getByUserId(this.props.user.id).then((res) => {
        this.setState({ channels: res.data.data });
        user.channels = res.data.data;
        this.props.onUserChange(user);
      });
    }
  }

  onImageChange = (item) => {
    this.setState({ image: item.target.files[0] });
  };

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  loadMore = () => {
    if (this.state.records > this.state.channels.length) {
      this.setState({ hasMore: false });
    } else {
      setTimeout(() => {
        this.setState({ records: this.state.records + this.state.channelNum });
      }, 2000);
    }
  };

  showItems = (channels) => {
    var items = [];
    for (
      var i = 0;
      i <
      (channels.length < this.state.records
        ? channels.length
        : this.state.records);
      i++
    ) {
      const currentChannel = channels[i];
      items.push(
        <Card
          key={currentChannel.id}
          id={currentChannel.id}
          onClick={this.handleChannelClick}
          style={{
            marginTop: "14px",
            marginLeft: "14px",
            marginBottom: "14px",
            marginRight: "14px",
          }}
        >
          <Card.Content>
            <Image
              size="tiny"
              floated="left"
              circular
              src={"data:image/png;base64," + currentChannel.channelPicture}
              style={{
                height: "40px",
                width: "40px",
                marginLeft: "12px",
                marginTop: "12px",
              }}
            ></Image>
            <div
              style={{ float: "left", marginLeft: "5px", marginTop: "12px" }}
            >
              <Card.Header
                as="h4"
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  color: "black",
                }}
              >
                {currentChannel.channelName}
              </Card.Header>
              <Card.Meta style={{ color: "black" }}>
                {currentChannel.subscriberCount} subs
              </Card.Meta>
            </div>
          </Card.Content>
        </Card>
      );
    }
    return items;
  };

  handleAddChannel = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("userId", this.props.user.id);
    ChannelService.add(data)
      .then((response) => {
        this.setState({
          channels: this.state.channels.append(response.data.data),
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.message != null) {
          this.setState({ error: error.response.data.message });
        } else if (error.response.data.title != null) {
          this.setState({ error: error.response.data.title });
        } else {
          this.setState({ error: error.response.data.status });
        }
      });
  };

  render() {
    return (
      <>
        {this.props.user === null ? (
          <Container textAlign="center" style={{ marginTop: "15%" }}>
            <Header inverted>
              You must be logged-in to check your channels!
            </Header>
            <LogInButton onUserChange={this.props.onUserChange}></LogInButton>
            <SignUpButton onUserChange={this.props.onUserChange}></SignUpButton>
          </Container>
        ) : this.state.channels.length === 0 ? (
          <Container textAlign="center" style={{ marginTop: "15%" }}>
            <Header inverted>
              You have no channels. Click add button to create one!
            </Header>
            <TransitionablePortal
              closeOnTriggerClick
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
                    <label>Channel Picture</label>
                    <Input
                      icon={"picture"}
                      type={"file"}
                      name="ChannelPicture"
                      accept="image/*"
                      onChange={this.onImageChange}
                    />
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
          </Container>
        ) : (
          <Container textAlign="center" style={{ marginTop: "10%" }}>
            <TransitionablePortal
              closeOnTriggerClick
              openOnTriggerClick
              trigger={
                <Button
                  inverted
                  onClick={this.handleErrorChange}
                  style={{ marginRight: "0px", marginBottom: "12px" }}
                >
                  Add Channel
                </Button>
              }
            >
              <Segment
                style={{
                  left: "37.5%",
                  position: "fixed",
                  top: "25%",
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
                    <label>Channel Picture</label>
                    <Input
                      icon={"picture"}
                      type={"file"}
                      name="ChannelPicture"
                      accept="image/*"
                      onChange={this.onImageChange}
                    />
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
              <InfiniteScroll
                datalength={this.state.channels.length}
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                loader={<Loader key={0} active></Loader>}
                useWindow={false}
                style={{
                  overflowY: "scroll",
                  height: "200px",
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.showItems(this.state.channels)}
              </InfiniteScroll>
          </Container>
        )}
      </>
    );
  }
}
