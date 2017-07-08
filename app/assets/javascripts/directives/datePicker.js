app.directive('datePicker', function() {
   return {
    restrict: 'A',
    require: 'ngModel',
    link: function (scope, element, attrs, ngModelCtrl) {
      element.datepicker({
        dateFormat: "dd/mm/yyyy",
        language: "fr",
        autoclose: true,
        onSelect: function (date) {
            scope.date = date;
            scope.$apply();
        }
      });
    }
  }
});


//     $('#datepicker').datepicker({

//       endDate: "today",

//       onSelect: function(date) {
//         angular.element($("#datepicker")).triggerHandler('input');
//       }
//     });
