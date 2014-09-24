var Q = require('q');

var node_reddit = require('node-reddit');
var reddit;
var self;
(function(App) {
	'use strict';
    function Reddit() {
		var self = this;
	}

	Reddit.prototype.checkToken = function() {
		return App.Auth.checkTokenValid();
	}

	Reddit.prototype.me = function() {
		var defer = Q.defer();

		self
		.checkToken()
		.then(function() {
			reddit = new node_reddit(App.User.get('access_token'));
			reddit
			.u()
			.then(function(info){
				console.log(info);
				defer.resolve(info);
			})
			.catch(function(err) {
				console.error(err);
				defer.reject(err);
			})
		})

		return defer.promise;
	}

	App.Providers.Reddit = new Reddit();

})(window.App);