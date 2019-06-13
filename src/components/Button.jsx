import React from "react";

import styled from "styled-components";
import { style } from "../config"

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: ${style.primaryColor};
  color: #fff;
  height: ${style.sizeMd};
  padding: 0 ${style.sizeSm};
  margin-right: ${style.sizeSm};
  border-radius: ${style.borderRadius};
  &:hover {
    cursor: pointer;
    background-color: #2700ee;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #756e80;
  }
`;

class Button extends React.Component {
  render() {
    return (
      <ButtonStyled disabled={this.props.disabled} onClick={this.props.handleClick}>
        {this.props.children}
      </ButtonStyled>
    );
  }
}

export default Button;
