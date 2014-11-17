(function (App) {
	'use strict';
	var URI = require('URIjs');
	var self;

	var YouTube = App.Parsers.Generic.extend({
		defaults: {
			type: 'youtube',
		},
		initialize: function () {
			this.template = App.View.Providers.YouTube;
		}

	});

	App.Parsers.YouTube = YouTube;
})(window.App);