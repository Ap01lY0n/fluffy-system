document.addEventListener("DOMContentLoaded", () => {
    const questionElement = document.getElementById("question");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");
    const startButton = document.getElementById("start-game");

    const levelElement = document.getElementById("level");
    const xpElement = document.getElementById("xp");
    const healthElement = document.getElementById("health");

    let currentLevel = 1;
    let xp = 0;
    let health = 100;
    let currentAnswer = 0;

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = Math.random() > 0.5 ? "+" : "-";
        currentAnswer = operator === "+" ? num1 + num2 : num1 - num2;

        questionElement.textContent = `Solve: ${num1} ${operator} ${num2}`;
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value);
        if (userAnswer === currentAnswer) {
            xp += 10;
            if (xp >= currentLevel * 50) {
                currentLevel++;
                xp = 0;
                health += 20; // Reward health for leveling up
            }
            updateStats();
            generateQuestion();
        } else {
            health -= 10;
            if (health <= 0) {
                alert("Game Over! Try again.");
                resetGame();
            }
        }
        answerInput.value = "";
    }

    function updateStats() {
        levelElement.textContent = currentLevel;
        xpElement.textContent = xp;
        healthElement.textContent = health;
    }

    function resetGame() {
        currentLevel = 1;
        xp = 0;
        health = 100;
        updateStats();
        generateQuestion();
    }

    submitButton.addEventListener("click", checkAnswer);
    startButton.addEventListener("click", () => {
        resetGame();
        startButton.style.display = "none";
    });
});
