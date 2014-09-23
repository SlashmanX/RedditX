<h4>Menu</h4>
<ul class="categories">
	<% if (!localStorage.access_token) { %>
		<li><a href="<%= App.Auth.generateAuthURL() %>" class='authenticate'><i class="fa fa-user"></i>Login to Reddit</a></li>
	<% } else { %>
		<li><a href="#"><i class="fa fa-user"></i>Logged In!</a></li>
	<% } %>

</ul>