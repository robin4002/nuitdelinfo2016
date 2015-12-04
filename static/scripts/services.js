(function() {
  var services;
  var domains = {
    api: 'http://localhost:80'
  };

  services = angular.module('services', []);

  services.factory('ModelsManager', [
    '$q', '$http', function($q, $http) {
      var ModelsManager;
      return ModelsManager = (function() {
        var _storage;

        _storage = new Object();

        function ModelsManager(modelName, modelNames, urlName) {
          this.modelName = modelName;
          this.modelNames = modelNames != null ? modelNames : this.modelName + "s";
          this.urlName = urlName != null ? urlName : this.modelNames.toLowerCase();
        }

        ModelsManager.prototype.get = function(id) {
          var deferred, scope, url;
          deferred = $q.defer();
          scope = this;
          if ((id != null) && this.modelName === 'featuredPromo') {
            id = null;
          }
          url = domains.api + "/" + this.modelNames;
          if (id != null) {
            url += "/" + id;
          }
          $http.get(url).success(function(data) {
            if ((id != null) || scope.modelName === 'basket') {
              return deferred.resolve(data[scope.modelName]);
            } else if (scope.modelName === 'product') {
              return deferred.resolve(data);
            } else {
              return deferred.resolve(data[scope.modelNames]);
            }
          }).error(function(data) {
            return deferred.reject(data);
          });
          return deferred.promise;
        };

        ModelsManager.prototype.add = function(object) {
          var deferred, params, ref, scope;
          deferred = $q.defer();
          scope = this;
          if ((ref = this.modelName) === 'basket' || ref === 'geoshopper' || ref === 'payment' || ref === 'featuredPromo') {
            deferred.reject(false);
          } else {
            params = new Object();
            params[this.modelName] = object;
            $http.post(domains.api + "/" + this.modelNames, params).success(function(data) {
              return deferred.resolve(data[scope.modelName]);
            }).error(function(data) {
              return deferred.reject(data);
            });
          }
          return deferred.promise;
        };

        ModelsManager.prototype.update = function(object) {
          var deferred, params, ref, scope;
          deferred = $q.defer();
          scope = this;
          if ((ref = this.modelName) === 'basket' || ref === 'geoshopper' || ref === 'payment' || ref === 'featuredPromo' || ref === 'stat') {
            deferred.reject(false);
          } else {
            params = new Object();
            params[this.modelName] = object;
            $http.put(domains.api + "/" + this.modelNames + "/" + object._id, params).success(function(data) {
              return deferred.resolve(data[scope.modelName]);
            }).error(function(data) {
              return deferred.reject(data);
            });
          }
          return deferred.promise;
        };

        ModelsManager.prototype.remove = function(object) {
          var deferred, ref, ref1;
          deferred = $q.defer();
          if (this.modelName === 'basket') {
            $http["delete"]((domains.api + "/baskets") + (function() {
              var ref;
              switch (false) {
                case !(object == null):
                  return '';
                case (object != null ? object.products : void 0) == null:
                  return '';
                default:
                  return "/product/" + ((ref = object._id) != null ? ref : object);
              }
            })()).success(function(data) {
              return deferred.resolve(data);
            }).error(function(data) {
              return deferred.reject(data);
            });
          } else if ((ref = this.modelName) === 'payment' || ref === 'featuredPromo' || ref === 'stat') {
            deferred.reject(false);
          } else {
            $http["delete"](domains.api + "/" + this.modelNames + "/" + ((ref1 = object._id) != null ? ref1 : object)).success(function(data) {
              return deferred.resolve(data);
            }).error(function(data) {
              return deferred.reject(data);
            });
          }
          return deferred.promise;
        };

        return ModelsManager;

      })();
    }
  ]);

}).call(this);

//# sourceMappingURL=services.js.map
