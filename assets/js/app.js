
var whichPolygon = require("which-polygon");
angular.module("civicsocial", ["firebase"])
	.controller("AppCtrl", function($scope, $firebaseObject, $firebaseArray, $sce, District) {
		var ref = firebase.database().ref("profiles");
		$scope.people = $firebaseArray(ref);
		$scope.people.$loaded().then(function() {
			$scope.current = $scope.people[0];
			$("li." + 1).addClass("active");
			twttr.widgets.createTimeline({
					sourceType: "profile",
					screenName: $scope.current.twitterhandle
				},
				document.getElementById('currentTwitter'), {
					height: '500',
					related: 'twitterdev,twitterapi'
				});
			var url = "https://www.facebook.com/plugins/page.php?href=" + $scope.current.facebook + "&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1732805993602261";
			$scope.current.facebookURL = $sce.trustAsResourceUrl(url);
			$scope.current.facebook = $sce.trustAsResourceUrl($scope.current.facebook);
		});
		$scope.setActive = function(id) {
			document.getElementById('currentTwitter').innerHTML = "";
			$("li").removeClass("active");
			$("li." + id).addClass("active");
			$scope.current = $scope.people[parseInt(id) - 1];
			if ($scope.current.twitterhandle) {
				twttr.widgets.createTimeline({
						sourceType: "profile",
						screenName: $scope.current.twitterhandle
					},
					document.getElementById('currentTwitter'), {
						height: '500',
						related: 'twitterdev,twitterapi'
					});
			} else {
				document.getElementById('currentTwitter').innerHTML = "No Twitter timeline found.";
			}
			var url = "https://www.facebook.com/plugins/page.php?href=" + $scope.current.facebook + "&tabs=timeline&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1732805993602261";
			$scope.current.facebookURL = $sce.trustAsResourceUrl(url);
			$scope.current.facebook = $sce.trustAsResourceUrl($scope.current.facebook);
			$scope.getDisctrict = function() {
				District.get($scope.address);
			};
		};
	}).factory("District", function() {
		var output;
		// Load in which-polygon module for finding district from point

		// Promise that loads in geojson and produces query function
		var districtQuery = new Promise(function(resolve, reject) {
			$.getJSON("./assets/geojson/City_Council_Districts.geojson", function(data) {
				var query = whichPolygon(data);
				resolve(query);
			});
		});

		// ****** TEST ******* //
		output.get = function() {
			getCoords(address)
				.then(function(c) {
					return getDistrict(c);
				})
				.then(function(d) {
					alert("District for " + address + " is " + d);
				});
		};


		// ****** GEOCODING FUNCTIONS ******* //
		// Function for getting district from coordinates;
		function getDistrict(coords) {
			return Promise.resolve(
				districtQuery
				.then(function(query) {
					return query(coords).DISTRICT;
				})
			);
		}

		// Function for getting coordinates from an inputted address
		function getCoords(address) {
			return new Promise(function(resolve, reject) {
				var mapboxAccessToken = "pk.eyJ1Ijoic2tva2VuZXMiLCJhIjoiMjA0ZjBhMmQxM2VlOTk4Nzg4ZGNkZTg4ZGEzMzVlMmIifQ.KLx_nUNkguWjPm6v176iVQ";
				var url = 'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + mapboxAccessToken;

				$.get(url, function(data) {
					// Return first entry for now; In future improve to return full list, with user clicking on correct address
					resolve(data.features[0].geometry.coordinates);
				});
			});

		}
		return output;
	});
