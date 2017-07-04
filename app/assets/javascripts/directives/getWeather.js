app.directive('getWeather', function() {
  return {
    restrict: 'E',
    scope: {

    },
    template: '<button class="btn btn-active" ng-click="find()">rechercher</button> {{text}}',
    link: function(scope, element, attrs) {
      scope.text = "",
      scope.found = false,
      scope.find = function() {
        element.toggleClass('btn-active');
        if(scope.found) {
          scope.text = "<div ng-repeat='meteo in meteos'><ul><li>{{ meteo.hour }}: {{ meteo.min }}</li><li>{{ meteo.tempm }} C</li></ul></div>",
          scope.found = false
        } else {
          scope.text = "",
          scope.found = true
        }
      }
    }
  };
});
