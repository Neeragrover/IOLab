//'Search Songs' button retrieves songs from Soundcloud API
$(document).ready(
	$("#searchbtn").on('click', function(){
		console.log("hie");
		var userInput = $("#keyword").val();
		console.log(userInput);	
		callAPI(userInput)
		
	})
	);


// Event hander for calling the SoundCloud API using the user's search query
function callAPI(query) {
	$.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
		{'q': query,
		'limit': '15'},
		function(data) {
			console.log("object")
			console.log(data)
			for (i = 0; i <15; i++){
					$("#songs").append('<p> '+  'Title: ' + data[i].title + '<button name=Play id='+data[i].permalink_url+'>Play </button> <button name=AddtoP	id='+data[i].permalink_url+ ' t2='+data[i].title+'>Add to Playlist</button>' + ' </p>');
					$("#songs").append('<li> <p>' +  'Artist: ' + data[i].user.username + ' </p> </li>');
					$("#songs").append('<ul> <img src = ' + data[i].artwork_url  + '> </ul>');
					//console.log("Title: " + data[i].title);
					//console.log("User: " + data[i].user.username);
					//console.log("Picture: " + data[i].artwork_url)

					}
			},'json'
	);
}


//'Play and Add to Playlist button functionality in the search results container

$('#songs').on('click', "button", function(data) {

	var id = data.srcElement.id;
	var name = data.srcElement.name;
	
	//console.log(name);
	//console.log(id);
	//console.log(data);
	//console.log(data.srcElement.t2);
	if (name == "AddtoP")
	{
		
		title = $(this).parent()[0].childNodes[0].data;
		//console.log("title");
		//console.log(title);
		

		
		$("#playlist").prepend('<div id=playlistcontainer>'+title+'<button name=playpl id='+id+'>	 Play </button> <button name=remove> Remove </button></div>');

		console.log("cloned and appended");


	}
	else 
	{
		changeTrack(id)
	}	
	
})


// Play and Remove button functionality of the Playlist
$('#playlist').on('click', "button", function(data) {
	console.log("in playlist button press");
	console.log(data);
	var id = data.srcElement.id;
	var name = data.srcElement.name;

	//console.log("name");
	//console.log(name);

	//console.log("id");
	//console.log(id);

	if (name == "playpl")
	{
		changeTrack(id);
	}
	else if (name == "remove")
	{
		parent = $(this);
		//console.log("parent");
		//console.log(parent);
		parent.parent()[0].remove();

	}
	else{
		pass;
	}

})


// 'Play' button event handler - play the track in the Stratus player
function changeTrack(url) {
	// Remove any existing instances of the Stratus player
	$('#stratus').remove();
	
	// Create a new Stratus player using the clicked song's permalink URL
	$.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });
}

