export default function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return true;
    }
  }
  return null;
}

export function CheckDraw(squares) {
  for (var i = 0; i < squares.length; i++) {
    if (squares[i] === null) return false;
  }

  return true;
}

export function RandomMove(squares) {
  for (var i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return i;
    }
  }
  return null;
}

export function Minmax(squares, alpha, beta, Symbol, turn,depth) {
  if (CalculateWinner(squares)) {
    if (turn === false) {
      return 1;
    } else {
      return -1;
    }
  } else if (CheckDraw(squares)) {
    return 0;
  } else if (turn === true) {
    var maxval = -1000;
    var Bestmove=0;
    const symbol = nextsymbol(Symbol);
    for (var i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = Symbol;
        var val = Minmax(squares, alpha, beta, symbol, !turn,depth+1);
        squares[i] = null;
        if(maxval<val){
          maxval=val
          Bestmove=i

        }
        alpha = alpha < val ? val : alpha;
        if (beta <= alpha) {
          break;
        }
      }
    }
    if(depth===0){
      
      return Bestmove;
    }
    return maxval;
  } else {
    var minval = 1000;
    const symbol = nextsymbol(Symbol);
    for (var j = 0; j < squares.length; j++) {
      if (squares[j] === null) {
        squares[j] = Symbol;
        var val1 = Minmax(squares, alpha, beta, symbol, !turn,depth+1);
        squares[j] = null;
        minval = minval > val1 ? val1 : minval;
        beta = beta > val1 ? val1 : beta;
        if (beta <= alpha) {
          break;
        }
      }
    }
    return minval;
  }
}
function nextsymbol(symbol) {
  if (symbol === "X") {
    return "O";
  } else {
    return "X";
  }
}
