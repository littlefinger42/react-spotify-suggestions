import styled from "styled-components";
import { style } from "../config"

const Toolbar = styled.div`
  position: sticky;
  top: 0;
  padding: ${style.sizeXs} 0;
  background: ${style.blackBackground};
  z-index: 1;
`;

export default Toolbar;