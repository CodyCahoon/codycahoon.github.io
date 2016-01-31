var liveBox = 7;
var liveSearch = 0;
var boxrulesPlay = new Array();
var boxrulesHome = new Array();
var boxrulesCustom = new Array();
var menu = false;
var boxes = document.querySelectorAll(".box");	
var menus = document.querySelectorAll(".menu");	
var header1 = document.querySelectorAll("h1");
var para = document.querySelectorAll("p");

function BoxRule(up, right, down, left)
{
	this.up = up;
	this.right = right;
	this.down = down;
	this.left = left;
}

window.onload = function()
{
	var b0 = new BoxRule(-1, 1, 2, 0);
	var b1 = new BoxRule(-1, 1, 6, 0);
	var b2 = new BoxRule(0, 1, 3, 2);
	var b3 = new BoxRule(2, 4, 3, 3);
	var b4 = new BoxRule(2, 5, 4, 3);
	var b5 = new BoxRule(1, 6, 5, 4);
	var b6 = new BoxRule(1, 6, 6, 5);

	boxrulesPlay.push(b0);
	boxrulesPlay.push(b1);
	boxrulesPlay.push(b2);
	boxrulesPlay.push(b3);
	boxrulesPlay.push(b4);
	boxrulesPlay.push(b5);
	boxrulesPlay.push(b6);

	var b7 = new BoxRule(-1, 8, 9, 7);
	var b8 = new BoxRule(-1, 8, 10, 7);
	var b9 = new BoxRule(7, 10, 9, 9);
	var b10 = new BoxRule(8, 10, 10, 9);

	boxrulesHome.push(b7);
	boxrulesHome.push(b8);
	boxrulesHome.push(b9);
	boxrulesHome.push(b10);

	var b11 = new BoxRule(-1, 12, 13, 11);
	var b12 = new BoxRule(-1, 12, 14, 11);
	var b13 = new BoxRule(11, 14, 13, 13);
	var b14 = new BoxRule(12, 14, 14, 13);

	boxrulesCustom.push(b11);
	boxrulesCustom.push(b12);
	boxrulesCustom.push(b13);
	boxrulesCustom.push(b14);

	resize();

}

window.onkeydown = function(e)
{
	if (menu)
	{
		menus[liveSearch].setAttribute("id", "unselected-header");

		if (e.keyCode == 37 && liveSearch != 0)
			liveSearch--;
		else if (e.keyCode == 39 && liveSearch != 2)
			liveSearch++;
		else if (e.keyCode == 40)
		{
			menu = false;
			menus[liveSearch].setAttribute("id", "selected-header");
			boxes[liveBox].setAttribute("id", "selected-box");
		}
		if (menu)
			menus[liveSearch].setAttribute("id", "selected-h");

		if (liveSearch == 0)
		{
			liveBox = 7;
			for (var i = 0; i <= 6; i++)
			{
				boxes[i].style.display = "none";
			}
			for (var i = 7; i <= 10; i++)
			{
				boxes[i].style.display = "block";
			}
			for (var i = 11; i <= 14; i++)
			{
				boxes[i].style.display = "none";
			}

		}
		else if (liveSearch == 1)
		{
			liveBox = 0;
			for (var i = 0; i <= 6; i++)
			{
				boxes[i].style.display = "block";

			}
			for (var i = 7; i <= 14; i++)
			{
				boxes[i].style.display = "none";
			}
		}
		else
		{
			liveBox = 11;
			for (var i = 0; i <= 10; i++)
			{
				boxes[i].style.display = "none";
			}
			for (var i = 11; i <= 14; i++)
			{
				boxes[i].style.display = "block";
			}
		}
	}
	else
	{
		updateBoxes(e);
	}
}

function updateBoxes(e)
{
	boxes[liveBox].setAttribute("id", "unselected-box");

	var rule;
	if (liveSearch == 1)
		rule = boxrulesPlay[liveBox];
	else if (liveSearch == 0)
		rule = boxrulesHome[liveBox - 7];
	else
		rule = boxrulesCustom[liveBox - 11];

	switch(e.keyCode)
	{
		//Left
		case 37:
			liveBox = rule.left;
			break;
		//Up
		case 38:
			liveBox = rule.up;
			break;
		//Right
		case 39:
			liveBox = rule.right;
			break;
		//Down
		case 40:
			liveBox = rule.down;
			break;
	}
	if (liveBox == -1)
	{
		menu = true;
		if (liveSearch == 0)
			liveBox = 7;
		else if (liveSearch == 1)
			liveBox = 0;
		else
			liveBox = 11;
		boxes[liveBox].setAttribute("id", "unselected-box");
		menus[liveSearch].setAttribute("id", "selected-h");
	}
	else
	{
		boxes[liveBox].setAttribute("id", "selected-box");
	}
}

window.onresize =  resize;

function resize()
{
	calc = Math.min(36, window.innerHeight / 14);
	calc2 = Math.min(20, window.innerHeight/ 26);
	for (var i = 0; i < header1.length; i++)
	{
		header1[i].style.fontSize = calc + 'px';
	}

	for (var i = 0; i < para.length; i++)
	{
		para[i].style.fontSize = calc2 + 'px';
	}
}