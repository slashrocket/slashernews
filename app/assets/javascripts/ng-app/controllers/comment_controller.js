slasherNews
  .controller('CommentController', ['$rootScope','$scope', '$state', 'Comment', 'post',
    function($rootScope, $scope, $state, Comment, post) {
    
    $rootScope.post = post;

    $scope.initNewComment = function(){
      $scope.newcomment = {body: ""};
    };

    $scope.createComment = function(){
      new_comment = Comment.create($rootScope.post.id, $scope.newcomment);
      $rootScope.post.comments.push(new_comment);
      $state.go('post');
      $scope.initNewComment();
    };

    $scope.upvoteComment = function(comment){
      comment.upvotes += 1;
      Comment.upvote(comment.post_id, comment.id)
    };

    $scope.deleteComment = function(comment){
      Comment.delete(comment.post_id, comment.id);
      var index = $rootScope.post.comments.indexOf(comment);
      $rootScope.post.comments.splice(index, 1);
    };
  }]);