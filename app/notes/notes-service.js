/**
 * Created by tstuart on 9/28/15.
 */

(function() {
    angular.module('notely.notes.service', [])
        .service('notes', notesService);


    notesService['$inject'] = ['$http', '$filter', '$state', 'constants'];
    function notesService($http, $filter, $state, constants) {
        var notes = [];
        var user = {
            apiKey: '$2a$10$R1l5ancV7QWA3Y8xvdRoEOLB7UMGvfxEzyS3EdYNBIgoQb0ZA8gr.'
        };

        this.fetchNotes = function() {
            return $http.get(constants.apiBasePath + 'notes?api_key=' + user.apiKey)
                .success(function(notesData) {
                    notes = notesData;
                });
        };

        this.all = function() {
            return notes;
        };

        this.findById = function(noteId) {
            return ($filter('filter')(notes, { id: parseInt(noteId) }, true)[0] || {});
        };

        this.replaceNote = function(noteData) {
            for(var i = 0; i < notes.length; i++) {
                if (notes[i].id === noteData.id) {
                    notes[i] = noteData;
                    break;
                }
            }
        };

        this.removeNote = function(noteData) {
            for(var i = 0; i < notes.length; i++) {
                if (notes[i].id === noteData.id) {
                    notes.splice(i, 1);
                    break;
                }
            }
        };

        this.create = function(note) {
            $http.post(constants.apiBasePath + 'notes', {
                api_key: user.apiKey,
                note: {
                    title: note.title,
                    body_html: note.body_html
                }
            })
                .success(function(noteData) {
                    notes.unshift(noteData.note);
                    $state.go('notes.form', { noteId: noteData.note.id });
                });
        };

        this.update = function(note) {
            var self = this;
            return $http.put(constants.apiBasePath + 'notes/' + note.id, {
                api_key: user.apiKey,
                note: {
                    title: note.title,
                    body_html: note.body_html
                }
            })
                .success(function(noteData) {
                    self.replaceNote(noteData.note);
                });
        };

        this.delete = function(note) {
            var self = this;
            return $http.delete(constants.apiBasePath + 'notes/' + note.id + '?api_key=' + user.apiKey)
                .success(function(noteData) {
                    self.removeNote(note);
                });
        };

    }

})();