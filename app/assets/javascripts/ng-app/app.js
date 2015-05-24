slasherNews = angular
  .module('slasherNews', [
    'ui.router',
    'templates',
    'Devise'
  ])
  .config(function(AuthProvider, AuthInterceptProvider){
    AuthProvider.loginPath('/api/users/sign_in.json');
    AuthProvider.logoutPath('/api/users/sign_out.json');
    AuthProvider.registerPath('/api/users.json');
    AuthInterceptProvider.interceptAuth(true);
  })
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
      // enable HTML5 Mode for SEO
      $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]
  )
