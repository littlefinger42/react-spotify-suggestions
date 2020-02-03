import React from "react";
import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

const Rotate = keyframes`
from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinningFaSpinner = styled(FaSpinner)`
  animation: ${Rotate} 2s linear infinite;
`;

function Spinner(props) {
  return <SpinningFaSpinner />;
}

export default Spinner;
