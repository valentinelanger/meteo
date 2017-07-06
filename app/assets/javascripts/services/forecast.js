app.factory('forecast', ['$http', function($http) {
  var city = getParameterByName('city');
  var date = getParameterByName('date');

  return $http({
    method: 'GET',
    url: '/answer.json?city='+city+'&date='+date,
    headers: { 'Accept': 'application/json, */*'},
  }).then(function successCallback(response) {
    console.log(response.data);
    return response.data;
  }, function errorCallback(response) {
    return response.data;
  });
}]);



function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
