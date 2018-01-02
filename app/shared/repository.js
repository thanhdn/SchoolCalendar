'use strict';

schoolCalendarApp.factory('componentObj', [componentObj]);
schoolCalendarApp.factory('featureParamObj', [featureParamObj]);
schoolCalendarApp.factory('collectionUtil', [collectionUtil]);
schoolCalendarApp.factory('baseRepository', ['$q', '$http', baseRepository]);
schoolCalendarApp.factory('repositoryServices', ['featureParamObj', 'collectionUtil', 'baseRepository', repositoryServices]);
schoolCalendarApp.factory('resourceServices', ['$q', "ngI18nResourceBundle", "ngI18nConfig", initStaticResources]);

// define all object will be used as communicate objects
// these object will be used as request parameters to api services
// all object based on JSON format,
// the associated api must be implement the format of those objects
function featureParamObj() {
    return {
        // --GRADE
        //--------------------------------------------------------------
        // the parameter holding any value binding from the edit form
        prmGrade :  {
            grade : {
                id            : "",
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
        prmFilterGrade : {
            keywords       : [],
            startDate      : "",
            endDate        : "",
            page           : 0,
            fetchingNumber : 50
        }
    };
};

// define all component objects
function componentObj() {
    return {
        sidebar : [
            {
                header: "",
                menu: [{
                    label:"",
                    url:""
                }]
            }
        ]
    }
}

function baseRepository($q, $http) {
    return {
        // The string indicate update action
        UPDATE_ACTION : 'UDP',
        // the string indicate remove action
        REMOVE_ACTION : 'REM',
        // the string indicate insert action
        INS_ACTION    : 'INS',
        // the string indicate filter action
        FILTER_ACTION : 'FIL',
        // the string indicate sorting action
        SORT_ACTION   : 'SOR',
        // the string indicate viewing action
        VIEW_ACTION   : 'VIE',

        // check the given action is matched available definition actions
        isValidAction : function(action) {
            var repositoryActions = [
                UPDATE_ACTION,
                REMOVE_ACTION,
                INS_ACTION,
                FILT_ACTION,
                SORT_ACTION,
                VIEW_ACTION
            ];
            return repositoryActions.includes(action);
        },

        // retrieve data by using get method
        get : function(URL, parameters) {
            var result = $q.defer();
            $http.get(URL, parameters)
            .success(function (data) {
                result.resolve(data);
            })
            .error(function (err) {
                result.reject(err);
            });
            return result.promise;
        },

        // update data by using post method
        post : function(URL, parameters) {
            var result = $q.defer();
            $http.post(URL, parameters)
                .success(function (data) {
                    result.resolve(data);
                })
                .error(function (err) {
                    result.reject(err);
                });
            return result.promise;
        }
    }
};

function repositoryServices(featureParamObj, collectionUtil, baseRepository) {
    var repositoryServices =  {
        context : 'http://localhost:8080',

        targetFeature: '',

        formInput: null,

        formFilter: null,

        initFeature: function(_targetFeature, _formInput, _formFilter) {
            this.targetFeature = _targetFeature;
            this.formInput = _formInput;
            this.formFilter = _formFilter;
        },

        generateBaseUrl: function() {
            var baseUrl = this.context.concat("/", this.targetFeature);
            return baseUrl;
        },

        // the common method help perform any tasks such as
        // update, remove
        save : function() {
            // generate base url for current working feature
            // examples: if current working feature is grade,
            // the base url would be http://localhost/grade
            var baseUrl = this.generateBaseUrl();

            // checking url has generated
            // checking given action has passed
            // checking form input is existed values
            if(baseUrl != '' &&
               typeof this.formInput !== 'undefined' /*&&
               baseRepository.isValidAction(givenAction)*/) {
                var completedUrl = baseUrl.concat('/', "req");
                // calling the service to perform the task
                return baseRepository.post(completedUrl, this.formInput);
            }
            return null;
        },

        filter : function() {
            // generate base url for current working feature
            // examples: if current working feature is grade,
            // the base url would be http://localhost/grade
            var baseUrl = this.generateBaseUrl();

            // checking url has generated
            // checking given action has passed
            // checking form input is existed values
            if(baseUrl != '' &&
               typeof this.formFilter !== 'undefined' /*&&
               baseRepository.isValidAction(givenAction)*/) {
                var completedUrl = baseUrl.concat('/', "serving");
                // calling the service to perform the task
                return baseRepository.get(completedUrl, this.formFilter);
            }
            return null;
        },

        edit : function(propertyName, target, originalList) {
            // check whether the target update grade is existed,
            // to prevent the conflict between UI data and DB data
            if(collectionUtil.isExistedPropertyValue(propertyName, target, originalList)) {
                formInput[propertyName] = angular.copy(target);
            }
            formInput["action"] = baseRepository.UPDATE_ACTION;
            // scroll to the update form position
            //$window.scrollTo(0, 0);
        },

        remove : function() {
            // check whether the target update grade is existed,
            // to prevent the conflict between UI data and DB data
            if(collectionUtil.isExistedPropertyValue(propertyName, target, originalList)) {
                formInput[propertyName][propertyName] = target[propertyName];
            }
            // setting the action to the parameters
            formInput["action"] = repositoryServices.REMOVE_ACTION;
            // calling service to remove the target grade
            //repositoryServices.save();
        }
    }

    return repositoryServices;
};

// an util for checking array, collection
function collectionUtil() {
    return {
        // check whether the given array is empty
        isEmptyArray : function(collection) {
            if(collection == null || collection.length == 0) {
                return true;
            }
            return false;
        },

        // check whether the givent given destination variale is existed in given collection
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
};

// init static resources by using resource bundle
function initStaticResources($q, ngI18nResourceBundle, ngI18nConfig) {
    return {
        loadingStaticResources : function(){
            var staticResources = $q.defer();
            ngI18nResourceBundle.get({locale: "vi"}).success(function (resourceBundle) {
                staticResources.resolve(resourceBundle);
            }).error(function () {
                staticResources.reject("Failed to get resource");
            });
            return staticResources.promise;
        }
    }
}