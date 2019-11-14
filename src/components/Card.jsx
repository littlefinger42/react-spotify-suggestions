import styled from "styled-components";
import { style } from "../config";

const Card = styled.div`
  flex: 1;
  position: relative;
  background-color: ${style.blackLevelTwo};
  border: 1px #000 solid;
  border-radius: ${style.borderRadius};
  box-sizing: border-box;
  box-shadow: #000 0px 0px ${style.sizeXs};

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  &.active {
    background-color: ${style.blackLevelThree};
  }
`;

export default Card;
