import React from "react";

import styled from "styled-components";
import { style } from "../config";

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  padding: ${props =>
    props.small
      ? `${style.sizeXs.split("px")[0] / 2}px ${style.sizeXs}`
      : `${style.sizeXs} ${style.sizeSm}`};
  border-radius: ${style.borderRadius};
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }

  ${props => {
    if (props.secondary) {
      return `
        border: ${style.primaryColor} solid 2px;
        background-color: transparent;
        color: ${style.primaryColor};
        &:hover {
          border: ${style.secondaryColor} solid 2px;
          color: ${style.secondaryColor}
        }
        &:disabled {
          border: ${style.disabledColor} solid 2px;
          color: ${style.disabledColor};
        }
      `;
    } else {
      return `
        border: none;
        background-color: ${style.primaryColor};
        color: #fff;
        &:hover {
          background-color: ${style.secondaryColor};
        }
        &:disabled {
          background-color: ${style.disabledColor}
        }

      `;
    }
  }}
`;

class Button extends React.Component {
  render() {
    return (
      <ButtonStyled
        secondary={this.props.secondary}
        small={this.props.small}
        disabled={this.props.disabled}
        onClick={this.props.handleClick}
      >
        {this.props.children}
      </ButtonStyled>
    );
  }
}

export default Button;
