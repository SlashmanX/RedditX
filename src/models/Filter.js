(function (App) {
	'use strict';

	var Filter = Backbone.Model.extend({
		defaults: {
			sort: 'hot',
			t: 'week',
			limit: 25,
			after: null,
			q: null,
			show: null,
			subreddit: null
		}
	});

	App.Model.Filter = Filter;
})(window.App);
