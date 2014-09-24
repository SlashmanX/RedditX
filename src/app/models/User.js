(function(App) {
	'use strict';

	var User = Backbone.Model.extend({

		localStorage:new Backbone.LocalStorage('RedditX-user'),

		idAttribute : 'id',

		defaults: {
			'id': null,
			'name': null,
			'link_karma' : 1,
			'comment_karma': 1,
			'access_token': null,
			'refresh_token': null,
			'token_expires': 0
		},

		initialize: function() {
			this.on('change', this.change, this);
		},

		change: function() {
			this.save();
		}
	});

	App.Model.User = User;
})(window.App);
