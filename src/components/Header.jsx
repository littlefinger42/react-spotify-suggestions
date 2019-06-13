import React from "react";
import styled from "styled-components";

const HeaderStyled = styled.header`
  height: 64px;
  padding: 0 16px;
  background-color: #212121;
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
`;
const HeaderVersion = styled.span`
  font-size: 24px;
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderStyled>
        <HeaderTitle>{this.props.title}</HeaderTitle>
        <HeaderVersion>{this.props.version}</HeaderVersion>
      </HeaderStyled>
    );
  }
}

export default Header;
