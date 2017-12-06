// @flow
import configdb from '../config.db';
import mysql from 'mysql';

type actionType = {
  +type: string
};

export const HANDLE_LOADING = 'HANDLE_LOADING';
export const STORE_PATIENTS = 'STORE_PATIENTS';
export const PATIENT_NOTIFICATION = 'PATIENT_NOTIFICATION';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export const STORE_TOTAL_PAGE = 'STORE_TOTAL_PAGE';

export function handleLogin(isLoading: boolean) {
  return {
    isLoading,
    type: HANDLE_LOADING
  };
}

export function storePatients(patients: any) {
  return {
    patients,
    type: STORE_PATIENTS
  };
}

export function storeTotalPage(count: number) {
  return {
    count,
    type: STORE_TOTAL_PAGE
  };
}

export function patientNotification(response: any) {
  return {
    response,
    type: PATIENT_NOTIFICATION
  };
}

export function incrementPage() {
  return {
    type: INCREMENT_PAGE
  };
}

export function decrementPage() {
  return {
    type: DECREMENT_PAGE
  };
}

export function updatePatient(patient: any) {
  return async (dispatch: (action: actionType) => void) => {
    dispatch(patientNotification({ sucess: null }));
    dispatch(handleLogin(true));
    const response = await updatePatientDB(patient);
    dispatch(handleLogin(false));
    dispatch(patientNotification(response));
  };
}

export function savePatient(patient: any) {
  return async (dispatch: (action: actionType) => void) => {
    dispatch(patientNotification({ sucess: null }));
    dispatch(handleLogin(true));
    const response = await savePatientDB(patient);
    dispatch(handleLogin(false));
    dispatch(patientNotification(response));
  };
}

export function getAllPatients(page: number) {
  return async (dispatch: (action: actionType) => void) => {
    dispatch(handleLogin(true));
    const { rows, count } = await fetchPatients(page);
    dispatch(storePatients(rows));
    dispatch(storeTotalPage(count));
    dispatch(handleLogin(false));
  };
}

function updatePatientDB(patient: any) {
  return new Promise((resolve) => {
    const properties = Object.keys(patient);
    const toUpdate = properties.filter(item => patient[item] && item !== 'id');
    console.log('Campos para atualizar', toUpdate);
    const queryParams = toUpdate.map(item => `${item} = ?`).toString();
    const sql = `UPDATE patient SET ${queryParams} WHERE id = ${patient.id}`;
    const values = toUpdate.map(propertie => {
      if (propertie === 'date_of_birth') {
        return new Date(patient[propertie]).toISOString().replace(/T.*/, '');
      }
      return patient[propertie];
    });

    const connection = mysql.createConnection(configdb);

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        resolve({ sucess: false });
      } else {
        console.log('Editando paciente', result);
        resolve({ sucess: true });
      }
    });

    connection.end(() => {
      console.log('Connection closed');
    });
  });
}

function savePatientDB(patient: any) {
  return new Promise((resolve) => {
    const dateBirth = new Date(patient.date_of_birth).toISOString().replace(/T.*/, '');
    const values = [patient.name, patient.phone, patient.email, dateBirth, patient.address];
    const sql = 'INSERT INTO patient (name, phone, email, date_of_birth, address) VALUES(?, ?, ?, ?, ?)';

    const connection = mysql.createConnection(configdb);

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        resolve({ sucess: false });
      } else {
        console.log('Inserido pacient', result.insertId);
        resolve({ sucess: true });
      }
    });

    connection.end(() => {
      console.log('Connection closed');
    });
  });
}

function fetchPatients(page: number) {
  return new Promise((resolve) => {
    const offset = (page - 1) * 20;
    const limit = 20;

    const sql = `SELECT id, name, phone, email, date_of_birth, address FROM patient LIMIT ${offset}, ${limit}`;
    const sqlCount = 'SELECT count(id) FROM patient';

    const connection = mysql.createConnection(configdb);

    connection.query(`${sql}; ${sqlCount}`, (error, results) => {
      if (error || !results[0].length) {
        resolve({ rows: 0, count: 0 });
      } else {
        const delimiter = parseInt(results[1][0]['count(id)'] / limit);
        const countPage = results[1][0]['count(id)'] % limit === 0 ? delimiter : delimiter + 1;
        resolve({ rows: results[0], count: countPage });
      }
    });

    connection.end(() => {
      console.log('Connection closed');
    });
  });
}
