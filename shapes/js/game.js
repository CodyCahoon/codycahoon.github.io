var gamePieces = document.getElementsByClassName('game-piece');
var clicked = [];
var index1 = -1, index2 = -1;
var numClicked = 0;
var score = document.getElementById("score");
var scoreTracker = 0;
var twoPoints = false;
window.onload=assignRandom;
gamePieces[0].onclick=function(){runGame(0);};
gamePieces[1].onclick=function(){runGame(1);};
gamePieces[2].onclick=function(){runGame(2);};
gamePieces[3].onclick=function(){runGame(3);};
gamePieces[4].onclick=function(){runGame(4);};
gamePieces[5].onclick=function(){runGame(5);};
gamePieces[6].onclick=function(){runGame(6);};
gamePieces[7].onclick=function(){runGame(7);};
gamePieces[8].onclick=function(){runGame(8);};
gamePieces[9].onclick=function(){runGame(9);};
gamePieces[10].onclick=function(){runGame(10);};
gamePieces[11].onclick=function(){runGame(11);};
gamePieces[12].onclick=function(){runGame(12);};
gamePieces[13].onclick=function(){runGame(13);};
gamePieces[14].onclick=function(){runGame(14);};
gamePieces[15].onclick=function(){runGame(15);};

function assignRandom(){
	for (i = 0; i < gamePieces.length; i++)
	{
		clicked[i] = false;
		randomize(i);
	}
}

function runGame(par1)
{
	clickedPiece(par1);
	if (twoPoints && isBordering())
	{
		button1 = gamePieces[index1];
		button2 = gamePieces[index2];
		if (button1.color == button2.color && button1.shape == button2.shape)
		{
			scoreTracker+=2;
			newPoints();			
		}
		else if (button1.color == button2.color || button1.shape == button2.shape)
		{
			scoreTracker++;
			newPoints();			
		}
		else
		{
			scoreTracker--;
		}
		resetPieces();
		score.innerHTML=scoreTracker;
	}
	else if (twoPoints && !isBordering())
	{
		resetPieces();
		scoreTracker--;
		score.innerHTML=scoreTracker;	
	}
}

function clickedPiece(par1)
{
	//default background color
	var inside = false;	
	if (!clicked[par1] && numClicked < 2)
	{
		inside = true;
		numClicked++;
		if(numClicked == 1)
		{
			index1=par1;
			twoPoints=false;
		}
		else
		{
			index2=par1;
			twoPoints=true;
		}
		if (gamePieces[par1].shape == "triangle")
		{
			gamePieces[par1].id="selectedpiece-60";
		}
		else
		{
			gamePieces[par1].id="selectedpiece-45";
		}
	}
	//unclick the box
	else if(clicked[par1])
	{
		inside = true;
		numClicked--;
		numClicked == 1? index2 = -1: index1 = -1;
		twoPoints = false;
		gamePieces[par1].id="unselectedpiece";
	}

	//only switch if a button was clicked
	if (inside)
		clicked[par1] = !clicked[par1];
}

