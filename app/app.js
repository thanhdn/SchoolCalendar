'use strict';
// import available features to current working board
var schoolCalendarApp = angular.module("schoolCalendarApp", [
    'ngRoute',
    'schoolCalendarApp.grades',
    'schoolCalendarApp.classes',
    'schoolCalendarApp.courses',
    'schoolCalendarApp.teachers',
    'ngI18n'
]);

schoolCalendarApp.value('ngI18nConfig', {
    //defaultLocale should be in lowercase and is required!!
    defaultLocale:'vi',
    //supportedLocales is required - all locales should be in lowercase!!
    supportedLocales:['vi', 'en'],
    //without leading and trailing slashes, default is i18n
    basePath:'i18n/bundle',
    //default is false
    cache:true
});

schoolCalendarApp.config(['$locationProvider','$routeProvider',
     function($locationProvider, $routeProvider) {
        $routeProvider.otherwise({redirectTo: '/grades'});
     }]);

schoolCalendarApp.controller(
    'schoolCalendarController',
    ['$q', 'resourceServices', 'componentObj', '$scope',
    SCController]);

function SCController($q, resourceServices, componentObj, $scope) {
    $scope.sidebar = [];
    $scope.isLoaded = false;

    function initResourceBundle(_resourceBundle) {
        var staticResources = $q.defer();
        $scope.resourceBundle = _resourceBundle;
        staticResources.resolve(_resourceBundle);
        return staticResources.promise;
    }

    function generateSidebar(_resourceBundle) {
        var sidebar = [];
        // init captions and urls for grade navigation
        var navGrade = {
            header  : _resourceBundle["grade"],
            menu    : [
                {label : _resourceBundle["list"],   url : "#/grades"},
                {label : _resourceBundle["import"], url : "#/import"}
            ]
        };
        // init captions and urls for teacher navigation
        var navTeacher = {
            header  : _resourceBundle["teacher"],
            menu    : [
                {label : _resourceBundle["list"],   url : "#/teachers"},
                {label : _resourceBundle["import"], url : "#/import"}
            ]
        };
        // init captions and urls for class navigation
        var navClass = {
            header  : _resourceBundle["class"],
            menu    : [
                {label : _resourceBundle["list"],   url : "#/teachers"},
                {label : _resourceBundle["import"], url : "#/import"}
            ]
        };
        // init captions and urls for course navigation
        var navCourse = {
            header  : _resourceBundle["course"],
            menu    : [
                {label : _resourceBundle["list"],   url : "#/teachers"},
                {label : _resourceBundle["import"], url : "#/import"}
            ]
        };
        // init captions and urls for schedule navigation
        var navSchedule = {
            header  : _resourceBundle["schedule"],
            menu    : [
                {label : _resourceBundle["calendar"],   url : "#/teachers"},
                {label : _resourceBundle["arrange"],    url : "#/import"}
            ]
        };

        sidebar.push(navGrade);
        sidebar.push(navTeacher);
        sidebar.push(navClass);
        sidebar.push(navCourse);
        sidebar.push(navSchedule);
        $scope.sidebar = sidebar;
        $scope.isLoaded = true;
    }

    resourceServices.loadingStaticResources()
    .then(initResourceBundle)
    .then(generateSidebar);
}