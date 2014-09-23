(function (App) {
	'use strict';
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	console.log('State: ' + App.Auth.state);
	console.log('Returned State: '+ getParameterByName('state'));
	console.log('Error: '+ getParameterByName('error'));
	console.log('Code: '+ getParameterByName('code'));
})(window.opener.App);