import React from "react";
import styled from "styled-components";
import { style } from "../config";

import Button from "./Button.jsx";
import Controls from "./Controls.js";

const ButtonsContainer = styled.div`
  margin-bottom: ${style.sizeXs};
`;

function Pagination(props) {
  return (
    <ButtonsContainer>
      <Controls>
        {props.pages.length > 1 &&
          props.pages.map((page, index) => (
            <Button
              secondary="true"
              small="true"
              key={index}
              disabled={props.selectedPageId === index}
              handleClick={e => props.handleClick(e, index)}
            >
              {index}
            </Button>
          ))}
      </Controls>
    </ButtonsContainer>
  );
}

export default Pagination;
