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

    App.Auth = Auth;
})(window.App);