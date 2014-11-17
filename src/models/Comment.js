(function(App) {
	'use strict';

	var Q = require('q');

	var Comment = Backbone.Model.extend({
		defaults: {
			subreddit_id: '',
			banned_by: null,
			link_id: '',
			likes: null,
			replies: [],
			user_reports: [],
			saved: false,
			id: '',
			gilded: 0,
			report_reasons: null,
			author: '',
			parent_id: '',
			score: 0,
			approved_by: null,
			controversiality: 0,
			body: '',
			edited: false,
			author_flair_css_class: null,
			downs: 0,
			body_html: '',
			subreddit: '',
			score_hidden: false,
			name: '',
			created: Date.now(),
			author_flair_text: null,
			created_utc: Date.now(),
			distinguished: null,
			mod_reports: [],
			num_reports: null,
			ups: 0
		},

		initialize: function() {
		}
	});

	App.Model.Comment = Comment;
})(window.App);
