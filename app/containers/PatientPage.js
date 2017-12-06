// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Patient from '../components/Patient/Patient';
import * as PatientActions from '../actions/patient';

function mapStateToProps(state) {
  return {
    isLoading: state.patient.isLoading,
    patients: state.patient.patients,
    page: state.patient.page,
    totalPage: state.patient.totalPage,
    insertResponse: state.patient.insertResponse
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PatientActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Patient);


