/*
* All functions used to communicate with the web buddyserver are defined in this file
*/
var webServerUrl="http://buddyprojects.cotedegranitrose.net/cake/bjusercolors/GetUserColor/";


//-------------------------------------------
function webGetColors(username) {
// retrieve colors from web database for the user
//-------------------------------------------
	var apiUrl = webServerUrl + username ;
	console.log("Url for nominatim:" + apiUrl);
	getWeb("GETCOLORS", apiUrl);

}

//-------------------------------------------
function getWeb(action, url) {
//Low level function top deal with http requests
//will trigger action depending on action
//-------------------------------------------
	var httpOptions = {
		trustAll : true
	};
	var methodweb = 'get';
	// --------------------------------

	if (action == "GETCOLORS") {
		var params = {};
	}




	// --------------------------------
	window.plugins.HttpRequest.execute(url, methodweb, params, httpOptions,
			function(response) {
				var code = response.code;
				var message = response.message;
				var body = response.body;
				 //alert(JSON.stringify(body));
				console.log(JSON.stringify(body));
				console.log(url);
				switch (action) {
				case "GETCOLORS":
				    
					var objloc = jQuery.parseJSON(response.body);
					var objColors = objloc.bj.Message;
					var objColorsArray2 =JSON.stringify(objColors);
					
					var objColorsArrayl =objColorsArray2.split(" ");
					nb_found = objColorsArrayl.length;
					//Update global array : TODO : be dynamic!
					objColorsArray[0]=objColorsArrayl[0];
					objColorsArray[1]=objColorsArrayl[1];
					objColorsArray[2]=objColorsArrayl[2];
					
					
					
					//remove hugly characters " 
					for (var i = 0; i < 3; i++) {
					objColorsArray[i] = objColorsArray[i].replace('"', '');	
					}						




					
					console.log(JSON.stringify(objloc.bj.Message));
					console.log("objColorsArray:"+objColorsArray);
					Toast.shortshow("Updating Jewel Library...");
					console.log("nb_found:"+nb_found);
					colorForNFC=objColorsArray[1]; //default value for the selected color
					//Update color in Jewels Library
					updateJewels(objColorsArray);
					break;

				}

				return;

			}, function(response) {

				var code = response.code;
				var message = response.message;
				var body = response.body;
				// alert('Request : ' + message + ' code ' + code);
				console.log('>> OOPS => response : ' + message + ' code '
						+ code);
				return ('Request : ' + message + ' code ' + code);
			});
}