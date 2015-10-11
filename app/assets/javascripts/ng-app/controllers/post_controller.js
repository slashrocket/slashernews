slasherNews
  .controller('PostController', ['$rootScope','$scope', '$state', 'Post', 'posts',
    function($rootScope, $scope, $state, Post, posts) {

    $rootScope.posts = posts;

    $scope.initNewPost = function(){
      $scope.newpost = {link: ""};
    };

    $scope.createPost = function(){
      new_post = Post.create($scope.newpost);
      $rootScope.posts.push(new_post);
      $scope.initNewPost();
    };

    $scope.upvotePost = function(post){
      if (!$rootScope.current_user){
        alert("You need to be logged in to vote");
      }else{
        if (!hasAlreadyVotedOrOwnsThePost(post, $rootScope.current_user.id)){
          post.upvotes += 1;
          post.voters.push($rootScope.current_user.id.toString());
          Post.upvote(post.id)
        };
      }
    };

    $scope.deletePost = function(post){
      Post.delete(post.id);
      var index = $rootScope.posts.indexOf(post);
      $rootScope.posts.splice(index, 1);
    };

   //the methods below need refactoring and improvement...
    $scope.last_commenter = function(post){
      if (isArrayAndHasContent(post.comments)) {
        return post.comments[post.comments.length-1].user.username;
      }
    };

    $scope.has_comments = function(post){
      return isArrayAndHasContent(post.comments);
    };

    //"private" (...not really) methods
    var hasAlreadyVotedOrOwnsThePost = (post, userId) => {
      var owsComment = (post.user.id === userId);
      var hasAlreadyVoted = (post.voters.indexOf(userId.toString()) >= 0)
      return (owsComment || hasAlreadyVoted);
    };

    var isArrayAndHasContent = (collection) => {
      var isArray = collection instanceof Array;
      var hasContent = (collection.length > 0);
      return (isArray && hasContent)
    };

  }]);
