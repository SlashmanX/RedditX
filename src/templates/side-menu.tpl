<% if (id === -1) { %>

	<li><a href="<%= App.Auth.generateAuthURL() %>" class='authenticate'><i class="fa fa-user"></i>Login to Reddit</a></li>

<% } else { %>


	<h4>Profile</h4>
	<ul class="user_info">
		<li><a href="#"><i class="fa fa-user"></i><%= name %></a></li>
		<li><a href="#"><i class="fa fa-link"></i><%= link_karma %></a></li>
		<li><a href="#"><i class="fa fa-comment"></i><%= comment_karma %></a></li>
		<% if(has_mail) { %>
			<li style="font-weight: bold"><a href="#"><i class="fa fa-envelope"></i>1</a></li>
		<% } else { %>
			<li><a href="#"><i class="fa fa-envelope-o"></i>0</a></li>
		<% } %>

	</ul>
	<h4><i class ="fa fa-refresh refresh-subreddits"></i>Subreddits</h4>
	<ul class="user_subreddits">
		<li><a href="/" class = "frontpage" title="Frontpage">Frontpage</a></li>
		<% for(var sub in subreddits) { %>
			<li><a href="<%=subreddits[sub].url%>" class = "subreddit" title="<%=subreddits[sub].public_description%>"><%= subreddits[sub].display_name%></a></li>
		<% } %>
	</ul>



<% } %>