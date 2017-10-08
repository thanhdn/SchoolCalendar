'use strict';
// import available features to current working board
angular.module("schoolCalendarApp", [
    'ngRoute',
    'schoolCalendarApp.grades',
    'schoolCalendarApp.classes',
    'schoolCalendarApp.courses',
    'schoolCalendarApp.teachers'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
}]).
controller('schoolCalendarController', ['$scope', '$location', function($scope, $location) {
    // available features
    $scope.tabs = [
        { link : '#!/grades',   label : 'Khối học' },
        { link : '#!/courses',  label : 'Các môn học' },
        { link : '#!/teachers', label : 'Danh sách giáo viên' },
        { link : '#!/classes',  label : 'Danh sách lớp' }
    ];
    // the default activated features is the first feature
    $scope.selectedTab = $scope.tabs[0];
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