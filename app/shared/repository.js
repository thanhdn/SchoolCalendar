
schoolCalendarApp.
factory('repository', ['$http', function($http) {
    return {
        retrieve: function() {
            return $http.get('http://localhost:8080/grade/view')
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        },

        add: function(URL, parameters) {
            return $http.post(URL, parameters)
                .success(function (data) {
                    return data;
                })
                .error(function (err) {
                    return err;
                });
        }
    }
}]);

