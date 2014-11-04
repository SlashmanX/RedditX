(function (App) {
	'use strict';
	var URI = require('URIjs');
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
		template: '#view-imgur-tpl',

		initialize: function() {
			var type = 'image';
			var u = new URI(this.model.get('url'));
			if(u.suffix() === 'gifv') {
				type = 'gifv';
			}
			this.model.set('type', type);
		}
	});

	App.Parsers.Imgur = Imgur;
})(window.App);