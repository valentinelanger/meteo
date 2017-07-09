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

TOWNS = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Saint-Etienne', 'Grenoble', 'Dijon', 'Nîmes', 'Angers', 'Villeurbanne', 'Le Mans', 'Aix-en-Provence', 'Clermont-Ferrand', 'Brest', 'Limoges', 'Amiens', 'Perpignan', 'Metz', 'Besançon', 'Boulogne-Billancourt', 'Orléans', 'Mulhouse', 'Rouen', 'Caen', 'Argenteuil', 'Nancy', 'Roubaix', 'Tourcoing', 'Nanterre', 'Avignon', 'Vitry-sur-Seine', 'Créteil', 'Poitiers', 'Asnières-sur-Seine', 'Courbevoie', 'Versailles',
'Colombes', 'Aulnay-sous-Bois','Rueil-Malmaison', 'Aubervilliers', 'Champigny-sur-Marne', 'Antibes', 'Béziers', 'Saint-Maur-des-Fosses', 'Cannes', 'Drancy', 'Colmar', 'Ajaccio', 'Bourges', 'Issy-les-Moulineaux', 'Levallois-Perret', 'Quimper', 'Noisy-le-Grand', "Villeneuve-d'Ascq", "Neuilly-sur-Seine", "Cergy", "Vénissieux", "Pessac", "Troyes", "Clichy", "Ivry-sur-Seine", "Chambéry", "Niort", "Villejuif", "Hyères", "Epinay-sur-Seine", "Cayenne", "Maisons-Alfort", "Cholet", "Pantin", "Fontenay-sous-Bois", "Le Blanc-Mesnil", "La Roche-sur-Yon", "Clamart", "Narbonne",
"Annecy", "Sartrouville", "Grasse", "Belfort", "Bobigny", "Evreux", "Vincennes", "Montrouge", "Sevran", "Albi", "Charleville-Mézières", "Suresnes", "Martigues", "Corbeil-Essonnes", "Bayonne", "Cagnes-sur-Mer", "Brive-la-Gaillarde", "Carcassonne", "Blois", "Aubagne", "Saint-Brieuc", "Chalon-sur-Saone", "Mantes-la-Jolie", "Meudon", "Saint-Malo", "Chalons-en-Champagne", "Alfortville", "Sete", "Salon-de-Provence", "Vaulx-en-Velin", "Puteaux", "Rosny-sous-Bois", "Saint-Herblain", "Gennevilliers", "Le Cannet", "Livry-Gargan", "Istres", "Valenciennes", "Choisy-le-Roi", "Caluire-et-Cuire",
"Boulogne-sur-Mer", "Bastia", "Angoulème", "Garges-les-Gonesse", "Wattrelos", "Talence", "Douai", "Noisy-le-Sec", "Tarbes", "Arras", "Alès", "La Courneuve", "Bourg-en-Bresse", "Compiègne", "Gap", "Melun", "Rezé", "Saint-Germain-en-Laye", "Gagny", "Anglet", "Draguignan", "Chartres", "Colomiers", "Saint-Martin-d'Heres", "Pontault-Combault", "Montlucon", "Joue-les-Tours", "Poissy", "Savigny-sur-Orge", "Cherbourg-Octeville"];
