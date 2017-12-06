// @flow
import { HANDLE_LOADING, STORE_PATIENTS, PATIENT_NOTIFICATION, DECREMENT_PAGE, INCREMENT_PAGE, STORE_TOTAL_PAGE } from '../actions/patient';

type actionType = {
  +type: string
};

const initialState = {
  isLoading: false,
  patients: [],
  insertResponse: null,
  page: 1,
  totalPage: 1
};

export default function patient(state: any = initialState, action: actionType) {
  switch (action.type) {
    case HANDLE_LOADING:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      });
    case PATIENT_NOTIFICATION:
      return Object.assign({}, state, {
        insertResponse: action.response.sucess
      });
    case STORE_PATIENTS:
      return Object.assign({}, state, {
        patients: action.patients
      });
    case INCREMENT_PAGE:
      return Object.assign({}, state, {
        page: state.page + 1
      });
    case DECREMENT_PAGE:
      return Object.assign({}, state, {
        page: (state.page - 1) < 1 ? 1 : (state.page - 1)
      });
    case STORE_TOTAL_PAGE:
      return Object.assign({}, state, {
        totalPage: action.count
      });
    default:
      return state;
  }
}
