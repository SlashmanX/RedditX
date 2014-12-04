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
<div class="info">
	<div class = "metadata">
		<span class="post_author"><%= author %></span> <span class="comment_falir"><%= author_flair_text %></span> <span class="post_time_created"><%= moment(created_utc, 'x').fromNow() %></span>
	</div>
	<div class = "body"><%= body %></div>
</div>
<br />
<ul></ul>