const score = {
  wins: 0,
  losses: 0,
  ties: 0
};


function playGame(playerMove){
const computerMove = pickcomputerMove();
let result = '';

  if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
      result = 'Tie';
    }else if (computerMove === 'Paper'){
      result = 'Lose';
    }else {
      result = 'Win';
    }
  }else if (playerMove === 'Paper') {
    if (computerMove === 'Rock'){
      result = 'Win';
    }else if (computerMove === 'Paper'){
      result = 'Tie';
    }else {
      result = 'Lose';
    }
  }else if (playerMove === 'Scissors') {
    if (computerMove === 'Rock'){
      result = 'Lose';
    }else if (computerMove === 'Paper'){
      result = 'Win';
    }else {
      result = 'Tie';
    }
  }

  if(result === 'Tie'){
    score.ties += 1;
  }else if(result === 'Win'){
    score.wins += 1;
  }else if(result === 'Lose'){
    score.losses += 1;
  }
  alert(`You picked: ${playerMove} 
Computer picked: ${computerMove} 
Result: ${result}
Losses: ${score.losses}, Ties: ${score.ties}, Wins: ${score.wins}`);
}


function pickcomputerMove(){
    let computerMove = '';
    const randomNumber = Math.random()
    
    if (randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'Rock';
    }else if (randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'Paper';
    }else{
      computerMove = 'Scissors';
    }
    return computerMove;
}