import React from "react";
import styled from "styled-components";

const AvatarImg = styled.div`
  width: 50px;
  height: 50px;
  background: ${props => `url('${props.imgSrc}') no-repeat center`};
  background-size: cover;
  border-radius: 50px;
`;

class Avatar extends React.Component {
  render() {
    return <AvatarImg alt={this.props.alt} imgSrc={this.props.imgSrc} />;
  }
}

export default Avatar;
