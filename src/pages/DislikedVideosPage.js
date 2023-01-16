import React, { Component } from "react";
import { Header, Container } from "semantic-ui-react";
import LogInButton from "../components/LogInButton";
import SignUpButton from "../components/SignUpButton";
import VideoLoader from "../components/VideoLoader";
import UserService from "../services/UserService";
import ChannelService from "../services/ChannelService";

export default class DislikedVideosPage extends Component {
  constructor(props) {
    super(props);

    this.state = { videos: [], channels: [] };
  }

  componentDidMount() {
    if (this.props.user != null) {
      UserService.getDislikedVideos(this.props.user.id).then((res) => {
        this.setState({ videos: res.data.data });
        res.data.data.forEach((video) => {
          ChannelService.getById(video.channelId).then((res) => {
            if (this.state.channels.includes(res.data.data)) {
            } else {
              this.setState({
                channels: this.state.channels.concat(res.data.data),
              });
            }
          });
        });
      });
    }
  }

  render() {
    return this.props.user === null ? (
      <Container textAlign="center" style={{ marginTop: "15%" }}>
        <Header inverted>
          You must be logged-in to check your disliked videos!
        </Header>
        <LogInButton onUserChange={this.props.onUserChange}></LogInButton>
        <SignUpButton onUserChange={this.props.onUserChange}></SignUpButton>
      </Container>
    ) : this.props.user.dislikedVideos.length === 0 ? (
      <Container textAlign="center" style={{ marginTop: "15%" }}>
        <Header inverted>
          You have no disliked video. You need to have disliked videos first!
        </Header>
      </Container>
    ) : (
      <VideoLoader
        videos={this.state.videos}
        channels={this.state.channels}
        onVideoClick={this.props.onVideoClick}
      />
    );
  }
}
