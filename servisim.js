// A simple cache for immediate returns the files already loaded.
const cache = [];
 
// Restify is as MVC framework for route management. If you want to you can switch to Express, Server.js, ... 
// The important thing is the functions in lib.
var restify = require("restify");
var server = restify.createServer({name:"Servisim :: Service Simulator v0.1 :: Mario Bacellar :: [https://www.linkedin.com/in/mariobacellar]"});
    server.use(restify.plugins.bodyParser({ mapParams: false })); // It is to get JSON from req.body (post, put, ...)

// Servisim Lib
const servisimLib = require("./servisim_modules/servisim_lib");


// ************************************************
// JSONs folder './client'
// ************************************************
// Common functions: selectFileJsonById and saveFileJson
server.get  ("/api/client/select/:id", function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, "client");});
server.put	("/api/client", function(req, res, next) { return servisimLib.saveFileJson(req, res, next, "client");});
// A proper function for 'phone_number' field from JSON
server.post ("/api/client/select/phoneNumber", function(req, res, next) { return servisimLib.selectFileJsonByPhoneNumber (req, res, next, cache	, "client");});



// ************************************************
// JSONs folder './product'
// ************************************************
// Common functions: selectFileJsonById and saveFileJson
server.get  ("/api/product/select/:id"			, function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, "product");});
server.put	("/api/product"						, function(req, res, next) { return servisimLib.saveFileJson(req, res, next	, "product");});
// A proper function for 'code' field from JSON
server.post ("/api/product/select/code"			, function(req, res, next) { return servisimLib.selectFileJsonByCode(req, res, next, cache, "product");});


// Running on 8090
server.listen(8089, function(){ console.log('%s listening at %s', server.name, server.url);});
//https://travis-ci.org/mariobacellar/servisim
//https://app.codacy.com/projects
//https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
