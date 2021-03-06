(function (App) {
	'use strict';
	var URI = require('URIjs');
	var inherits = require('util').inherits;

	var Gfycat = App.Parsers.Generic.extend({
		defaults: {
			type: 'gfycat'
		},

		initialize: function () {
			this.template = App.View.Providers.Gfycat;
		},
	});

	App.Parsers.Gfycat = Gfycat;
})(window.App);