slasherNews
  .controller('PostController', ['$rootScope','$scope', '$state', 'Post', 'posts',
    function($rootScope, $scope, $state, Post, posts) {
    
    $rootScope.posts = posts;

    

    $scope.initNewPost = function(){
      $scope.newpost = {title: "", link: "", upvotes: 0};
    };

    $scope.createPost = function(){
      new_post = Post.create($scope.newpost)
      $rootScope.posts.push(new_post);
      $state.go('posts');
      $scope.initNewPost();
    };

    $scope.upvotePost = function(post){
      post.upvotes += 1;
      Post.upvote(post.id)
    };

    $scope.deletePost = function(post){
      Post.delete(post.id);
      var index = $rootScope.posts.indexOf(post);
      $rootScope.posts.splice(index, 1);
    };

   //the methods below need refactoring and improvement...
    $scope.last_commenter = function(post){
      if (post.comments.length > 0) {
        return post.comments[post.comments.length-1].user.username;
      }
    };

    $scope.has_comments = function(post){
      if (post.comments.length > 0){
        return true;
      }else{
        return false;
      }
    };

  }]);