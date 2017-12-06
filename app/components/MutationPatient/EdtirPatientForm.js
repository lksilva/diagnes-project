// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import OrangeButton from '../Button/OrangeButton';
import CustomInput from '../Input/CustomInput';
import MaskInput from '../Input/MaskInput';
import styles from './MutationPatient.css';
import { Upper } from '../../utils/helpers';

class EdtirPatientForm extends Component {
  props: {
    change: (field: string, value: string) => void,
    handleSubmit: () => void,
    reset: () => void,
    submitting: boolean,
    error: any,
    pristine: any,
    patient: any
  }

  componentWillMount() {
    const patient = this.props.patient;
    if (patient) {
      this.props.change('name', patient.name);
      this.props.change('phone', patient.phone);
      this.props.change('email', patient.email);
      this.props.change('date_of_birth', patient.date_of_birth);
      this.props.change('address', patient.address);
    }
  }


  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className={styles.wraperMutationPatient} onSubmit={handleSubmit}>

        <aside className={styles.asideLeft}>
          <Field name="name" component={CustomInput} placeholder="Informe o nome do paciente" label="NOME" />
          <Field name="phone" component={MaskInput} mask="(99) 99999-9999" placeholder="Inform o Telefone do paciente" label="TELEFONE" />
          <Field name="email" component={CustomInput} type="email" placeholder="Inform o email do paciente" label="EMAIL" />
        </aside>

        <aside className={styles.asideRight}>
          <Field name="date_of_birth" component={CustomInput} type="date" placeholder="Informe a data de aniversário do paciente" label="DATA DE NASCIMENTO" />
          <Field name="address" component={CustomInput} placeholder="Informe o endereço do paciente" label="ENDEREÇO" />
        </aside>

        <footer>
          <OrangeButton label="Limpar" handleClick={reset} disabled={pristine || submitting} />
          <OrangeButton label="Salvar" handleClick={handleSubmit} disabled={pristine || submitting} />
        </footer>
      </form>
    );
  }
}

export default reduxForm({
  form: 'editPatientForm',
})(EdtirPatientForm);
