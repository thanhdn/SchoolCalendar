'use strict';

angular.module('schoolCalendarApp.grades', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/add-new-grade', {
    templateUrl: 'components/grades/add.html',
    controller: 'GradesController'
  }).when('/grades', {
      templateUrl: 'components/grades/grades.html',
      controller: 'GradesController'
  }).when('/detail', {
      templateUrl: 'components/grades/detail.html',
      controller: 'GradesController'

  });
}])

.controller('GradesController', ['$scope', 'repository', '$location', function($scope, repository, $location) {

    $scope.result = "";
    $scope.lstGrades = "";

    $scope.initDisplayListGrades = function() {
        repository.retrieve("http://localhost:8080/grade/view", {})
            .success(function(data) {
                $scope.lstGrades = data;
            });
    };

    $scope.initDisplayListGrades();

    $scope.inputGrade = {
        id:"",
        gradeId: "",
        gradeName: "",
        lectureNumber: "",
        creationDate : "",
        updateDate : "",
        creator : ""
    };
    $scope.gradeId = "";
    $scope.gradeName = "";
    $scope.lectureNumber = "";
    $scope.saveGrade = function() {
        repository.add("http://localhost:8080/grade/add", $scope.inputGrade)
        .success(function(data) {
            $scope.result = data;
            $scope.inputGrade = {};
            $scope.initDisplayListGrades();
        }).error(function (err) {
            $scope.result = err;
        });
    }
}]);


