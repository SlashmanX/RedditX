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
			'token_expires': 0,
			'has_mail': false,
			'subreddits': []
		},

		initialize: function() {
			this.on('change', this.change, this);
		},

		change: function() {
			if(this.get('id') !== -1) { // Don't save to LocalStorage unless it's an actual user
				this.save();
			}
		}
	});

	App.Model.User = User;
})(window.App);
