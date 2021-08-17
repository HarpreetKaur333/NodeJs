var player1 = {
	icon: '',
	name: '',
	style: 'player1_cell',
	score_el: 'player1_wins',
	wins: 0
};

var player2 = {
	icon: '',
	name: '',
	style: 'player2_cell',
	score_el: 'player2_wins',
	wins: 0
};
var players = [];
var current_player = 0;
var num_of_cols = num_of_rows = 3;

$(function () {
	$.expr[":"].mod = function (el, i, m) {
		return i % m[3] === 0
	};
	$.expr[":"].sub_mod = function (el, i, m) {
		var params = m[3].split(",");
		return (i - params[0]) % params[1] === 0
	};

	initForm();
});

function initForm() {
	$("#frm").submit(function (e) {
		e.preventDefault();
		$("#btnStart").hide();
		startGame();
	});
}


function getIcon(icon, color) {
	var str = '';
	switch (icon) {
		case "1":
			str = '<i class="fa fa-plus ' + color + '"></i>';
			break;
		case "2":
			str = '<i class="fa fa-check ' + color + '"></i>';
			break;
		case "3":
			str = '<i class="fa fa-pen ' + color + '"></i>';
			break;
		case "4":
			str = '<i class="fa fa-bug ' + color + '"></i>';
			break;
		case "5":
			str = '<i class="fa fa-times ' + color + '"></i>';
			break;
		case "6":
			str = '<i class="fa fa-bus ' + color + '"></i>';
			break;
		default:
			break;
	}

	return str;
};

function startGame() {
	$("#game").show();
	player1 = {
		icon: getIcon($("#player1Icon:checked").val(), $("#player1Color").val()),
		name: $("#player1Name").val(),
		style: 'player1_cell',
		score_el: 'player1_wins',
		wins: 0
	};

	player2 = {
		icon: getIcon($("#player2Icon:checked").val(), $("#player2Color").val()),
		name: $("#player2Name").val(),
		style: 'player2_cell',
		score_el: 'player2_wins',
		wins: 0
	};
	players = [player1, player2];

	$("#restart_game").bind("click", restartGame);

	initGame();
}

function initGame() {
	$("#game_map").empty();
	for (var i = 0; i < num_of_cols * num_of_rows; ++i) {
		var cell = $("<div></div>")
			.addClass("cell")
			.appendTo("#game_map");
		// Add the line breaks
		if (i % num_of_cols === 0) {
			cell.before('<div class="clear"></div>');
		}

	}

	$("#game_map .cell")
		.bind("click", playMove)
		.bind('mouseover', hoverCell)
		.bind('mouseout', leaveCell);

	initTurn(current_player);
};

function disableGame(ev) {
	$("#game_map .cell")
		.unbind("click")
		.unbind("mouseover")
		.unbind("mouseout");
};

function restartGame(ev) {
	ev.preventDefault();
	$(".end_game").hide();
	current_player = 0;
	initGame();
	return false;
}

function playMove(ev) {
	var cell = $(this);
	cell
		.addClass(players[current_player].style)
		.addClass("marked")
		.html(players[current_player].icon)
		.trigger("mouseout")
		.unbind("click mouseover mouseout");

	if (!process()) {
		current_player = (++current_player) % players.length;
		initTurn(current_player);
	}
	return false;
};

function initTurn() {
	$("#player_name").html(players[current_player].name);
	$("#player_mark").html(players[current_player].icon);
};

function hoverCell(ev) {
	$(this).addClass("hover");
	return false;
};

function leaveCell(ev) {
	$(this).removeClass("hover");
	return false;
};

function process() {
	var current_class = players[current_player].style;
	var marked_cells = $("#game_map ." + current_class);
	var win = false;
	if (marked_cells.length >= num_of_cols) {
		/* Check the rows */
		var cells = $("#game_map .cell");
		var cells_inspected = {};
		for (var row = 1; row <= num_of_rows && !win; ++row) {
			cells_inspected = cells
				.filter(":lt(" + num_of_cols * row + ")")
				.filter(":eq(" + (num_of_cols * (row - 1)) + "),:gt(" + (num_of_cols * (row - 1)) + ")")
				.filter("." + current_class);
			if (cells_inspected.length == num_of_cols) win = true;
		}
		/* Check the cols */
		for (var col = 0; col <= num_of_cols && !win; ++col) {
			cells_inspected = cells
				.filter(":sub_mod(" + col + "," + num_of_rows + ")")
				.filter("." + current_class);

			if (cells_inspected.length == num_of_rows) win = true;
		}
		if (!win) {
			cells_inspected = cells
				.filter(":mod(" + (num_of_rows + 1) + ")")
				.filter("." + current_class);
			if (cells_inspected.length == num_of_rows) win = true;
			else {
				// From right down to left up
				cells_inspected = cells
					.filter(":mod(" + (num_of_rows - 1) + "):not(:last,:first)")
					.filter("." + current_class);
				if (cells_inspected.length == num_of_rows) win = true;
			}
		}
	}

	if (win) {
		disableGame();
		cells_inspected.addClass("win");
		++players[current_player].wins;
		$("#winner #winner_name").text(players[current_player].name);
		$("#" + players[current_player].score_el).text(players[current_player].wins);
		$(".end_game").show();

		if (players[current_player].wins == 3) {
			$("#winner #winner_name").text(players[current_player].name + " Won 3 Game");
			$("#ask_restart").hide();
		}
	} else {
		if ($("#game_map .marked").length == num_of_rows * num_of_cols) $("#ask_restart").show();
	}
	return win;
};

