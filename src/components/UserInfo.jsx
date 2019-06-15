import React from "react";
import style from "styled-components";

import Card from "./Card.jsx";
import Avatar from "./Avatar.jsx";

const Label = style.strong`
  text-decoration: underline;
`

class UserInfo extends React.Component {
  render() {
    return (
      <Card>
        <span><Label>Username:</Label> {this.props.username}</span>
        <span><Label>Tracks Selected:</Label> {this.props.tracksSelected}</span>
        <Avatar imgSrc={this.props.imgUrl} alt={this.props.username + " avatar"} />
      </Card>
    );
  }
}

export default UserInfo;
