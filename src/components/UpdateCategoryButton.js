import { Component } from "react";
import {
  Button,
  TransitionablePortal,
  Header,
  List,
  Form,
  Segment,
} from "semantic-ui-react";
import CategoryService from "../services/CategoryService";

export default class UpdateCategoryButton extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  handleCategoryUpdate = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    data.append("id", this.props.category.id);
    data.append("lastUpdatedBy", this.props.adminId);
    CategoryService.update(data).catch((error) => {
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
          <Form onSubmit={this.handleCategoryUpdate}>
            <Header textAlign="center">Update Category</Header>
            <Form.Field>
              <label>Name</label>
              <input
                type={"text"}
                name="Name"
                defaultValue={this.props.category.name}
                placeholder="Name"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input
                type={"text"}
                name="Description"
                defaultValue={this.props.category.description}
                placeholder="Description"
              />
            </Form.Field>
            {this.state.error != null ? (
              <Header textAlign="center" color="red" size="small">
                {typeof this.state.error === "string" ? (
                  <List items={this.state.error.split("\n")}></List>
                ) : (
                  <List items={this.state.error}></List>
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
