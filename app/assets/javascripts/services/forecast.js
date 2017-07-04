app.factory('forecast', ['$http', function($http) {

  return $http({
    method: 'GET',
    url: '/answer.json',
    params: {"city": "Paris", "date": "26%2F06%2F2017"},
    headers: { 'Accept': 'application/json, */*'},
  }).then(function successCallback(response) {
    console.log(response);
  }, function errorCallback(response) {
    console.log(response.data);
  });
}]);
