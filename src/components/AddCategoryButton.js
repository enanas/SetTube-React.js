import { Component } from "react";
import {
  Button,
  Segment,
  Form,
  Header,
  TransitionablePortal,
} from "semantic-ui-react";
import CategoryService from "../services/CategoryService";

export default class AddCategoryButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleErrorChange = () => {
    this.setState({ error: null });
  };

  handleAddCategory = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    CategoryService.add(data, this.props.adminId).catch((error) => {
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
          <Form onSubmit={this.handleAddCategory}>
            <Header textAlign="center">Add Category</Header>
            <Form.Field>
              <label>Name</label>
              <input type={"text"} name="Name" placeholder="Name" />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input type={"text"} name="Description" placeholder="Description" />
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
