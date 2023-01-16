import { Component } from "react";
import {
  Button,
  TransitionablePortal,
  Header,
  List,
  Form,
  Segment,
} from "semantic-ui-react";
import CommentService from "../services/CommentService";

export default class UpdateCommentButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleCommentUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.comment.id);
    CommentService.update(data).catch((error) => {
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
          <Form onSubmit={this.handleCommentUpdate}>
            <Header textAlign="center">Update Comment</Header>
            <Form.Field>
              <label>Comment</label>
              <input
                type={"text"}
                name="Content"
                defaultValue={this.props.comment.content}
                placeholder="Content"
              />
              </Form.Field>
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
