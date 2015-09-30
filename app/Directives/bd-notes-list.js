angular.module('notely')
    .directive('bdNotesList', function() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            templateUrl: '/notes/notes-sidebar.html',
            controller: NotesSidbarController,
            controllerAs: 'ctrl'
        };

        NotesSidbarController['$inject'] = ['notes'];
        function NotesSidbarController(notes) {
            this.notes = notes.all();
        }
    });



