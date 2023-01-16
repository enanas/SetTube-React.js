import { Component } from "react";
import { Button } from "semantic-ui-react";
import AdminService from "../services/AdminService";
import CategoryService from "../services/CategoryService";
import ChannelService from "../services/ChannelService";
import CommentService from "../services/CommentService";
import UserService from "../services/UserService";
import VideoService from "../services/VideoService";

export default class GeneralDeleteButton extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleDelete = () => {
    switch (this.props.page) {
      case "Admins":
        AdminService.delete(this.props.itemId);
        break;
      case "Categories":
        CategoryService.delete(this.props.itemId);
        break;
      case "Channels":
        ChannelService.delete(this.props.itemId);
        break;
      case "Comments":
        CommentService.delete(this.props.itemId);
        break;
      case "Users":
        UserService.delete(this.props.itemId);
        break;
      case "Videos":
        VideoService.delete(this.props.itemId);
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <Button inverted onClick={this.handleDelete}>
        Delete
      </Button>
    );
  }
}
