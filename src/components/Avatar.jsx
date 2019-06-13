import React from "react";
import styled from "styled-components";
import { style } from "../config";

const AvatarImg = styled.div`
  width: 70px;
  height: 70px;
  background: ${props => `url('${props.imgSrc}') no-repeat center`};
  background-size: cover;
  border-radius: 50px;
  @media ${style.device.tablet} {
    width: 100px;
    height: 100px;
  }
`;

class Avatar extends React.Component {
  render() {
    return <AvatarImg alt={this.props.alt} imgSrc={this.props.imgSrc} />;
  }
}

export default Avatar;
