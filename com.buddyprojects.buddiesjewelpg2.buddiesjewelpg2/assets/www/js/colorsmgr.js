/*
* All functions used to control the jewels' color are defined in this file
*/


//-------------------------------------------
function findKeyframesRule(rule)
// search the CSSOM for a specific -webkit-keyframe rule
// Use to update a webkit anim
//-------------------------------------------
{
	console.log("findKeyframesRule() called")
	
	// gather all stylesheets into an array
	var ss = document.styleSheets;
	
	// loop through the stylesheets
	for (var i = 0; i < ss.length; ++i) {

		// loop through all the rules
		for (var j = 0; j < ss[i].cssRules.length; ++j) {
			
			// find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
			if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
				return ss[i].cssRules[j];
		}
	}
	
	// rule not found
	return null;
}


//-------------------------------------------	
function deleteKeyframesRule(rule)
// search the CSSOM for a specific -webkit-keyframe rule and delete it
//-------------------------------------------	
{
	console.log("deleteKeyframesRule() called")
	
	// gather all stylesheets into an array
	var ss = document.styleSheets;
	
	// loop through the stylesheets
	for (var i = 0; i < ss.length; ++i) {

		// loop through all the rules
		for (var j = 0; j < ss[i].cssRules.length; ++j) {
			
			// find the -webkit-keyframe rule whose name matches our passed over parameter and return that rule
			if (ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule)
			{
				//delete the rule
				ss[i].deleteRule(j);
				return 1;
			}
		}
	}
	
	// rule not found
	return null;
}

	
	
//-------------------------------------------		
function createNewAnimForJewel(item,newAnim,newColor)
// Create a new animation for the item
//-------------------------------------------	
{	
	

	//remove hugly characters " 
	console.log("zzzzzzzz newColor before:"+newColor);	
	newColor = newColor.replace('"', '');
	
	//Extract RGB values	
	console.log("setting color:"+newColor+" for "+newAnim+ ", item"+item);
	var newColorR=parseInt(newColor.substring(0,2),16);
	var newColorG=parseInt(newColor.substring(2,4),16);
	var newColorB=parseInt(newColor.substring(4,6),16);	
		

	
	
	//Create the new rule
	var lastSheet = document.styleSheets[document.styleSheets.length - 1];
	lastSheet.insertRule("@-webkit-keyframes " + newAnim + "{ 0%,10% { background-color: rgba("+newColorR+","+newColorG+","+newColorB+",1); } }", lastSheet.cssRules.length);
	// find our newly created -webkit-keyframe rule
	var keyframes = findKeyframesRule(newAnim);	
	//keyframes.insertRule("50% { background-color: rgba(0,0,0,0.4); }");		
	keyframes.insertRule("50% { background-color: rgba("+newColorR+","+newColorG+","+newColorB+",0.5); }");
	keyframes.insertRule("90%,100% { background-color: rgba("+newColorR+","+newColorG+","+newColorB+",1); }");		
	
	// assign the animation to our element (which will cause the animation to run)
	var d=document.getElementsByClassName(item);
	// Tricky here: image is duplicated several times since present in swiper-container => 
	// We don't have one jewel per color but several clones!!!!!!	  
	for (var i = 0; i < d.length; i++) {
	  d[i].style.webkitAnimationName = newAnim;	
	}			

}	
	

//-------------------------------------------	
function updateJewels(colors)
// begin the new animation process
//-------------------------------------------
{
	console.log("updateJewels() called");

	var newColor = null;
	var length = colors.length;
	
    //Hard coded length : use only the first 3 colors
    //TODO : be dynamic creating CSS anims!!!		
	length=3; //hard code value FOR DEBUG ONLY,	
	console.log("length:"+length);


	for (var i = 0; i < length; i++) {
		newColor = colors[i];
		console.log("color:"+newColor+" ,index:"+i);
		// Update the related jewel class "imgJewelz$i "
		objId="imgJewelz"+i;
		console.log("objId:"+objId);
		
        // remove the old animation from our objectS
		// Tips #1: image is duplicated several times since present in swiper-container => 
		// We don't have one jewel per color but several clones!!!!!!	  		
		var d=document.getElementsByClassName(objId);
	  	for (var j = 0; j < d.length; j++) {
		  d[j].style.webkitAnimationName = "none";	
		}	
		
		
		//Delete CSS rule if any
		animName="NewchangeColor"+i;			
		res=deleteKeyframesRule(animName);
		
		//Tips #2: changing a CSS animation on the fly does't work properly
		//=> we need to flip between two animation names to make it work....silly tip!	
		if (res==1)
		{
		  animName=animName+"_cloned";  
		  console.log("animName cloned:"+animName);
		}
        var newColor=colors[i]; 	
		createNewAnimForJewel(objId,animName,newColor);	
	}	
}	
	
//-------------------------------------------			
function configureJewel(jewelIndex)
// triggered when a jewel is pressed to update the color to be sent by NFC
//-------------------------------------------	
{
	console.log("ooooooooooooooooooooo jewelIndex:"+jewelIndex);
	console.log("color to send:"+objColorsArray[jewelIndex]);		
	colorForNFC=objColorsArray[jewelIndex]; //Save color in global data. We will be used by async NFC task 
	Toast.shortshow("Color To be sent by NFC: ..."+colorForNFC);	
}	
	


/*******************************************
 DEBUG FUNCTIONS
********************************************/
//-------------------------------------------	
function checkFilled() {
//Use to change the color of the first jewel
//-------------------------------------------	


	var d=document.getElementById("sliderzzzz");
	var color=document.getElementById("sliderzzzz").style.backgroundColor;
	var textColor=document.getElementById("sliderzzzz").value;
	console.log("XXXXXXXXXXXXXXXcolorxxxxxxxxxxxx:"+color);	
	console.log("textColor:"+textColor);	

	
	//Update color in Jewel Library
	objColorsArray[0]=textColor;
	objColorsArray[1]="00FF00";
	objColorsArray[2]="FFA07A";
	setTimeout(function(){updateJewels(objColorsArray);}, 50);
  	
}
