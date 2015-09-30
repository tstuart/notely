/**
 * Created by tstuart on 9/30/15.
 */

(function() {
    angular.module('notely.login')
        .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor['$inject'] = ['AuthToken'];
    function AuthInterceptor(AuthToken) {
        return {
            request: function(config) {
                var token = AuthToken.get();
                if (token) {
                    config.headers['Authorization'] = token;
                }
                return config;
            }
        };
    }

    angular.module('notely')
        .config(function($httpProvider) {
            return $httpProvider.interceptors.push('AuthInterceptor');
        });
})();