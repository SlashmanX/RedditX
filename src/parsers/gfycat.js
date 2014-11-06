(function (App) {
	'use strict';
	var URI = require('URIjs');
	var inherits = require('util').inherits;

	var Gfycat = App.Parsers.Generic.extend({
		defaults: {
			type: 'gfycat'
		},

		initialize: function () {
			this.template = GfycatView;
		},
	});

	var GfycatView = Backbone.Marionette.ItemView.extend({
		template: '#view-gfycat-tpl',
		className: 'submission-gfycat',

		initialize: function() {
			this.model.set('gfy_id', new URI(this.model.get('url')).filename());
		},

		onShow: function() {
			gfyCollection.init();
		}
	});

	App.Parsers.Gfycat = Gfycat;
})(window.App);