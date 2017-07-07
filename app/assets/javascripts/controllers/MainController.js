app.controller('MainController', ['$scope', 'Forecast',
  function($scope, Forecast) {
    $scope.city = getParameterByName('city');
    $scope.date = getParameterByName('date');
    $scope.updateData = function() {
      Forecast.async().then(function(response) {
        $scope.data = response;
      });
    }
 }]);

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
