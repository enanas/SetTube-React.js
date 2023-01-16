import React, { Component } from "react";
import VideoService from "../services/VideoService";
import ChannelService from "../services/ChannelService";
import VideoLoader from "../components/VideoLoader";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      channels: [],
    };
  }

  componentDidMount() {
    VideoService.getAll().then((res) => {
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

  render() {
    return (
        <VideoLoader videos={this.state.videos} channels={this.state.channels} onVideoClick={this.props.onVideoClick}/>
    );
  }
}
