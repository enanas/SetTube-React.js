import { Component } from "react";
import {
  Button,
  Segment,
  Form,
  Header,
  TransitionablePortal,
  Input,
  Select,
} from "semantic-ui-react";
import VideoService from "../services/VideoService";

export default class AddVideoButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null, selectedCategoryId: null };
  }

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleAddVideo = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("length", parseInt(this.state.videoDuration));
    data.append("categoryId", this.state.selectedCategoryId);
    VideoService.add(data).catch((error) => {
      if (error.response.data.message != null) {
        this.setState({ error: error.response.data.message });
      } else if (error.response.data.title != null) {
        this.setState({ error: error.response.data.title });
      } else {
        this.setState({ error: error.response.data.status });
      }
    });
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

  handleDropdownChange = (event, { children, ...data }) => {
    this.setState({ selectedCategoryId: data.value });
  };

  render() {
    return (
      <TransitionablePortal
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
            <Form.Field>
              <label>Channel ID</label>
              <input type={"text"} name="ChannelId" placeholder="Channel ID" />
            </Form.Field>
            <Form.Field
              label="Category"
              control={Select}
              placeholder="Category"
              options={this.props.categories.filter((category) => category.name!=="All").map((category) => {
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
    );
  }
}
