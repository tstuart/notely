angular.module('notely')
    .directive('bdNotesList', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            templateUrl: 'notes/notes-sidebar.html',
            controller: NotesSidbarController
        };

        NotesSidbarController['$inject'] = ['$scope', '$state', 'notes'];
        function NotesSidbarController($scope, notes) {
            $scope.notes = notes.all();
        }
    });



