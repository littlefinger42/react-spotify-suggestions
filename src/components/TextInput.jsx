import React from "react";

import styled from "styled-components";
import { style } from "../config";

const TextInputStyled = styled.input``;

class TextInput extends React.Component {
  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.onEnterDown();
    }
  };
  onChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const { name } = this.props;
    return (
      <TextInputStyled
        type="text"
        name={name}
        value={this.props.value}
        onChange={this.onChange}
        onKeyDown={this.handleKeyDown}
      ></TextInputStyled>
    );
  }
}

export default TextInput;
