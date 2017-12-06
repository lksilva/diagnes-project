// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MutationPatient from '../components/MutationPatient/MutationPatient';
import * as PatientActions from '../actions/patient';

function mapStateToProps(state) {
  const patient = state.router.location.state ? state.router.location.state.editPatient : null;
  return {
    insertResponse: state.patient.insertResponse,
    isLoading: state.patient.isLoading,
    patientToEdit: patient
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PatientActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MutationPatient);
