/**
 * Created by tstuart on 9/30/15.
 */

/**
 * Created by tstuart on 9/28/15.
 */

(function() {
    angular.module('notely.login')
        .service('login', loginService);


    loginService['$inject'] = ['$http', 'constants'];
    function loginService($http, constants) {

        this.login = function(user) {
            return $http.post(
                constants.apiBasePath + 'session', {
                    user: {
                        username: user.username,
                        password: user.password
                    }
                }
            )
                .success(function(response) {
                    console.log(response);
                })
        }

    }

})();