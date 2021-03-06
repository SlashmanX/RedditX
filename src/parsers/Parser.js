(function (App) {
	'use strict';
	var URI = require('URIjs');

	var Parse = function(url) {
		var u = URI(url);

		switch(u.domain()) {
			case 'imgur.com':
				return App.Parsers.Imgur;
			case 'gfycat.com':
				return App.Parsers.Gfycat;
			case 'youtube.com':
			case 'youtu.be':
				return App.Parsers.YouTube;
			case 'reddit.com':
				return App.Parsers.Reddit;
			default:
				return App.Parsers.Generic;
		}
	};

	App.Parsers.Parse = Parse;
})(window.App);