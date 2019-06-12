import React from "react";
import style from "styled-components";

import Avatar from "./Avatar.jsx";

const Label = style.strong`
  text-decoration: underline;
`

class User extends React.Component {
  render() {
    return (
      <div>
        <span><Label>Username:</Label> {this.props.username}</span>
        <Avatar src={this.props.imgUrl} alt={this.props.username + " avatar"} />
      </div>
    );
  }
}

export default User;
