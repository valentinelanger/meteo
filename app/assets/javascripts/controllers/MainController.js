app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
    forecast.then(function(response) {
      $scope.results = response;
    });
 }]);

