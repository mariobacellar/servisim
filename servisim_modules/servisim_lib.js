// Module for read and write file
const fs = require("fs");

// This folder represents a database. It contains one folder for each JSON object.
const servisimDB= "servisim_db/";

// ******************************************************************************
// If you have another JSON object to receive, such as 'order', for example, 
// you can just follow the logic used for those 'client' and 'product ', such as described below:
// Don't forget create a 'order' folder inside the folder 'servisim/servisimDB /'
// ******************************************************************************
const jsonClient  = "client";
const clientDB    = servisimDB + jsonClient + "/" + jsonClient;
const clientFile  = clientDB   + "-";

var jsonProduct  = "product"; 
var productDB    = servisimDB + jsonProduct + "/"+ jsonProduct;
var productFile  = productDB  + "-";
// ******************************************************************************


// ******************************************************************************
// Common variabels
// ******************************************************************************
var id       = "";
var filename = "";
var content  = null;
// ******************************************************************************


function loadJSON(content, filename, cache){
	// console.log("-  *****************************");
	// console.log("-> loadJSON ... filename["+filename+"]");
	// console.log("-  *****************************");
	
	content = null;
	
	if ( Object.keys(cache).length>0 ){
		//console.log("- Cache exist ["+Object.keys(cache).length+"]...  Looking for ["+filename+"]");
		for (var i = 0; i < Object.keys(cache).length; i++) { 
			if (cache[i].jsonFile === filename){
				content  = cache[i].jsonContent;
				//console.log("- Returnig content ["+JSON.stringify(content)+"] from cache")
				break; 
			}	
		}
	}
	// else{
	// 	console.log("- There is no cache yet ... ["+Object.keys(cache).length+"]");
	// }

	if (content == null){
		//console.log("- There is no cache for this file ["+filename+"] ... Loading JSON/content.");
		content = JSON.parse( fs.readFileSync(filename, "utf8"));
		
		var item = 0 + Object.keys(cache).length;
		//console.log("- Adding item cahce position=["+item+"]");
		
		// Adiciona o json no cache. 
		cache[ item ] = {
			value: item, 
			jsonFile: filename, 
			jsonContent: content
		};
	}	
	// console.log("-  *****************************");
	// console.log("<- loadJSON ... content["+JSON.stringify(content)+"]");
	// console.log("-  *****************************");
	return content;
};

// ******************************************************************************
// Save JSON file into specific  servisimDB folder
// ******************************************************************************
function writeJSON(filename, content){
//	console.log("-> writeJSON");				
	fs.writeFile(filename, content, function (err) {
	  if (err) throw err;
	});
	// console.log("- Saved...filename["+filename+"] - content["+content+"]");
	// console.log("<- writeJSON");				
};


// ******************************************************************************
// This function must be modified if you gonna create another JSON objects.
// ******************************************************************************
function getFileName(filename, id, kind){
	if (kind == jsonClient)   {filename = clientFile  + id + ".json";}	else 
	if (kind == jsonProduct)  {filename = productFile + id + ".json";}	else throw new Error("Invalid kind("+kind+") parameterJSON file name.");
	return filename;
}


// ******************************************************************************
// Read files like '/client/client-1.json e /client/client-2.json'
// The number 1 (in '???-1') is intend to be the 'id' field into JSON object
// ******************************************************************************
module.exports.selectFileJsonById = function(req, res, next, cache, kind){
	// console.log("-  *****************************");
	// console.log("-> selectFileJsonById");
	// console.log("-  *****************************");
 
	id       = req.params.id;
	//console.log("-  id.......=["+id+"]");

	filename = getFileName(filename, id, kind);
	content  = loadJSON(content, filename, cache);

	// console.log("-  *****************************");
	// console.log("<- selectFileJsonById");
	// console.log("-  *****************************");
	res.send(content);
	next();	
};


// ******************************************************************************
// Read files like '/client/client-11972173758.json' e '/client/client-21999526925.json'
// The number 11972173758 (in '???-11972173758') is intend to be the 'phone_number' field into JSON object
// ******************************************************************************
module.exports.selectFileJsonByPhoneNumber = function (req, res, next, cache, kind){
	// console.log("-  *****************************");
	// console.log("-> selectFileJsonByPhoneNumber");
	// console.log("-  *****************************");

	id       = req.body.phone_number;
	//console.log("-  id.......=["+id+"]");

	filename = getFileName(filename, id, kind);
	content  = loadJSON(content, filename, cache);

	// console.log("-  *****************************");
	// console.log("<- selectFileJsonByPhoneNumber");
	// console.log("-  *****************************");
	res.send(content);
	next();	
};

// ******************************************************************************
// Read files like '/produc/product-10020.json' e '/product/product-10090.json'
// The number 10090 (in '???-10090') is intend to be the 'code' field into JSON object
// ******************************************************************************
module.exports.selectFileJsonByCode = function (req, res, next, cache, kind){
	// console.log("-  *****************************");
	// console.log("-> selectFileJsonByByCode");
	// console.log("-  *****************************");

	id		= req.body.code;
	//console.log("-  id.......=["+id+"]");

	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);

	// console.log("-  *****************************");
	// console.log("<- selectFileJsonByByCode");
	// console.log("-  *****************************");
	res.send(content);
	next();	
};

// ****************************************************************************** 
// Gets the JSON from request.body (content), takes the value from the 'id' field and saves the JSON in the folder indicated by the 'kind' parameter.
// To use this way of writing JSON must have the 'id' field. (req.id). If you don't have it, you can modify this function or create another function similarly.
// The value of 'id' field will be used in file name, eg: client-1.json
// ******************************************************************************
module.exports.saveFileJson = function (req, res, next, kind){
	// console.log("-  *****************************");
	// console.log("-> saveFileJson");		
	// console.log("-  *****************************");

	id = req.body.id;
	//console.log("-  id.......=["+id+"]");
	
	filename = getFileName(filename, id, kind);
	//console.log("- filename=["+filename+"]");
	
	// It formats the JSON so that everything is not on one line. 
	// If you want everything on the same line, remove the stringFy parameters by leaving only the req.body	
	content = JSON.stringify(req.body, null, "\t");
	//console.log("- content=["+content+"]");	
	
	writeJSON(filename, content);
	
	res.send("200");
	// console.log("-  *****************************");
	// console.log("<- saveFileJson");		
	// console.log("-  *****************************");
	next();
};
