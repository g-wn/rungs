import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div
        id='modal-background'
        onClick={onClose}
      />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}

export function IsPrivateModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div
        id='is-private-modal-background'
        onClick={onClose}
      />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}

export function ImgUploadModal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id='modal'>
      <div
        id='img-upload-modal-background'
        onClick={onClose}
      />
      <div id='modal-content'>{children}</div>
    </div>,
    modalNode
  );
}
