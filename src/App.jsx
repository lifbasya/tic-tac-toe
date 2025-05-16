import { useState, useEffect } from "react";

// Mengecek pemenang dan mengembalikan simbol dan indeks kotak pemenang
const checkWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
    [0, 4, 8], [2, 4, 6],           // diagonal
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

// Komponen untuk menampilkan gambar X atau O
const Piece = ({ value }) => {
  if (value === "O") return <img src="./Ellipse.svg" alt="O" className="w-8" />;
  if (value === "X") return <img src="./silang.svg" alt="X" className="w-8" />;
  return null;
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = checkWinner(board);

  useEffect(() => {
    if (winner) {
      const winSound = new Audio("/win.mp3"); // Opsional
      winSound.play();
    }
  }, [winner]);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const getCellClass = (i) => {
    let base = "w-18 h-18 flex items-center justify-center text-3xl font-bold cursor-pointer border-gray-300 transition-all duration-100";
    if ([1, 4, 7].includes(i)) base += " border-l-2 border-r-2";
    if ([0, 1, 2, 3, 4, 5].includes(i)) base += " border-b-2";
    if (winner && winner.line.includes(i)) base += " bg-[#DAFAFF] animate-winner-pulse";
    return base;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-3xl font-bold mb-6">TicTacToe</h1>

      <div className="grid grid-cols-3 p-3 shadow-lg rounded-2xl">
        <div onClick={() => handleClick(0)} className={getCellClass(0)}><Piece value={board[0]} /></div>
        <div onClick={() => handleClick(1)} className={getCellClass(1)}><Piece value={board[1]} /></div>
        <div onClick={() => handleClick(2)} className={getCellClass(2)}><Piece value={board[2]} /></div>
        <div onClick={() => handleClick(3)} className={getCellClass(3)}><Piece value={board[3]} /></div>
        <div onClick={() => handleClick(4)} className={getCellClass(4)}><Piece value={board[4]} /></div>
        <div onClick={() => handleClick(5)} className={getCellClass(5)}><Piece value={board[5]} /></div>
        <div onClick={() => handleClick(6)} className={getCellClass(6)}><Piece value={board[6]} /></div>
        <div onClick={() => handleClick(7)} className={getCellClass(7)}><Piece value={board[7]} /></div>
        <div onClick={() => handleClick(8)} className={getCellClass(8)}><Piece value={board[8]} /></div>
      </div>

      {winner && (
  <div className="mt-6">
    <button
      onClick={resetGame}
      className="flex items-center border-2 border-cyan-500 text-cyan-500 px-4 py-2 rounded-full mt-4 hover:bg-cyan-100"
    >
      <img
        src={winner.player === "O" ? "./Ellipse.svg" : "./silang.svg"}
        alt={winner.player}
        className="w-4 mr-2"
      />
      <span className="font-bold text-black">Wins!</span>
    </button>
  </div>
)}

      {!winner && board.every(Boolean) && (
        <div className="mt-6">
          <button
            onClick={resetGame}
            className="border-2 border-gray-400 text-gray-500 px-4 py-2 rounded-full mt-4 hover:bg-gray-100"
          >
            Draw - Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;