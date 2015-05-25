slasherNews
  .factory('Post', ['$resource', function($resource){
    function Post(){
      this.service = $resource('/api/posts/:id.json', {id:'@id'}, {
        'update': { method: 'PUT' },
        'upvote': { url: "/api/posts/:id/upvote.json", method: 'PUT'}});
    };
    Post.prototype.all = function() {
      return this.service.query();
    };
    Post.prototype.show = function(id) {
      return this.service.get({id: id});
    };
    Post.prototype.delete = function(id){
      return this.service.remove({id: id});
    };
    Post.prototype.create = function(attr) {
      return this.service.save(attr);
    };
    Post.prototype.update = function (attr) {
      return this.service.update(attr);
    };
    Post.prototype.upvote = function (id) {
      return this.service.upvote({id: id})
    };
    return new Post;
  }]);
