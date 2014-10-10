(function (App) {
	'use strict';
	var _this;
	var SCROLL_MORE = 0.9; // 90% of window height
	var ListingsView = Backbone.Marionette.CollectionView.extend({

		template: '#list-tpl',
		tagName: 'section',
		className: 'listings',
		itemView: App.View.Listing,

		events: {
			'scroll': 'onScroll',
			'mousewheel': 'onScroll',
			'keydown': 'onScroll'
		},

		initialize: function () {
			_this = this;
			_this.listenTo(this.collection, 'loading', _this.onLoading);
			_this.listenTo(this.collection, 'loaded', _this.onLoaded);
		},

		onShow: function () {
			if (_this.collection.state === 'loading') {
				_this.onLoading();
			}
		},

		onLoading: function() {
			App.vent.trigger('main:showloading');
		},

		onLoaded: function() {
			App.vent.trigger('main:hideloading');
		},

		onScroll: function () {

			var totalHeight = $('#content').prop('scrollHeight');
			var currentPosition = $('#content').scrollTop() + $('#content').height();

			if (this.collection.state === 'loaded' &&
				(currentPosition / totalHeight) > SCROLL_MORE) {
				this.collection.fetchMore();
			}
		},
	});
	App.View.ListingsView = ListingsView;
})(window.App);