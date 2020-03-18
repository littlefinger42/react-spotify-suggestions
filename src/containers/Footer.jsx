import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { style } from "../config";

import { getSelectedTracks } from "../store/selectors/index";

import ExportModal from "./ExportModal";
import Button from "../components/Button.jsx";

const FooterStyled = styled.footer`
  width: 100%;
  height: ${style.sizeLg};
  background-color: ${style.blackLevelOne};
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FooterItem = styled.div`
  padding: 16px;
`;

const mapStateToProps = state => {
  return {
    selectedTracks: getSelectedTracks(state)
  };
};

function Footer(props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FooterStyled>
      {modalOpen && <ExportModal onClose={() => setModalOpen(!modalOpen)} />}

      <FooterItem>
        <Button
          disabled={props.selectedTracks.length < 1}
          handleClick={() => setModalOpen(!modalOpen)}
        >
          Export...
        </Button>
      </FooterItem>
    </FooterStyled>
  );
}

export default connect(mapStateToProps)(Footer);
