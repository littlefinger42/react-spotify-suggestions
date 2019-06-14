import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Button from "./Button.jsx";

const ButtonsContainer = styled.div`
  display: flex;
  align-itemns: center;
  justify-content: center;
  padding-top: ${style.sizeSm};
`;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonsContainer>
        {this.props.pages.map((page, index) => {
          if (page.id)
            return (
              <Button
                secondary="true"
                small="true"
                key={index}
                disabled={this.props.selectedPageId === page.id}
                handleClick={e => this.props.handleClick(e, page.id)}
              >
                {page.id}
              </Button>
            );
        })}
      </ButtonsContainer>
    );
  }
}

export default Pagination;