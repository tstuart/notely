/**
 * Created by tstuart on 9/30/15.
 */
(function() {
    angular.module('notely.login', [
        'ui.router'
    ])
        .config(loginConfig);

    loginConfig['$inject'] = ['$stateProvider'];
    function loginConfig($stateProvider) {

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: '/login/login.html',
                controller: LoginController
            });
    }

    LoginController['$inject'] = ['$scope', '$state', 'login'];
    function LoginController($scope, $state, login) {

        $scope.login = function() {
            $state.go('notes.form')
        };

    }

})();