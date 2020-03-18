import React, { useState } from "react";
import styled from "styled-components";
import { style } from "../config";
import { FaTimes } from "react-icons/fa";

const ModalOuter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalInner = styled.div`
  z-index: 1;
  position: relative;
  background-color: ${style.blackLevelTwo};
  border-radius: ${style.borderRadius};
`;
const ModalContent = styled.div`
  padding: ${style.sizeSm};
`;
const ModalTitle = styled(ModalContent)`
  border-bottom: 1px ${style.blackLevelThree} solid;
`;
const ModalTitleText = styled.span`
  padding-right: ${style.sizeXs};
`;
const CloseIcon = styled(FaTimes)`
  float: right;
  cursor: pointer;
`;

function Modal({ title, children, content, onClose }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ModalOuter>
        <ModalInner>
          <ModalTitle>
            {title && <ModalTitleText>{title}</ModalTitleText>}
            <CloseIcon onClick={onClose} />
          </ModalTitle>
          <ModalContent>
            {children}
            {content}
          </ModalContent>
        </ModalInner>
      </ModalOuter>
    </>
  );
}

export default Modal;
