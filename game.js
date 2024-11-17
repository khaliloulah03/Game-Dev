let randomNumber, attempts, timer; 
const maxAttempts = 10; // Nombre maximum de tentatives
const maxTime = 30; // Temps imparti en secondes

const guessInput = document.getElementById("guessInput");
const submitGuess = document.getElementById("submitGuess");
const result = document.getElementById("result");
const attemptsDiv = document.getElementById("attempts");
const timeLeftDiv = document.getElementById("timeLeft");
const resetButton = document.getElementById("resetButton");

const startSound = new Audio('naruto.mp3'); // Son de démarrage
const loseSound = new Audio('akatsuki.mp3'); // Son de perte
const wrongGuessSound = new Audio('wrongGuessSound.mp3'); // Son pour mauvais guess

// Fonction pour arrêter le son spécifié
function stopSound(sound) {
    sound.pause(); // Stoppe le son en cours
    sound.currentTime = 0; // Réinitialise le son à zéro
}

// Fonction pour démarrer le jeu
function startGame() {
    stopSound(loseSound); // Arrête le son de perte lorsqu'un nouveau jeu commence
    startSound.play(); // Joue le son de démarrage

    submitGuess.disabled = false;
    guessInput.value = "";
    result.textContent = "";
    attempts = 0;
    attemptsDiv.textContent = `Tentatives restantes : ${maxAttempts}`;
    timeLeftDiv.textContent = maxTime; 

    randomNumber = Math.floor(Math.random() * 100) + 1; // Générer un nouveau nombre aléatoire
    startTimer();

    resetButton.style.display = "none"; // Cacher le bouton de réinitialisation
}

// Fonction pour démarrer le timer
function startTimer() {
    let timeLeft = maxTime;
    timeLeftDiv.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeLeftDiv.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            stopSound(startSound); // Arrête le son de démarrage
            loseSound.play(); // Joue le son de perte à la fin du temps
            result.textContent = "Temps écoulé ! Vous avez perdu.";
            submitGuess.disabled = true; // Désactive le bouton de soumission
            resetButton.style.display = "block"; 
        }
    }, 1000);
}

// Écouteur d'événements pour le bouton de soumission
submitGuess.addEventListener("click", () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess)) {
        result.textContent = "Veuillez entrer un nombre valide.";
        return;
    }

    if (userGuess < 1 || userGuess > 100) {
        result.textContent = "Veuillez deviner un nombre entre 1 et 100.";
        return;
    }

    attempts++;
    attemptsDiv.textContent = `Tentatives restantes : ${maxAttempts - attempts}`;

    if (userGuess === randomNumber) {
        clearInterval(timer);
        stopSound(loseSound); // Arrête le son de perte si l'utilisateur gagne
        stopSound(startSound); // Arrête aussi le son de démarrage
        result.textContent = "Bravo ! Vous avez deviné le bon nombre !";
        resetButton.style.display = "block"; 
        submitGuess.disabled = true; 
    } else if (attempts >= maxAttempts) {
        clearInterval(timer);
        stopSound(startSound); // Arrête le son de démarrage lorsque les tentatives sont épuisées
        loseSound.play(); // Joue le son de perte
        result.textContent = `Désolé, vous avez épuisé vos tentatives. Le nombre était ${randomNumber}.`;
        resetButton.style.display = "block"; 
        submitGuess.disabled = true; 
    } else {
        if (userGuess < randomNumber) {
            result.textContent = "Trop bas ! Essayez encore.";
        } else {
            result.textContent = "Trop haut ! Essayez encore.";
        }
        wrongGuessSound.play(); // Joue le son pour une mauvaise tentative
    }
});

// Écouteur d'événements pour le bouton de réinitialisation
resetButton.addEventListener("click", startGame);

// Démarrer le jeu lorsque la page est chargée
startGame();