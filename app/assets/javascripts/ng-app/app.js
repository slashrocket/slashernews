slasherNews = angular
  .module('slasherNews', [
    'ngResource',
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
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('posts', {
          url: '/',
          templateUrl: 'posts.html',
          controller: 'PostController',
          resolve: {
            posts: ['Post', function(Post){
              return Post.all().$promise;
            }]
          }
        })
        .state('posts.new', {
          url: 'new',
          parent:'posts',
          templateUrl: 'posts.new.html',
          controller: 'PostController'
        })
        .state('post', {
          url: '/post/:id',
          templateUrl: 'post.html',
          controller: 'CommentController',
          resolve: {
            post: ['Post', '$stateParams', function(Post, $stateParams){
              return Post.show($stateParams.id).$promise;
            }]
          }
        })
        .state('post.comment', {
          url: '',
          parent: 'post',
          templateUrl: 'post.comment.html',
          controller: 'CommentController',
          resolve: {
            post: ['Post', '$stateParams', function(Post, $stateParams){
              return Post.show($stateParams.id).$promise;
            }]
          }
        })
        .state('login',{
          url: '/login',
          templateUrl: 'auth/_login.html',
          controller: 'AuthController',
          onEnter: ['$state','Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('posts');
            });
          }]
        })
        .state('register', {
          url: '/register',
          templateUrl: 'auth/_register.html',
          controller: 'AuthController',
          onEnter: ['$state','Auth', function($state, Auth) {
            Auth.currentUser().then(function (){
              $state.go('posts');
            });
          }]
        });    
      $urlRouterProvider.otherwise('posts');
      // enable HTML5 Mode for SEO
      $locationProvider.html5Mode({enabled: true, requireBase: false});
    }]
  );
