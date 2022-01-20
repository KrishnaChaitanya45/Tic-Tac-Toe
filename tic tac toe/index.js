const Main = document.querySelector(".main"),
Computerbutton = document.querySelector(".computer");
Friendbutton = document.querySelector("#Friend");
BackButton = document.querySelector("#reset");
BackButtonfrd = document.querySelector("#resetfrd");
Com_Container = document.querySelector(".container");


Friendbutton.addEventListener("click" , () => {
Main.classList.add("fr");
});

BackButton.addEventListener("click" , () => {
Main.classList.remove("com");
});
BackButtonfrd.addEventListener("click" , () => {
Main.classList.remove("fr");
});
Computerbutton.addEventListener("click" , () => {
    Main.classList.add("com");
    });
    let origBoard;
    let huPlayer ='O';
    let aiPlayer = 'X';
    const winCombos =[
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [6, 4, 2],
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6]
    ];
    
    const cells = document.querySelectorAll('.cell');
    startGame();
    
    function selectSym(sym){
      huPlayer = sym;
      aiPlayer = sym==='O' ? 'X' :'O';
      origBoard = Array.from(Array(9).keys());
      for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', turnClick, false);
      }
      if (aiPlayer === 'X') {
        turn(bestSpot(),aiPlayer);
      }
      document.querySelector('.selectSym').style.display = "none";
    }
    
    function startGame() {
      document.querySelector('.endgame').style.display = "none";
      document.querySelector('.endgame .text').innerText ="";
      document.querySelector('.selectSym').style.display = "block";
      for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color');
      }
    }
    
    function turnClick(square) {
      if (typeof origBoard[square.target.id] ==='number') {
        turn(square.target.id, huPlayer);
        if (!checkWin(origBoard, huPlayer) && !checkTie())  
          turn(bestSpot(), aiPlayer);
      }
    }
    
    function turn(squareId, player) {
      origBoard[squareId] = player;
      document.getElementById(squareId).innerHTML = player;
      let gameWon = checkWin(origBoard, player);
      if (gameWon) gameOver(gameWon);
      checkTie();
    }
    
    function checkWin(board, player) {
      let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
      let gameWon = null;
      for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = {index: index, player: player};
          break;
        }
      }
      return gameWon;
    }
    
    function gameOver(gameWon){
      for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = 
          gameWon.player === huPlayer ? "blue" : "red";
      }
      for (let i=0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
      }
      declareWinner(gameWon.player === huPlayer ? "You win......!!!" : "You lost............     Wanna Try Again?"
       );
    }
    
    function declareWinner(who) {
      document.querySelector(".endgame").style.display = "block";
      document.querySelector(".endgame .text").innerText = who;
    }
    function emptySquares() {
      return origBoard.filter((elm, i) => i===elm);
    }
      
    function bestSpot(){
      return minimax(origBoard, aiPlayer).index;
    }
      
    function checkTie() {
      if (emptySquares().length === 0){
        for (cell of cells) {
          cell.style.backgroundColor = "rgb(255, 255, 123)";
          cell.removeEventListener('click',turnClick, false);
        }
        declareWinner(" Its Tie game....!");
        return true;
      } 
      return false;
    }
    
    function minimax(newBoard, player) {
      var availSpots = emptySquares(newBoard);
      
      if (checkWin(newBoard, huPlayer)) {
        return {score: -10};
      } else if (checkWin(newBoard, aiPlayer)) {
        return {score: 10};
      } else if (availSpots.length === 0) {
        return {score: 0};
      }
      
      var moves = [];
      for (let i = 0; i < availSpots.length; i ++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        
        if (player === aiPlayer)
          move.score = minimax(newBoard, huPlayer).score;
        else
           move.score =  minimax(newBoard, aiPlayer).score;
        newBoard[availSpots[i]] = move.index;
        if ((player === aiPlayer && move.score === 10) || (player === huPlayer && move.score === -10))
          return move;
        else 
          moves.push(move);
      }
      
      let bestMove, bestScore;
      if (player === aiPlayer) {
        bestScore = -1000;
        for(let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
          bestScore = 1000;
          for(let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      
      return moves[bestMove];
    }




// for friend
console.log("Welcome to Tic Tac Toe")
let music = new Audio("media/music1.mpeg");
let winmusic= new Audio("media/jeetgaye.mpeg");
let winvideo = document.querySelector(".video").getElementsByTagName('video');
let chance = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return chance === "X"? "0": "X"
}

// Function to check for a win
const jeetgaya = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
   

    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.frinfo').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
        winvideo.autoplay=true;
            document.querySelector(".video").getElementsByTagName('video')[0].style.width = "70vh";
        
            
        }
    })
}

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("fbox");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === ''){
            boxtext.innerText = chance;
            chance = changeTurn();
            music.play();
            jeetgaya();
            if (!isgameover){
                document.getElementsByClassName("frinfo")[0].innerText  = "Turn for " + chance;
            } 
        }
    })
})

// Add onclick listener to reset button
reset = document.querySelector(".reset")
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    chance = "X"; 
    isgameover = false;
    document.getElementsByClassName("frinfo")[0].innerText  = "Turn for " + chance;
    document.querySelector(".video").getElementsByTagName('video')[0].style.width = "0px"
})


 