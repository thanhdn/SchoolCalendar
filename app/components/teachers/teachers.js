'use strict';

angular.module('schoolCalendarApp.teachers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/teachers', {
    templateUrl: 'components/teachers/teachers.html',
    controller: 'TeachersController'
  });
}])

.controller('TeachersController', [function() {

}]);