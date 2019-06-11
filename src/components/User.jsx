import React from "react";
import Avatar from "./Avatar.jsx";

class User extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.username}</span>
        <Avatar src={this.props.imgUrl} alt={this.props.username + " avatar"} />
      </div>
    );
  }
}

export default User;
