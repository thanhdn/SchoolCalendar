'use strict';

angular.module('schoolCalendarApp.courses', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/courses', {
    templateUrl: 'components/courses/courses.html',
    controller: 'CoursesController'
  });
}])

.controller('CoursesController', [function() {

}]);