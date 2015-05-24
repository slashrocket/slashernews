angular.module('slackerNews')
  .factory('posts', [
    '$http',
    function($http) {
      var o = {
        posts: []
      };
      o.getAll = function() {
        return $http.get('/posts.json').success(function(data) {
          angular.copy(data, o.posts);
        })
      }
      resolve: {
        postPromise: ['posts', function(posts){
          return posts.getAll();
        }]
      }
      o.create = function(post) {
        return $http.post('/posts.json', post).success(function(data){
          o.posts.push(data);
        })
      }
    }
  ])
