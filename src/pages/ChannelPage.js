import React, { Component } from "react";
import ChannelService from "../services/ChannelService";
import {
  Container,
  Image,
  Header,
  Grid,
  Button,
  GridColumn,
  Divider,
  Card,
  Loader,
  Label,
  Icon,
  Form,
  TransitionablePortal,
  Segment,
  Input,
  Select,
} from "semantic-ui-react";
import UserService from "../services/UserService";
import InfiniteScroll from "react-infinite-scroller";
import VideoService from "../services/VideoService";
import CategoryService from "../services/CategoryService";

export default class ChannelPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channel: null,
      videos: [],
      userOfChannel: null,
      videoNum: 4,
      hasMore: true,
      records: -1,
      categories: [],
      selectedCategoryId: null,
      videoDuration: -1,
      addPortalOpen: false,
    };
  }

  componentDidMount() {
    ChannelService.getById(this.props.clickedChannelId).then((res) => {
      this.setState({ channel: res.data.data });
      UserService.getById(res.data.data.userId).then((res) => {
        this.setState({ userOfChannel: res.data.data });
      });
    });
    VideoService.getByChannelId(this.props.clickedChannelId).then((res) => {
      this.setState({ videos: res.data.data });
    });
    if (this.state.records > this.state.videos.length) {
      this.setState({ records: this.state.videos.length });
    } else {
      this.setState({ records: this.state.videoNum });
    }
  }

  showItems = (videos) => {
    var items = [];
    const channel = this.state.channel;
    for (
      var i = 0;
      i <
      (videos.length < this.state.records ? videos.length : this.state.records);
      i++
    ) {
      const currentVideo = videos[i];
      const sendData = {
        videoId: currentVideo?.id,
        channelId: channel?.id,
      };
      items.push(
        <Card
          key={currentVideo.id}
          id={sendData}
          onClick={this.handleVideoClick}
          style={{
            marginTop: "14px",
            marginLeft: "14px",
            marginBottom: "14px",
            marginRight: "14px",
            width: "300px",
          }}
        >
          <Image
            src={"data:image/png;base64," + currentVideo.cover}
            ui={false}
            style={{
              width: "300px",
              height: "170px",
            }}
          ></Image>
          <Grid columns={1}>
            <GridColumn width={14}>
              <Card.Content>
                <Card.Header textAlign="left">{currentVideo.title}</Card.Header>
              </Card.Content>
              <Card.Content extra textAlign="left">
                <Label color="green">
                  <Icon name="thumbs up outline" />
                  {currentVideo.likeCount}
                </Label>
                <Label color="red">
                  <Icon name="thumbs down outline" />
                  {currentVideo.dislikeCount}
                </Label>
                <Label color="grey">
                  <Icon name="caret square right outline" />
                  {currentVideo.viewCount}
                </Label>
              </Card.Content>
            </GridColumn>
          </Grid>
        </Card>
      );
    }
    return items;
  };

  loadMore = () => {
    if (this.state.records > this.state.videos.length) {
      this.setState({ hasMore: false });
    } else {
      setTimeout(() => {
        this.setState({ records: this.state.records + this.state.videoNum });
      }, 2000);
    }
  };

  handleVideoClick = (event, { children, ...data }) => {
    this.props.onVideoClick(data.id.videoId, data.id.channelId);
  };

  handleErrorChange = () => {
    this.setState({ error: null });
    this.setState({ addPortalOpen: true });
    if (this.state.categories.length === 0) {
      CategoryService.getAll().then((res) => {
        this.setState({
          categories: res.data.data.filter(
            (category) => category.name !== "All"
          ),
        });
      });
    }
  };

  handleAddVideo = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("length", parseInt(this.state.videoDuration));
    data.append("channelId", this.state.channel.id);
    data.append("categoryId", this.state.selectedCategoryId);
    VideoService.add(data)
      .then((response) => {
        this.setState({
          videos: this.state.videos.concat(response.data.data),
        });
      })
      .catch((error) => {
        if (error.response.data.message != null) {
          this.setState({ error: error.response.data.message });
        } else if (error.response.data.title != null) {
          this.setState({ error: error.response.data.title });
        } else {
          this.setState({ error: error.response.data.status });
        }
      });
    this.setState({ addPortalOpen: false });
  };

  handleDropdownChange = (event, { children, ...data }) => {
    this.setState({ selectedCategoryId: data.value });
  };

  handleVideoChange = (event) => {
    var reader = new FileReader();
    var duration;
    reader.onload = function (e) {
      var videoElement = document.createElement("video");
      videoElement.src = e.target.result;
      var timer = setInterval(function () {
        if (videoElement.readyState === 4) {
          console.log(videoElement.duration.toFixed(2));
          duration = videoElement.duration.toFixed(2);
          console.log(duration);
          clearInterval(timer);
        }
      }, 500);
    };
    reader.readAsDataURL(event.target.files[0]);
    var timer = setInterval(() => {
      if (
        this.state.videoDuration === -1 ||
        this.state.videoDuration === undefined
      ) {
        this.setState({ videoDuration: duration });
        console.log(duration);
      } else {
        clearInterval(timer);
      }
    }, 500);
  };

  handleSubscribe = (event, { children, ...data }) => {
    if (data.active) {
      this.props.onUnsubscribeClick(this.state.channel);
    } else {
      this.props.onSubscribeClick(this.state.channel);
    }
  };

  render() {
    const channel = this.state.channel;
    return (
      <>
        <Container textAlign="center" style={{ marginTop: "10%" }}>
          <Grid columns={2}>
            <GridColumn>
              <Image
                floated="left"
                circular
                inline
                src={"data:image/png;base64," + channel?.channelPicture}
                style={{
                  height: "80px",
                  width: "80px",
                  marginLeft: "12px",
                  marginTop: "12px",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                }}
              ></Image>
              <div
                style={{ float: "left", marginLeft: "5px", marginTop: "24px" }}
              >
                <Header
                  as="h4"
                  style={{
                    marginTop: "0px",
                    marginBottom: "0px",
                    color: "grey",
                  }}
                >
                  {channel?.channelName}
                </Header>
                <p style={{ color: "grey", marginBottom: "0px" }}>
                  @{this.state.userOfChannel?.username}
                </p>
                <p style={{ color: "grey" }}>{channel?.subscriberCount} subs</p>
              </div>
            </GridColumn>
            <GridColumn>
              {this.props.user.channels.filter(
                (channel) => channel.id === this.state.channel?.id
              ).length !== 0 ? (
                <TransitionablePortal
                  closeOnTriggerClick
                  openOnTriggerClick
                  open={this.state.addPortalOpen}
                  onClose={() => this.setState({ addPortalOpen: false })}
                  trigger={
                    <Button
                      size="large"
                      floated="right"
                      compact
                      circular
                      style={{ marginTop: "32px" }}
                      inverted
                      onClick={this.handleErrorChange}
                    >
                      Add Video
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
                    <Form onSubmit={this.handleAddVideo}>
                      <Header textAlign="center">Add Video</Header>
                      <Form.Field>
                        <label>Title</label>
                        <input type={"text"} name="Title" placeholder="Title" />
                      </Form.Field>
                      <Form.TextArea
                        label="Description"
                        style={{
                          height: "10%",
                        }}
                        name="Description"
                      />
                      <Form.Field>
                        <label>Cover</label>
                        <Input
                          icon={"picture"}
                          type={"file"}
                          name="Cover"
                          accept="image/*"
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Video</label>
                        <Input
                          icon={"file video"}
                          type={"file"}
                          name="Video"
                          accept="video/*"
                          id="video"
                          onChange={this.handleVideoChange}
                        />
                      </Form.Field>
                      <Form.Field
                        label="Category"
                        control={Select}
                        placeholder="Category"
                        options={this.state.categories.map((category) => {
                          return {
                            key: category.id,
                            text: category.name,
                            value: category.id,
                          };
                        })}
                        onChange={this.handleDropdownChange}
                      />
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
              ) : (
                <></>
              )}
              {this.props.user != null ? (
                this.props.user.channels.filter(
                  (channel) => channel.id === this.state.channel?.id
                ).length === 0 ? (
                  <Button
                    size="large"
                    floated="right"
                    inverted
                    compact
                    circular
                    style={{ marginTop: "32px" }}
                    onClick={this.handleSubscribe}
                    active={this.props.isSubscribed}
                  >
                    {this.props.isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                ) : (
                  <></>
                )
              ) : (
                <TransitionablePortal
                  openOnTriggerClick
                  trigger={
                    <Button
                      size="large"
                      floated="right"
                      inverted
                      compact
                      circular
                      style={{ marginTop: "32px" }}
                    >
                      Subscribe
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
                    <Header textAlign="center">
                      You must log in or sign up before subscribing.
                    </Header>
                  </Segment>
                </TransitionablePortal>
              )}
            </GridColumn>
          </Grid>
          <Divider></Divider>
        </Container>
        <Container
          style={{
            width: "fit-content",
            paddingLeft: "10%",
            paddingRight: "10%",
          }}
        >
          <Segment inverted>
            <Card.Group
              itemsPerRow={this.state.videoNum}
              style={{ marginTop: "0px" }}
            >
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore}
                hasMore={this.state.hasMore}
                loader={<Loader key={0} active></Loader>}
                useWindow={false}
                style={{
                  overflowY: "scroll",
                  height: "500px",
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.showItems(this.state.videos)}
              </InfiniteScroll>
            </Card.Group>
          </Segment>
        </Container>
      </>
    );
  }
}
