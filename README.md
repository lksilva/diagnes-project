# diagnes-project

[![Join the chat at https://gitter.im/electron-react-boilerplate/Lobby](https://badges.gitter.im/electron-react-boilerplate/Lobby.svg)](https://gitter.im/electron-react-boilerplate/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/backers/badge.svg)](#backers)
[![OpenCollective](https://opencollective.com/electron-react-boilerplate/sponsors/badge.svg)](#sponsors)

Aplicação [Electron](http://electron.atom.io/) baseado em [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [React Router](https://github.com/reactjs/react-router), [Webpack](http://webpack.github.io/docs/), [React Transform HMR](https://github.com/gaearon/react-transform-hmr), [Node MySql](https://github.com/mysqljs/mysql).

## Instalação

* **Note: Requer versão node >= 7 e versão npm >= 4.**

Primeiro, clone o repositório via git:

```bash
git clone https://github.com/lksilva/diagnes-project.git
```

E então instale com yarn.

```bash
$ cd diagnes-project
$ yarn
```
**Note**: Se você não usa yarn [yarn](https://github.com/yarnpkg/yarn) , tente `npm install`.

## Executar

Para iniciar em ambiente de `dev`:

```bash
$ npm run dev
```

## Banco de dados MySql

Crie um schema chamado `diagnes-db`, então execute o seguinte comando para criar a tabela: 

```
CREATE TABLE `diagnes-db`.`patient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
```

Agora basta configurar o arquivo `app/config.db.js` para ajustar as configurações de acesso ao banco de dados