function randomize(par1)
{
	var rand = Math.floor(Math.random() * 17);
	if (rand == 0)
	{
		gamePieces[par1].style.backgroundImage="url(img/green-plus.png)";
		gamePieces[par1].color="green";
		gamePieces[par1].shape="plus";
	}
	else if(rand == 1)
	{
		gamePieces[par1].style.backgroundImage="url('img/blue-plus.png')";	
		gamePieces[par1].color="blue";
		gamePieces[par1].shape="plus";
	}
	else if(rand == 2)
	{
		gamePieces[par1].style.backgroundImage="url('img/red-plus.png')";	
		gamePieces[par1].color="red";
		gamePieces[par1].shape="plus";
	}	
	else if (rand == 3)
	{
		gamePieces[par1].style.backgroundImage="url(img/gray-plus.png)";
		gamePieces[par1].color="gray";
		gamePieces[par1].shape="plus";
	}

	else if(rand == 4)
	{
		gamePieces[par1].style.backgroundImage="url('img/green-line.png')";	
		gamePieces[par1].color="green";
		gamePieces[par1].shape="line";
	}
	else if (rand == 5)
	{
		gamePieces[par1].style.backgroundImage="url('img/blue-line.png')";	
		gamePieces[par1].color="blue";
		gamePieces[par1].shape="line";
	}
	else if(rand == 6)
	{
		gamePieces[par1].style.backgroundImage="url('img/red-line.png')";	
		gamePieces[par1].color="red";
		gamePieces[par1].shape="line";
	}	
	else if (rand == 7)
	{
		gamePieces[par1].style.backgroundImage="url(img/gray-line.png)";
		gamePieces[par1].color="gray";
		gamePieces[par1].shape="line";
	}
	else if (rand == 8)
	{
		gamePieces[par1].style.backgroundImage="url('img/green-box.png')";	
		gamePieces[par1].color="green";
		gamePieces[par1].shape="box";
	}
	else if(rand == 9)
	{
		gamePieces[par1].style.backgroundImage="url('img/blue-box.png')";	
		gamePieces[par1].color="blue";
		gamePieces[par1].shape="box";
	}	
	else if (rand == 10)
	{
		gamePieces[par1].style.backgroundImage="url(img/red-box.png)";
		gamePieces[par1].color="red";
		gamePieces[par1].shape="box";
	}
	else if (rand == 11)
	{
		gamePieces[par1].style.backgroundImage="url('img/gray-box.png')";	
		gamePieces[par1].color="gray";
		gamePieces[par1].shape="box";
	}
	else if (rand == 12)
	{
		gamePieces[par1].style.backgroundImage="url('img/green-triangle.png')";	
		gamePieces[par1].color="green";
		gamePieces[par1].shape="triangle";
	}
	else if (rand == 13)
	{
		gamePieces[par1].style.backgroundImage="url('img/blue-triangle.png')";	
		gamePieces[par1].color="blue";
		gamePieces[par1].shape="triangle";
	}
	else if (rand == 14)
	{
		gamePieces[par1].style.backgroundImage="url('img/red-triangle.png')";	
		gamePieces[par1].color="red";
		gamePieces[par1].shape="triangle";
	}
	else
	{
		gamePieces[par1].style.backgroundImage="url('img/gray-triangle.png')";	
		gamePieces[par1].color="gray";
		gamePieces[par1].shape="triangle";
	}
}

function newPoints()
{	
	oldShape = gamePieces[index1].shape;
	oldColor = gamePieces[index1].color;
	do
	{
		randomize(index1);
	}while(oldShape == gamePieces[index1].shape && oldColor == gamePieces[index1].color);


	oldShape = gamePieces[index2].shape;
	oldColor = gamePieces[index2].color;
	do
	{
		randomize(index2);
	}while(oldShape == gamePieces[index2].shape && oldColor == gamePieces[index2].color);
}

function resetPieces()
{
	clicked[index1] = false;
	clicked[index2] = false;
	gamePieces[index1].id="unselectedpiece";
	gamePieces[index2].id="unselectedpiece";
	numClicked = 0;
	twoPoints = false;	
	index1 = -1;
	index2 = -1;
}

function isBordering()
{
	if (index1 > index2)
	{
		temp = index1;
		index1 = index2;
		index2 = temp;
	}
	if (index1 == 0)
		return index2 == 1 || index2 == 4 ? true : false;
	else if (index1 == 1)
		return index2 == 2 || index2 == 5? true : false;
	else if (index1 == 2)
		return index2 == 3 || index2 == 6? true : false;
	else if (index1 == 3)
		return index2 == 7? true : false;
	else if (index1 == 4)
		return index2 == 5 || index2 == 8? true : false;
	else if (index1 == 5)
		return index2 == 6 || index2 == 9 ? true: false;
	else if (index1 == 6)
		return index2 == 7 || index2 == 10? true : false;
	else if (index1 == 7)
		return index2 == 11 ? true : false;
	else if (index1 == 8)
		return index2 == 9 || index2 == 12? true : false;
	else if (index1 == 9)
		return index2 == 10 || index2 == 13? true : false;
	else if (index1 == 10)
		return index2 == 11 || index2 == 14? true : false;
	else if  (index1 == 11)
		return index2 == 15? true : false;
	else if(index1 == 12)
		return index2 == 13? true : false;
	else if (index1 == 13)
		return index2 == 14? true : false;	
	else 
		return true;
}