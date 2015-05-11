(function (App) {
	'use strict';
	var Comment = Backbone.Marionette.CompositeView.extend({
	    tagName: 'li',
	    template: '#comment-tpl',
	    className: 'comment',
	    initialize: function () {
	        if (this.model.get('replies')) {
	            this.collection = new ReplyCollection(this.model.get('replies'));
	        }
	    },
	    itemViewContainer: 'ul'
	});

	var ReplyCollection = Backbone.Collection.extend({
		model: App.Model.Comment
	})
	App.View.Comment = Comment;

})(window.App);