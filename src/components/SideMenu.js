import React, { Component } from "react";
import {
  Grid,
  Menu,
  Segment,
  Sidebar,
  SegmentGroup,
  Container,
  Divider,
  Header,
} from "semantic-ui-react";
import Categories from "./Categories";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";
import MyChannelsPage from "../pages/MyChannelsPage";
import ChannelPage from "../pages/ChannelPage";
import SubscriptionsPage from "../pages/SubscriptionsPage";
import HistoryPage from "../pages/HistoryPage";
import UserService from "../services/UserService";
import LikedVideosPage from "../pages/LikedVideosPage";
import DislikedVideosPage from "../pages/DislikedVideosPage";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videoId: -1,
      channelId: -1,
      clickedChannelId: -1,
    };
  }

  onVideoClick = (videoId, channelId) => {
    this.props.handlePage("video");
    this.setState({ videoId: videoId });
    this.setState({ channelId: channelId });
  };

  onSubscribeClick = (channel) => {
    UserService.addUserSubscribedChannel(this.props.user.id, channel.id);
    var user = this.props.user;
    user.subscribedTo = user.subscribedTo.concat(channel);
    this.props.onUserChange(user);
  };

  onUnsubscribeClick = (channel) => {
    UserService.deleteUserSubscribedChannel(this.props.user.id, channel.id);
    var user = this.props.user;
    user.subscribedTo = user.subscribedTo.filter(
      (cha) => cha.id !== channel.id
    );
    this.props.onUserChange(user);
  };

  handleItemClick = (e, { name }) => this.props.handlePage(name);

  handleChannelClick = (channelId) => {
    this.setState({ clickedChannelId: channelId });
  };

  handleSideMenuChannelClick = (event, { children, ...data }) => {
    this.setState({ clickedChannelId: data.id });
    this.props.handlePage("channel");
  };

  render() {
    const page = this.props.page;
    return (
      <Grid columns={1} style={{ flex: 1, marginBottom: "0px" }}>
        <Grid.Column style={{ paddingBottom: "0px" }}>
          <Sidebar.Pushable
            as={Segment}
            style={{
              borderTop: "0px",
              borderLeft: "0px",
              borderRight: "0px",
              borderBottom: "0px",
            }}
          >
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              vertical
              visible={this.props.visibility}
              style={{
                overflowY: "auto",
              }}
            >
              <Segment inverted>
                <Menu.Item
                  name="home"
                  active={page === "home"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="subscriptions"
                  active={page === "subscriptions"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="history"
                  active={page === "history"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="your channels"
                  active={page === "your channels"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="saved videos"
                  active={page === "saved videos"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="liked videos"
                  active={page === "liked videos"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="disliked videos"
                  active={page === "disliked videos"}
                  onClick={this.handleItemClick}
                />
                <Divider></Divider>
                <Header>Subscriptions</Header>
                {this.props.user !== null &&
                this.props.user.subscribedTo.length > 0 ? (
                  this.props.user.subscribedTo.map((channel) => (
                    <Menu.Item
                      key={channel.id}
                      id={channel.id}
                      name={channel.channelName}
                      active={
                        page === "channel" &&
                        channel.id === this.state.clickedChannelId
                      }
                      onClick={this.handleSideMenuChannelClick}
                    />
                  ))
                ) : (
                  <></>
                )}
              </Segment>
            </Sidebar>

            <Sidebar.Pusher
              as={Segment}
              inverted
              style={{
                marginTop: "0px",
              }}
            >
              <SegmentGroup
                style={{
                  borderTop: "0px",
                  borderLeft: "0px",
                  borderRight: "0px",
                  borderBottom: "0px",
                }}
              >
                {this.props.page === "home" ? (
                  <Container
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      paddingLeft: "24px",
                      paddingRight: "24px",
                    }}
                  >
                    <Categories />
                    <HomePage
                      visibility={this.props.visibility}
                      onVideoClick={this.onVideoClick}
                    ></HomePage>
                  </Container>
                ) : this.props.page === "video" ? (
                  <VideoPage
                    videoId={this.state.videoId}
                    channelId={this.state.channelId}
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                    handlePage={this.props.handlePage}
                    onChannelClick={this.handleChannelClick}
                    onSubscribeClick={this.onSubscribeClick}
                    onUnsubscribeClick={this.onUnsubscribeClick}
                  ></VideoPage>
                ) : this.props.page === "your channels" ? (
                  <MyChannelsPage
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                    handlePage={this.props.handlePage}
                    onChannelClick={this.handleChannelClick}
                  ></MyChannelsPage>
                ) : this.props.page === "channel" ? (
                  <ChannelPage
                    clickedChannelId={this.state.clickedChannelId}
                    onVideoClick={this.onVideoClick}
                    isSubscribed={
                      this.props.user != null
                        ? this.props.user.subscribedTo.map(
                            (channel) =>
                              channel.id === this.state.clickedChannelId
                          ).length > 0
                        : false
                    }
                    onSubscribeClick={this.onSubscribeClick}
                    onUnsubscribeClick={this.onUnsubscribeClick}
                    user={this.props.user}
                  ></ChannelPage>
                ) : this.props.page === "subscriptions" ? (
                  <SubscriptionsPage
                    onVideoClick={this.onVideoClick}
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                  />
                ) : this.props.page === "history" ? (
                  <HistoryPage
                    onVideoClick={this.onVideoClick}
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                  />
                ) : this.props.page === "liked videos" ? (
                  <LikedVideosPage
                    onVideoClick={this.onVideoClick}
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                  />
                ) : this.props.page === "disliked videos" ? (
                  <DislikedVideosPage
                    onVideoClick={this.onVideoClick}
                    user={this.props.user}
                    onUserChange={this.props.onUserChange}
                  />
                ) : (
                  <></>
                )}
              </SegmentGroup>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    );
  }
}
