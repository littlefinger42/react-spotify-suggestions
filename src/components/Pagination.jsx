import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Button from "./Button.jsx";

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${style.sizeXs};
`;

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ButtonsContainer>
        {this.props.pages.length > 1 &&
          this.props.pages.map((page, index) => {
            if (page.id !== undefined)
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
