app.directive('getWeather', function() {
  return {
    restrict: 'E',
    scope: {
      weather: '='
    },
    template: '<ul><li>{{ weather.hour }}: {{ weather.min }}</li><li>{{ weather.tempm }} C</li></ul>'
  };
});
