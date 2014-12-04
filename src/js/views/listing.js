(function (App) {
	'use strict';

	var Listing = Backbone.Marionette.ItemView.extend({
		template: '#listing-tpl',

		tagName: 'article',
		className: 'listing',

		events : {
			'click .info' : 'loadSubmission',
			'click .upvote': 'upvote',
			'click .downvote': 'downvote',
			'click .comments': 'loadComments'
		},

		ui : {
			voting : '.voting'
		},

		initialize : function() {
			this.model.on('change', this.render, this);
		},

		loadSubmission: function(e) {
			e.stopPropagation();
			App.vent.trigger('main:getsubmission', this.model, {});
		},

		loadComments: function(e) {
			e.stopPropagation();
			App.vent.trigger('main:getcomments', this.model, {});
		},

		upvote: function(e) {

			e.stopPropagation();
			var _this = this;
			if(_this.model.get('likes')){
				return _this.unvote();
			}
			else {
				App.vent.trigger('main:upvote', _this.model.get('name'), function() {
					if(_this.model.get('likes') != null && _this.model.get('likes') === false) { // was downvoted before
						_this.model.set('score', _this.model.get('score') + 2);
					}
					else {
						_this.model.set('score', _this.model.get('score') + 1);
					}
					_this.model.set('likes', true);
				});
			}
		},

		downvote: function(e) {
			var _this = this;

			e.stopPropagation();

			if(_this.model.get('likes') != null && _this.model.get('likes') === false) {
				return _this.unvote();
			}
			else {
				App.vent.trigger('main:downvote', _this.model.get('name'), function() {
					if(_this.model.get('likes')) { // was upvoted before downvoting
						_this.model.set('score', _this.model.get('score') - 2);
					}
					else {
						_this.model.set('score', _this.model.get('score') - 1);
					}
					_this.model.set('likes', false);
				});
			}
		},

		unvote: function() {
			var _this = this;
			App.vent.trigger('main:unvote', _this.model.get('name'), function() {
				if(_this.model.get('likes')) {
					_this.model.set('score', _this.model.get('score') - 1);
				}
				else {
					_this.model.set('score', _this.model.get('score') + 1);
				}
				_this.model.set('likes', null);
			});
		},
		
	});
	App.View.Listing = Listing;
})(window.App);