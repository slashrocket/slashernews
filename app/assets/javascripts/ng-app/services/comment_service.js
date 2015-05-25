slasherNews
  .factory('Comment', ['$resource', function($resource){
    function Comment(){
      this.service = $resource('/api/posts/:postId/comments/:id.json', {postId:'@postId', id: '@id'}, {
        'update': { method: 'PUT' },
        'upvote': { url: "/api/posts/:postId/comments/:id/upvote.json", method: 'PUT'}});
    };
    Comment.prototype.all = function(postId) {
      return this.service.query({ postId: postId });
    };
    Comment.prototype.show = function(postId, id) {
      return this.service.get({ postId: postId, id: id });
    };
    Comment.prototype.delete = function(postId, id){
      return this.service.remove({ postId: postId, id: id });
    };
    Comment.prototype.create = function(postId, attr) {
      return this.service.save({ postId: postId, comment: attr });
    };
    Comment.prototype.update = function (postId, attr) {
      return this.service.update({postId: postId, id: attr.id, comment: attr });
    };
    Comment.prototype.upvote = function (postId, id) {
      return this.service.upvote({postId: postId, id: id})
    };
    return new Comment;
  }]);