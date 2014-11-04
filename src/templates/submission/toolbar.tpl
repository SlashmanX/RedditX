<span class = "closeSubmission">
	<i class = "fa fa-arrow-left"></i>
</span>
<span class = "upvote">
	<i class="fa fa-chevron-up vote upvote <%=likes ? 'liked' : ''%>"></i>
</span>
<span class = "score <%= likes ? 'liked' : likes==false ? 'disliked' : ''%>">
	<%= score %>
</span>
<span class="downvote">
	<i class="fa fa-chevron-down vote downvote <%= likes==false ? 'disliked' : ''%>"></i>
</span>
<span class="title" title = "<%= title.replace("\"", "&quot;") %>">
	<%= title %>
</span>