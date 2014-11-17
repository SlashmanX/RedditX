(function (App) {
	'use strict';

	var _this;

	var RedditViewer = Backbone.Marionette.Layout.extend({
		template: '#view-reddit-tpl',
		className: 'reddit-viewer',
		regions: {
			Submission: '.reddit-submission',
			Comments: '.reddit-comments'
		},

		initialize: function () {
			_this = this;
			console.log(this);

			_this.collection = new App.Model.CommentCollection([], {
				submission: _this.model
			});

			_this.collection.fetch();

		},

		onShow: function () {
			/*_this.submission = new App.View.Submission({
				model: _this.model
			});

			_this.Submission.show(_this.submission);*/
			_this.Comments.show(new App.View.CommentsView({
				collection: _this.collection
			}));
			$('#submission').removeClass('hidden').addClass('shown');
		},

		onFilterChange: function () {
			_this.collection = new App.Model.CommentCollection([], {
				submission: _this.model
			});

			_this.collection.fetch();

			_this.Comments.show(new App.View.CommentsView({
				collection: _this.collection
			}));
		}
	});

	App.View.RedditViewer = RedditViewer;
})(window.App);
