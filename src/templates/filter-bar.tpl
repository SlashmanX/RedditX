Sort: <select name = 'sort' id = 'sort' class = 'sort'>
	<option value = 'hot'>hot</option>
	<option value = 'top'>top</option>
	<option value = 'new'>new</option>
	<option value = 'controversial'>controversial</option>
</select>

<%
	if(sort === 'top' || sort === 'controverisal') {
		%>
		From: <select name = 'time' id = 'time' class = 'time'>
			<option value = 'hour'>hour</option>
			<option value = 'day'>day</option>
			<option value = 'week'>week</option>
			<option value = 'month'>month</option>
			<option value = 'year'>year</option>
			<option value = 'all'>all</option>
		</select>
		<%
	}
%>