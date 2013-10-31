/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distriTAG detected :-buted under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    }, 
    // deviceready Event Handler
    // 
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {  
        app.receivedEvent('deviceready');
        // navigator.geolocation.getCurrentPosition(onSuccess, onError, {
		// maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
        // window.location = "buddymeteo.html";
		
       /*
		 * // Read NDEF formatted NFC Tags nfc.addNdefListener ( function
		 * (nfcEvent) { var tag = nfcEvent.tag, ndefMessage = tag.ndefMessage;
		 *  // dump the raw json of the message // note: real code will need to
		 * decode // the payload from each record
		 * alert(JSON.stringify(ndefMessage));
		 *  // assuming the first record in the message has // a payload that
		 * can be converted to a string.
		 * alert(nfc.bytesToString(ndefMessage[0].payload).substring(3)); },
		 * function () { // success callback alert("Waiting for NDEF tag");
		 * },TAG detected :- function (error) { // error callback alert("Error
		 * adding NDEF listener " + JSON.stringify(error)); } );
		 */

        
		
        function failure(reason) {
            navigator.notification.alert(reason, function() {}, "There was a problem");
        }	
		
		console.log("device.platform:"+device.platform);		
		    
		nfc.addNdefListener(
			app.onNdef,
			function() {
				console.log("Listening for NDEF tags.");
			},
			failure
		);
		

        if (device.platform == "Android") {

            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                app.onNfc,
                function() {
                    console.log("Listening for non-NDEF tags.");
                },
                failure
            );

            // Android launches the app when tags with mime type text/pg are
			// scanned
            // because of an intent in AndroidManifest.xml.
            // phonegap-nfc fires an ndef-mime event (as opposed to an ndef
			// event)
            // the code reuses the same onNfc handler
            nfc.addMimeTypeListener(
                'buddy/text',
                app.onNdef,
                function() {
                    console.log("Listening for NDEF mime tags with type text/pg.");
                },
                failure
            );
			

        }
	

				

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

    },
	onNfc: function (nfcEvent) {
        
        var tag = nfcEvent.tag;
   		console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz");     
        console.log(JSON.stringify(nfcEvent.tag));
        // app.clearScreen();
		
		// console.log("overwrite tag content");
	    // app.writeTag();

        // tagContents.innerHTML = app.nonNdefTagTemplate(tag);
        // navigator.notification.vibrate(100);
    },
    onNdef: function (nfcEvent) {
    	
    	function rgb2hex(rgb) {
    	    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    	    function hex(x) {
    	        return ("0" + parseInt(x).toString(16)).slice(-2);
    	    }
    	    return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    	}
    	    	
    	function hex2a(hex) {
    	    var str = '';
    	    for (var i = 0; i < hex.length; i += 2)
    	        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    	    return str;
    	}
    	
    	var tag = nfcEvent.tag;
    	
        console.log("TAG detected :-)");
        console.log(JSON.stringify(tag));
        // app.clearScreen();

        // BB7 has different names, copy to Android names
        if (tag.serialNumber) {
            tag.id = tag.serialNumber;
            tag.isWritable = !tag.isLocked;
            tag.canMakeReadOnly = tag.isLockable;
        }

       // tagContents.innerHTML = app.tagTemplate(tag);
	   
		// console.log("overwrite tag content");
	    // app.writeTag();
        //sendColor();

        	/*
			var slider = document.getElementById('slider').value;
        	var d=document.getElementById('slider');
        	var box=d.children[0]; // TODO : retrieve index to change hard coded 0
    								// dynamically
        	var color = box.style.backgroundColor;
			*/
			
			//var sliderzzzz = document.getElementById('sliderzzzz').value;
			
			var color = document.getElementById("sliderzzzz").style.backgroundColor;
			console.log("Sending color via NFC:"+color);
        	var colorhex = rgb2hex(color);
			var colorhexwithalpha = "ff"+colorhex;
			//var colorhexwithalpha = "ffff0000";
        	//var strhex = hex2a(colorhex);
			var strhex = hex2a(colorhexwithalpha);
			Toast.shortshow("Sending color by NFC..."+colorhex);
        	console.log("Sending color via NFC:"+color);	
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
        	
        	
        // navigator.notification.vibrate(100);
    },
	writeTag: function (nfcEvent) {
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
};
