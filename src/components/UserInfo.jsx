import React from "react";

import Card from "./Card.jsx";
import Avatar from "./Avatar.jsx";

class UserInfo extends React.Component {
  render() {
    return (
      <Card>
        <span><strong>Username:</strong> {this.props.username}</span>
        <span><strong>Tracks Selected:</strong> {this.props.tracksSelected}</span>
        <Avatar imgSrc={this.props.imgUrl} alt={this.props.username + " avatar"} />
      </Card>
    );
  }
}

export default UserInfo;
