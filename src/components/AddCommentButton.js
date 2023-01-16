import { Component } from "react";
import {
  Button,
  Segment,
  Form,
  Header,
  TransitionablePortal
} from "semantic-ui-react";
import CommentService from "../services/CommentService";

export default class AddCommentButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleAddComment = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    CommentService.add(data).catch((error) => {
      if (error.response?.data?.message != null) {
        this.setState({ error: error.response.data.message });
      } else if (error.response?.data?.errors?.length !== 0) {
        this.setState({ error: error.response.data.errors });
      } else {
        this.setState({ error: error.response.data.status });
      }
    });
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
            top: "30%",
            width: "25%",
            zIndex: 1000,
          }}
        >
          <Form onSubmit={this.handleAddComment}>
            <Header textAlign="center">Add Comment</Header>
            <Form.Field>
              <label>Content</label>
              <input
                type={"text"}
                name="Content"
                placeholder="Content"
              />
            </Form.Field>
            <Form.Field>
              <label>Video ID</label>
              <input type={"text"} name="VideoId" placeholder="Video ID" />
            </Form.Field>
            <Form.Field>
              <label>User ID</label>
              <input type={"text"} name="UserId" placeholder="User ID" />
            </Form.Field>
            <Form.Field>
              <label>Comment ID</label>
              <input type={"text"} name="CommentId" placeholder="Comment ID" />
            </Form.Field>
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
