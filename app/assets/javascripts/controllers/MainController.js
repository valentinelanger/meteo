app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
    forecast.then(function(response) {
      $scope.results = response["history"]["observations"];
      console.log(getArrayOfTemperatures(response["history"]["observations"]));
      console.log(getArrayOfHours(response["history"]["observations"]));
      $scope.data = getArrayOfTemperatures(response["history"]["observations"]);
      $scope.hours = getArrayOfHours(response["history"]["observations"]);
      $scope.city = getParameterByName('city');
      $scope.date = getParameterByName('date');
    });

    function getArrayOfTemperatures(response) {
      var temperatures = [];
      temperatures.push(Number(response[0]["tempm"]));
      for (i = 1; i < response.length; i++) {
        if ((response[i]["date"]["hour"] !== response[i-1]["date"]["hour"]) && (response[i]["date"]["min"] != "30")) {
        temperatures.push(Number(response[i]["tempm"]));
        }
      }
      return temperatures;
    }

    function getArrayOfHours(response) {
      var hours = [];
      hours.push(response[0]["date"]["hour"] + ':' + response[0]["date"]["min"]);
      for (i = 1; i < response.length; i++) {
        if ((response[i]["date"]["hour"] !== response[i-1]["date"]["hour"]) && (response[i]["date"]["min"] != "30")) {
        hours.push(response[i]["date"]["hour"] + ':' + response[i]["date"]["min"]);
        }
      }
      return hours;
    }
 }]);

