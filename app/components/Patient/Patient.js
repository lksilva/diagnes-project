// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Patient.css';

export default class Patient extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h1>Patient</h1>
          <Link to="/register">to Register</Link>
        </div>
      </div>
    );
  }
}
