function capturePhoto(){
    navigator.camera.getPicture(uploadPhoto,onFail,{sourceType:1,quality:60});
	//Toast.shortshow("Capture Photo...");
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
	function picFail(e) {
		navigator.notification.alert("Sorry, we failed...");
	}

	function getSwatches(){
		var colorArr = createPalette($("#yourimage"), 5);
		for (var i = 0; i < Math.min(5, colorArr.length); i++) {
			$("#swatch"+i).css("background-color","rgb("+colorArr[i][0]+","+colorArr[i][1]+","+colorArr[i][2]+")");
			console.log($("#swatch"+i).css("background-color"));
		}
	}	
	
	function getSwatches2(){
		var DominantColor = getDominantColor($("#yourimage"));
		console.log("DominantColorzzzzzzzzz:"+DominantColor.r);
		
		//console.log("DominantColor:"+ DominantColor[0] + DominantColor[1]+ DominantColor[2]);
		//alert('DominantColor: ' + DominantColor[0] + DominantColor[1]+ DominantColor[2]);
		r = DominantColor.r.toString(16);
		g = DominantColor.g.toString(16);
		b = DominantColor.b.toString(16);
		DominantColorzz=""+r+g+b;

		alert('DominantColorzz: ' + DominantColorzz);		
		

		
	}
	


	function picSuccess(imageURI) {
		console.log(imageURI);
		$("#yourimage").attr("src",imageURI);
		console.log("Done...");
	}
	
	function takePic(e){
		navigator.camera.getPicture(picSuccess, picFail, {quality:75, targetWidth:desiredWidth, targetHeight:desiredWidth, sourceType:Camera.PictureSourceType.CAMERA, destinationType:Camera.DestinationType.FILE_URI});
	}

	function selectPic(e) {
		navigator.camera.getPicture(picSuccess, picFail, {quality:75, targetWidth:desiredWidth, targetHeight:desiredWidth, sourceType:Camera.PictureSourceType.PHOTOLIBRARY, destinationType:Camera.DestinationType.FILE_URI});
	}
	
	
	function onDeviceReady() {
		$("#takePictureBtn").click(takePic);
		$("#picPictureBtn").click(selectPic);
		$("#yourimage").load(getSwatches);
		desiredWidth = window.innerWidth;
		
	};
	
	function init() {
		document.addEventListener("deviceready", onDeviceReady, true);
	} 










