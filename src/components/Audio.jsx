import styled from "styled-components";
import { style } from "../config"

const Audio = styled.audio`
  height: 24px;
  width: 100%;
  @media ${style.device.tablet} {
    height: 32px;
  }
`;

export default Audio;
