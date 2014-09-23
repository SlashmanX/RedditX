var URI = require('URIjs');
var crypto = require('crypto');

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
					localStorage.access_token = data.access_token;
					localStorage.refresh_token = data.refresh_token;
					localStorage.token_expires =  Date.now() + data.expires_in;
					App.vent.trigger('user:login');
				};
				return cb(null, 'ok');
			},
			error: function(jqXHR, textStatus, errorThrown) {
				return cb(errorThrown, textStatus);
			}
		});
	};

	Auth.refreshAccessToken = function(cb) {
		$.ajax({
			type: "POST",
			url: 'https://ssl.reddit.com/api/v1/access_token',
			data: {
				'grant_type': 'refresh_token',
				'refresh_token': localStorage.refresh_token
			},
			beforeSend: function (xhr) {
				xhr.setRequestHeader ('Authorization', 'Basic ' + btoa(config.client_id + ':' + config.secret_key)); 
			},
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				if(data.access_token) {
					localStorage.access_token = data.access_token;
					localStorage.token_expires = new Date.now() + data.expires_in;
				};
				return cb(null, data.access_token)
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log('Error refreshing token: '+ errorThrown + ': ' + textStatus );
				return cb(errorThrown, textStatus);
			}
		});
	};

	Auth.checkTokenValid = function(cb){
		if(localStorage.token_expires > Date.now()) {
			console.log('refreshing token');
			return Auth.refreshAccessToken(cb);
		}
		return cb();
	};

	App.Auth = Auth;
})(window.App);