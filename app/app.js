'use strict';
// import available features to current working board
var schoolCalendarApp = angular.module("schoolCalendarApp", [
    'ngRoute',
/*    'schoolCalendarApp.grades',
    'schoolCalendarApp.classes',
    'schoolCalendarApp.courses',
    'schoolCalendarApp.teachers',*/
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
    //$locationProvider.hashPrefix('!');
     /*$routeProvider.otherwise({redirectTo: '/grades'});*/

}]);

schoolCalendarApp.controller(
    'schoolCalendarController',
    ['$q', 'resourceServices', 'componentObj', '$scope',
    SCController]);
    /*var path = $location.path();*/
    /*// available features
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
    }*/

/*}]);*/

function SCController($q, resourceServices, componentObj, $scope) {
    $scope.sidebar = [];
    $scope.isLoaded = false;
    /*function loadResource() {
        return new Promise(function(resolve, reject) {
            ngI18nResourceBundle.get({locale: "vi"}).success(function (resourceBundle) {
                return resolve(resourceBundle);
            });
        });
    };*/

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