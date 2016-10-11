var appCtrl = require("./controller/appCtrl.js");
var geocodingService = require("./service/geocodingService.js");

var app = angular.module("civicsocial", ["firebase"]);

app.controller("AppCtrl",appCtrl);
<<<<<<< HEAD
app.service("GeocodingService",geocodingService);
=======
app.service("GeocodingService",geocodingService);
>>>>>>> 2de568727f88aec737d2d5e32f8039ce4b206cae
