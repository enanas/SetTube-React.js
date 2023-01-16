import React, { Component } from "react";
import { Menu, Segment, Loader } from "semantic-ui-react";
import CategoryService from "../services/CategoryService";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [], loadingCategories: true , activeItem: "All"};
  }

  componentDidMount() {
    CategoryService.getAll().then((res) => {
      this.setState({ categories: res.data.data });
      this.setState({ loadingCategories: false });
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const activeItem = this.state.activeItem;
    return (
      <Segment inverted style={{display: "flex", justifyContent: "center"}}>
        {this.state.loadingCategories ? (
          <Loader active>Waiting categories...</Loader>
        ) : (
          <Menu inverted secondary>
            {this.state.categories.map((element) => (
              <Menu.Item
                key={element.id}
                name={element.name}
                active={activeItem === element.name}
                onClick={this.handleItemClick}
                style={activeItem !== element.name ? {backgroundColor: "#8C8C8C"}: {}}
              />
            ))}
          </Menu>
        )}
      </Segment>
    );
  }
}
