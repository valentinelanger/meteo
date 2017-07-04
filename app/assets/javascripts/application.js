//= require jquery
//= require jquery_ujs
//= require angular
//= require angular-rails-templates
//= require app.js
//= require bootstrap-sprockets
//= require_tree .
//= require_tree ./controllers
//= require_tree ./directives
//= require bootstrap-datepicker

$(document).ready(function() {
  $('#datepicker').datepicker({
    format: "dd/mm/yyyy",
    endDate: "today",
    language: "fr",
    autoclose: true
  });
});

