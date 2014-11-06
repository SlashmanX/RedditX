<% if(type === 'gifv') { %>
	<iframe class = "submission-imgur-gifv" nwdisable nwfaketop src="<%= info.link %>"/>
<% } 

 else if(type === 'album') {

 	_.each(info.images, function(image){ %>
 		<img src = "<%= image.link %>"/> <hr />
 	<% })
  } 
else {
%>
	<img src = "<%= info.link %>"/>
<% } %>