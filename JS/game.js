var user = 1;
var clicks = 0;

P1Name = 'X';
P2Name = 'Y';
P1NFame = 'X';
P2FName = 'Y';
P1Color = 'red';
P2Color = 'silver';
P1Icon = 'images/p11.png';
P2Icon = 'images/p21.png';

P1Won = 0;
P2Won = 0;


P1 = "<img border=0 width=100 height=100 style='background-color: red;' src='p11.png'/>";
P2 = "<img border=0 width=100 height=100 style='background-color: silver;' src='p21.png'/>";


var Result = new Array();
Result[0] = new Array(0, 0, 0);
Result[1] = new Array(0, 0, 0);
Result[2] = new Array(0, 0, 0);
var complete = 0;

function replayGame() {
    user = 1;
    clicks = 0;


    Result[0] = new Array(0, 0, 0);
    Result[1] = new Array(0, 0, 0);
    Result[2] = new Array(0, 0, 0);
    complete = 0;

    document.getElementById('00').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('01').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('02').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('20').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('21').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('22').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('10').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('11').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';
    document.getElementById('12').innerHTML = '<img width=100 height=100 border=0 src="images/blank.png" />';


    document.getElementById("scorePlayer1").innerHTML = P1Name + ' ' + P1FName + 'Won ' + P1Won + ' Game!';
    document.getElementById("scorePlayer2").innerHTML = P2Name + ' ' + P2FName + 'Won ' + P2Won + ' Game!';

    document.getElementById("turn").innerHTML = "<font color=White size=5><B>" + P1Name + " to play</B></font>";

    //    location.reload();
}

function startGame() {
    var firstPlayerColor = document.getElementsByName('firstPlayerColor');
    P1Color;
    for (var i = 0; i < firstPlayerColor.length; i++) {
        if (firstPlayerColor[i].checked) {
            P1Color = firstPlayerColor[i].value;
        }
    }

    var secondPlayerColor = document.getElementsByName('secondPlayerColor');
    P2Color;
    for (var i = 0; i < secondPlayerColor.length; i++) {
        if (secondPlayerColor[i].checked) {
            P2Color = secondPlayerColor[i].value;
        }
    }

    var firstPlayerIcon = document.getElementsByName('firstPlayerIcon');
    P1Icon;
    for (var i = 0; i < firstPlayerIcon.length; i++) {
        if (firstPlayerIcon[i].checked) {
            P1Icon = "images/" + firstPlayerIcon[i].value;
        }
    }


    var secondPlayerIcon = document.getElementsByName('secondPlayerIcon');
    P2Icon;
    for (var i = 0; i < secondPlayerIcon.length; i++) {
        if (secondPlayerIcon[i].checked) {
            P2Icon = "images/" + secondPlayerIcon[i].value;
        }
    }


    P1Name = document.getElementById('firstPlayerName').value;
    P2Name = document.getElementById('secondPlayerName').value;

    P1FName = document.getElementById('firstPlayerName2').value;
    P2FName = document.getElementById('secondPlayerName2').value;

    if (P1Name == null || P1Name == "")
        P1Name = 'X';


    if (P2Name == null || P2Name == "")
        P2Name = 'Y';


    if (P1FName == null || P1FName == "")
        P1Name = 'X';


    if (P2FName == null || P2FName == "")
        P2Name = 'Y';

    P1 = "<img border=0 width=100 height=100 style='background-color:" + P1Color + ";' src='" + P1Icon + "'/>";
    P2 = "<img border=0 width=100 height=100 style='background-color:" + P2Color + ";' src='" + P2Icon + "'/>";


    document.getElementById("player1name").innerHTML = P1Name + ' ' + P1FName;
    document.getElementById("player2name").innerHTML = P2Name + ' ' + P2FName;

    document.getElementById("scorePlayer1").innerHTML = P1Name + ' ' + P1FName + 'Won ' + P1Won + ' Game!';
    document.getElementById("scorePlayer2").innerHTML = P2Name + ' ' + P2FName + 'Won ' + P2Won + ' Game!';


    document.getElementById("player1icon").src = P1Icon;
    document.getElementById("player1icon").style.backgroundColor = P1Color
    document.getElementById("player2icon").src = P2Icon;
    document.getElementById("player2icon").style.backgroundColor = P2Color

    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("setupContainer").style.display = "none";
    document.getElementById("scoreContainer").style.display = "block";

    document.getElementById("playAgain").style.display = "none";

    document.getElementById("turn").innerHTML = "<font color=White size=5><B>" + P1Name + " to play</B></font>";

}

