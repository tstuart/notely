/**
 * Created by tstuart on 9/28/15.
 */

(function() {
    angular.module('notely.notes.service', [])
        .service('notes', notesService);


    notesService['$inject'] = ['$http'];
    function notesService($http) {
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

        this.findById = function(id) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id.toString() === id) {
                    return notes[i];
                }
            }
            return {};
        }
    }

})();