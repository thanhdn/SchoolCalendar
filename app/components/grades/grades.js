'use strict';

angular.module('schoolCalendarApp.grades', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/grades', {
    templateUrl: 'components/grades/grades.html',
    controller: 'GradesController'
  });
}])

.controller('GradesController', ['$scope', 'repository', function($scope, repository) {

    $scope.result = "";

    repository.retrieve().success(function(data) {
      $scope.result = data;
    });

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
    $scope.addGrade = function() {
      /* var inputGrade = {*/
      /*    "id" : "",*/
      /*    "gradeId" : $scope.gradeId,*/
      /*    "gradeName" : $scope.gradeName,*/
      /*    "lectureNumber" : $scope.lectureNumber,*/
      /*    "creationDate" : "",*/
      /*    "updateDate" : "",*/
      /*    "creator" : ""*/
      /*  };*/
        repository.add("http://localhost:8080/grade/add", $scope.inputGrade)
        .success(function(data) {
            $scope.result = data;
            $scope.inputGrade = {
                id:"",
                gradeId: "",
                gradeName: "",
                lectureNumber: "",
                creationDate : "",
                updateDate : "",
                creator : ""
            };
        }).error(function (err) {
            $scope.result = err;
        });
    }
}]);