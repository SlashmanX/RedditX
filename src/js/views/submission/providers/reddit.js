(function (App) {
	'use strict';
	var URI = require('URIjs');	
	var RedditView = Backbone.Marionette.ItemView.extend({
		template: '#view-reddit-tpl',
		className: 'submission-reddit',

		initialize: function() {
		},

		onShow: function() {
		}
	});
	App.View.Providers.Reddit = RedditView;
})(window.App);