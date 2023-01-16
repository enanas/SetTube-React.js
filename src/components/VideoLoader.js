import React, { Component } from "react";
import {
  Card,
  Loader,
  Image,
  Grid,
  GridColumn,
  Button,
  Label,
  Icon,
  Container
} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

export default class VideoLoader extends Component {
  constructor(props) {
    super(props);

    this.state = { records: 0, videoNum: 4, hasMore: true };
  }

  loadMore = () => {
    if (this.state.records > this.props.videos.length) {
      this.setState({ hasMore: false });
    } else {
      setTimeout(() => {
        this.setState({ records: this.state.records + this.state.videoNum });
      }, 2000);
    }
  };

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
            width: "350px",
          }}
        >
          <Image
            src={"data:image/png;base64," + currentVideo.cover}
            ui={false}
            style={{ height: "200px", width: "350px" }}
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

  handleVideoClick = (event, { children, ...data }) => {
    this.props.onVideoClick(data.id.videoId, data.id.channelId);
  };

  render() {
    return (
      <Container
        style={{
          width: "fit-content",
          height: "fit-content",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Card.Group
          itemsPerRow={this.state.videoNum}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <InfiniteScroll
            allowFullScreen
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            loader={<Loader key={0} active inline></Loader>}
            useWindow={false}
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.showItems(this.props.videos, this.props.channels)}
          </InfiniteScroll>
        </Card.Group>
      </Container>
    );
  }
}
