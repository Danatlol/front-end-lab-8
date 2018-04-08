const TOKENS_ROWS = 16;
const TOKENS_COLS = 16;

function Game(rows, cols) {

    const ROWS = rows;
    const COLS = cols;

    const EMPTY_SIGN = 0;
    const WHITE_SIGN = 1;
    const BLACK_SIGN = -1;

    let _field = new Array(ROWS);
    for (let i = 0; i < ROWS; ++i) {
        _field[i] = new Array(COLS);
    }

    let _isPlaying = false;
    Object.defineProperty(this, "isPlaying", {
        get: function () {
            return _isPlaying;
        }
    });

    let _winner = EMPTY_SIGN;
    Object.defineProperty(this, "winner", {
        get: function () {
            return _winner;
        }
    });

    let _winnerTokens = [];
    Object.defineProperty(this, "winnerTokens", {
        get: function () {
            return _winnerTokens;
        }
    });

    let _whichTurn = EMPTY_SIGN;
    Object.defineProperty(this, "whichTurn", {
        get: function () {
            if (_whichTurn === WHITE_SIGN) {
                return "white";
            }
            else if (_whichTurn === BLACK_SIGN) {
                return "black";
            }
            else {
                return false;
            }
        }
    });


    // public methods (interface)
    this.newGame = function (turn = WHITE_SIGN) {
        _resetField();
        _isPlaying = true;
        _whichTurn = turn;
        _winner = EMPTY_SIGN;
        _winnerTokens = [];
    };

    this.makeTurn = function (point) {
        if (!_isPlaying || _getCellSafety(point.row, point.col) !== EMPTY_SIGN) {
            return false;
        }
        _field[point.row][point.col] = _whichTurn;
        _switchTurn();
        _checkForWinner(point);
        return true;
    };

    // private methods
    function _switchTurn() {
        _whichTurn = (_whichTurn === WHITE_SIGN) ? BLACK_SIGN : WHITE_SIGN;
    }

    function _resetField() {
        for (let i = 0; i < ROWS; ++i) {
            for (let j = 0; j < COLS; ++j) {
                _field[i][j] = EMPTY_SIGN;
            }
        }
    }

    function _getHorizontalSameTokensArray(point) {
        let tokens = [];
        let tokenType = _getCellSafety(point.row, point.col);
        let currentInd = point.col;

        while (_getCellSafety(point.row, currentInd - 1) === tokenType) {
            --currentInd;
        }
        tokens.push({ row: point.row, col: currentInd });
        while (_getCellSafety(point.row, currentInd + 1) === tokenType) {
            ++currentInd;
            tokens.push({ row: point.row, col: currentInd });
        }
        return tokens;
    }

    function _getVerticalSameTokensArray(point) {
        let tokens = [];
        let tokenType = _getCellSafety(point.row, point.col);
        let currentInd = point.row;

        while (_getCellSafety(currentInd - 1, point.col) === tokenType) {
            --currentInd;
        }
        tokens.push({ row: currentInd, col: point.col });
        while (_getCellSafety(currentInd + 1, point.col) === tokenType) {
            ++currentInd;
            tokens.push({ row: currentInd, col: point.col });
        }
        return tokens;
    }

    function _getLeftTopSameTokensArray(point) {
        let tokens = [];
        let tokenType = _getCellSafety(point.row, point.col);
        let currentIndRow = point.row;
        let currentIndCol = point.col;

        while (_getCellSafety(currentIndRow - 1, currentIndCol - 1) === tokenType) {
            --currentIndRow;
            --currentIndCol;
        }
        tokens.push({ row: currentIndRow, col: currentIndCol });
        while (_getCellSafety(currentIndRow + 1, currentIndCol + 1) === tokenType) {
            ++currentIndRow;
            ++currentIndCol;
            tokens.push({ row: currentIndRow, col: currentIndCol });
        }
        return tokens;
    }

    function _getRightTopSameTokensArray(point) {
        let tokens = [];
        let tokenType = _getCellSafety(point.row, point.col);
        let currentIndRow = point.row;
        let currentIndCol = point.col;

        while (_getCellSafety(currentIndRow + 1, currentIndCol - 1) === tokenType) {
            ++currentIndRow;
            --currentIndCol;
        }
        tokens.push({ row: currentIndRow, col: currentIndCol });
        while (_getCellSafety(currentIndRow - 1, currentIndCol + 1) === tokenType) {
            --currentIndRow;
            ++currentIndCol;
            tokens.push({ row: currentIndRow, col: currentIndCol });
        }
        return tokens;
    }

    function _checkForWinner(point) {
        let tokens;

        // horizontal
        tokens = _getHorizontalSameTokensArray(point);
        _pushToWinnerTokenArray(tokens);

        // vertical
        tokens = _getVerticalSameTokensArray(point);
        _pushToWinnerTokenArray(tokens);

        // Right-Top(North-East)
        tokens = _getRightTopSameTokensArray(point);
        _pushToWinnerTokenArray(tokens);

        // Left-Top(North-West)
        tokens = _getLeftTopSameTokensArray(point);
        _pushToWinnerTokenArray(tokens);

        _filterWinnerTokensArray(point);
    }

    function _getCellSafety(row, col) {
        return _field[row] && _field[row][col];
    }

    function _pushToWinnerTokenArray(tokens) {
        if (tokens.length >= 4) {
            _winnerTokens = _winnerTokens.concat(tokens);
        }
    }

    // filter center element that repeat in array
    function _filterWinnerTokensArray(point) {
        if (_winnerTokens.length >= 4) {
            let canDelete = false;
            _winnerTokens = _winnerTokens.filter(function (el, ind) {
                if (el.row === point.row && el.col === point.col) {
                    if (canDelete) {
                        return false;
                    }
                    else {
                        canDelete = true;
                        return true;
                    }
                }
                return true;
            });
            _isPlaying = false;
            _winner = _getCellSafety(point.row, point.col);
        }
    }

}


