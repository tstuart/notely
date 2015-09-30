/**
 * Created by tstuart on 9/28/15.
 */
(function() {
    angular.module('notely.notes', [
        'ui.router',
        'textAngular'
    ])
        .controller('NotesFormController', NotesFormController)
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];
    function notesConfig($stateProvider) {

        $stateProvider

            .state('notes', {
                url: '/notes',
                abstract: true,
                resolve: {
                    notesLoaded: function($q, $state, $timeout, notes, CurrentUser) {
                        var deferred = $q.defer();
                        $timeout(function() {
                            if (CurrentUser.get().id) {
                                notes.fetchNotes().success(function() {
                                    deferred.resolve();
                                })
                                    .error(function() {
                                        deferred.reject();
                                        $state.go('login');
                                    });
                            }
                            else {
                                deferred.reject();
                                $state.go('login');
                            }
                        });
                        return deferred.promise;
                    }
                },
                templateUrl: '/notes/notes.html'
            })

            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });
    }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesFormController($scope, $state, notes) {
        $scope.note = angular.copy(notes.findById($state.params.noteId));


        $scope.save = function() {
            if ($scope.note.id) {
                notes.update($scope.note).success(function(data) {
                    $scope.note = data.note;
                });
            }
            else {
                notes.create($scope.note);
            }
        };

        $scope.buttonText = function() {
            if ($scope.note.id) {
                return 'Save';
            } else {
                return 'Create';
            }
        };

        $scope.removeNote = function() {
            notes.delete($scope.note).success(function() {
                $state.go('notes.form', { noteId: undefined });
            });
        };
    }
})();
