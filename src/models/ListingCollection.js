(function(App) {
    'use strict';

    var Q = require('q');
    var _this;

    var ListingCollection = Backbone.Collection.extend({
        model: App.Model.Listing,

        initialize: function (models, options) {

			_this = this;

			options = options || {};
			options.filter = options.filter || new App.Model.Filter();

			_this.filter = _.defaults(_.clone(options.filter.attributes), {
				after: options.after
			});
			_this.hasMore = true;

			Backbone.Collection.prototype.initialize.apply(_this, arguments);
		},

		fetch: function () {

			if (_this.state === 'loading') {
				return;
			}

			_this.state = 'loading';
			_this.trigger('loading', this);

			if(_this.filter.subreddit) {
				App.Reddit.call('r', _this.filter.subreddit, _this.filter)
				.then(_this.doneLoading);
			}
			else {
				App.Reddit.call('homepage', _this.filter)
				.then(_this.doneLoading);
			}
		},

		doneLoading: function(listings, after) {
			_.each(listings, function(listing) {
				_this.add(new App.Model.Listing(listing));
			})
			_this.trigger('sync', _this);
			_this.state = 'loaded';
			_this.trigger('loaded', _this, _this.state);
		},

		fetchMore: function () {
			_this.fetch();
		}
    });

    App.Model.ListingCollection = ListingCollection;
})(window.App);
