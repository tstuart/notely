/**
 * Created by tstuart on 9/29/15.
 */

angular.module('notely')
    .directive('bdFocusOn', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                elem.ready(function() {
                    elem[0].focus();
                });
            }
        };
    });
