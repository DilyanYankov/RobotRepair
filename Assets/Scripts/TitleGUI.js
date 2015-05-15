#pragma strict

var customSkin:GUISkin;
// button width:
var buttonW:int = 100;
// button height: var 
var buttonH:int = 50; 
// half of the Screen width: 
var halfScreenW:float; 
// half of the button width:
var halfButtonW:float;
  
function Start() {
  halfScreenW = Screen.width/2; 
  halfButtonW = buttonW/2; 
} 

function OnGUI () {
	GUI.skin = customSkin;
	
	if(GUI.Button(Rect(halfScreenW-halfButtonW,460,buttonW,buttonH),"Play Game"))  
	{  
		// print("You clicked me!"); for later!
		Application.LoadLevel("game");
	} 
}