// sizes of field(background)
const CELL_SIDE = 30;
const CELL_GAP = 2;
const FIELD_BORDER_WIDTH = CELL_SIDE / 2;
const CELL_SIDE_QUANTITY = 15;
const FIELD_SIDE = FIELD_BORDER_WIDTH * 2 + CELL_SIDE_QUANTITY * CELL_SIDE + (CELL_SIDE_QUANTITY + 1) * CELL_GAP;
const CELL_SIZE = CELL_SIDE + CELL_GAP;


// create game logic object
let gameBoard = new Game(TOKENS_ROWS, TOKENS_COLS);



// generating game field
let gameField = $("#gameField");
let wrapper = $(".wrapper");
let cells = $(".cells-container");
let mouseHandler = $(".mouse-handler");
let newGameBtn = $("#newGameBtn");
let outputWinner = $("#outputWinner").text('Press "New game" to play...');

gameField.width(FIELD_SIDE).height(FIELD_SIDE);

cells.height(FIELD_SIDE - FIELD_BORDER_WIDTH * 2);
cells.width(FIELD_SIDE - FIELD_BORDER_WIDTH * 2);
cells.css({ top: FIELD_BORDER_WIDTH, left: FIELD_BORDER_WIDTH });

let allTokensOnField = new Array(TOKENS_ROWS);
for (let i = 0; i < TOKENS_ROWS; ++i) {
    allTokensOnField[i] = new Array(TOKENS_COLS);
}

let token;
for (let i = 0; i < CELL_SIDE_QUANTITY; ++i) {
    for (let j = 0; j < CELL_SIDE_QUANTITY; ++j) {
        token = $("<div>").addClass("cell").width(CELL_SIDE).height(CELL_SIDE);
        token.css({ top: CELL_GAP + (i * (CELL_GAP + CELL_SIDE)), left: CELL_GAP + (j * (CELL_GAP + CELL_SIDE)) });
        cells.append(token);
    }
}


mouseHandler.height(FIELD_SIDE).width(FIELD_SIDE);
mouseHandler.on("click", function (eve) {
    let offsetX = (eve.offsetX === undefined) ? eve.layerX : eve.offsetX;
    let offsetY = (eve.offsetY === undefined) ? eve.layerY : eve.offsetY;

    let row = Math.trunc(offsetY / CELL_SIZE);
    let col = Math.trunc(offsetX / CELL_SIZE);

    if (gameBoard.makeTurn({ row: row, col: col })) {
        let token = $("<div>").addClass("token");
        token.addClass((gameBoard.whichTurn === "white") ? "token-white" : "token-black");
        token.height(CELL_SIZE - CELL_GAP).width(CELL_SIZE - CELL_GAP);
        token.css({ top: (CELL_SIZE * row + CELL_GAP / 2), left: (CELL_SIZE * col + CELL_GAP / 2) });
        gameField.append(token);
        token.addClass("token-appear");
        allTokensOnField[row][col] = token;
        if (!gameBoard.isPlaying) {
            gameBoard.winnerTokens.forEach(function (el) {
                allTokensOnField[el.row][el.col].removeClass("token-appear");
                allTokensOnField[el.row][el.col].addClass("token-win");
            });
            outputWinner.text((`The winner is ${gameBoard.whichTurn}!!! Congratulation!!!`).toUpperCase());
        }
    }

});


newGameBtn.on("click", function (eve) {
    outputWinner.text("Game is started!!! ");
    gameBoard.newGame();
    $("#gameField .token").remove();
});

