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
    VideoService.getById(this.props.videoId).then((res) =>
      this.setState({ video: res.data.data })
    );
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
    if(this.state.records>this.state.comments.length){
      this.setState({records: this.state.comments.length});
  } else {
      this.setState({records: this.state.commentNum});
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

  onChannelClick = () => {
    this.props.onChannelClick(this.state.channel.id);
    this.props.handlePage("channel");
  }

  render() {
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
                <div style={{float: "left", marginLeft: "5px"}}>
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
                <Button inverted circular floated="left" style={{marginLeft: "15px"}}>
                  Subscribe
                </Button>
              </GridColumn>
              <GridColumn>
                <ButtonGroup floated="right">
                  <Button
                    circular
                    inverted
                    icon="thumbs up outline"
                    content={this.state.video.likeCount}
                  ></Button>
                  <Button
                    circular
                    inverted
                    icon="thumbs down outline"
                    content={this.state.video.dislikeCount}
                  ></Button>
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
            <p style={{marginTop: "12px", marginBottom: "0px"}}>Created At: {this.state.video.createdAt}</p>
            <Header as="h4" style={{marginTop: "12px", marginBottom: "6px"}}>Description:</Header>
            <p>{this.state.video.description}</p>
          </Segment>
        </GridColumn>
        <GridColumn width={6}>
          <Segment inverted>
            <Comment.Group>
              <Header as="h3" color="grey" textAlign="center" inverted>
                Comments
              </Header>
              <Divider ></Divider>
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
                    style={{overflowY: "scroll"}}
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
