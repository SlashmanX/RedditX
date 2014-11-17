(function (App) {
	'use strict';

	var Comment = Backbone.Marionette.CompositeView.extend({
	    tagName: 'div',
	    template: '#comment-tpl',
	    className: 'comment',
	    initialize: function () {
	        if (this.model.get('replies')) {
	            this.collection = new RepliesView(this.model.get('replies'));
	        }
	    },
	    itemViewContainer: 'ul'
	});
	App.View.Comment = Comment;

	var RepliesView = Backbone.Collection.extend({
		model: App.Model.Comment
	});
	
})(window.App);