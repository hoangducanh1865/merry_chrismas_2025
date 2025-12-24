import React from 'react';
import styles from './Snowfall.module.css';

const Snowfall: React.FC = () => {
  return (
    <div className={styles.snowfall}>
      <div className={styles.snow}></div>
      <div className={styles.snow1}></div>
      <div className={styles.snow2}></div>
    </div>
  );
};

export default Snowfall;
