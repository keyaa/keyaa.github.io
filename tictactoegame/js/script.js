var playerScore = 0;
var computerScore = 0;
var arr = [];
var singleplayer = true;
var playerMove = true;
function hardreset()
{
    playerScore = 0;
    computerScore = 0;
    getPScore();
    getCScore();
    reset();
}
function getPScore()
{
    document.getElementById("ps").innerHTML = playerScore;
}
function getCScore()
{
    document.getElementById("cs").innerHTML = computerScore;
}
function switchMode(x)
{
    if (singleplayer)
    {
        singleplayer = false;
        x.src = "img/2p.png"
    }
    else
    {
        singleplayer = true;
        x.src = "img/1p.png"
    }
    hardreset();
}
function AImove(s)
{
    this.score = s;
    this.x = 0;
    this.y = 0;
}

function init()	// initializes the board and starts the main game loop
{
	for (var i = 0; i < 3; i++)
    {
    	arr.push([0,0,0]);
    }
}
function reset()	// resets the board and all pieces
{
	for (var i = 0; i < 3; i++)
    {
    	for (j = 0; j < 3; j++)
    	{
    		arr[i][j] = 0;
    	}
    }
    var change = document.getElementsByTagName("img");
    for(var i = 0; i < change.length - 8; i++)
    {
        var blank = change[i];
        blank.src = "img/placeholder.png";
    }
    playerMove = true;
}
function hover(x, y, z)
{
	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			if (y == i && z == j && arr[i][j] == 0)
			{
				if (playerMove)
				{
					x.src = "img/x.png";
					x.style.opacity = .5;
				}
				else
				{
					x.src = "img/o.png";
					x.style.opacity = .5;
				}
			}
		}
	}
}
function empty(x, y, z)
{
	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			if (y == i && z == j && arr[i][j] == 0)
			{
				x.src = "img/placeholder.png";
				x.style.opacity = 1;
			}
		}
	}
}
function place(x, y, z)
{
	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			if (y == i && z == j)	// player clicked here
			{
				if (arr[i][j] == 0)	// if there is no piece there
				{
					if (!singleplayer)	// 2 players exist
					{
						if (playerMove)
						{
							arr[i][j] = 1;
							x.src = "img/x.png"
							x.style.opacity = 1;
							playerMove = false;	// alternates player pieces
						}
						else
						{
							arr[i][j] = 2;
							x.src = "img/o.png"
							x.style.opacity = 1;
							playerMove = true;	// alternates player pieces
						}
					}
					else
					{
                        if (playerMove)
                        {
                            arr[i][j] = 1;
                            x.src = "img/x.png"
                            x.style.opacity = 1;
                            playerMove = false;
                        }
					}
				}
			}
		}
	}
	if (checkVictory() == 1)
	{
		if (singleplayer)
		{
			alert("You Win!");
		}
		else
		{
			alert("Player 1 Win!");
		}
        playerScore++;
        getPScore();
		reset();
	}
	else if (checkVictory() == 2)
	{
		if (singleplayer)
		{
			alert("Computer Win!");
		}
		else
		{
			alert("Player 2 Win!");
		}
        computerScore++;
        getCScore();
		reset();
	}
	else if (checkVictory() == 3)
	{
		alert("Draw!");
		reset();
	}
    else if (singleplayer)
	{
        if (!playerMove)
        {
            AImakemove();	// computer move
            playerMove = true;
        }
        if (checkVictory() == 1)
        {
            if (singleplayer)
            {
                alert("You Win!");
            }
            else
            {
                alert("Player 1 Win!");
            }
            playerScore++;
            getPScore();
            reset();
        }
        else if (checkVictory() == 2)
        {
            if (singleplayer)
            {
                alert("Computer Win!");
            }
            else
            {
                alert("Player 2 Win!");
            }
            computerScore++;
            getCScore();
            reset();
        }
        else if (checkVictory() == 3)
        {
            alert("Draw!");
            reset();
        }
    }
}
function checkVictory()	// 0 = inconclusive, 1 = player win, 2 = AI win (or player 2), 3 = draw
{
	for (var i = 0; i < 3; i++)
	{
		if (arr[i][0] == arr[i][1] && arr[i][0] == arr[i][2] && arr[i][0] != 0)	// checks for vertical victory
		{
			return arr[i][0];
		}
		if (arr[0][i] == arr[1][i] && arr[0][i] == arr[2][i] && arr[0][i] != 0)	// checks for horizontal victory
		{
			return arr[0][i];
		}
	}
	if (arr[0][0] == arr[1][1] && arr[0][0] == arr[2][2] && arr[0][0] != 0) // diagonal victory /
	{
		return arr[0][0];
	}
	if (arr[0][2] == arr[1][1] && arr[0][2] == arr[2][0] && arr[0][2] != 0)	// diagonal victory \
	{
		return arr[0][2];
	}
	var draw = true;	// assume a draw happened
	for (var i = 0; i < 3; i++)	// sees if there is still an avaliable move
	{
		for (var j = 0; j < 3; j++)
		{
			if (arr[i][j] == 0)	// a space is avaliable
			{
				draw = false;
			}
		}
	}
	if (draw)	// if no more moves, and this point is reached, board is full and neither player won
	{
		return 3;
	}
	return 0;
}
function getBest(current)
{
	var cv = checkVictory();
	if (cv == 2)
	{
		return new AImove(10);
	}
	else if (cv == 1)
	{
		return new AImove(-10);
	}
	else if (cv == 3)
	{
		return new AImove(0);
	}

	var m = [];	// array of moves

	for (var i = 0; i < 3; i++)
	{
		for (var j = 0; j < 3; j++)
		{
			if (arr[i][j] == 0)	// sees if there is an avaliable move
			{
			    var	move = new AImove();
				move.x = i;
				move.y = j;
				arr[i][j] = current;	// testing moves
				if (current == 2)	// current is AI
				{
					move.score = getBest(1).score;
				}
				else // current is human player
				{
					move.score = getBest(2).score;
				}

				m.push(move);
				arr[i][j] = 0;	// changing board back to what it was
			}
		}
	}
	var bestM = 0;
	if (current == 2)
	{
		var bestScore = -100;
		for (var i = 0; i < m.length; i++)
		{
			if (m[i].score > bestScore)
			{
				bestM = i;
				bestScore = m[i].score;
			}
		}
	}
	else
	{
		var bestScore = 100;
		for (var i = 0; i < m.length; i++)
		{
			if (m[i].score < bestScore)
			{
				bestM = i;
				bestScore = m[i].score;
			}
		}
	}
	return m[bestM];
}
function AImakemove()
{
	var bestMove = getBest(2);
	arr[bestMove.x][bestMove.y] = 2;
	var i = bestMove.x;
	var j = bestMove.y;
	if (i == 0 && j == 0)
	{
		var x = document.getElementsByClassName("botleft");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 1 && j == 0)
	{
		var x = document.getElementsByClassName("botmid");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 2 && j == 0)
	{
		var x = document.getElementsByClassName("botright");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 0 && j == 1)
	{
		var x = document.getElementsByClassName("midleft");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 1 && j == 1)
	{
		var x = document.getElementsByClassName("midmid");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 2 && j == 1)
	{
		var x = document.getElementsByClassName("midright");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 0 && j == 2)
	{
		var x = document.getElementsByClassName("topleft");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 1 && j == 2)
	{
		var x = document.getElementsByClassName("topmid");
		x[0].children[0].src = "img/o.png";
	}
	else if (i == 2 && j == 2)
	{
		var x = document.getElementsByClassName("topright");
		x[0].children[0].src = "img/o.png";
	}
}
