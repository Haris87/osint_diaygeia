var fs = require("fs");

if (process.argv.length === 2) {
  console.error('Expected at least one argument!');
  process.exit(1);
}

var query = process.argv[2];// "ΜΠΟΥΧΛΗΣ ΧΑΡΑΛΑΜΠΟΣ"


if(query.indexOf(" ")!==-1){
	query = query.split(" ").join("+");
}

query = encodeURI("\""+query+"\"");

var url = "https://diavgeia.gov.gr/luminapi/api/search?page=0&q=q:"+query+"&sort=relative";

var request = require('request');
request(url, function (error, response, body) {
	console.log('statusCode:', response && response.statusCode);
	if(response.statusCode == 200){
		var data = JSON.parse(body);
		fs.writeFile("./response.json", body, function(){});
		console.log("documents found:", data.info.total );
	}
});