#pragma strict


import System.Collections.Generic;
var cols:int = 4; // the number of columns in the card grid
var rows:int = 4; // the number of rows in the card gird
var totalCards:int = 16;
var matchesNeededToWin:int = totalCards * 0.5; // with 16 cards player needs 8 matches to win!
var matchesMade:int = 0; // at start player has not matched anything
var cardW:int = 100; // each card width and height is 100px
var aCards:List.<Card>; // for storing cards!
var aGrid:Card[,]; // this 2D array keeps track of the shuffled, dealt cards
var aCardsFlipped:List.<Card>; // This list will contain the two flipped cards
var playerCanClick:boolean = false; // will use this flag to prevent player form clicking stuff when he should not!
var playerHasWon:boolean = false; // Store whether or not the player has won. This should probably start out false :) 

function Start () {
	playerCanClick = true;
	
	// Init some empty collections:
	aCards = new List.<Card>(); // This list holds the deck
	aGrid = new Card[rows,cols]; // The rows and cols variables help us define the dimensions of this 2D array 
	aCardsFlipped = new List.<Card>(); //flipped cards!
	
	BuildDeck();
	// Loop through the total number of rows in our aGrid List:
	
	for(var i:int = 0; i<rows; i++)
	{
		// For each individual grid row, loop through the total number of columns in the grid: 
		for(var j:int = 0; j<cols; j++)
		{
			var someNum:int = Random.Range(0,aCards.Count);
			aGrid[i,j] = aCards[someNum];
			aCards.RemoveAt(someNum);
			//stuff a new card instance into the 2D array 
		}
	}
}


class Card extends System.Object {
	var isFaceUp:boolean = false;
	var isMatched:boolean = false;
	var img:String;
	var id:int;
	
	function Card(img:String, id:int){
		this.img = img;
		this.id = id;
	}

}



function OnGUI() {
	GUILayout.BeginArea(Rect (0,0,Screen.width,Screen.height));
		//print("im here!");
		BuildGrid();
		if(playerHasWon){
			BuildWinPrompt();
		
		}
	GUILayout.EndArea();
	//print("building grid"); 
	

}


function BuildGrid(){	
	GUILayout.BeginVertical();
	
	for(var i:int = 0; i<rows; i++){
		
		GUILayout.BeginHorizontal();
		GUILayout.FlexibleSpace();
		for(var j:int = 0; j<cols; j++){
			var card:Card = aGrid[i,j];
			var img:String;
			if(card.isMatched){
				img = "blank";
			
			}else {
				if(card.isFaceUp){
					img = card.img;
				}else {
					img = "wrench";
				}
			}
			GUI.enabled = !card.isMatched;
			
			if(GUILayout.Button(Resources.Load(img),GUILayout.Width(cardW))){
				if(playerCanClick){
					FlipCardFaceUp(card);
				}
				
			}
			GUI.enabled = true;	
			
		}
		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
	}
	GUILayout.FlexibleSpace();
	GUILayout.EndVertical();
}

function BuildDeck(){
	var totalRobots:int = 4; // four robots
	var card:Card; // refrence to a card
	var id:int = 0;
	
	for(var i:int=0; i<totalRobots; i++){
		var aRobotParts:List.<String> = new List.<String>();
		
		aRobotParts.Add("Head");
		aRobotParts.Add("Arm");
		aRobotParts.Add("Leg");
		
		for(var j:int = 0; j<2; j++){
			var someNum:int = Random.Range(0,aRobotParts.Count);
			var theMissingParts:String = aRobotParts[someNum];
			
			aRobotParts.RemoveAt(someNum);
			
			card = new Card("robot" + (i + 1) + "Missing" + theMissingParts, id);
			aCards.Add(card);
			
			card = new Card("robot" + (i + 1) + theMissingParts, id);
			aCards.Add(card);
			id++;
		}
	}
}

function FlipCardFaceUp(card:Card){

	card.isFaceUp = true;
	if(aCardsFlipped.IndexOf(card) < 0){
		aCardsFlipped.Add(card);
	
		if(aCardsFlipped.Count == 2){
			playerCanClick = false;
			
			yield WaitForSeconds (1);
			
			if(aCardsFlipped[0].id == aCardsFlipped[1].id){
				//Match
				aCardsFlipped[0].isMatched = true;
				aCardsFlipped[1].isMatched = true;
				
				matchesMade ++;
				
				if(matchesMade >= matchesNeededToWin){
					playerHasWon = true;
				}
			}else {
				
				aCardsFlipped[0].isFaceUp = false;
				aCardsFlipped[1].isFaceUp = false;
			}
			
			
			aCardsFlipped[0].isFaceUp = false;
			aCardsFlipped[1].isFaceUp = false;
			
			aCardsFlipped = new List.<Card>();
			playerCanClick = true;	
		}
		
	}

}


function BuildWinPrompt(){
	var winPromptW:int = 120;
	var winPromptH:int = 90;
	
	var halfScreenW:int = Screen.width * 0.5;
	var halfScreenH:int = Screen.height * 0.5;
	
	var halfPromptW:int = winPromptW * 0.5;
	var halfPromptH:int = winPromptH * 0.5;
	
	GUI.BeginGroup(Rect(halfScreenW - halfPromptW, halfScreenH - halfPromptH, winPromptW, winPromptH));
	GUI.Box (Rect(0,0,winPromptW,winPromptH), "A Winner is You!!");
	
	var buttonW:int = 80;
	var buttonH:int = 20;
	
	if(GUI.Button(Rect(halfPromptW - (buttonW * 0.5), halfPromptH - (buttonH * 0.5),buttonW,buttonH), "Play again")){
		Application.LoadLevel("title");
	}
	GUI.EndGroup();

}



















