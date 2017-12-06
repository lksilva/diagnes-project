import React, { Component } from 'react';
import styles from './Input.css';

class CustomInput extends Component {
  render() {
    const field = this.props;
    return (
      <div className={styles.boxInput}>
        <label className={styles.labelInput}>{field.label}</label>
        <input {...field.input} type={field.type} className={styles.wealthInput} placeholder={field.placeholder} />
        {field.meta.touched && field.meta.error &&
          <span className={styles.errorInputText}>{field.meta.error}</span>}
      </div>
    );
  }
}

export default CustomInput;
