/**
 * Created by tstuart on 9/28/15.
 */
(function() {
    angular.module('notely.notes', [
        'ui.router'
    ])
        .controller('NotesController', NotesController)
        .controller('NotesFormController', NotesFormController)
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

        $scope.newNote = function() {
            $scope.note = {};
        }
    }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesFormController($scope, $state, notes) {
        $scope.note = angular.copy(notes.findById($state.params.noteId));

        $scope.save = function() {
            if ($scope.note.id) {
                notes.update($scope.note).succes(function(data) {
                    $scope.note = data.note;
                });
            }
            else {
                notes.create($scope.note);
            }
        }

        $scope.buttonText = function() {
            if ($scope.note.id) {
                return 'Save';
            } else {
                return 'Create';
            }
        }
    }
})();
