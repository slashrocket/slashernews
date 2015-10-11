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
      if (!$rootScope.current_user){
        alert("You need to be logged in to vote");
      }else{
        if (!hasAlreadyVotedOrOwnsTheComment(comment, $rootScope.current_user.id)){
          comment.upvotes += 1;
          comment.voters.push($rootScope.current_user.id.toString());
          Comment.upvote(comment.post_id, comment.id)
        };
      }
    };

    $scope.deleteComment = function(comment){
      Comment.delete(comment.post_id, comment.id);
      var index = $rootScope.post.comments.indexOf(comment);
      $rootScope.post.comments.splice(index, 1);
    };

    //"private" (...not really) methods
    var hasAlreadyVotedOrOwnsTheComment = (comment, userId) => {
      var owsComment = (comment.user.id === userId);
      var hasAlreadyVoted = (comment.voters.indexOf(userId.toString()) >= 0)
      return (owsComment || hasAlreadyVoted);
    };

  }]);
