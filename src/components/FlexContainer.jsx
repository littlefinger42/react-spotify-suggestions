import styled from "styled-components";
import { style } from "../config";

const FlexContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-basis: 100%;
  }
  @media ${style.device.tablet} {
    > * {
      flex-basis: unset;
    }
  }
`;

export default FlexContainer;
