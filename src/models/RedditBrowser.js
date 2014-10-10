(function (App) {
	'use strict';

	var _this;

	var RedditBrowser = Backbone.Marionette.Layout.extend({
		template: '#browser-tpl',
		className: 'main-browser',
		regions: {
			FilterBar: '.filter-bar-region',
			ItemList: '.list-region'
		},

		initialize: function () {
			_this = this;
			_this.filter = new App.Model.Filter(this.filters);

			_this.collection = new App.Model.ListingCollection([], {
				filter: _this.filter
			});

			_this.collection.fetch();

			_this.listenTo(_this.filter, 'change', _this.onFilterChange);

			App.vent.on('browser:getsubreddit', _this.getSubreddit);
			App.vent.on('browser:gethomepage', _this.getHomepage);

		},

		onShow: function () {
			_this.ItemList.show(new App.View.ListingsView({
				collection: _this.collection
			}));
		},
		onFilterChange: function () {
			_this.collection = new App.Model.ListingCollection([], {
				filter: _this.filter
			});
			_this.collection.fetch();

			_this.ItemList.show(new App.View.ListingsView({
				collection: _this.collection
			}));
		},

		getSubreddit: function(r) {
			_this.filter.set('subreddit', r);
		},

		getHomepage: function() {
			_this.filterset('subreddit', null);
		}
	});

	App.View.RedditBrowser = RedditBrowser;
})(window.App);
