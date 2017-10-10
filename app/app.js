'use strict';
// import available features to current working board
var schoolCalendarApp = angular.module("schoolCalendarApp", [
    'ngRoute',
    'schoolCalendarApp.grades',
    'schoolCalendarApp.classes',
    'schoolCalendarApp.courses',
    'schoolCalendarApp.teachers'
]);
schoolCalendarApp.
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');
    $routeProvider.
    otherwise({redirectTo: '/grades'});

}]).
controller('schoolCalendarController', ['$scope', '$location', function($scope, $location) {
    var path = $location.path();
    // available features
    $scope.tabs = [
        { link : '#/grades',   label : 'Khối học' },
        { link : '#/courses',  label : 'Các môn học' },
        { link : '#/teachers', label : 'Danh sách giáo viên' },
        { link : '#/classes',  label : 'Danh sách lớp' }
    ];
    // keeping the activated status of the current tab after the page already reloaded
    for(var i = 0; i < $scope.tabs.length && path !== ""; i++) {
        if($scope.tabs[i].link.indexOf(path) !== -1) {
            $scope.selectedTab = $scope.tabs[i];
        }
    }

    if(typeof $scope.selectedTab === "undefined") {
        // setting the default activated tab
        $scope.selectedTab = $scope.tabs[0];
    }

    $scope.setSelectedTab = function(tab) {
        $scope.selectedTab = tab;
    }

    // setting activated status
    $scope.tabClass = function(tab) {
        if ($scope.selectedTab == tab) {
            return "active";
        } else {
            return "";
        }
    }
}]);