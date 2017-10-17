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

    .controller('GradesController',
            ['$scope',
            'repositoryServices',   // the central services
            'collectionUtil',       // the common functions for work with array
            'componentObj',         // the compoment objects used for binding values
            '$location',
            '$window',
            function($scope, repositoryServices, collectionUtil, componentObj, $location, $window) {

                // the parameter holding any value binding from the edit form
                $scope.inputGrade = componentObj.inputGrade;

                // the parameter holding the keywords, pagination information
                $scope.inputFilterGrade = componentObj.inputFilterGrade;

                // the list grade
                $scope.lstGrades = [];

                $scope.retrieveGrades = function() {
                    repositoryServices.retrieve("http://localhost:8080/grade/view", $scope.inputFilterGrade)
                        .success(function(data) {
                            $scope.lstGrades = data;
                        }).error(function(err) {

                    });
                };

                // displays the list grades after the page has fetched
                $scope.retrieveGrades();

                $scope.saveGrade = function() {
                    repositoryServices.add("http://localhost:8080/grade/add", $scope.inputGrade)
                        .success(function(data) {
                            // reset the form
                            $scope.inputGrade = {action:"INS"};
                            // refresh the list grades after insert or update a record
                            $scope.retrieveGrades();
                        }).error(function (err) {

                    });
                };


                // init data on update event
                $scope.editGrade = function(_grade) {
                    // check whether the target update grade is existed,
                    // to prevent the conflict between UI data and DB data
                    if(collectionUtil.isExistedPropertyValue("id", _grade, $scope.lstGrades)) {
                        $scope.inputGrade["grade"] = angular.copy(_grade);
                    }
                    $scope.inputGrade["action"] = repositoryServices.updateAction;
                    // scroll to the update form position
                    $window.scrollTo(0, 0);
                };

                $scope.removeGrade = function(_grade) {
                    // check whether the target update grade is existed,
                    // to prevent the conflict between UI data and DB data
                    if(collectionUtil.isExistedPropertyValue("id", _grade, $scope.lstGrades)) {
                        $scope.inputGrade["grade"] = angular.copy(_grade);
                    }
                    // setting the action to the parameters
                    $scope.inputGrade["action"] = repositoryServices.removeAction;
                    // calling service to remove the target grade
                    $scope.saveGrade();
                }
            }]);


