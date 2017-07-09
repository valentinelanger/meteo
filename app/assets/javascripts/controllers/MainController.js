app.controller('MainController', ['$scope', 'Forecast',
  function($scope, Forecast) {
    $scope.minDate = new Date().toDateString();
    $scope.towns = TOWNS;
    $scope.town = $scope.towns[1];

    $scope.updateData = function() {
      var city = $scope.city;
      console.log(city);
      var date = $scope.date;
      console.log(date);
      Forecast.async(city, date).then(function(response) {
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


app.directive('customzdatetime', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                debug: false,
                format: 'DD-MM-YYYY',
                maxDate: moment()
            }).on('dp.change', function (e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});

TOWNS = ['Paris', 'Reims', 'Marseille'];
