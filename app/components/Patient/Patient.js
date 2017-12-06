// @flow
import React, { Component } from 'react';
import styles from './Patient.css';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import Loader from '../Loader/Loader';
import Dialog from 'material-ui/Dialog';
import FlatButton from '../Button/FlatButton';
import EditPatientForm from '../MutationPatient/EdtirPatientForm';
import { SubmissionError } from 'redux-form';
import Snackbar from 'material-ui/Snackbar';
import { ValidatePatientForm, ConvertDatePTBR } from '../../utils/helpers';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import { FlatButton as MuiFlatButton } from 'material-ui';

const TableExampleSimple = (props) => {
  const { patients, handleEdit, handleDelete, previous, next, page, totalPage } = props;

  return (
    <Table allRowsSelected={false} selectable={false}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Nome</TableHeaderColumn>
          <TableHeaderColumn>Telefone</TableHeaderColumn>
          <TableHeaderColumn>Email</TableHeaderColumn>
          <TableHeaderColumn>Data de nascimento</TableHeaderColumn>
          <TableHeaderColumn>Endereço</TableHeaderColumn>
          <TableHeaderColumn>Editar</TableHeaderColumn>
          <TableHeaderColumn>Excluir</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody stripedRows displayRowCheckbox={false}>
        {patients.map(patient => (
          <TableRow className={styles.tableRow} key={patient.id}>
            <TableRowColumn>{patient.name}</TableRowColumn>
            <TableRowColumn>{patient.phone}</TableRowColumn>
            <TableRowColumn>{patient.email}</TableRowColumn>
            <TableRowColumn>{ConvertDatePTBR(patient.date_of_birth)}</TableRowColumn>
            <TableRowColumn>{patient.address}</TableRowColumn>
            <TableRowColumn className={styles.editAction}>
              <div onClick={(e) => handleEdit(patient)}>
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </div>
            </TableRowColumn>
            <TableRowColumn>
              <MuiFlatButton
onClick={(e) => handleDelete(patient)}
                icon={<ActionDelete />}
                style={{ padding: 2 }}
              />
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter style={{ backgroundColor: '#3B3F42', display: 'flex', justifyContent: 'flex-end' }}>
        <FlatButton label="Anterior" handleClick={previous} disabled={page === 1} />
        <FlatButton label="Próximo" handleClick={next} disabled={page === totalPage} />
      </TableFooter>
    </Table>
  );
};

class Patient extends Component {
  props: {
    getAllPatients: (number) => void,
    incrementPage: () => void,
    decrementPage: () => void,
    updatePatient: (any) => void,
    deletePatient: (any) => void,
    isLoading: boolean,
    patients: any,
    page: number,
    totalPage: number,
    insertResponse: any
  }

  state: {
    patient: any,
    open: boolean
  }

  state = {
    patient: null,
    open: false,
    confirmOpen: false,
    rejectOpen: false,
  }

  componentWillMount() {
    this.fetchPatient();
  }

  componentWillReceiveProps(nextProps: any) {
    const goFetching = nextProps.page !== this.props.page;
    if (goFetching) {
      this.props.getAllPatients(nextProps.page);
    }
    const displayMessage = nextProps.insertResponse !== this.props.insertResponse;
    if (displayMessage) {
      this.handleClose();
      if (nextProps.insertResponse === false) {
        console.log('Mostrar reject Open');
        this.setState({ rejectOpen: true });
      } else {
        console.log('Confirma Open');
        this.setState({ confirmOpen: true }, () => this.props.getAllPatients(nextProps.page));
      }
    }
  }

  handleEdit = (patient: any) => {
    this.setState({ patient, open: true });
  };

  handleDelete = (patient: any) => {
    const resp = confirm(`Tem certeza que deseja deletar pacient ${patient.name}`);
    if (resp) {
      this.props.deletePatient(patient.id);
    }
  }

  previous = () => {
    this.props.decrementPage();
  }

  next = () => {
    this.props.incrementPage();
  }

  fetchPatient = () => {
    this.props.getAllPatients(this.props.page);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  editPatient = async (patientEdited: any) => {
    const validateObj = await ValidatePatientForm(patientEdited);
    if (validateObj.hasError) {
      throw new SubmissionError(validateObj.errors);
    }
    const newPatient = Object.assign({}, patientEdited, { id: this.state.patient.id });
    this.props.updatePatient(newPatient);
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
    const { isLoading, patients, page, totalPage } = this.props;

    return (
      <div className={styles.patientContainer}>
        {isLoading ?
          <Loader /> :
          <div>
            <TableExampleSimple patients={patients} handleEdit={(patient) => this.handleEdit(patient)} handleDelete={(patient) => this.handleDelete(patient)} previous={this.previous} next={this.next} page={page} totalPage={totalPage} />
            <Dialog
              title="Editar Pacient"
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent
            >
              {this.state.patient &&
                <EditPatientForm onSubmit={this.editPatient} patient={this.state.patient} />
              }
            </Dialog>
          </div>
        }
        <Snackbar
          open={this.state.confirmOpen}
          message="Operação realizada com sucesso!"
          autoHideDuration={2000}
          onRequestClose={this.handleRequestClose}
        />
        <Snackbar
          open={this.state.rejectOpen}
          message="Falha ao tentar realizar operação"
          autoHideDuration={2000}
          style={{ background: 'red' }}
          onRequestClose={this.handleRequestCloseReject}
        />
      </div>
    );
  }
}

export default Patient;
