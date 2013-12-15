function capturePhoto(){
    navigator.camera.getPicture(uploadPhoto,onFail,{sourceType:1,quality:60});
}


function updateNFCColor(index){
    var id="swatch"+index;
	colorForNFC=document.getElementById(id).value;
	colorForNFC = colorForNFC.replace('#', '');	
	console.log("Selected Color for NFC transaction:"+colorForNFC);	
	Toast.shortshow("Selected color :"+colorForNFC);
	if(switchOffJewel=="true")
	{
	  console.log("Force ON Mode");
	  toggleOnOff();
	}	

	

}


function toggleOnOff(){
	console.log("toggleOnOff");	
	var button = document.getElementById('button');

	$(button).toggleClass('on');
	//Retrieve light color to know wether we are in ON position or OFF position
	  if ($(button).hasClass('on')) {
		 //Jewel in ON position
		 switchOffJewel="false";
	  } else {
		 //Jewel in OFF position
		 switchOffJewel="true";
		}	


	

}



function uploadPhoto(data){
// this is where you would send the image file to server

    var image = document.getElementById('cameraPic');
  // Unhide image elements
      //
      image.style.display = 'block';		
    //image.src = "data:image/jpeg;base64," + data;
	image.src =data;
	console.log("data from camera:"+data);
    // Successful upload to the server
    navigator.notification.alert(
        'Your Photo has been uploaded',  // message
        okay,                           // callback
        'Photo Uploaded',              // title
        'OK'                          // buttonName
    );
    // upload has failed Fail
    /*
    if (failedToUpload){
    navigator.notification.alert(
        'Your Photo has failed to upload',
        failedDismissed,
        'Photo Not Uploaded',
        'OK'
        );
    }
    */
}
function okay(){
    // Do something
}


// Called if something bad happens.
// 
function onFail(message) {
  alert('Failed because: ' + message);
}





function pickColor() {
  alert('pickColor');

}













////////////////////////////////////////////







	var desiredWidth;
	var desiredHeight;
	function picFail(e) {
		navigator.notification.alert("Sorry, we failed...");
	}

	function getSwatches(){
		var colorArr = createPalette($("#yourimage"), 5);
		//Update input colors
		for (var i = 0; i < Math.min(5, colorArr.length); i++) {			
			colorHex=rgbToHex(colorArr[i][0],colorArr[i][1],colorArr[i][2]);
			console.log("extracted colorHex:"+colorHex+"from "+i); 
			$("#swatch"+i).spectrum("set", '#' +colorHex);			
		}	
		//Select the first color by default for NFC
		colorForNFC=rgbToHex(colorArr[0][0],colorArr[0][1],colorArr[0][2]);
		console.log("colorForNFC selected by default: " + colorForNFC);
		Toast.shortshow("Selected color:"+colorForNFC);
		if(switchOffJewel=="true")
		{
		  console.log("Force ON Mode");
		  toggleOnOff();
		}			

		

	}	
	
	


	function picSuccess(imageURI) {
		console.log(imageURI);
		$("#yourimage").attr("src",imageURI);
		console.log("Done...");
	}
	
	function takePic(e){
		navigator.camera.getPicture(picSuccess, picFail, {quality:75, targetWidth:desiredWidth, targetHeight:desiredHeight, sourceType:Camera.PictureSourceType.CAMERA, destinationType:Camera.DestinationType.FILE_URI});
	}

	function selectPic(e) {
		navigator.camera.getPicture(picSuccess, picFail, {quality:75, targetWidth:desiredWidth, targetHeight:desiredHeight, sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType:Camera.DestinationType.FILE_URI});
	}
	
	
	function onDeviceReady() {
		$("#takePictureBtn").click(takePic);
		$("#picPictureBtn").click(selectPic);
		$("#yourimage").load(getSwatches);
		desiredWidth = window.innerWidth;
		desiredHeight = (window.innerHeight)/2;
		a=rgbToHex(2,56,255);
		alert('rgbToHex: ' + a);	
		
		
	};
	
	function init() {
		document.addEventListener("deviceready", onDeviceReady, true);
	} 










   // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 6 character hex
    function rgbToHex(r, g, b) {

        var hex = [
            r.toString(16),
            g.toString(16),
            b.toString(16)
        ];


        return hex.join("");
    }
