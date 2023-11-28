import React, { Component } from 'react';

import { IoCloseSharp } from 'react-icons/io5';
import styles from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }
  backDropClose = e => {
    e.target === e.currentTarget && this.props.close();
  };
  handleEsc = e => {
    e.code === 'Escape' && this.props.close();
  };

  render() {
    const { children, close } = this.props;
    return (
      <div className={styles.Overlay} onClick={this.backDropClose}>
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
  }
}

export default Modal;
