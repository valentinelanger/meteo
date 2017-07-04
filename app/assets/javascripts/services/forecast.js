app.factory('forecast', ['$http', function($http) {
  var city = document.getElementById("ville").value;
  var date = document.getElementById("datepicker").value;

  return $http({
    method: 'GET',
    url: '/answer.json?city=Paris&date=25%2F06%2F2017',
    headers: { 'Accept': 'application/json, */*'},
  }).then(function successCallback(response) {
    return response.data[0];
  }, function errorCallback(response) {
    return response.data[0];
  });
}]);
