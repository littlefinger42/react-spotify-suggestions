import React from "react";
import style from "styled-components";

import Card from "./Card.jsx";
import Avatar from "./Avatar.jsx";

const Label = style.strong`
  text-decoration: underline;
`

class User extends React.Component {
  render() {
    return (
      <Card>
        <span><Label>Username:</Label> {this.props.username}</span>
        <Avatar src={this.props.imgUrl} alt={this.props.username + " avatar"} />
      </Card>
    );
  }
}

export default User;
