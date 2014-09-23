var gui = require('nw.gui');
var win = gui.Window.get();
(function (App) {
	'use strict';
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	var error = getParameterByName('error');
	if(error) {
		if(error === 'access_denied') {
			console.log('User denied access');
			window.opener.focus();
			win.close();
			return;
		}
		return alert(error);
	}

	if(getParameterByName('state') !== App.Auth.state) {
		return alert('Error!');
	}

	var code = getParameterByName('code');

	window.opener.$.ajax({
		type: "POST",
		url: 'https://ssl.reddit.com/api/v1/access_token',
		data: {
			'grant_type': 'authorization_code',
			'code': code,
			'redirect_uri': App.Auth.Config.callback_url
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(App.Auth.Config.client_id + ":"+ App.Auth.Config.secret_key)); 
		},
		success: function(data, textStatus, jqXHR) {
			if(data.access_token) {
				localStorage.token = data.access_token;
				App.vent.trigger('user:login');
			};
			window.opener.focus();
			win.close();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log(textStatus);
			alert(errorThrown);
			return;
		}
	});

})(window.opener.App);