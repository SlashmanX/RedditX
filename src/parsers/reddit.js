(function (App) {
	'use strict';
	var URI = require('URIjs');
	var inherits = require('util').inherits;
	var Q = require('q');

	var Reddit = App.Parsers.Generic.extend({
		defaults: {
			type: 'imgur'
		},

		initialize: function () {
			this.template = App.View.RedditViewer;
		}

	});

	App.Parsers.Reddit = Reddit;
})(window.App);