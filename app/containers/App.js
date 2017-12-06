// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import MenuPage from './MenuPage';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <MenuPage />
        {this.props.children}
      </div>
    );
  }
}
