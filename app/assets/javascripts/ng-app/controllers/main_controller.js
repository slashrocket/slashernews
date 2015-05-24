slasherNews
  .controller('MainController', [
    '$scope',
    'posts',
    function($scope, posts) {
      $scope.posts = posts.posts
      $scope.addPost = function() {
        if ($scope.title === '') {
          return;
        }
        posts.create({
          title: $scope.title,
          link: $scope.link,
        });
        $scope.title = '';
        $scope.link = '';
      };
      $scope.incrementUpvotes = function(post) {
        posts.upvote(post);
      };
    }
  ])
