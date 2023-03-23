var db_gateway = require("./db_gateway.js");
var http_requests = require("./http_requests.js");
var pr = require("./dbModules/productos");
var cl = require("./dbModules/clientes");
var nl = require("./dbModules/nivel");
var ser = require("./dbModules/servicios");
var us = require("./dbModules/usuarios");


const http = require("http");
const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  var dg = new db_gateway();
  var httpRequest = new http_requests(req);
  var peticion = new Object();
  var payload = "";

  req.on("data", function (data) {
    payload += data;
  });

  req.on("end", function () {
    function callBack(err, result) {
      res.statusCode = 200;

      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin","*");
      var response = {};

      if (err) {
        response["error"] = err.message;
      } else {
        response["data"] = result;
      }

      res.write(JSON.stringify(response, null,4));
      res.end();
    }

    resourceId = httpRequest.resourceId;
    switch (httpRequest.resourcePath[1].toLowerCase()) {
      case "clientes":
        peticion = new cl(dg);
        break;
      case "nivel":
        peticion = new nl(dg);
        break;
      case "productos":
        peticion = new pr(dg);
        break;
      case "servicios":
        peticion = new ser(dg);
        break;
      case "usuarios":
        peticion = new us(dg);
        break;
      case "":
        peticion = new pr(dg);
        break;
      default:
        peticion = new pr(dg);
        break;
    }

    switch (req.method) { 

            case "POST":

                jsonData =  JSON.parse(payload); 

                peticion.insertRecord(jsonData, callBack);

                break;

            case "PUT": 

                jsonData =  JSON.parse(payload); 

                peticion.updateRecord(resourceId, jsonData, callBack);

                break;

            case "DELETE": 

                peticion.deleteRecord(resourceId, callBack);

                break; 

            case "GET":  
                peticion.getRecords(resourceId, callBack); 
                break; 
        }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
