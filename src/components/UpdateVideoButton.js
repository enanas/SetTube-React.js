import { Component } from "react";
import {
  Button,
  TransitionablePortal,
  Header,
  List,
  Form,
  Segment,
  Image,
  Input,
  Select,
} from "semantic-ui-react";
import VideoService from "../services/VideoService";

export default class UpdateVideoButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null, selectedCategoryId: null, defaultDescription: null };
  }

  componentDidMount() {
    this.setState({ selectedCategoryId: this.props.video.categoryId });
    VideoService.getById(this.props.video.id).then(
      (res) => (this.setState({defaultDescription: res.data.data.description}))
    );
  }

  handleVideoUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.video.id);
    VideoService.update(data).catch((error) => {
      if (error.response?.data?.message != null) {
        this.setState({ error: error.response.data.message });
      } else if (error.response?.data?.errors?.length !== 0) {
        this.setState({ error: error.response.data.errors });
      } else {
        this.setState({ error: error.response.data.status });
      }
    });
  };

  handleErrorChange = () => {
    this.setState({ error: null });
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
            Update
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
          <Form onSubmit={this.handleVideoUpdate}>
            <Header textAlign="center">Update Video</Header>
            <Form.Field>
              <label>Title</label>
              <input
                type={"text"}
                name="Title"
                defaultValue={this.props.video.title}
                placeholder="Title"
              />
            </Form.Field>
            <Form.TextArea
              label="Description"
              style={{
                height: "10%",
              }}
              defaultValue={this.state.defaultDescription}
              name="Description"
            />
            <Header
              as={"h5"}
              style={{
                marginTop: "0px",
                marginBottom: "4px",
                fontSize: ".92857143em",
              }}
            >
              Current Video Cover
            </Header>
            <Image
              spaced
              src={"data:image/png;base64," + this.props.video.cover}
              style={{ marginBottom: "4px", width: "280px", height: "160px" }}
            ></Image>
            <Form.Field>
              <label>Cover</label>
              <Input
                icon={"picture"}
                type={"file"}
                name="Cover"
                accept="image/*"
              />
            </Form.Field>
            <Form.Field
              label="Category"
              control={Select}
              placeholder="Category"
              options={this.props.categories
                .filter((category) => category.name !== "All")
                .map((category) => {
                  return {
                    key: category.id,
                    text: category.name,
                    value: category.id,
                  };
                })}
              defaultValue={this.state.selectedCategoryId}
              onChange={this.handleDropdownChange}
            />
            {this.state.error != null ? (
              <Header textAlign="center" color="red" size="small">
                {typeof this.state.error === "string" ? (
                  <List key={0} items={this.state.error.split("\n")}></List>
                ) : (
                  <List key={0} items={this.state.error}></List>
                )}
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
