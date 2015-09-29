/**
 * Created by tstuart on 9/28/15.
 */

(function() {
    angular.module('notely.notes.service', [])
        .service('notes', notesService);


    notesService['$inject'] = ['$http', '$filter', '$state'];
    function notesService($http, $filter, $state) {
        var notes = [];
        var nevernoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
        var user = {
            apiKey: '$2a$10$R1l5ancV7QWA3Y8xvdRoEOLB7UMGvfxEzyS3EdYNBIgoQb0ZA8gr.'
        };

        this.fetchNotes = function(callback) {
            $http.get(nevernoteBasePath + 'notes?api_key=' + user.apiKey)
                .success(function(notesData) {
                    notes = notesData;
                    if (callback) {
                        callback(notes);
                    }
                });
        };

        this.all = function() {
            return notes;
        };

        this.findById = function(noteId) {
            return ($filter('filter')(notes, { id: parseInt(noteId) }, true)[0] || {});
        };

        this.save = function(note) {
            // if id undefinded, new note.  Otherwise, save
            if (note.id) {
                $http.put(nevernoteBasePath + 'notes/' + note.id, {
                    api_key: user.apiKey,
                    note: {
                        title: note.title,
                        body_html: note.body_html
                    }
                });
            } else {
                $http.post(nevernoteBasePath + 'notes', {
                    api_key: user.apiKey,
                    note: {
                        title: note.title,
                        body_html: note.body_html
                    }
                }).success(function(noteData) {
                    notes.unshift(noteData.note);
                    $state.go('notes.form', { noteId: noteData.note.id });
                });
            }
        };
    }

})();