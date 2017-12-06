// @flow
import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { push } from 'react-router-redux';

const styles = {
  menu: {
    fontSize: 18,
    padding: 17
  },
};

export default class NavMenu extends Component {
  props: {
    dispatch: any
  }

  state: {
    value: string
  }

  state = {
    value: 'list'
  }

  componentWillMount() {
    this.props.dispatch(push('/'));
  }

  handleChange = (value: string) => {
    this.setState({
      value,
    }, this.navigate(value));
  };

  navigate = (route: string) => {
    if (route === 'list') this.props.dispatch(push('/'));
    else if (route === 'register') this.props.dispatch(push('/register'));
  }

  render() {
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
        >
          <Tab style={styles.menu} label="Listar Usuário" value="list" />
          <Tab style={styles.menu} label="Cadastrar Usuário" value="register" />
        </Tabs>
      </div>
    );
  }
}
