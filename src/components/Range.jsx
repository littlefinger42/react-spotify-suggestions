import React from "react";
import styled from "styled-components";

const StyledRange = styled.input`
  background: transparent;
  -webkit-appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-top: -9px;
    background: #444;
    cursor: pointer;
    ...;
  }
  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-top: -9px;
    background: #444;
    cursor: pointer;
  }
  &::-ms-thumb {
    width: 24px;
    height: 24px;
    border-radius: 12px;
    margin-top: -9px;
    background: #444;
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #ccc;
  }
  &:active::-webkit-slider-runnable-track {
    background: #d6d6d6;
  }
  &::-moz-range-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: #ccc;
  }
  &::-ms-track {
    width: 100%;
    height: 6px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: #ccc;
  }
  &:focus::-ms-fill-lower {
    background: #ddd;
  }
  &::-ms-fill-upper {
    background: #ccc;
  }
  &:focus::-ms-fill-upper {
    background: #ddd;
  }
`;

class Range extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  onChange = event => {
    const value = parseFloat(event.target.value);
    this.setState({
      value
    });
    this.props.handleChange(parseFloat(event.target.value), this);
  };
  // onMouseUp = event => {
  //    this.props.handleMouseUp(parseFloat(event.target.value), this);
  // };
  render() {
    let label;
    if (this.props.label)
      label = <label htmlFor={this.props.id}>{this.props.label}</label>;

    return (
      <span>
        <StyledRange
          type="range"
          id={this.props.id}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.onChange}
          // onMouseUp={this.onMouseUp}
          value={this.state.value}
        />
        {label}
      </span>
    );
  }
}

export default Range;
