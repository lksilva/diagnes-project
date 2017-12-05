// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Register.css';

export default class Register extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Register</h2>
          <Link to="/">to List</Link>
        </div>
      </div>
    );
  }
}
