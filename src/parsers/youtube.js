(function (App) {
	'use strict';
	var URI = require('URIjs');
	var self;

	var YouTube = Backbone.Model.extend({
		defaults: {
			type: 'youtube',
		},
		initialize: function () {
			this.template = YouTubeView;
		}

	});

	var YouTubeView = Backbone.Marionette.ItemView.extend({
		template: '#view-youtube-tpl',

		initialize: function() {
			var u = new URI(this.model.get('url'));
			console.log(u.query(true).v); // TODO: Account for the "attribution_link?" style URL's
			this.model.set('youtube_id', u.query(true).v);
		}
	});

	App.Parsers.YouTube = YouTube;
})(window.App);