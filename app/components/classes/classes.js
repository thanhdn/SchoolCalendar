'use strict';

angular.module('schoolCalendarApp.classes', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/classes', {
    templateUrl: 'components/classes/classes.html',
    controller: 'ClassesController'
  });
}])

.controller('ClassesController', [function() {

}]);