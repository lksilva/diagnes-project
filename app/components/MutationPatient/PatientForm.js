// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import OrangeButton from '../Button/OrangeButton';
import CustomInput from '../Input/CustomInput';
import MaskInput from '../Input/MaskInput';
import styles from './MutationPatient.css';

class PatientForm extends Component {
  props: {
    change: (field: string, value: string) => void,
    handleSubmit: () => void,
    reset: () => void,
    submitting: boolean,
    error: any,
    pristine: any,
    patient: any
  }

  render() {
    const { error, handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form className={styles.wraperMutationPatient} onSubmit={handleSubmit}>
        <header className={styles.formHeader}><h1>Cadastrar Paciente</h1></header>

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
  form: 'patientForm',
})(PatientForm);
