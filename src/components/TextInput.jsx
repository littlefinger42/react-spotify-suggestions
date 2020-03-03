import React from "react";

import styled from "styled-components";

const TextInputStyled = styled.input``; //TODO add text input styling

function TextInput(props) {
  const handleKeyDown = e => {
    if (e.key === "Enter") {
      this.props.onEnterDown();
    }
  };
  const onChange = e => {
    this.props.onChange(e.target.value);
  };

  const { name, value } = props;
  return (
    <TextInputStyled
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    ></TextInputStyled>
  );
}

export default TextInput;
