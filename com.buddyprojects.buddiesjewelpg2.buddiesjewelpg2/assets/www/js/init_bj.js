/*
* Entry point for BuddiesJewel. Startappli will be called once device is ready
*/



//***************************************
// GLOBAL DATAS
//***************************************
//Global array used to store buddycolors
//TODO : set length dynamic.
var objColorsArray = ["FF0000","00FF00","0000FF"];
var colorForNFC = "0000FF"; //default value for the color to be sent by NFC


var username="ce_bernard@yahoo.fr"; //Todo : set it dynamic using a profile page


//Used for intro
var introtitreFxSettings = {
	animation : 9,
	color : "#3F4C6B",
	animationType : "in",
	speed : 1500
};


//-------------------------------------------
function start_appli() {
// Entry point, called once device is ready
//-------------------------------------------
	$.mobile.allowCrossDomainPages = true; $.support.cors = true; $.mobile.phonegapNavigationEnabled = true;
	$('#infolocation').hide();
	$('#container').hide();
	$('#mainbj').show();

	
	//Retrieve use colors from webserver: colors will be refreshed in jewels library once received
	webGetColors(username);


}

















