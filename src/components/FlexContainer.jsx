import styled from "styled-components";
import { style } from "../config";

const FlexContainer = styled.div`
  display: flex;
  margin: 0 -${style.sizeSm} 0 -${style.sizeSm};
  flex-wrap: wrap;
  flex-basis: 100%;
  > * {
    flex: 1;
    > * {
      margin: ${style.sizeSm};
    }
  }
  @media ${style.device.tablet} {
    font-size: 20px;
  }
  @media ${style.device.laptop} {
    > * {
      flex-basis: 50%;
    }
    font-size: 24px;
  }
`;

export default FlexContainer;
