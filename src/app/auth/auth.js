var URI = require('URIjs');
var crypto = require('crypto');
var Q = require('q');

(function(App) {
	'use strict';

	var BASE_URL = 'https://ssl.reddit.com/api/v1/authorize';

	var Auth = {};

	var config = {
		client_id : '5OYdh54OVnkBhQ',
		secret_key : 'uOd4HRiLFIwQSK3j_uQm3Cn7bDs',
		callback_url : 'app://host/src/app/auth/callback.html',
		duration: 'permanent',
		scope : 'identity,edit,flair,history,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote'
	};

	Auth.Config = config;

	Auth.generateAuthURL = function() {
		Auth.state = require('crypto').randomBytes(32).toString('hex');
		var url = new URI(BASE_URL)
			.addSearch('client_id', config.client_id)
			.addSearch('response_type', 'code')
			.addSearch('state', Auth.state)
			.addSearch('redirect_uri', config.callback_url)
			.addSearch('duration', config.duration)
			.addSearch('scope', config.scope);

		return url.toString();
	}

	Auth.getAccessToken = function(code, cb) {
		var defer = Q.defer();
		$.ajax({
			type: "POST",
			url: 'https://ssl.reddit.com/api/v1/access_token',
			data: {
				'grant_type': 'authorization_code',
				'code': code,
				'redirect_uri': config.callback_url
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader ("Authorization", "Basic " + btoa(config.client_id + ":"+ config.secret_key)); 
			},
			success: function(data, textStatus, jqXHR) {
				if(data.access_token) {
					App.User.set('access_token', data.access_token);
					App.User.set('refresh_token', data.refresh_token);
					App.User.set('token_expires',  Date.now() + data.expires_in);
					App.vent.trigger('user:login');
				};
				defer.resolve(data.access_token);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				defer.reject(errorThrown);
			}
		});

		return defer.promise;
	};

	Auth.refreshAccessToken = function(cb) {
		var defer = Q.defer();
		$.ajax({
			type: "POST",
			url: 'https://ssl.reddit.com/api/v1/access_token',
			data: {
				'grant_type': 'refresh_token',
				'refresh_token': App.User.get('refresh_token')
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader ('Authorization', 'Basic ' + btoa(config.client_id + ':' + config.secret_key)); 
			},
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				if(data.access_token) {
					App.User.set('access_token', data.access_token);
					App.User.set('token_expires', new Date.now() + data.expires_in);
				};
				defer.resolve(data.access_token)
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error refreshing token: '+ errorThrown + ': ' + textStatus );
				defer.reject(errorThrown);
			}
		});

		return defer.promise;
	};

	Auth.checkTokenValid = function(){
		var defer = Q.defer();
		if(localStorage.token_expires > Date.now()) {
			console.log('refreshing token');
			return Auth.refreshAccessToken();
		}
		else {
			return defer.resolve();
		}
	};

	App.Auth = Auth;
})(window.App);