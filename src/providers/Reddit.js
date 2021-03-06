var Q = require('q');

var node_reddit = require('node-reddit');
var reddit;
var self;
(function(App) {
	'use strict';
	function Reddit() {
		var self = this;
		reddit = new node_reddit(App.User.get('access_token'));
	}

	Reddit.prototype.checkToken = function() {
		var defer = Q.defer();
		App.Auth.checkTokenValid().then(function(token) {
			reddit.setToken(token);
			defer.resolve();
		}).catch(function(err) {
			defer.reject(err);
		});
		return defer.promise;
	};

	Reddit.prototype.setToken = function(token) {
		reddit.setToken(token);
	};

	Reddit.prototype.call = function(method, args, otherArgs) {
		var defer = Q.defer();
		this.checkToken()
		.then(function() {
			reddit[method](args, otherArgs)
			.then(function(res) {
				if(res) {
					res = JSON.parse(res);
				}
				defer.resolve(res);
			})
			.catch(function(err) {
				defer.reject(err);
			});
		})
		.catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	};

	App.Providers.Reddit = Reddit;

})(window.App);