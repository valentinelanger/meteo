app.factory('Forecast', function($http) {
  var Forecast = {
    async: function(city, date) {
      var promise = $http({
          method: 'GET',
          url: '/answer.json?city='+city+'&date='+date,
          headers: { 'Accept': 'application/json, */*'},
          }).then(function(response) {
            return getArrayOfTemperatures(response.data["history"]["observations"]);
          });
      return promise;
    }
  }
  return Forecast;
});



function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
