// @flow
import React, { Component } from 'react';
import PatientForm from './PatientForm';
import { SubmissionError } from 'redux-form';
import Loader from '../Loader/Loader';
import Snackbar from 'material-ui/Snackbar';
import { ValidatePatientForm } from '../../utils/helpers';

class MutationPatient extends Component {
  props: {
    savePatient: () => void,
    isLoading: boolean,
    insertResponse: any,
    patientToEdit: any
  }

  state = {
    confirmOpen: false,
    rejectOpen: false,
  };

  componentWillReceiveProps(nextProps: any) {
    const displayMessage = nextProps.insertResponse !== this.props.insertResponse;
    if (displayMessage) {
      if (nextProps.insertResponse === false) {
        this.setState({ rejectOpen: true });
      } else {
        this.setState({ confirmOpen: true });
      }
    }
  }

  savePatient = async (values: any) => {
    const validateObj = await ValidatePatientForm(values);
    if (validateObj.hasError) {
      throw new SubmissionError(validateObj.errors);
    }
    this.props.savePatient(values);
  }

  handleRequestClose = () => {
    this.setState({
      confirmOpen: false,
    });
  };

  handleRequestCloseReject = () => {
    this.setState({
      rejectOpen: false
    });
  }

  render() {
    const { isLoading, patientToEdit } = this.props;

    return (
      <div>
        {isLoading ?
          <Loader /> :
          <PatientForm onSubmit={this.savePatient} patient={patientToEdit} />
        }
        <Snackbar
          open={this.state.confirmOpen}
          message="Paciente inserido com sucesso!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.rejectOpen}
          message="Falha ao tentar inserir paciente!"
          autoHideDuration={4000}
          style={{ background: 'red' }}
          onRequestClose={this.handleRequestCloseReject}
        />
      </div>
    );
  }
}

export default MutationPatient;
