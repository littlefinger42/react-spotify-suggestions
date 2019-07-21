import React from "react";

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
  };
  onMouseUp = event => {
    this.props.handleChange(parseFloat(event.target.value), this);
  };
  render() {
    let label;
    if (this.props.label)
      label = <label htmlFor={this.props.id}>{this.props.label}</label>;

    return (
      <span>
        <input
          type="range"
          id={this.props.id}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          onChange={this.onChange}
          onMouseUp={this.onMouseUp}
          value={this.state.value}
        />
        {label}
      </span>
    );
  }
}

export default Range;
