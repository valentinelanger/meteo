app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
    forecast.then(function(response) {
      console.log(response);
      $scope.results = response;
    });
 }]);

