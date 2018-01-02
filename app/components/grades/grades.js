'use strict';

var gradeModule = angular.module('schoolCalendarApp.grades', ['ngRoute']);

gradeModule.config(['$routeProvider', function($routeProvider) {
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
}]);

gradeModule.controller('GradesController',
    ['$q', '$scope', 'repositoryServices', 'featureParamObj', gradeCtrl]);

function gradeCtrl($q, $scope, repositoryServices, featureParamObj) {
    // the parameter holding any value binding from the edit form
    $scope.inputGrade = featureParamObj.prmGrade;
    // the parameter holding the keywords, pagination information
    $scope.inputFilterGrade = featureParamObj.prmFilterGrade;
    $scope.lstGrades = [];

    repositoryServices.initFeature("grade", $scope.inputGrade, $scope.inputFilterGrade);

    $scope.filter = function () {
        var dfFilter = $q.defer();
        repositoryServices.filter().then(function (data) {
            $scope.lstGrades = data;
            dfFilter.resolve(data);
        });
        return dfFilter.promise;
    }

    $scope.save = function() {
        //angular.element("gradePrimaryButton").attr("class", "ui primary loading button");
        repositoryServices.save().then($scope.filter).then(function() {
            //angular.element("gradePrimaryButton").attr("class", "ui primary button");
            //document.getElementsByTagName("input")[0].focus();
        });
        $scope.inputGrade = {action:"INS"};
    }

    $scope.edit = function(_grade) {
        repositoryServices.edit("id", _grade, $scope.lstGrades);
    }

    $scope.remove = function(_grade) {
        repositoryServices.remove("id", _grade, $scope.lstGrades);
        $scope.save();
    }
}