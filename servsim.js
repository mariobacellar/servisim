// Um cache simples (já que é só um), para restorno imediato
const cache = [];

// Modulo para gerenciamento de rotas. Se quiser troque pelo Express, Server.js, ... O importante são as funções na lib
var restify = require('restify');

// Modulo para subir o servidor
var server      = restify.createServer({name:'Servsim :: Server Simulator v0.1 :: Mario Bacellar :: [https://www.linkedin.com/in/mariobacellar]'});
    server.use(restify.plugins.bodyParser({ mapParams: false })); // Para poder pegar o JSON do body no post, put, ...

// Modulo com as funções do Servsim
var servsim_lib = require('./servsim_modules/servsim_lib');

// ************************************************
// JSONs da pasta './client'
// ************************************************
// Função comum
server.get  ('/client/select/:id' 			, function(req, res, next) { return servsim_lib.selectFileJsonById 			(req, res, next, cache	, 'client');});
server.put	('/client'						, function(req, res, next) { return servsim_lib.saveFileJson				(req, res, next			, 'client');});
// Função especifica para o campo 'phone_number'
server.post ('/client/selectPhoneNumber'	, function(req, res, next) { return servsim_lib.selectFileJsonByPhoneNumber	(req, res, next, cache	, 'client');});

// ************************************************
// JSONs da pasta './product'
// ************************************************
// Função comum
server.get  ('/product/select/:id'			, function(req, res, next) { return servsim_lib.selectFileJsonById	(req, res, next, cache	, 'product');});
server.put	('/product'						, function(req, res, next) { return servsim_lib.saveFileJson		(req, res, next			, 'product');});
// Função especifica para o campo 'code'
server.post ('/product/selectCode'			, function(req, res, next) { return servsim_lib.selectFileJsonByCode(req, res, next, cache	, 'product');});




// Sobre o servidor na 8090
server.listen(8089, function(){ console.log('%s listening at %s', server.name, server.url);});
