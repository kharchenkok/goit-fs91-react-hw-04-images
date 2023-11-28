import React from 'react';
import styles from './Button.module.css';

const Button = ({ onClick, children }) => {
  return (
    <div className={styles.ButtonWrapper}>
      <button className={styles.Button} type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
