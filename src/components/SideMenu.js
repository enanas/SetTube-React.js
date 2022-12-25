import React, { Component } from "react";
import {
  Grid,
  Menu,
  Segment,
  Sidebar,
  SegmentGroup,
  Container,
} from "semantic-ui-react";
import HomePage from "../pages/HomePage";
import VideoPage from "../pages/VideoPage";
import Categories from "./Categories";
import MyChannelsPage from "../pages/MyChannelsPage";
import ChannelPage from "../pages/ChannelPage";

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      loadingCategories: true,
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

  handleItemClick = (e, { name }) => this.props.handlePage(name);

  handleChannelClick = (channelId) => {
    this.setState({ clickedChannelId: channelId });
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
              width="thin"
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
                  name="liked videos"
                  active={page === "liked videos"}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="disliked videos"
                  active={page === "disliked videos"}
                  onClick={this.handleItemClick}
                />
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
                  <Container>
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
                    handlePage={this.props.handlePage}
                    onChannelClick={this.handleChannelClick}
                  ></VideoPage>
                ) : this.props.page === "your channels" ? (
                  <MyChannelsPage
                    user={this.props.user}
                    onLogIn={this.props.onLogIn}
                    onSignUp={this.props.onSignUp}
                    handlePage={this.props.handlePage}
                    onChannelClick={this.handleChannelClick}
                  ></MyChannelsPage>
                ) : this.props.page === "channel" ? (
                  <ChannelPage
                    clickedChannelId={this.state.clickedChannelId}
                    onVideoClick={this.onVideoClick}
                  ></ChannelPage>
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
