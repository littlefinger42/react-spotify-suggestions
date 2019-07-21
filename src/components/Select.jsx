import React from "react";

class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  onSelectChange = event => {
    this.setState({
      value: event.target.value
    });
    this.props.handleChange(event.target.value, this);
  };
  render() {
    let options = [];
    if (this.props.options.length > 0) {
      options = this.props.options.map(option => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ));
    }

    let label;
    if (this.props.label)
      label = <label htmlFor={this.props.id}>{this.props.label}</label>;

    return (
      <span>
        <select id={this.props.id} onChange={this.onSelectChange}>
          {options}
        </select>
        {label}
      </span>
    );
  }
}

export default Select;
