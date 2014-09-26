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
	}

	Reddit.prototype.setToken = function(token) {
		reddit.setToken(token);
	}

	Reddit.prototype.me = function() {
		var defer = Q.defer();

		this
		.checkToken()
		.then(function() {
			reddit
			.u()
			.then(function(info){
				defer.resolve(JSON.parse(info));
			})
			.catch(function(err) {
				defer.reject(err);
			})
		}).catch(function(err) {
			defer.reject(err);
		});

		return defer.promise;
	};

	Reddit.prototype.subreddits = function() {
		var defer = Q.defer();

		this
		.checkToken()
		.then(function() {
			reddit
			.subscriber()
			.then(function(info){
				defer.resolve(JSON.parse(info));
			})
			.catch(function(err) {
				console.log(err);
				defer.reject(err);
			})
		}).catch(function(err) {
			console.log(err);
			defer.reject(err);
		});

		return defer.promise;
	};

	Reddit.prototype.homepage = function(opts) {
		var defer = Q.defer();
		this
		.checkToken()
		.then(function() {
			reddit
			.homepage(opts)
			.then(function(list) {
				defer.resolve(JSON.parse(list));
			})
			.catch(function(err) {
				defer.reject(err);
			})
		}).catch(function(err) {
			defer.reject(err);
		});
		return defer.promise;
	}

	Reddit.prototype.r = function(r, opts) {
		var defer = Q.defer();
		this
		.checkToken()
		.then(function() {
			reddit
			.r(r, opts)
			.then(function(list) {
				defer.resolve(JSON.parse(list));
			})
			.catch(function(err) {
				defer.reject(err);
			})
		}).catch(function(err) {
			defer.reject(err);
		});
		return defer.promise;
	}

	App.Providers.Reddit = Reddit;

})(window.App);