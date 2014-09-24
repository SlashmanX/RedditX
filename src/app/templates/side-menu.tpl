<h4>Menu</h4>
<ul class="categories">
	<% if (!id) { %>
		<li><a href="<%= App.Auth.generateAuthURL() %>" class='authenticate'><i class="fa fa-user"></i>Login to Reddit</a></li>


	<% } else { %>


		<li><a href="#"><i class="fa fa-user"></i>Welcome <%= name %>!</a></li>
		<li><a href="#"><i class="fa fa-link"></i>Submissions: <%= link_karma %></a></li>
		<li><a href="#"><i class="fa fa-comment"></i>Comments: <%= comment_karma %></a></li>

		
	<% } %>

</ul>