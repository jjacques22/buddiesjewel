/*
* All functions used to control the NFC channel are defined in this file
*/



//-------------------------------------------
function hex2a(hex) {
// Convert hex ascii char into binary
//-------------------------------------------
	var str = '';
	for (var i = 0; i < hex.length; i += 2)
		str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	return str;
}


//-------------------------------------------
function nfcOnNdef(nfcEvent) {
// Triggered when an nfc tag is detected
//-------------------------------------------	
	    	

    	var tag = nfcEvent.tag;
    	
        console.log("TAG detected :-)");
        console.log(JSON.stringify(tag));


        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

       // tagContents.innerHTML = app.tagTemplate(tag);
	   
		// console.log("overwrite tag content");
		nfcUpdateColor();


}




//-------------------------------------------
function nfcUpdateColor() {
// Triggered when an nfc tag is detected
//-------------------------------------------	
		
	var colorhex = colorForNFC; //retrieve color to be sent from global data
	console.log("Sending color via NFC:"+colorhex);

	var colorhexwithalpha = "ff"+colorhex;
	//var colorhexwithalpha = "ffff0000";
	//var strhex = hex2a(colorhex);
	var strhex = hex2a(colorhexwithalpha);
	Toast.shortshow("Sending color by NFC..."+colorhex);
	;	
	console.log("Sending color via NFC Hex value :"+colorhex);
	console.log("Sending color via NFC Hex value With Alpha :"+colorhexwithalpha);	
	console.log("Sending color via NFC Ascii value :"+strhex);	
	//var mimeType = "buddy/text";
	var mimeType = "application/com.buddiesjewel.bijou";
	var payload = strhex;
	console.log("writing nfc data:"+payload);
	var message = ndef.mimeMediaRecord(mimeType, nfc.stringToBytes(payload));

	nfc.write(
	  [message],
	  function () {
		console.log("success");
		Toast.shortshow("Jewel succesfully updated :-)");
	  },
	  function (reason) {
		console.log("fail");
		Toast.shortshow("Oops, something wrong with NFC :-(");
	  }
	);
}




//-------------------------------------------
function nfcOnNfc(nfcEvent) {
// Triggered when an nfc tag is detected. not used, ndef event is used
//-------------------------------------------

        
        var tag = nfcEvent.tag;
   		console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");     
        console.log(JSON.stringify(nfcEvent.tag));
        // app.clearScreen();
		
		// console.log("overwrite tag content");
	    // app.writeTag();

        // tagContents.innerHTML = app.nonNdefTagTemplate(tag);
        // navigator.notification.vibrate(100);
}









/*******************************************
 DEBUG FUNCTIONS
********************************************/


//-------------------------------------------
function rgb2hex(rgb) {
// Convert ascii like " rgb(255,16,0)  code intohex code FF0F00
//-------------------------------------------	
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x) {
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
