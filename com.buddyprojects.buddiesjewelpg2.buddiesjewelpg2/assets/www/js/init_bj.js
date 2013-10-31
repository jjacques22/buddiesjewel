//function onDeviceReady() {
//	navigator.geolocation.getCurrentPosition(onSuccess, onError);
//}

// Global variables

var Mylatitude = 0;
var Mylongitude = 0;


var introtitreFxSettings = {
	animation : 9,
	color : "#3F4C6B",
	animationType : "in",
	speed : 1500
};

function start_appli() {

	//$.mobile.changePage( "buddiesjewel.html", { transition: "pop"} );
	
	$.mobile.allowCrossDomainPages = true; $.support.cors = true; $.mobile.phonegapNavigationEnabled = true;
	$('#infolocation').hide();
	$('#container').hide();
	$('#mainbj').show();
	//$('#contentflow').show();
	


    

}



	
function parseTag(nfcEvent) {
	var records = nfcEvent.tagData;

	for (var i = 0; i < records.length; i++) {
		var record = records[i],
		p = document.createElement('p');
		p.innerHTML = nfc.bytesToString(record.payload);
		display.appendChild(p);
	}
}
	
function writeTag(nfcEvent) {
	var mimeType = "buddy/text";
	var payload = "super secret data";
    console.log("writing nfc data:"+payload);	
	var message = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

	nfc.write(
	  [message],
	  function () {
		console.log("success");
	  },
	  function (reason) {
		console.log("fail");
	  }
	);
}

function colorpick_clicked() {
	//$('#mainbj').hide();
	//$.mobile.changePage( "#bj_colorpicker", { transition: "pop"} );
	$('#bj_colorpicker').show();
}

function sendColor() {

	var slider = document.getElementById('slider').value;
	var d=document.getElementById('slider');
	var box=d.children[0]; //TODO : retrieve index to change hard coded 0 dynamically
	var color=box.style.backgroundColor;
	console.log("Sending color via NFC:"+color+" TBC");	
}




function checkFilled() {


	var color=document.getElementById("sliderzzzz").style.backgroundColor;
	console.log("XXXXXXXXXXXXXXXcolorxxxxxxxxxxxx:"+color);	
}







// onSuccess Geolocation //
function onSuccess(position) {
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />'
			+ 'Longitude: ' + position.coords.longitude + '<br />';
	Mylatitude = position.coords.latitude;
	Mylongitude = position.coords.longitude;
	// drawMap();
	$("#infolocation").hide("slow");
}

// onError Callback receives a PositionError object
//
function onError(error) {
	alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
