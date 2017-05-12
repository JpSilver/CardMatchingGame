var cards = new Array(5);
var numbers = [0, 0, 0, 0, 0, 0, 0, 0];
var got = [false, false, false, false, false, false, false, false];
var lastCard = null;
var lastIndex = 0;
var totalIncorrect = 0;
var isBuzy = false;

function addCards(documentId){
	var html = "";
	for(i = 0; i < 4; i ++){
		cards[i] = new Array(4);
		for(k = 0; k < 4; k ++){
			cards[i][k] = 0;
		}
	}
	cards[4] = new Array(1);
	cards[4][0] = 0;
	for(y = 0; y < 4; y ++){
		for(x = 0; x < 4; x ++){
			id = "\""+x + ":" + y +"\"";
			html += "<img id=" + id + " src=\""+getCardString(cards[x][y])+"\" style=\"animation:flipFront 5s\" onclick=\"flipCard("+x + ", " + y+")\"/>";
		}
		html += "</br>";
	}
	generateCards();
	document.getElementById(documentId).innerHTML = html; 
	
}

function getCardString(index){
	if(index == 0)
		return "media/cards/" + "cardBack" + ".png";
	else
		return "media/cards/" + index + ".png";
}

function generateCards(){
	for(x = 0; x < 4; x ++){
		for(y = 0; y < 4; y ++){
			num = randomBetween(1, 8);
			while(numbers[num-1] == 2){
				num = randomBetween(1, 8);
			}
			cards[x][y] = num;
			numbers[num-1] ++;
		}
	}
	
}

function randomBetween(min, max){
	 return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function hideCards(){
	for(x = 0; x < 4; x ++){
		for(y = 0; y < 4; y ++){
			if(!got[cards[x][y]-1]){
				id = "\""+x + ":" + y +"\"";
				document.getElementById(id).src = "media/cards/" + "cardBack" + ".png";
			}
		}
	}
}

function checkWin(){
	for(i = 0; i < 8; i ++){
		if(!got[i]){
			return;
		}
	}
	if (window.confirm("CONGRADS! YOU WIN! You had " + totalIncorrect + " incorrect moves!, go again?"))
	{
		location.reload(); 
	}
}

function flipCard(x, y){
	if(got[cards[x][y]-1] || isBuzy)
		return;	
	e = document.getElementById(""+x + ":"+ y+"");
	e.style.animation = "flipBack 1s";
	isBuzy = true;
	setTimeout(function(){
		displayPic(x, y, e)
	}, 1000);
}

function displayPic(x, y, e){
	e.src = getCardString(cards[x][y]);
	e.style.animation = "flipFront 1s";
	setTimeout(function(){
		checkCards(x, y, e)
	}, 1000);
}

function checkCards(x, y, e){
	if(x == 4)
		return;
	isBuzy = false;
	if(lastCard != null){
		if(cards[x][y] == lastIndex){
			got[cards[x][y]-1] = true;
			lastCard = null;
			checkWin();
			return;
		}
		e.style.animation = "flipBack 1s";
		lastCard.style.animation = "flipBack 1s";
		n = lastCard;
		lastCard = null;
		totalIncorrect ++;
		setTimeout(function(){
			displayPic(4, 0, e);
			displayPic(4, 0, n);
		}, 1000);
		
	}else{
		lastCard = e;
		lastIndex = cards[x][y];
	}
}