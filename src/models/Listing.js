(function(App) {
	'use strict';

	var Q = require('q');

	var Listing = Backbone.Model.extend({
		defaults: {
			domain: '',
			banned_by: null,
			media_embed: { },
			subreddit: '',
			selftext_html: null,
			selftext: '',
			likes: null,
			user_reports: [ ],
			secure_media: null,
			link_flair_text: null,
			id: '',
			gilded: 0,
			secure_media_embed: { },
			clicked: false,
			report_reasons: null,
			author: '',
			media: null,
			score: 0,
			approved_by: null,
			over_18: false,
			hidden: false,
			thumbnail: '',
			subreddit_id: '',
			edited: false,
			link_flair_css_class: null,
			author_flair_css_class: null,
			downs: 0,
			mod_reports: [ ],
			saved: false,
			is_self: false,
			name: '',
			permalink: '',
			stickied: false,
			created: Date.now(),
			url: '',
			author_flair_text: null,
			title: '',
			created_utc: Date.now(),
			ups: 0,
			num_comments: 0,
			visited: false,
			num_reports: null,
			distinguished: null
		}
	});

	App.Model.Listing = Listing;
})(window.App);
