export function ConvertDatePTBR(date) {
  return new Intl.DateTimeFormat('pt-BR').format(date);
}

export function HasWhiteSpace(value) {
  return /\s/g.test(value);
}

export const Upper = value => value && value.toUpperCase();

export const ValidatePatientForm = (values: any) => new Promise(resolve => {
  const errorMessage = 'Falha ao tentar inserir Pacient!';
  const errors = {};

  if (!values.name) {
    errors.name = 'É necessário preencher o campo de nome';
  }
  if (values.name && values.name.length > 254) {
    errors.name = 'Numéro máximo de caracteres é 255';
  }
  if (!values.phone) {
    errors.phone = 'É necessário preencher o campo de telefone';
  }
  if (!values.email) {
    errors.email = 'É necessário preencher o campo de email';
  }
  if (values.email && HasWhiteSpace(values.email)) {
    errors.email = 'Não é permitido espaços em branco no campo de email';
  }
  if (values.email && values.email.length > 254) {
    errors.email = 'Numéro máximo de caracteres é 255';
  }
  if (!values.date_of_birth) {
    errors.date_of_birth = 'É necessário preencher o campo de data';
  }
  if (!values.address) {
    errors.address = 'É necessário preencher o campo de endereço';
  }
  if (values.address && values.address.length > 254) {
    errors.address = 'Numéro máximo de caracteres é 255';
  }
  if (Object.keys(errors).length) {
    errors._error = errorMessage;
    resolve({ hasError: true, errors });
  } else {
    resolve({ hasError: false });
  }
});
