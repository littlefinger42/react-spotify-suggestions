import React from "react";
import style from "styled-components";

const HeaderStyled = style.header`
	height: 64px;
	background-color: pink;
`

class Header extends React.Component {
  render() {
    return (
      <HeaderStyled>
        {this.props.children}
      </HeaderStyled>
    );
  }
}

export default Header;
