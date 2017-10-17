
'use strict';

schoolCalendarApp.factory('repositoryServices', ['$http', function($http) {
    return {
        // update action, used to dertermine what action do the user need to perform
        updateAction : 'UDP',
        // remove action, used to dertermine what action do the user need to perform
        removeAction : 'REM',

        retrieve : function(URL, parameters) {
            return $http.get(URL, parameters)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        },

        add : function(URL, parameters) {
            return $http.post(URL, parameters)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        },

        remove : function(URL, parameters) {
            return $http.post(URL, parameters)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }
    }
}]).factory('collectionUtil', [function() {
    return {
        isEmptyArray : function(collection) {
            if(collection == null || collection.length == 0) {
                return true;
            }
            return false;
        },

        isExistedPropertyValue : function(propertyName, dest, collection) {
            if(typeof collection === 'undefined' ||
                typeof dest === 'undefined') {
                return false;
            }

            for(var idx = 0; idx < collection.length; idx++) {
                if(collection[idx][propertyName] == dest[propertyName]) {
                    return true;
                }
            }

            return false;
        }


    }
}]).factory('componentObj', [function() {
    return {
        // --GRADE
        //--------------------------------------------------------------
        // the parameter holding any value binding from the edit form
        inputGrade :  {
            grade: {
                id            :"",
                gradeId       : "",
                gradeName     : "",
                lectureNumber : "",
                creationDate  : "",
                updateDate    : "",
                creator       : ""
            },
            // UDP: update, REM: remove
            action        : "INS"
        },

        // the parameter holding the keywords, pagination information
        inputFilterGrade : {
            keywords       : [],
            startDate      : "",
            endDate        : "",
            page           : 0,
            fetchingNumber : 50
    }
}
}]).factory('repositoryInterface', ['repositoryServices', function(repositoryServices) {
    return {
        CONTEXT : 'http://localhost:8080',

        targetFeature: "",

        formInput:  {},

        formFilter: {},

        save : function() {

        },

        edit : function() {

        },

        remove : function() {

        },

        filter : function() {

        }
    }
}]);

