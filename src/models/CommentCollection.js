(function(App) {
    'use strict';

    var Q = require('q');
    var _this;
    var firstLoad;

    var CommentCollection = Backbone.Collection.extend({
        model: App.Model.Comment,

        initialize: function (models, options) {

			_this = this;
			_this.submission = options.submission;
			_this.opts = options.opts;

			options = options || {};
			options.filter = options.filter || new App.Model.Filter();

			_this.filter = _.defaults(_.clone(options.filter.attributes), {
			});

			Backbone.Collection.prototype.initialize.apply(_this, arguments);
		},

		fetch: function () {

			if (_this.state === 'loading') {
				return;
			}

			_this.state = 'loading';
			_this.trigger('loading', this);
			App.Reddit.call('submission', _this.submission.get('id'), {})
			.then(_this.doneLoading);
		},

		doneLoading: function(listing) {
			_.each(listing.comments, function(comment) {
				_this.add(new App.Model.Comment(comment));
			});
			_this.trigger('sync', _this);
			_this.state = 'loaded';
			_this.trigger('loaded', _this, _this.state);
		},
    });

    App.Model.CommentCollection = CommentCollection;
})(window.App);
