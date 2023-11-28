import React, { useEffect } from 'react';

import { IoCloseSharp } from 'react-icons/io5';
import styles from './Modal.module.css';

const Modal = ({ children, close }) => {
  useEffect(() => {
    const handleEsc = event => {
      event.code === 'Escape' && close();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  const backDropClose = event => {
    event.target === event.currentTarget && close();
  };

  return (
    <div className={styles.Overlay} onClick={backDropClose}>
      <div className={styles.Modal}>
        <button
          type="button"
          className={styles.ModalCloseButton}
          aria-label="Close"
          onClick={close}
        >
          <IoCloseSharp />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
