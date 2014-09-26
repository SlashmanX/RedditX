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
	<%= title %>
</div>