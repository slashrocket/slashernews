slasherNews = angular
  .module('slasherNews', [
    'ui.router',
    'templates',
    'Devise'
  ])
  .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home.html',
          controller: 'MainController'
        })
        .state('posts', {
          url: '/posts/{id}',
          templateUrl: 'posts.html',
          controller: 'PostsController'
        })
        .state('login',{
          url: '/login',
          templateUrl: 'auth/_login.html',
          controller: 'AuthController',
          onEnter: ['$state','Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            });
          }]
        })
        .state('register', {
          url: '/register',
          templateUrl: 'auth/_register.html',
          controller: 'AuthController',
          onEnter: ['$state','Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('home');
            });
          }]
        })     
      $urlRouterProvider.otherwise('home');
    }]
  )
