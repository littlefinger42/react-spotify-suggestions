import React from "react";
import styled from "styled-components";

const ListItemStyled = styled.li`
  list-style: none;
  margin: 16px 0;
  padding: 16px;
  border: 1px #ddd solid;
  border-radius: 4px;
  box-shadow: #eee -10px 5px 20px;
`;

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  handleChangeCheckbox(id) {
    console.log("Handling " + id);
    this.setState({ checked: !this.state.checked });
  }

  render() {
    return (
      <label>
        <ListItemStyled>
          <input
            type="checkbox"
            checked={this.state.checked}
            onChange={() => this.handleChangeCheckbox(this.props.id)}
          />
          {this.props.name}
        </ListItemStyled>
      </label>
    );
  }
}

export default ListItem;
