app.controller('userController',
				[
					'$scope',
					'$resource',
					function ($scope, $resource) {
						var User = $resource('/api/users');

						User.query(function (results) {
							$scope.users = results;
						});

					$scope.users = [];

					$scope.createUser = function () {
						var user = new User ();
						
						user.firstName = $scope.firstName;
						user.lastName = $scope.lastName;
						user.username = $scope.username;
						user.password = $scope.password;

						user.$save(function (result) {
							$scope.users.push(result);
						});
					}

					}
				]);