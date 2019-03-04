// Modulo para ler/escreve arquivo
const fs = require('fs');

// ******************************************************************************
// Pasta que mantem as pastas dos objetos JSON
// ******************************************************************************
var servsim_db = 'servsim_db/';

// ******************************************************************************
// Se tiver outros tipos de objeto JSON, como 'pedido' por exemplo, ...
// Crie uma variavel pedido_db, com as descritas abaixo
// Em seguida crie uma pasta 'pedido' dentro da pasta 'servsim/servsim_db/'
// ******************************************************************************
var jsonClient  = 'client';
var client_db   = servsim_db + jsonClient + '/' + jsonClient;
var client_file = client_db  +'-';

var jsonProduct = 'product';
var product_db  = servsim_db + jsonProduct + '/'+ jsonProduct;
var product_file= product_db +'-';
// ******************************************************************************



// ******************************************************************************
// Variaveis comuns
// ******************************************************************************
var id       = '';
var filename = '';
var content  = null;
// ******************************************************************************



// ************************************************************************************************************************************************************
// *************************************************                FUNCÇÕES PUBLICAS            **************************************************************
// ************************************************************************************************************************************************************


// ******************************************************************************
// Lê os arquivo '/client/client-1.json e /client/client-2.json'
// ******************************************************************************
module.exports.selectFileJsonById = function(req, res, next, cache, kind){
	console.log("-  *****************************");
	console.log("-> selectFileJsonById");
	console.log("-  *****************************");
	// Inicializa o conteudo para usar na funcao loadJson
	content=null;
	
	id       = req.params.id;
	filename = getFileName(filename, id, kind);
	content  = loadJSON(content, filename, cache);

	console.log("-  id.......=["+id+"]");
	console.log("-  *****************************");
	console.log("<- selectFileJsonById");
	console.log("-  *****************************");
	res.send(content);
	next();	
};


// ******************************************************************************
// Lê os arquivo '/client/client-11972173758.json' e '/client/client-21999526925.json'
// ******************************************************************************
module.exports.selectFileJsonByPhoneNumber = function (req, res, next, cache, kind){
	console.log("-  *****************************");
	console.log("-> selectFileJsonByPhoneNumber");
	console.log("-  *****************************");
	// Inicializa o conteudo para usar na funcao getJson
	content=null;
	
	id       = req.body.phone_number;
	filename = getFileName(filename, id, kind);
	content  = loadJSON(content, filename, cache);

	console.log("-  id.......=["+id+"]");
	console.log("-  *****************************");
	console.log("<- selectFileJsonByPhoneNumber");
	console.log("-  *****************************");
	res.send(content);
	next();	
};

// ******************************************************************************
// Lê os arquivo '/produc/product-10020.json' e '/product/product-10090.json'
// ******************************************************************************
module.exports.selectFileJsonByCode = function (req, res, next, cache, kind){
	console.log("-  *****************************");
	console.log("-> selectFileJsonByByCode");
	console.log("-  *****************************");
	// Inicializa o conteudo para usar na funcao getJson
	content=null;
	
	id		= req.body.code;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);

	console.log("-  id.......=["+id+"]");
	console.log("-  *****************************");
	console.log("<- selectFileJsonByByCode");
	console.log("-  *****************************");
	res.send(content);
	next();	
};

// ******************************************************************************
// Salva JSONs pelo campo 'id': '/cliente/client-1.json e client-2.json'
// Para usar essa forma de gravar, o JSON tem que ter um campo 'id'. (req.id)
// O valor desse campo será usado no nome do arquivo, ex: cliente-1.json
// Se quiser usar outro campo como identificador para gravar o arquivo, 
// altere 'req.id' para 'req.seu_campo_identificado' ou crie outra função saveFileJsonByCode, por exemplo.
// ******************************************************************************
module.exports.saveFileJson = function (req, res, next, kind){
	console.log("-  *****************************");
	console.log("-> saveFileJson");		
	console.log("-  *****************************");

	//Pega o campo Id do json
	id = req.body.id;
	console.log("-  id.......=["+id+"]");
	
	filename = getFileName(filename, id, kind);
	console.log("- filename=["+filename+"]");
	
	// Formata o JSON para nao ficar tudo numa linha só. Se quiser tudo na mesma linha, remova os parametros do stringFy deixando apenas o req.body
	content = JSON.stringify(req.body, null, '\t');
	console.log("- content=["+content+"]");	
	
	writeJSON(filename, content);
	
	res.send("200");
	console.log("-  *****************************");
	console.log("<- saveFileJson");		
	console.log("-  *****************************");
	next();
};

// ************************************************************************************************************************************************************
// *************************************************                FUNCÇÕES PRIVADAS            **************************************************************
// ************************************************************************************************************************************************************
function loadJSON(content, filename, cache){
	console.log("-  *****************************");
	console.log("-> loadJSON ... filename["+filename+"]");
	console.log("-  *****************************");
	
	// Verifica se existe cache
	if ( Object.keys(cache).length>0 ){
		console.log("- Existe cache ...  Procurando ["+filename+"] no cache");
		for (var i = 0; i < Object.keys(cache).length; i++) { 
			if (cache[i].jsonFile === filename){
				content  = cache[i].jsonContent;
				console.log("- Retornando JSON do cache ["+content+"]");
				break; 
			}
		}

	}else{
		console.log("- Não existe cache!!!");
	}

	if (content == null){
		console.log("- Existe cache mas esse conteudo ainda nao foi caheado...Lendo arquivo["+filename+"]");
		content = JSON.parse( fs.readFileSync(filename, 'utf8'));
		
		// Como no Javascript nao tem tipo, você precisa inicializar a variavel com o tipo que vc quer usar
		var item = 0;
		item = item + Object.keys(cache).length;
		
		// Adiciona o json no cache. 
		cache[ item ] = {
			value: item, 
			jsonFile: filename, 
			jsonContent: content
		};
	}	

	console.log("-  *****************************");
	console.log("<- loadJSON ... content["+JSON.stringify(content)+"]");
	console.log("-  *****************************");
	return content;
};

// ******************************************************************************
// Grava o arquivo na servsim_db especifica
// ******************************************************************************
function writeJSON(filename, content){
	console.log("-> writeJSON");				
	fs.writeFile(filename, content, function (err) {
	  if (err) 
		  throw err;
	  console.log('- Saved...filename['+filename+'] - content['+content+']');
	});
	console.log("<- writeJSON");				
};


// ******************************************************************************
// Se for criar mais objetos JSON, esse IF deve ser enrriquecido
// ******************************************************************************
function getFileName(filename, id, kind){
	console.log("-> getFileName ... kind["+kind+"]");
	if (kind == jsonClient)	{filename = client_file  + id + '.json';}	else 
	if (kind == jsonProduct)	{filename = product_file + id + '.json';}	else throw new Error('Nome de arquivo JSON inválido.');
	console.log("-> getFileName filename=["+filename+"]");
	return filename;
}
