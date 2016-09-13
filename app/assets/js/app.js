angular.module("civicsocial", ["firebase"])
	.controller("AppCtrl", function($scope, $firebaseObject, $firebaseArray) {
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
			}
      else {
        document.getElementById('currentTwitter').innerHTML = "No Twitter timeline found.";
      }
		};
	});
