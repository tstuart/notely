/**
 * Created by tstuart on 9/29/15.
 */
(function() {
    angular.module('notely')
        .directive('bdFocusOn', function() {
            return function (scope, elem, attr) {
                scope.$on(attr.bdFocusOn, function (e) {
                    debugger;
                    elem[0].focus();
                });
            };
        });
})();
