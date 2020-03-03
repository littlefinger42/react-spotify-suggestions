import React from "react";
import styled from "styled-components";
import { style } from "../config";

const AlertContainer = styled.div`
  padding: ${style.sizeXs};
  border-top: 2px ${props => getAlertColour(props.type)} solid;
  background-color: ${style.blackLevelThree};
`;

function getAlertColour(alertType) {
  switch (alertType) {
    case "danger":
      return "red";
    case "warning":
      return "orange";
    case "success":
      return "green";
  }
}

function Alert(props) {
  return (
    <AlertContainer type={props.type}>
      {props.children}
      {props.message}
    </AlertContainer>
  );
}

export default Alert;
