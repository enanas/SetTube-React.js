import { Component } from "react";
import { Segment, Menu, Table, Image } from "semantic-ui-react";
import AdminService from "../services/AdminService";
import CategoryService from "../services/CategoryService";
import ChannelService from "../services/ChannelService";
import CommentService from "../services/CommentService";
import UserService from "../services/UserService";
import VideoService from "../services/VideoService";
import AddAdminButton from "../components/AddAdminButton";
import AddCategoryButton from "../components/AddCategoryButton";
import AddChannelButton from "../components/AddChannelButton";
import AddCommentButton from "../components/AddCommentButton";
import AddVideoButton from "../components/AddVideoButton";
import AddUserButton from "../components/AddUserButton";
import GeneralDeleteButton from "../components/GeneralDeleteButton";
import UpdateAdminButton from "../components/UpdateAdminButton";
import UpdateCategoryButton from "../components/UpdateCategoryButton";
import UpdateChannelButton from "../components/UpdateChannelButton";
import UpdateCommentButton from "../components/UpdateCommentButton";
import UpdateUserButton from "../components/UpdateUserButton";
import UpdateVideoButton from "../components/UpdateVideoButton";

export default class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "Admins",
      admins: [],
      categories: [],
      channels: [],
      comments: [],
      users: [],
      videos: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.handleAdminsClick();
    CategoryService.getAll().then((res) =>
      this.setState({ categories: res.data.data })
    );
  }

  handleAdminsClick = () => {
    this.setState({ isLoading: true });
    AdminService.getAll().then((res) => {
      this.setState({ admins: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Admins" });
    });
  };

  handleCategoriesClick = () => {
    this.setState({ isLoading: true });
    CategoryService.getAll().then((res) => {
      this.setState({ categories: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Categories" });
    });
  };

  handleChannelsClick = () => {
    this.setState({ isLoading: true });
    ChannelService.getAll().then((res) => {
      this.setState({ channels: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Channels" });
    });
  };

  handleCommentsClick = () => {
    this.setState({ isLoading: true });
    CommentService.getAll().then((res) => {
      this.setState({ comments: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Comments" });
    });
  };

  handleUsersClick = () => {
    this.setState({ isLoading: true });
    UserService.getAll().then((res) => {
      this.setState({ users: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Users" });
    });
  };

  handleVideosClick = () => {
    this.setState({ isLoading: true });
    VideoService.getAll().then((res) => {
      this.setState({ videos: res.data.data });
      this.setState({ isLoading: false });
      this.setState({ activeItem: "Videos" });
    });
  };

  showItems = () => {
    switch (this.state.activeItem) {
      case "Admins":
        return (
          <>
            <AddAdminButton></AddAdminButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Username
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.admins.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">{item.username}</Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateAdminButton admin={item}></UpdateAdminButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Admins"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      case "Categories":
        return (
          <>
            <AddCategoryButton adminId={this.props.adminId}></AddCategoryButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Description
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Created At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated By
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.categories.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">{item.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.createdAt}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedBy}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateCategoryButton category={item} adminId={this.props.adminId}></UpdateCategoryButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Categories"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      case "Channels":
        return (
          <>
            <AddChannelButton></AddChannelButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Channel Picture
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Channel Name
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Subscriber Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Created At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Seen At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    User ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.channels.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Image
                        avatar
                        src={"data:image/png;base64," + item.channelPicture}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.channelName}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.subscriberCount}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.createdAt}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastSeenAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.userId}</Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateChannelButton channel={item}></UpdateChannelButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Channels"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      case "Comments":
        return (
          <>
            <AddCommentButton></AddCommentButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Content
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Like Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Dislike Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Created At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Video ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    User ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Comment ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.comments.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">{item.content}</Table.Cell>
                    <Table.Cell textAlign="center">{item.likeCount}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.dislikeCount}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.createdAt}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.videoId}</Table.Cell>
                    <Table.Cell textAlign="center">{item.userId}</Table.Cell>
                    <Table.Cell textAlign="center">{item.commentId}</Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateCommentButton comment={item}></UpdateCommentButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Comments"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      case "Users":
        return (
          <>
            <AddUserButton></AddUserButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Profile Picture
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Name</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Surname
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Username
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Email</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Created At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Seen At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.users.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Image
                        avatar
                        src={"data:image/png;base64," + item.profilePicture}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.name}</Table.Cell>
                    <Table.Cell textAlign="center">{item.surname}</Table.Cell>
                    <Table.Cell textAlign="center">{item.username}</Table.Cell>
                    <Table.Cell textAlign="center">{item.email}</Table.Cell>
                    <Table.Cell textAlign="center">{item.createdAt}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastSeenAt}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateUserButton user={item}></UpdateUserButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Users"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      case "Videos":
        return (
          <>
            <AddVideoButton categories={this.state.categories}></AddVideoButton>
            <Table inverted celled collapsing>
              <Table.Header>
                <Table.Row key={0}>
                  <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Cover</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Title</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Like Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Dislike Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    View Count
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Length</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Created At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Last Updated At
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Channel ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Category ID
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Update</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.videos.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell textAlign="center">{item.id}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Image
                        src={"data:image/png;base64," + item.cover}
                        style={{ height: "200px", width: "350px" }}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.title}</Table.Cell>
                    <Table.Cell textAlign="center">{item.likeCount}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.dislikeCount}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.viewCount}</Table.Cell>
                    <Table.Cell textAlign="center">{item.length}</Table.Cell>
                    <Table.Cell textAlign="center">{item.createdAt}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.lastUpdatedAt}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{item.channelId}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {item.categoryId}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<UpdateVideoButton video={item} categories={this.state.categories}></UpdateVideoButton>}
                    ></Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      children={<GeneralDeleteButton page={"Videos"} itemId={item.id}></GeneralDeleteButton>}
                    ></Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        );
      default:
        break;
    }
  };

  render() {
    const activeItem = this.state.activeItem;
    return (
      <>
        <Segment
          inverted
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          <Menu inverted secondary>
            <Menu.Item
              name="Admins"
              active={activeItem === "Admins"}
              onClick={this.handleAdminsClick}
              style={
                activeItem !== "Admins" ? { backgroundColor: "#8C8C8C" } : {}
              }
            ></Menu.Item>
            <Menu.Item
              name="Categories"
              active={activeItem === "Categories"}
              onClick={this.handleCategoriesClick}
              style={
                activeItem !== "Categories"
                  ? { backgroundColor: "#8C8C8C" }
                  : {}
              }
            ></Menu.Item>
            <Menu.Item
              name="Channels"
              active={activeItem === "Channels"}
              onClick={this.handleChannelsClick}
              style={
                activeItem !== "Channels" ? { backgroundColor: "#8C8C8C" } : {}
              }
            ></Menu.Item>
            <Menu.Item
              name="Comments"
              active={activeItem === "Comments"}
              onClick={this.handleCommentsClick}
              style={
                activeItem !== "Comments" ? { backgroundColor: "#8C8C8C" } : {}
              }
            ></Menu.Item>
            <Menu.Item
              name="Users"
              active={activeItem === "Users"}
              onClick={this.handleUsersClick}
              style={
                activeItem !== "Users" ? { backgroundColor: "#8C8C8C" } : {}
              }
            ></Menu.Item>
            <Menu.Item
              name="Videos"
              active={activeItem === "Videos"}
              onClick={this.handleVideosClick}
              style={
                activeItem !== "Videos" ? { backgroundColor: "#8C8C8C" } : {}
              }
            ></Menu.Item>
          </Menu>
        </Segment>
        <Segment
          inverted
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "0px",
            marginBottom: "0px",
          }}
        >
          {this.showItems()}
        </Segment>
      </>
    );
  }
}
