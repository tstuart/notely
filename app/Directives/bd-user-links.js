/**
 * Created by tstuart on 9/30/15.
 */

angular.module('notely')
    .directive('bdUserLinks', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            template: '\
                <div class="user-links"> \
                <div ng-show="ctrl.user().id"> \
                    Signed in as {{ ctrl.user().name }} \
                    | \
                    <a ng-click="ctrl.logout()">Logout</a> \
                </div> \
                </div>',
            controller: userLinksController,
            controllerAs: 'ctrl'
        };

        userLinksController['$inject'] = ['$state', 'login', 'CurrentUser'];
        function userLinksController($state, login, CurrentUser) {
            this.user = function() {
                return CurrentUser.get();
            };

            this.logout = function() {
                login.logout();
                CurrentUser.clear();
                $state.go('login');
            };
        }

    });