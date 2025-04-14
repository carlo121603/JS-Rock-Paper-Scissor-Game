const score = {
  wins: 0,
  losses: 0,
  ties: 0,
};


if (localStorage.getItem("rpsScore")) {
  const savedScore = JSON.parse(localStorage.getItem("rpsScore"));
  score.wins = savedScore.wins || 0;
  score.losses = savedScore.losses || 0;
  score.ties = savedScore.ties || 0;
  updateScoreDisplay();
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "Lose";
    } else {
      result = "Win";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "Win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else {
      result = "Lose";
    }
  } else if (playerMove === "Scissors") {
    if (computerMove === "Rock") {
      result = "Lose";
    } else if (computerMove === "Paper") {
      result = "Win";
    } else {
      result = "Tie";
    }
  }

  // Update score
  if (result === "Tie") {
    score.ties += 1;
  } else if (result === "Win") {
    score.wins += 1;
  } else if (result === "Lose") {
    score.losses += 1;
  }


  localStorage.setItem("rpsScore", JSON.stringify(score));


  updateScoreDisplay();
  addToHistory(playerMove, computerMove, result);

  showResult(playerMove, computerMove, result);
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    return "Rock";
  } else if (randomNumber < 2 / 3) {
    return "Paper";
  } else {
    return "Scissors";
  }
}

function resetScore() {
  Swal.fire({
    title: "Reset Score?",
    text: "Are you sure you want to reset your score?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, reset it!",
  }).then((result) => {
    if (result.isConfirmed) {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.setItem("rpsScore", JSON.stringify(score));
      updateScoreDisplay();
      document.getElementById("game-history").innerHTML = "";
      Swal.fire("Reset!", "Your score has been reset.", "success");
    }
  });
}

function updateScoreDisplay() {
  document.getElementById("wins").textContent = score.wins;
  document.getElementById("losses").textContent = score.losses;
  document.getElementById("ties").textContent = score.ties;
}

function addToHistory(playerMove, computerMove, result) {
  const historyElement = document.getElementById("game-history");
  const gameResult = document.createElement("div");
  gameResult.className = `history-item ${result.toLowerCase()}`;

  const playerIcon = getIcon(playerMove);
  const computerIcon = getIcon(computerMove);

  gameResult.innerHTML = `
    <span class="player-move">You: ${playerIcon}</span>
    <span class="vs">vs</span>
    <span class="computer-move">Computer: ${computerIcon}</span>
    <span class="result">${result}</span>
  `;

  historyElement.prepend(gameResult);
}

function getIcon(move) {
  switch (move) {
    case "Rock":
      return '<i class="fas fa-hand-rock"></i>';
    case "Paper":
      return '<i class="fas fa-hand-paper"></i>';
    case "Scissors":
      return '<i class="fas fa-hand-scissors"></i>';
    default:
      return move;
  }
}

function showResult(playerMove, computerMove, result) {
  let icon, title, color;

  if (result === "Win") {
    icon = "success";
    title = "You Win!";
    color = "#4CAF50";
  } else if (result === "Lose") {
    icon = "error";
    title = "You Lose!";
    color = "#F44336";
  } else {
    icon = "info";
    title = "It's a Tie!";
    color = "#2196F3";
  }

  const playerIcon = getIcon(playerMove);
  const computerIcon = getIcon(computerMove);

  Swal.fire({
    title: title,
    html: `
      <div class="swal-game-result">
        <div class="swal-player-move">
          <h3>You</h3>
          <div class="move-icon">${playerIcon}</div>
          <div>${playerMove}</div>
        </div>
        <div class="swal-vs">vs</div>
        <div class="swal-computer-move">
          <h3>Computer</h3>
          <div class="move-icon">${computerIcon}</div>
          <div>${computerMove}</div>
        </div>
      </div>
      <div class="swal-score">
        Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}
      </div>
    `,
    icon: icon,
    background: "#f8f9fa",
    confirmButtonColor: color,
    customClass: {
      popup: "swal-rps-popup",
    },
  });
}
