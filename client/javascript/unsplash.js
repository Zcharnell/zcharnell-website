function getXMLHTTPRequest()
	{
	    var request;
	    try{
	        request = new ActiveXObject("Microsoft.XMLHTTP");
	    }catch(ex1){
	        try{
	            request = new ActiveXObject("Msxml2.XMLHTTP");
	        }catch(ex2){
	            request = null;
	        }
	    }
	    if(!request && typeof XMLHttpRequest != "undefined"){
	        request = new XMLHttpRequest();
	    }
	    return request;
	}

  function loadURL(url, callback)
  {
       var aXMLHttpRequest = getXMLHTTPRequest();
       var allData;

       if (aXMLHttpRequest){
           aXMLHttpRequest.open("GET", url, true);
           aXMLHttpRequest.onreadystatechange = function (aEvt) {
   				if(aXMLHttpRequest.readyState == 4){
 				   allData = aXMLHttpRequest.responseText;
				   callback(allData)
			   }

        };

        //Lets fire off the request
           aXMLHttpRequest.send(null);
       }

       else
       {
           //Oh no, the XMLHttpRequest object couldn't be instantiated.
           alert("A problem occurred instantiating the XMLHttpRequest object.");
       }
  }


var userID = "zacharycharnell";

function addNew()
{
      var fileObj = document.getElementById('fileUpload').files[0];
      var filename = fileObj.name;
      var size = fileObj.size;


      var t = filename.substring(filename.length-3, filename.length).toLowerCase();
      if(['png', 'jpg', 'gif'].indexOf(t) == -1){
          alert("Incorrect File -- Please upload .png, .jpg, or .gif");
          document.getElementById("fileUpload").value = "";
          return;
      }

      if(document.getElementById('photoName').value == ""){
          alert("Please enter a name for the photo");
          document.getElementById("photoName").value = "";
          return;
      }

      var checkboxTags = [];
      if(document.getElementById('landscapeCheckbox').checked) checkboxTags.push('landscape');
      if(document.getElementById('foodCheckbox').checked) checkboxTags.push('food');
      if(document.getElementById('animalsCheckbox').checked) checkboxTags.push('animals');
      if(document.getElementById('selfieCheckbox').checked) checkboxTags.push('selfie');
      if(document.getElementById('otherCheckbox').checked) checkboxTags.push('other');
      //console.log(checkboxTags);

      var fd = new FormData();
      var fileInput = userID + new Date().getTime().toString() + "." + t;

      fd.append('date', (new Date()).toString());
      fd.append('input', fileObj);
      fd.append('fileInput', fileInput);
			fd.append('collection', 'zcharnellphotos');

	  var fordb = {
		  id: "photo" + new Date().getTime().toString(),
		  date: new Date().getTime().toString(),
		  name: document.getElementById('photoName').value,
		  tags: checkboxTags,
		  user: userID,
		  url: "https://portfolio-unsplash.s3.amazonaws.com/" + fileInput
	  }

      fd.append('fordb', encodeURIComponent(JSON.stringify(fordb)));

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          document.getElementById("fileUpload").value = "";
          document.getElementById('photoName').value = "";
          if (xhr.readyState != 4) { return; }
				  updateList();
				  document.getElementById('uploadButton').innerHTML = 'Uploaded!';
		      setTimeout(function(){
		      	document.getElementById('uploadButton').innerHTML = 'Upload Photo';
		      },2000);
      };
      xhr.open("POST", "/uploadFile", true);
      xhr.send(fd);
}



   var allPhotos;
   var numPhotos = 0;
   function updateList(photosToShow)
   {
	   var url = "./listphotos";
		 url = url + "?collection=" + 'zcharnellphotos';
	   var callback = function(data){
		   var list = JSON.parse(data);
		   allPhotos = list;
		   if(list.length > 20){ 
		   	deletePhoto(0);
		   	numPhotos = 0;
		   	updateList();
		   	return;
		   }
		   var output = "";
		   var numResults = 0;
		   list.sort(function(a,b){
		   	if(a.date > b.date) return -1;
		   	else return 1;
		   });
		   if(photosToShow == 'no photos to show') {
		   	output += "<div id=title><h2>No photos to show for that search</h2></div>";
		   }
		   else {
		   	output += '<table>'
			   for(var i=0; i < list.length; i++){
			   	console.log('NAME ' + i + ": " + list[i].name);
			   	if(!photosToShow || (photosToShow == 'user' && list[i].user == userID) || list[i].name.toLowerCase() == photosToShow || list[i].tags.indexOf(photosToShow.toLowerCase()) >= 0) {
			   		numResults++;
			   		if(numResults%3 == 1){ 
			   			/*output = output + "<tr>";
			   			console.log(i + ' ROW');*/
			   			output += "<div class='row'>";
			   		}

			   		output = output + "<div class='col-md-4 text-center'>";
				   output = output + "<h2 id='title'>" + list[i].name.capitalizeFirstLetter() + "</h2>";
				   output += "<a href='" + list[i].url + "'data-lightbox ='user' target = '_blank'><img class='list-image' src='" + list[i].url + "'></a>"; 
					 //output = output +"<div class='list-image'>"+"<a class='list-image' href=" + list[i].url + " data-lightbox ='user' target = '_blank'>" + "<img id='test' class='list-image' src='" + list[i].url + "'>" + "</a>"+"</div>" + "<br>";
				  //console.log('url: ' + list[i].url);
				   //if(list[i].user == userID) output = output + "<a href='javascript:renamePhoto(" + i + ")' id='rename' class='btn btn-default'>" + "Rename</a>";
				   //if(list[i].user == userID) output = output + "<a href='javascript:deletePhoto(" + i + ")' id='delete' class='btn btn-default'>" + "Delete</a>";
				   //output = output + "<a href='javascript:editTags(" + i + ")' id='tags' class='btn btn-default'>" + "Tags</a>";
				   if(list[i].tags.length > 0){
				   	output = output + "<p>";

				   	for(var j=0; j<list[i].tags.length; j++){
				   		output = output + '<span class="list-tag">' + list[i].tags[j].capitalizeFirstLetter() + '</span>';
				   		//if(j+1 != list[i].tags.length) output += ", ";
				   	}

				   	output = output + "</p>";
				   	
				 	 }
				 	 //output += "</td>";
				 	 output += "</div>";
				 	 if(numResults%3 == 0) output += "</div>";//output += "</tr>";
				 	 //output = output + "<hr>";
				 	}
			   }
			 }
			 var numResultsString = numResults;
			 if(numResults != 1) numResultsString += ' Results';
			 else numResultsString += ' Result';
			 document.getElementById('numResults').innerHTML = numResultsString;
			 document.getElementById("list").innerHTML = output;
			 if(numPhotos != list.length){
					numPhotos = list.length;
					console.log('Update num photos: ' + numPhotos);
					setTimeout(function(){
						updateList();
					},1000);
			 }
	   }
	   loadURL(url, callback);
   }

   function deletePhoto(i){
	   var id = allPhotos[i].id;
	   var url = "./deletephoto?id=" + encodeURIComponent(id)
		  			 +"&collection=zcharnellphotos";
	   var callback = function(data){
		   if(data === "deleted"){
			   updateList();
		   }
	   }

	   loadURL(url, callback);
   }

   function renamePhoto(i){
	   var id = allPhotos[i].id;
	   var newname = prompt("Rename photo", getPhotoName(id))
	   console.log('NEWNAME: ' + newname);

	   var url = "./renamephoto?id=" + encodeURIComponent(id)
	   					+ "&name=" + encodeURIComponent(newname)
							+ "&collection=zcharnellphotos";


	   var callback = function(data){
		   if(data === "done"){
		   	console.log('UPDATE LIST');
			   updateList();
		   }
	   }
	   loadURL(url, callback);
   }

   function getPhotoName(id)
   {
	   for(var i = 0; i < allPhotos.length; i++){
		   if(allPhotos[i].id === id){
			   return allPhotos[i].name;
		   }
	   }
	   return "";
   }

	/*function register()
	{
		var name = document.getElementById("nameReg").value;
		var email = document.getElementById("usernameReg").value;
		var pw1 = document.getElementById("passwordReg").value;
		var pw2 = document.getElementById("passwordReg1").value;

		if(pw1 != pw2){
			alert('passwords do not match!');
			return;
		}

		var url = "./createUser";
		url = url + "?name=" + name;
		url = url + "&userID=" + email;
		url = url + "&password=" + hex_md5(pw1);
		url = url + "&userType=user";
		url = url + "&collection=users";

		loadURL(url, function(data){
			if(data === "1"){
				alert("account created!")
				document.getElementById("nameReg").value="";
				document.getElementById("usernameReg").value="";
				document.getElementById("passwordReg").value="";
				document.getElementById("passwordReg1").value="";
				$('#signupbox').hide(); 
				$('#loginbox').show();
			}
			else{
				alert("account already exists");
			}
		});
	}*/

	/*function login()
	{
		var email = document.getElementById("username").value;
		var pw = hex_md5(document.getElementById("password").value);

		var url = "./login";
		url = url + "?userID=" + email;
		url = url + "&password=" + pw;
		url = url +"&userType=user";
		url = url +"&collection=users";

		loadURL(url , function(data){
			if(data === "1"){
				document.getElementById("postlogin").style.display="block";
				document.getElementById("prelogin").style.display="none";
				userID = email;
				updateList();
			}
			else{
				alert("Login failed");
				document.getElementById("username").value="";
			  document.getElementById("password").value="";
			}

		});
	}*/

	function searchTags() {
	   var tagToSearch = document.getElementById("searchText").value.toLowerCase();
	   var match;
   	for (var i=0; i < allPhotos.length; i++) {
			//console.log(i);
			//console.log(tagToSearch);
			//console.log('NAME: ' + allPhotos[i].name.indexOf(tagToSearch));
			var name = allPhotos[i].name.toLowerCase();
   		if (allPhotos[i].tags.indexOf(tagToSearch) >= 0) {
			//console.log('Working!');
   			//alert(allPhotos[i].tags);
   			match = allPhotos[i]; //Store all objects that match into this variable
   		}
   		else if (name.indexOf(tagToSearch) >= 0) {
			//console.log(allPhotos[i].name.indexOf(tagToSearch));
   			//alert(allPhotos[i].name);
   			match = allPhotos[i]; //Store all objects that match into this variable
   		}
			if(match) {
				updateList(tagToSearch);
				return; //Returns all the tags that matched
			}
   	}
   	updateList('no photos to show');
   	return null;
  }

  function upload_file(file, signed_request, url){
	    var xhr = new XMLHttpRequest();
	    xhr.open("PUT", signed_request);
	    xhr.setRequestHeader('x-amz-acl', 'public-read');
	    xhr.onload = function() {
	        if (xhr.status === 200) {
	            document.getElementById("preview").src = url;            
	            document.getElementById("avatar_url").value = url;
	        }
	    };
	    xhr.onerror = function() {
	        alert("Could not upload file."); 
	    };
	    xhr.send(file);
	}
	/*
	    Function to get the temporary signed request from the app.
	    If request successful, continue to upload the file using this signed
	    request.
	*/
	function get_signed_request(file){
	    var xhr = new XMLHttpRequest();
	    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
	    xhr.onreadystatechange = function(){
	        if(xhr.readyState === 4){
	        	console.log('State: ' + xhr.readyState + 'Status: ' + xhr.status);
	            if(xhr.status === 200){
	                var response = JSON.parse(xhr.responseText);
	                upload_file(file, response.signed_request, response.url);
	            }
	            else{
	                alert("Could not get signed URL.");
	            }
	        }
	    };
	    xhr.send();
	}
	/*
	   Function called when file input updated. If there is a file selected, then
	   start upload procedure by asking for a signed request from the app.
	*/
	function init_upload(){
	    console.log("here");
	    var files = document.getElementById("file_input").files;
	    var file = files[0];
	    if(file == null){
	        alert("No file selected.");
	        return;
	    }
	    get_signed_request(file);
	}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}



