import React, { Component } from "react";
import {
  Segment,
  Card,
  Loader,
  Image,
  Button,
  Icon,
  Label,
  Grid,
  GridColumn,
} from "semantic-ui-react";
import VideoService from "../services/VideoService";
import ChannelService from "../services/ChannelService";
import InfiniteScroll from "react-infinite-scroller";

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      channels: [],
      records: 0,
      videoNum: 4,
      hasMore: true,
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
    if (this.state.records > this.state.videos.length) {
      this.setState({ records: this.state.videos.length });
    } else {
      this.setState({ records: this.state.videoNum });
    }
  }

  showItems = (videos, channels) => {
    var items = [];
    for (
      var i = 0;
      i <
      (videos.length < this.state.records ? videos.length : this.state.records);
      i++
    ) {
      const currentVideo = videos[i];
      const currentChannel = channels.filter((channel) => {
        return channel.id === currentVideo.channelId;
      })[0];
      const sendData = {
        videoId: currentVideo.id,
        channelId: currentChannel?.id,
      };
      items.push(
        <Card
          key={currentVideo.id}
          id={sendData}
          onClick={this.handleVideoClick}
          raised
          style={{
            marginTop: "14px",
            marginLeft: "14px",
            marginBottom: "14px",
            marginRight: "14px",
          }}
        >
          <Image
            src={"data:image/png;base64," + currentVideo.cover}
            ui={false}
          ></Image>
          <Grid columns={2}>
            <GridColumn width={2}>
              <Button
                circular
                compact
                inverted
                size="tiny"
                children={
                  <Image
                    circular
                    src={
                      "data:image/png;base64," + currentChannel?.channelPicture
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
              ></Button>
            </GridColumn>
            <GridColumn width={14}>
              <Card.Content>
                <Card.Header textAlign="left">{currentVideo.title}</Card.Header>
                <Card.Meta>{currentChannel?.channelName}</Card.Meta>
              </Card.Content>
              <Card.Content extra>
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

  render() {
    return (
      <Segment inverted>
        <Card.Group itemsPerRow={this.state.videoNum}>
          <InfiniteScroll
            allowFullScreen
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<Loader key={0} active></Loader>}
            useWindow={false}
            style={{ width: "100%", display: "flex"}}
          >
            {this.showItems(this.state.videos, this.state.channels)}
          </InfiniteScroll>
        </Card.Group>
      </Segment>
    );
  }
}
