import React from "react";
import styled from "styled-components";

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  background-color: #6200ee;
  color: #fff;
  height: 32px;
  padding: 0 16px;
  margin-right: 16px;
  border-radius: 4px;
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
