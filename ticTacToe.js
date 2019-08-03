let one = document.getElementById('1');
let two = document.getElementById('2');
let three = document.getElementById('3');
let four = document.getElementById('4');
let five = document.getElementById('5');
let six = document.getElementById('6');
let seven = document.getElementById('7');
let eight = document.getElementById('8');
let nine = document.getElementById('9');
let h1 = document.getElementById('h1');
let btn1 = document.getElementById('btn1');
let btn2 = document.getElementById('btn2');

let board = [ one, two, three, four, five, six, seven, eight, nine ];

// WC stand for Winner Conditios
let WC = [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 3, 6 ], [ 1, 4, 7 ], [ 2, 5, 8 ], [ 0, 4, 8 ], [ 2, 4, 6 ] ];

let win = false;
let giliran = 1;
let move = 0;
let giliranCom = 2;

btn1.addEventListener('click', function() {
	btn1.classList.add('btn');
	btn2.classList.remove('btn');
	giliranCom = 2;
	giliran = 1;
	reset();
});

btn2.addEventListener('click', function() {
	btn2.classList.add('btn');
	btn1.classList.remove('btn');
	giliranCom = 1;
	giliran = 1;
	reset();
	botMove();
});

boardLogic();

function boardLogic() {
	for (let i = 0; i < board.length; i++) {
		board[i].addEventListener('click', function() {
			if (board[i].textContent === ' ' && win === false) {
				move++;
				if (giliran === 1) {
					board[i].textContent = '✗';
					board[i].style.color = '#7aabf5';
					h1.textContent = `it is ❍ turn`;
					giliran++;
				}
				else {
					board[i].textContent = '❍';
					board[i].style.color = '#f25050';
					h1.textContent = `it is ✗ turn`;
					giliran--;
				}
				winner(board, giliran);
				botMove();
				winner(board, giliran);
			}
		});
	}
}

function winner(board, giliran) {
	if (move > 4) {
		let winner = '';
		if (giliran === 2) {
			winner = '✗';
		}
		else {
			winner = '❍';
		}

		for (let i = 0; i < WC.length; i++) {
			if (
				board[WC[i][0]].textContent === board[WC[i][1]].textContent &&
				board[WC[i][1]].textContent === board[WC[i][2]].textContent &&
				board[WC[i][0]].textContent !== ' '
			) {
				win = true;
			}
		}

		if (win) {
			playAgain();
			return (h1.textContent = `player ${winner} win`);
		}
	}
	if (move >= 9) {
		playAgain();
		return (h1.textContent = `DRAW`);
	}
}

function reset() {
	for (let i = 0; i < board.length; i++) {
		board[i].textContent = ' ';
	}
	h1.textContent = `Tic Tac Toe`;
	win = false;
	btn1.textContent = `Player 1 '✗'`;
	btn2.textContent = `Player 2 '❍'`;
	move = 0;
}

function playAgain() {
	btn1.textContent = 'Play Again? as ✗';
	btn2.textContent = 'Play Again? as ❍';
}

function randomArr() {
	if (move < 9 && win === false) {
		let leng = board.length;

		let random = Math.floor(Math.random() * leng);

		if (board[random].textContent !== ' ') {
			return randomArr();
		}
		return random;
	}
}

function botMove() {
	if (move < 9 && win === false) {
		let text = '';
		let color = '';
		let random = randomArr();
		let head = '';
		giliranCom === 2 ? (text = '❍') : (text = '✗');
		giliranCom === 2 ? (head = '✗') : (head = '❍');
		giliranCom === 2 ? (color = '#f25050') : (color = '#7aabf5');

		h1.textContent = `it is ${head} turn`;
		board[random].textContent = text;
		board[random].style.color = color;

		// mengganti giliran dan menghitung move
		giliran === 2 ? (giliran = 1) : (giliran = 2);
		move++;
	}
}
