(function (App) {
	'use strict';

	var inherits = require('util').inherits;

	var Imgur = App.Parsers.Generic.extend({
		defaults: {
			type: 'imgur'
		},

		initialize: function () {
			this.template = ImgurView;
		},
	});

	var ImgurView = Backbone.Marionette.ItemView.extend({
		template: '#view-imgur-tpl'
	});

	App.Parsers.Imgur = Imgur;
})(window.App);