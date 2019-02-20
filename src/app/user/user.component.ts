import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  
  PLAYER_FIRST = { name: 'First Player', symbol: 'x' };
  PLAYER_SECOND = { name: 'Second Player', symbol: 'o' };
  DRAW = { name: 'Draw' };

  board: any[];
  currentPlayer = this.PLAYER_FIRST;
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;
  pairing: boolean;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  square_click(square) {
    if(square.value === '' && !this.gameOver) { 
      if(this.pairing == true){
        square.value = this.PLAYER_SECOND.symbol; 
        this.pairing = false;
        console.log(this.PLAYER_SECOND.symbol);
        this.completeMove(this.PLAYER_SECOND);
      } 
      else{
       square.value = this.PLAYER_FIRST.symbol; 
       this.pairing = true;
       console.log(this.PLAYER_FIRST.symbol);
      this.completeMove(this.PLAYER_FIRST);       
      } 
    }
  }

  completeMove(player) {
    if(this.isWinner(player.symbol))
      this.showGameOver(player);
    else if(!this.availableSquaresExist())
      this.showGameOver(this.DRAW);
    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_FIRST ? this.PLAYER_SECOND : this.PLAYER_FIRST);
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  getRandomAvailableSquare(): any {
    let availableSquares = this.board.filter(s => s.value === '');
    var squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if(winner !== this.DRAW)
      this.currentPlayer = winner;  
  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol): boolean {
    for(let pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if(foundWinner) {
        for(let index of pattern) {
          this.board[index].winner = true;
        }

        return true;
      }
    }

    return false;
  }

  newGame() {
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];

    this.gameOver = false;
    this.boardLocked = false;

  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}
