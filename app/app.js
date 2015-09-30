(function() {
  var app = angular.module('notely', [
      'ui.router',
      'notely.notes',
      'notely.notes.service',
      'notely.login',
      'notely.login.service'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
})();
