(function (App) {
	'use strict';
	var _this;
	var CommentsView = Backbone.Marionette.CollectionView.extend({

		template: '#comments-tpl',
		tagName: 'section',
		itemView: App.View.Comment,

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
	});
	App.View.CommentsView = CommentsView;
})(window.App);