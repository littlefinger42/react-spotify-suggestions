import React from "react";
import styled from "styled-components";

import ListItem from "./ListItem.jsx";

const StyledList = styled.ul`
	padding: 0;
`


class List extends React.Component {
  render() {
    return (
      <StyledList>
        {this.props.list.map(item => (
          <ListItem key={item.id} id={item.id} name={item.name} />
        ))}
      </StyledList>
    );
  }
}

export default List;
