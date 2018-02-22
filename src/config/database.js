/**
 * Database Configuration / Configuração base de dados
 *
 * Português / English
 *
 *  Host: Heroku mLab
 *  Database Type: MongoDB
 *  Database Name: heroku_clzfdlwj
 *  User: serventec
 *  Password: portalserventec
 *
 *  PT: Configuração de base de dados local
 *  EN: Configuration of local database
 *   mongoose.connect('mongodb://localhost/databaseName');
 *
 */
const mongoose = require('mongoose');

// mongoose.connect('mongodb://herokumlab:herokupass@ds245287.mlab.com:45287/heroku_k34fbvx8', { useMongoClient: true, config: {autoIndex: false} });
// mongoose.connect('mongodb://localhost/graphql', { useMongoClient: true });
mongoose.connect('mongodb://openpass:openpass@ds245548.mlab.com:45548/heroku_2hlzw837', { useMongoClient: true });
mongoose.Promise = global.Promise;


/**
 * PT: Função para imprimir no console se a conxão com o banco foi efetuada
 * EN: Function to print in console if the database connection was a success
 */

mongoose.connection.on('connected', () => {
  console.log('Conectado ao Banco MongoDB');
});

/**
 * PT: Evitando derrubar aplicação caso não tenha conexão
 * EN: Avoiding close the application if not get the connection
 */

mongoose.connection.on('error', (error) => {
  console.log(`Erro na conexão: ${error}`);
});

/**
 * EN: Evitando derrubar a app Caso perda de conexão
 * PT: Avoiding close the application if lost connection
*/

mongoose.connection.on('disconnected', () => {
  console.log('Desconectado do banco MongoDB');
});

/**
 *  PT: Process pode ser usado em qualquer lugar de nossa aplicação com o process podemos
 *    acessar as informações e eventos de nossa app, este caso estamos acessando o process
 *    para saber se a app foi finalizada e assim garantir a finalização da conexão com banco.
 *
 *  EN: Accessing the process to ensure close the database connection when the application finish
*/

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('conexão fechada pelo temino da aplicação');
    process.exit(0);
  });
});
