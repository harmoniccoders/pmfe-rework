const cliLib = require('@codegena/oapi3ts-cli');
const cliApp = new cliLib.CliApplication();

cliApp.cliConfig.typingsDirectory = '';
cliApp.createTypings();
