// A simple cache for immediate returns the files already loaded.
const cache = [];

// Restify is as MVC framework for route management. If you want to you can switch to Express, Server.js, ... 
// The important thing is the functions in lib.
var restify = require('restify');
var server = restify.createServer({name:'Servisim :: Service Simulator v0.1 :: Mario Bacellar :: [https://www.linkedin.com/in/mariobacellar]'});
    server.use(restify.plugins.bodyParser({ mapParams: false })); // Para poder pegar o JSON do body no post, put, ...

// Servisim lib. 
var servisim_lib = require('./servisim_modules/servisim_lib');



// ************************************************
// JSONs folder './client'
// ************************************************
// Common functions: selectFileJsonById and saveFileJson
server.get  ('/client/select/:id' 			, function(req, res, next) { return servisim_lib.selectFileJsonById 		(req, res, next, cache	, 'client');});
server.put	('/client'						, function(req, res, next) { return servisim_lib.saveFileJson				(req, res, next			, 'client');});
// A proper function for 'phone_number' field from JSON
server.post ('/client/select/phoneNumber'	, function(req, res, next) { return servisim_lib.selectFileJsonByPhoneNumber(req, res, next, cache	, 'client');});




// ************************************************
// JSONs folder './product'
// ************************************************
// Common functions: selectFileJsonById and saveFileJson
server.get  ('/product/select/:id'			, function(req, res, next) { return servisim_lib.selectFileJsonById	(req, res, next, cache	, 'product');});
server.put	('/product'						, function(req, res, next) { return servisim_lib.saveFileJson		(req, res, next			, 'product');});
// A proper function for 'code' field from JSON
server.post ('/product/select/code'			, function(req, res, next) { return servisim_lib.selectFileJsonByCode(req, res, next, cache	, 'product');});




// Running on 8090
server.listen(8089, function(){ console.log('%s listening at %s', server.name, server.url);});
