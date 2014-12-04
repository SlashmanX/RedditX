<div class="voting">
	<div class = "upvote">
		<i class="fa fa-chevron-up vote upvote <%=likes ? 'liked' : ''%>"></i>
	</div>
	<div class = "score">
		<span class = "vote score <%= likes ? 'liked' : likes==false ? 'disliked' : ''%>">
			<%= score %>
		</span>
	</div>
	<div class="downvote">
		<i class="fa fa-chevron-down vote downvote <%= likes==false ? 'disliked' : ''%>"></i>
	</div>
</div>
<div class="thumbnail">
	<img src = "<%= thumbnail %>" style="width:100%"/>
</div>
<div class="info">
	<div class = "title"><%= title %></div>
	<div class = "metadata">
		Posted by <span class="post_author"><%= author %></span> in <span class="post_subreddit"><%= subreddit %> <span class="post_time_created"><%= moment(created_utc, 'x').fromNow() %></span> - <span class="post_comments comments"><%= num_comments %> comments - <span class="post_domain"><%= domain %></span>
	</div>
</div>