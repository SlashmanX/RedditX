<% if(type === 'gifv') { %>
	<iframe class = "submission-imgur-gifv" nwdisable nwfaketop src="<%= url %>"/>
<% } 
else {
%>
	<img src = "<%= url %>"/>
<% } %>