function play(cell) {
    if (complete == 1) {
        return 0;
    }
    var row = cell.id[0];
    var col = cell.id[1];

    if (cell.innerHTML.search("blank.png") < 0) {
        alert("Sorry not allowed!");
        return 0;
    }

    clicks++;

    if (user == 1) {
        cell.innerHTML = P1;
        user = 2;
        Result[row][col] = 1;
        document.getElementById("turn").innerHTML = "<font color=White size=5><B>" + P2Name + " to play</B></font>";
    } else {
        cell.innerHTML = P2;
        user = 1;
        Result[row][col] = 2;
        document.getElementById("turn").innerHTML = "<font color=White size=5><B>" + P1Name + " to play</B></font>";
    }
    var finish = checkForWin();
    var winnerName = '';
    if (finish == 1) {
        winnerName = P1Name;
        P1Won++;

        document.getElementById("scorePlayer1").innerHTML = P1Name + ' ' + P1FName + 'Won ' + P1Won + ' Game!';
        document.getElementById("scorePlayer2").innerHTML = P2Name + ' ' + P2FName + 'Won ' + P2Won + ' Game!';
    }
    else if (finish == 2) {
        winnerName = P2Name;
        P2Won++;

        document.getElementById("scorePlayer1").innerHTML = P1Name + ' ' + P1FName + 'Won ' + P1Won + ' Game!';
        document.getElementById("scorePlayer2").innerHTML = P2Name + ' ' + P2FName + 'Won ' + P2Won + ' Game!';
    }
    if (finish != 0) {
        alert(winnerName + " won!");
        document.getElementById("turn").innerHTML = "<font color=White size=5><B>" + winnerName + " won!</B></font>";
        complete = 1;
        document.getElementById("playAgain").style.display = "block";
        if (P1Won >= 3) {
            document.getElementById("finalScore").innerHTML = P1Name + ' ' + P1FName + ' Won Game!';
            alert(P1Name + ' ' + P1FName + ' Won Game! Click Ok to play again');
            location.reload();
        } else if (P2Won >= 3) {
            document.getElementById("finalScore").innerHTML = P2Name + ' ' + P2FName + ' Won Game!';
            alert(P2Name + ' ' + P2FName + ' Won Game!  Click Ok to play again');
            location.reload();

        }
    } else if (clicks == 9) {
        alert("It's a TIE !!!");
        document.getElementById("turn").innerHTML = "<font color=White size=5><B>It's a Tie !!! Please Play once more</B></font>";
        complete = 1;

        document.getElementById("playAgain").style.display = "block";
    }
}

function checkForWin() {
    var winner = 0;
    if (Result[0][0] != 0 && Result[0][0] == Result[0][1] && Result[0][1] == Result[0][2])
        winner = Result[0][0];
    else if (Result[2][0] != 0 && Result[2][0] == Result[2][1] && Result[2][1] == Result[2][2])
        winner = Result[2][0];
    else if (Result[1][0] != 0 && Result[1][0] == Result[1][1] && Result[1][1] == Result[1][2])
        winner = Result[1][0];
    else if (Result[0][2] != 0 && Result[0][2] == Result[1][1] && Result[1][1] == Result[2][0])
        winner = Result[0][2];
    else if (Result[0][0] != 0 && Result[0][0] == Result[1][0] && Result[1][0] == Result[2][0])
        winner = Result[0][0];
    else if (Result[0][1] != 0 && Result[0][1] == Result[1][1] && Result[1][1] == Result[2][1])
        winner = Result[0][1];
    else if (Result[0][2] != 0 && Result[0][2] == Result[1][2] && Result[1][2] == Result[2][2])
        winner = Result[0][2];
    else if (Result[0][0] != 0 && Result[0][0] == Result[1][1] && Result[1][1] == Result[2][2])
        winner = Result[0][0];

    return winner;
}