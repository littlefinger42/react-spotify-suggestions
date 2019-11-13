import styled from "styled-components";
import { style } from "../config";

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
  @media ${style.device.tablet} {
    > * {
      flex: 1;
    }
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
