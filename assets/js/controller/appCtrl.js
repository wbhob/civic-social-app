var appCtrl = ["$scope", "$firebaseObject", "$firebaseArray", "$sce", "GeocodingService", function($scope, $firebaseObject, $firebaseArray, $sce, geocodingService) {
  geocodingService.getDistrictFromCoordinates({});
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
	};
  $scope.getDistrict = function() {
    console.log($scope.address.input);
    geocodingService.getDistrict($scope.address.input).then(function(d) {
      alert("The district for " + $scope.address.input + " is " + d);
    });
  };
}];

module.exports = appCtrl;
