'use strict';

angular.module('schoolCalendarApp.grades', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grades', {
    templateUrl: 'components/grades/grades.html',
    controller: 'GradesController'
  });
}])

.controller('GradesController', [function() {

}]);