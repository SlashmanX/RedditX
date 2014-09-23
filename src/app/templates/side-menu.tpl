<h4>Menu</h4>
<ul class="categories">
	<% if (!localStorage.access_token) { %>
		<li><a href="<%= App.Auth.generateAuthURL() %>" class='authenticate'><i class="fa fa-user"></i>Login to Reddit</a></li>
	<% } else { %>
		<li><a href="#"><i class="fa fa-user"></i>Welcome <%= JSON.parse(localStorage.user).name %>!</a></li>
		<li><a href="#"><i class="fa fa-link"></i>Submissions: <%= JSON.parse(localStorage.user).link_karma %></a></li>
		<li><a href="#"><i class="fa fa-comment"></i>Comments:  <%= JSON.parse(localStorage.user).comment_karma %></a></li>
	<% } %>

</ul>