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
		return alert('Error! State does not match');
	}

	var code = getParameterByName('code');
	App.Auth.getAccessToken(code, function(err, msg) {
		if(err) alert(err +' : '+ msg);
		window.opener.focus();
		win.close();
	});

})(window.opener.App);