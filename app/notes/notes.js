/**
 * Created by tstuart on 9/28/15.
 */
(function() {
    angular.module('notely.notes', [
        'ui.router'
    ])
        .controller('NotesController', NotesController)
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];
    function notesConfig($stateProvider) {

        $stateProvider

            .state('notes', {
                url: '/notes',
                abstract: true,
                templateUrl: '/notes/notes.html',
                controller: NotesController
            })

            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });

    }

    NotesController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesController($scope, $state, notes) {
        notes.fetchNotes(function(notes) {
            $scope.notes = notes;
        });
    }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesFormController($scope, $state, notes) {
        $scope.note = notes.findById($state.params.noteId);
        console.log($scope.note.title);
    }
})();
