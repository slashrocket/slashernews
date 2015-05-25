slasherNews
  .controller('NavController', ['$rootScope', '$scope', '$state', 'Auth',
    function($rootScope, $scope, $state, Auth) {
      $scope.signedIn = Auth.isAuthenticated;
      $scope.logout = Auth.logout;
    
    Auth.currentUser().then(function(user) {
      $rootScope.current_user = user;
    });

    $scope.$on('devise:new-registration', function(e, user) {
      $rootScope.current_user = user;
    });

    $scope.$on('devise:login', function(e, user) {
      $rootScope.current_user = user;
    });

    $scope.$on('devise:logout', function(e, user) {
      $rootScope.current_user = null;
      $state.go('posts');
    });
  }]);
