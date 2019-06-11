import React from "react";
import styled from "styled-components"

const AvatarImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`

class Avatar extends React.Component {
  render() {
    return <AvatarImg src={this.props.src} alt={this.props.alt} />;
  }
}

export default Avatar;
