import React, { Component } from "react";
import {
  Grid,
  GridColumn,
  Segment,
  Loader,
  Comment,
  Header,
  Form,
  Button,
  Image,
  ButtonGroup,
  Divider,
  TransitionablePortal,
} from "semantic-ui-react";
import VideoService from "../services/VideoService";
import CommentService from "../services/CommentService";
import UserService from "../services/UserService";
import InfiniteScroll from "react-infinite-scroller";
import ChannelService from "../services/ChannelService";

export default class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: {},
      channel: {},
      records: 0,
      comments: [],
      users: [],
      hasMore: true,
      commentNum: 10,
    };
  }

  componentDidMount() {
    VideoService.getById(this.props.videoId).then((res) => {
      this.setState({ video: res.data.data });
      if (
        this.props.user != null &&
        this.props.user.watchedVideos.filter(
          (video) => video.id === this.state.video.id
        ).length === 0
      ) {
        UserService.addUserWatchedVideo(this.props.user.id, res.data.data.id);
        var video = res.data.data;
        video.viewCount++;
        this.setState({ video: video });
      }
    });
    ChannelService.getById(this.props.channelId).then((res) => {
      this.setState({ channel: res.data.data });
    });
    CommentService.getByVideoId(this.props.videoId).then((res) => {
      this.setState({ comments: res.data.data });
      res.data.data.forEach((comment) => {
        UserService.getById(comment.userId).then((res) => {
          if (this.state.users.includes(res.data.data)) {
          } else {
            this.setState({
              users: this.state.users.concat(res.data.data),
            });
          }
        });
      });
    });
    if (this.state.records > this.state.comments.length) {
      this.setState({ records: this.state.comments.length });
    } else {
      this.setState({ records: this.state.commentNum });
    }
  }

  loadMore = () => {
    if (this.state.records >= this.state.comments.length) {
      this.setState({ hasMore: false });
    } else {
      setTimeout(() => {
        this.setState({ records: this.state.records + this.state.commentNum });
      }, 2000);
    }
  };

  showItems = (comments, users) => {
    var items = [];
    for (
      var i = 0;
      i <
      (comments.length < this.state.records
        ? comments.length
        : this.state.records);
      i++
    ) {
      const currentComment = comments[i];
      const currentUser = users.filter((user) => {
        return user.id === currentComment.userId;
      })[0];
      items.push(
        <Comment key={currentComment.id} id={currentComment.id} inverted>
          <Comment.Avatar
            src={"data:image/png;base64," + currentUser?.profilePicture}
            style={{ height: "20%", width: "20%" }}
          />
          <Comment.Content>
            <Comment.Author as="a">{currentUser?.username}</Comment.Author>
            <Comment.Metadata>
              <div>{currentComment.createdAt}</div>
            </Comment.Metadata>
            <Comment.Text>{currentComment.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
              <Comment.Action>Delete</Comment.Action>
              <Comment.Action>Like</Comment.Action>
              <Comment.Action>Dislike</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    }
    return items;
  };

  handleAddComment = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("userId", this.props.user.id);
    data.append("videoId", this.state.video.id);
    CommentService.add(data).then((response) => {
      this.setState({
        comments: this.state.comments.concat(response.data.data),
      });
    });
  };

  handleSubscribe = (event, { children, ...data }) => {
    var channel = this.state.channel;
    if (data.active) {
      this.props.onUnsubscribeClick(this.state.channel);
      channel.subscriberCount--;
      this.setState({ channel: channel });
    } else {
      this.props.onSubscribeClick(this.state.channel);
      channel.subscriberCount++;
      this.setState({ channel: channel });
    }
  };

  handleLike = (event, { children, ...data }) => {
    var user = this.props.user;
    var video = this.state.video;
    if (data.active) {
      UserService.deleteUserLikedVideo(user.id, this.state.video.id);
      user.likedVideos = user.likedVideos.filter(
        (video) => video.id !== this.state.video.id
      );
      this.props.onUserChange(user);
      video.likeCount--;
      this.setState({ video: video });
    } else if (
      this.props.user.dislikedVideos.filter(
        (video) => video.id === this.state.video.id
      ).length > 0
    ) {
      UserService.deleteUserDislikedVideo(user.id, this.state.video.id);
      UserService.addUserLikedVideo(user.id, this.state.video.id);
      user.dislikedVideos = user.dislikedVideos.filter(
        (video) => video.id !== this.state.video.id
      );
      user.likedVideos = user.likedVideos.concat(this.state.video);
      this.props.onUserChange(user);
      video.likeCount++;
      video.dislikeCount--;
      this.setState({ video: video });
    } else if (!data.active) {
      UserService.addUserLikedVideo(user.id, this.state.video.id);
      user.likedVideos = user.likedVideos.concat(this.state.video);
      this.props.onUserChange(user);
      video.likeCount++;
      this.setState({ video: video });
    }
  };

  handleDislike = (event, { children, ...data }) => {
    var user = this.props.user;
    var video = this.state.video;
    if (data.active) {
      UserService.deleteUserDislikedVideo(user.id, this.state.video.id);
      user.dislikedVideos = user.dislikedVideos.filter(
        (video) => video.id !== this.state.video.id
      );
      this.props.onUserChange(user);
      video.dislikeCount--;
      this.setState({ video: video });
    } else if (
      this.props.user.likedVideos.filter(
        (video) => video.id === this.state.video.id
      ).length > 0
    ) {
      UserService.deleteUserLikedVideo(user.id, this.state.video.id);
      UserService.addUserDislikedVideo(user.id, this.state.video.id);
      user.likedVideos = user.likedVideos.filter(
        (video) => video.id !== this.state.video.id
      );
      user.dislikedVideos = user.dislikedVideos.concat(this.state.video);
      this.props.onUserChange(user);
      video.dislikeCount++;
      video.likeCount--;
      this.setState({ video: video });
    } else if (!data.active) {
      UserService.addUserDislikedVideo(user.id, this.state.video.id);
      user.dislikedVideos = user.dislikedVideos.concat(this.state.video);
      this.props.onUserChange(user);
      video.dislikeCount++;
      this.setState({ video: video });
    }
  };

  onChannelClick = () => {
    this.props.onChannelClick(this.state.channel.id);
    this.props.handlePage("channel");
  };

  render() {
    var isSubscribed =
      this.props.user !== null
        ? this.props.user.subscribedTo.filter(
            (channel) => channel.id === this.state.channel.id
          ).length > 0
        : false;
    return (
      <Grid columns={2}>
        <GridColumn width={10}>
          <video
            src={"data:video/mp4;base64," + this.state.video.videoLocation}
            controls
            width="100%"
            height="80%"
          ></video>
          <Segment inverted>
            <Grid columns={2}>
              <GridColumn>
                <Button
                  floated="left"
                  circular
                  compact
                  inverted
                  size="tiny"
                  children={
                    <Image
                      circular
                      src={
                        "data:image/png;base64," +
                        this.state.channel.channelPicture
                      }
                      style={{
                        height: "40px",
                        width: "40px",
                      }}
                    ></Image>
                  }
                  style={{
                    width: "40px",
                    height: "40px",
                    paddingTop: "0px",
                    paddingRight: "0px",
                    paddingBottom: "0px",
                    paddingLeft: "0px",
                  }}
                  onClick={this.onChannelClick}
                ></Button>
                <div style={{ float: "left", marginLeft: "5px" }}>
                  <Header
                    as="h4"
                    color="grey"
                    style={{ marginTop: "0px", marginBottom: "0px" }}
                    inverted
                  >
                    {this.state.channel.channelName}
                  </Header>
                  <p>{this.state.channel.subscriberCount} subs</p>
                </div>
                {this.props.user == null ? (
                  <TransitionablePortal
                    openOnTriggerClick
                    trigger={
                      <Button
                        inverted
                        circular
                        floated="left"
                        style={{ marginLeft: "15px" }}
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
                ) : this.props.user.channels.filter(
                    (channel) => channel.id === this.state.channel.id
                  ).length === 0 ? (
                  <Button
                    inverted
                    circular
                    floated="left"
                    style={{ marginLeft: "15px" }}
                    onClick={this.handleSubscribe}
                    active={isSubscribed}
                  >
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Button>
                ) : (
                  <></>
                )}
              </GridColumn>
              <GridColumn>
                <ButtonGroup floated="right">
                  {this.props.user == null ? (
                    <>
                      <TransitionablePortal
                        openOnTriggerClick
                        trigger={
                          <Button
                            circular
                            inverted
                            icon="thumbs up outline"
                            content={this.state.video.likeCount}
                          ></Button>
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
                            You must log in or sign up before liking.
                          </Header>
                        </Segment>
                      </TransitionablePortal>
                      <TransitionablePortal
                        openOnTriggerClick
                        trigger={
                          <Button
                            circular
                            inverted
                            icon="thumbs down outline"
                            content={this.state.video.dislikeCount}
                          ></Button>
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
                            You must log in or sign up before disliking.
                          </Header>
                        </Segment>
                      </TransitionablePortal>
                    </>
                  ) : (
                    <>
                      <Button
                        circular
                        inverted
                        icon="thumbs up outline"
                        content={this.state.video.likeCount}
                        onClick={this.handleLike}
                        active={
                          this.props.user != null
                            ? this.props.user.likedVideos.filter(
                                (video) => video.id === this.state.video.id
                              ).length > 0
                            : false
                        }
                      ></Button>
                      <Button
                        circular
                        inverted
                        icon="thumbs down outline"
                        content={this.state.video.dislikeCount}
                        onClick={this.handleDislike}
                        active={
                          this.props.user != null
                            ? this.props.user.dislikedVideos.filter(
                                (video) => video.id === this.state.video.id
                              ).length > 0
                            : false
                        }
                      ></Button>
                    </>
                  )}
                  <Button
                    disabled
                    circular
                    inverted
                    icon="play circle outline"
                    content={this.state.video.viewCount}
                  ></Button>
                </ButtonGroup>
              </GridColumn>
            </Grid>
            <p style={{ marginTop: "12px", marginBottom: "0px" }}>
              Created At: {this.state.video.createdAt}
            </p>
            <Header as="h4" style={{ marginTop: "12px", marginBottom: "6px" }}>
              Description:
            </Header>
            <p>{this.state.video.description}</p>
          </Segment>
        </GridColumn>
        <GridColumn width={6}>
          <Segment inverted>
            <Comment.Group>
              <Header as="h3" color="grey" textAlign="center" inverted>
                Comments
              </Header>
              <Divider></Divider>
              {this.props.user === null ? (
                <Header textAlign="center" color="grey" inverted>
                  Please log-in to comment!
                </Header>
              ) : (
                <Form reply onSubmit={this.handleAddComment}>
                  <Form.TextArea
                    style={{
                      height: "10%",
                    }}
                    name="Content"
                  />
                  <Button
                    fluid
                    content="Add Comment"
                    labelPosition="left"
                    icon="edit"
                    primary
                    type="submit"
                  />
                </Form>
              )}
              <Divider></Divider>
              {this.state.comments.length === 0 ? (
                <Header textAlign="center" color="grey" inverted>
                  Be the first to comment!
                </Header>
              ) : (
                <Segment>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.hasMore}
                    loader={<Loader key={0} active></Loader>}
                    useWindow={false}
                    style={{ overflowY: "scroll" }}
                  >
                    {this.showItems(this.state.comments, this.state.users)}
                  </InfiniteScroll>
                </Segment>
              )}
            </Comment.Group>
          </Segment>
        </GridColumn>
      </Grid>
    );
  }
}
