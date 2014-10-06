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
		},

		ui : {
			voting : '.voting'
		},

		initialize : function() {
		},

		loadSubmission: function(e) {
			App.vent.trigger('main:getsubmission', this.model.get('id'), {});
		},

		upvote: function(e) {
			if(this.model.get('likes')){
				console.log('likes, unvoting');
				return unvote();
			}
			else {
				App.vent.trigger('main:upvote', this.model.get('name'), function() {
					this.model.set('likes', true);
					this.model.set('score', this.model.get('score') + 1);

					voting.render();
				})
			}
			e.stopPropagation();
		},

		downvote: function(e) {
			if(this.model.get('likes') != null && this.model.get('likes') == 'false') {
				return unvote();
			}
			else {
				App.vent.trigger('main:downvote', this.model.get('name'), function() {
					this.model.set('likes', false);
					this.model.set('score', this.model.get('score') - 1);
					voting.render();
				})
			}
			e.stopPropagation();
		},

		unvote: function(e) {
			App.vent.trigger('main:unvote', this.model.get('name'), function() {
				if(this.model.get('likes')) {
					this.model.set('score', this.model.get('score') - 1);
				}
				else {
					this.model.set('score', this.model.get('score') + 1);
				}
				this.model.set('likes', null);

				voting.render();
			})
			e.stopPropagation();
		},
		
	});
	App.View.Listing = Listing;
})(window.App);