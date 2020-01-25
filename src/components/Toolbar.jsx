import styled from "styled-components";
import { style } from "../config";

const Toolbar = styled.div`
  position: sticky;
  top: 0;
  padding: 0 0 ${style.sizeSm} 0;
  background: ${style.blackBackground};
  z-index: 1;
`;

export default Toolbar;
