var appCtrl = require("./controller/appCtrl.js");
var geocodingService = require("./service/geocodingService.js");

var app = angular.module("civicsocial", ["firebase"]);

app.controller("AppCtrl",appCtrl);
app.service("GeocodingService",geocodingService);