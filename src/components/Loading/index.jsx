import React from 'react';
import styles from './index.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>加载中...</p>
    </div>
  );
};

export default Loading;
