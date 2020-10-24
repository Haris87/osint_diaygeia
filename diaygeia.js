const fs = require("fs");
const request = require("request");

if (process.argv.length === 2) {
  console.error("Expected at least one argument!");
  process.exit(1);
}

let query = process.argv[2]; // "ΜΠΟΥΧΛΗΣ ΧΑΡΑΛΑΜΠΟΣ"

console.log(query);

query = encodeURI(query);

const url = `https://diavgeia.gov.gr/luminapi/api/search/export?q=q:\"${query}\"&sort=relative&wt=json`;

request(url, function (error, response, body) {
  console.log("statusCode:", response && response.statusCode);
  if (!error && response.statusCode == 200) {
    const data = JSON.parse(body);
    fs.writeFile("./response.json", body, function () {});
    // console.log("documents found:", data.info.total);

    console.log(data);
  } else {
    console.log(error);
    console.log(response);
  }
});
