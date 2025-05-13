const supabaseUrl = 'https://mjhxbayrxovgvudosbit.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qaHhiYXlyeG92Z3Z1ZG9zYml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMzIyNTAsImV4cCI6MjA2MjcwODI1MH0.inSySxoP7402gYbLnzOFokOhXLVKq19P-ofrB3OLnKg';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
// Word list with translations
const words = [
    { english: 'each', hebrew: 'כל (אחד)', image: 'https://picsum.photos/200/200?random=1' },
    { english: 'everyone', hebrew: 'כולם', image: 'https://picsum.photos/200/200?random=2' },
    { english: 'fall', hebrew: 'ליפול', image: 'https://picsum.photos/200/200?random=3' },
    { english: 'flag', hebrew: 'דגל', image: 'https://picsum.photos/200/200?random=4' },
    { english: 'guess', hebrew: 'לנחש', image: 'https://picsum.photos/200/200?random=5' },
    { english: 'kind of', hebrew: 'סוג של', image: 'https://picsum.photos/200/200?random=6' },
    { english: 'many', hebrew: 'הרבה', image: 'https://picsum.photos/200/200?random=7' },
    { english: 'outside', hebrew: 'בחוץ', image: 'https://picsum.photos/200/200?random=8' },
    { english: 'parents', hebrew: 'הורים', image: 'https://picsum.photos/200/200?random=9' },
    { english: 'pull', hebrew: 'למשוך', image: 'https://picsum.photos/200/200?random=10' },
    { english: 'spook', hebrew: 'כדי להפחיד', image: 'https://picsum.photos/200/200?random=11' },
    { english: 'weekend', hebrew: 'סוף שבוע', image: 'https://picsum.photos/200/200?random=12' }
];

// Current user
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    
    // Initialize user select
    const userSelect = document.getElementById('userSelect');
    userSelect.addEventListener('change', handleUserChange);
    
    // Initialize game buttons
    const gameButtons = document.querySelectorAll('.game-btn');
    console.log('Found game buttons:', gameButtons.length);
    
    gameButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Game button clicked:', button.getAttribute('data-game'));
            const gameType = button.getAttribute('data-game');
            startGame(gameType);
        });
    });
    
    // Initialize close instructions button
    const closeInstructionsBtn = document.querySelector('.close-instructions');
    if (closeInstructionsBtn) {
        closeInstructionsBtn.addEventListener('click', () => {
            document.getElementById('gameInstructions').style.display = 'none';
        });
    }
    
    // Display initial word cards
    displayWordCards();
    setupVocabBtn();
    restoreUser();
});

// Display word cards
function displayWordCards() {
    const wordCardsContainer = document.querySelector('.word-cards');
    if (!wordCardsContainer) return;
    
    wordCardsContainer.innerHTML = '';
    words.forEach(word => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.innerHTML = `
            <img src="${word.image}" alt="${word.english}">
            <div class="english">${word.english}</div>
            <div class="hebrew">${word.hebrew}</div>
        `;
        wordCardsContainer.appendChild(card);
    });
}

// Handle user change
function handleUserChange(event) {
    currentUser = event.target.value;
    console.log('User selected:', currentUser);
    if (currentUser) {
        localStorage.setItem('currentUser', currentUser);
        loadUserProgress();
        showChildInfo();
    } else {
        showChildInfo();
    }
}

// Show loading indicator
function showLoading() {
    document.getElementById('loadingIndicator').style.display = 'flex';
}

// Hide loading indicator
function hideLoading() {
    document.getElementById('loadingIndicator').style.display = 'none';
}

// Show game instructions
function showInstructions(gameType) {
    const instructions = {
        memory: `
            <p>ברוכים הבאים למשחק הזיכרון!</p>
            <p>1. לחץ על כרטיס כדי להפוך אותו</p>
            <p>2. נסה למצוא זוגות תואמים</p>
            <p>3. זכור את מיקום הכרטיסים</p>
            <p>4. נסה לסיים עם הכי פחות ניסיונות</p>
        `,
        matching: `
            <p>ברוכים הבאים למשחק ההתאמה!</p>
            <p>1. יש לך 60 שניות למצוא את כל ההתאמות</p>
            <p>2. לחץ על מילה באנגלית ומילה בעברית</p>
            <p>3. אם ההתאמה נכונה, תקבל 10 נקודות</p>
            <p>4. נקודות בונוס על זמן נותר</p>
        `,
        quiz: `
            <p>ברוכים הבאים לחידון!</p>
            <p>1. יש 10 שאלות בסך הכל</p>
            <p>2. בחר את התרגום הנכון לעברית</p>
            <p>3. תקבל 10 נקודות על כל תשובה נכונה</p>
            <p>4. נסה לקבל את הניקוד הגבוה ביותר!</p>
        `
    };

    document.getElementById('instructionsText').innerHTML = instructions[gameType];
    document.getElementById('gameInstructions').style.display = 'flex';
}

// Update game start functions to show instructions
function startGame(gameType) {
    if (!currentUser) {
        alert('אנא בחר ילד תחילה');
        return;
    }
    showChildInfo();
    // Show instructions first
    showInstructions(gameType);
    // Add event listener to start button in instructions
    document.querySelector('.close-instructions').addEventListener('click', () => {
        document.getElementById('gameInstructions').style.display = 'none';
        // Start the selected game after closing instructions
        showChildInfo();
        switch (gameType) {
            case 'memory':
                startMemoryGame();
                break;
            case 'matching':
                startMatchingGame();
                break;
            case 'quiz':
                startQuizGame();
                break;
        }
    });
}

// Update loadUserProgress to show loading
async function loadUserProgress() {
    showLoading();
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_name', currentUser)
            .single();

        if (error) throw error;
        
        if (data) {
            console.log('User progress loaded:', data);
        }
    } catch (error) {
        console.error('Error loading user progress:', error);
    } finally {
        hideLoading();
    }
}

// Update saveGameScore to show loading
async function saveGameScore(gameType, score) {
    if (!currentUser) return;

    showLoading();
    try {
        const { data, error } = await supabase
            .from('game_scores')
            .insert({
                user_name: currentUser,
                game_type: gameType,
                score: score
            });

        if (error) throw error;
        console.log('Score saved successfully');
    } catch (error) {
        console.error('Error saving score:', error);
    } finally {
        hideLoading();
    }
}

// Helper to get child image path
function getChildImageAndName() {
    let imgFile = '';
    let name = currentUser || '';
    if (currentUser) {
        if (currentUser.includes('חירות')) imgFile = 'images/harut.jpg';
        else if (currentUser.includes('יאיר')) imgFile = 'images/yair.jpg';
        else if (currentUser.includes('רות')) imgFile = 'images/rut.jpg';
    }
    return { imgFile, name };
}

// Helper to get cumulative score (placeholder, should fetch from backend)
function getCumulativeScore() {
    // TODO: fetch from backend
    return 0;
}

// Insert child info bar at the top of a container
function insertChildInfoBar(container) {
    const { imgFile, name } = getChildImageAndName();
    const score = getCumulativeScore();
    const infoBar = document.createElement('div');
    infoBar.className = 'game-child-info';
    infoBar.innerHTML = `
        <img src="${imgFile}" alt="${name}" class="child-image">
        <span class="child-name">${name}</span>
        <span class="child-score">ציון מצטבר: ${score}</span>
    `;
    container.prepend(infoBar);
}

// Helper to make game title clickable
function makeGameTitleHomeClickable() {
    const h2 = document.querySelector('.game-container h2');
    if (h2) {
        h2.style.cursor = 'pointer';
        h2.title = 'חזרה לדף הבית';
        h2.onclick = () => window.location.href = 'index.html';
    }
}

// Memory Game Implementation
function startMemoryGame() {
    // Clear the game container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = `
        <div class="memory-game">
            <div class="memory-header">
                <h2>משחק הזיכרון</h2>
                <div class="memory-stats">
                    <span>ניסיונות: <span id="attempts">0</span></span>
                    <span>זוגות שנמצאו: <span id="pairs">0</span></span>
                </div>
            </div>
            <div class="memory-cards"></div>
        </div>
    `;
    insertChildInfoBar(gameContainer);
    makeGameTitleHomeClickable();

    // Create memory cards
    const memoryCards = document.querySelector('.memory-cards');
    const selectedWords = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    const memoryWords = [...selectedWords, ...selectedWords]
        .sort(() => Math.random() - 0.5);

    memoryWords.forEach((word, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.word = word.english;
        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">
                    <img src="${word.image}" alt="${word.english}">
                    <div class="memory-word">${word.english}</div>
                    <div class="memory-translation">${word.hebrew}</div>
                </div>
            </div>
        `;
        memoryCards.appendChild(card);
    });

    // Add memory game styles
    const style = document.createElement('style');
    style.textContent = `
        .memory-game {
            padding: 20px;
        }
        .memory-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .memory-stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 10px;
        }
        .memory-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            max-width: 800px;
            margin: 0 auto;
        }
        .memory-card {
            aspect-ratio: 1;
            perspective: 1000px;
            cursor: pointer;
        }
        .memory-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
        }
        .memory-card.flipped .memory-card-inner {
            transform: rotateY(180deg);
        }
        .memory-card-front,
        .memory-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px;
        }
        .memory-card-front {
            background: var(--secondary-color);
            color: white;
            font-size: 2em;
        }
        .memory-card-back {
            background: white;
            transform: rotateY(180deg);
            border: 2px solid var(--secondary-color);
        }
        .memory-card-back img {
            width: 80%;
            height: auto;
            border-radius: 5px;
            margin-bottom: 5px;
        }
        .memory-word {
            font-weight: bold;
            color: var(--secondary-color);
        }
        .memory-translation {
            color: var(--text-color);
        }
    `;
    document.head.appendChild(style);

    // Memory game logic
    let flippedCards = [];
    let attempts = 0;
    let pairs = 0;
    let canFlip = true;

    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!canFlip || card.classList.contains('flipped') || flippedCards.length >= 2) return;

            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                attempts++;
                document.getElementById('attempts').textContent = attempts;
                canFlip = false;

                const [card1, card2] = flippedCards;
                if (card1.dataset.word === card2.dataset.word) {
                    pairs++;
                    document.getElementById('pairs').textContent = pairs;
                    flippedCards = [];
                    canFlip = true;

                    if (pairs === 6) {
                        setTimeout(() => {
                            saveGameScore('memory', attempts);
                            const { imgFile, name } = getChildImageAndName();
                            showCelebration({
                                title: 'כל הכבוד! ניצחת!',
                                score: attempts,
                                childName: name,
                                childImg: imgFile,
                                onClose: () => startMemoryGame()
                            });
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        flippedCards = [];
                        canFlip = true;
                    }, 1000);
                }
            }
        });
    });
}

// Matching Game Implementation
function startMatchingGame() {
    // Clear the game container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = `
        <div class="matching-game">
            <div class="matching-header">
                <h2>משחק ההתאמה</h2>
                <div class="matching-stats">
                    <span>זמן: <span id="timer">60</span> שניות</span>
                    <span>ניקוד: <span id="score">0</span></span>
                </div>
            </div>
            <div class="matching-container">
                <div class="english-words"></div>
                <div class="hebrew-words"></div>
            </div>
            <div class="matching-controls">
                <button id="startGame">התחל משחק</button>
                <button id="resetGame" style="display: none;">משחק חדש</button>
            </div>
        </div>
    `;
    insertChildInfoBar(gameContainer);
    makeGameTitleHomeClickable();

    // Add matching game styles
    const style = document.createElement('style');
    style.textContent = `
        .matching-game {
            padding: 20px;
        }
        .matching-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .matching-stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 10px;
            font-size: 1.2em;
        }
        .matching-container {
            display: flex;
            gap: 20px;
            justify-content: center;
            margin: 20px 0;
        }
        .english-words, .hebrew-words {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 200px;
        }
        .word-card {
            padding: 15px;
            border: 2px solid var(--secondary-color);
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
        }
        .word-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .word-card.selected {
            background: var(--secondary-color);
            color: white;
        }
        .word-card.matched {
            background: var(--primary-color);
            color: white;
            cursor: default;
        }
        .matching-controls {
            text-align: center;
            margin-top: 20px;
        }
        .matching-controls button {
            padding: 10px 20px;
            font-size: 1.1em;
            border: none;
            border-radius: 8px;
            background: var(--accent-color);
            color: white;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .matching-controls button:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);

    // Game state
    let selectedEnglish = null;
    let selectedHebrew = null;
    let score = 0;
    let timeLeft = 60;
    let timer = null;
    let gameStarted = false;

    // Get random words for the game
    const gameWords = [...words].sort(() => Math.random() - 0.5).slice(0, 6);
    
    // Create word cards
    const englishContainer = document.querySelector('.english-words');
    const hebrewContainer = document.querySelector('.hebrew-words');

    gameWords.forEach(word => {
        // English card
        const englishCard = document.createElement('div');
        englishCard.className = 'word-card';
        englishCard.dataset.word = word.english;
        englishCard.textContent = word.english;
        englishContainer.appendChild(englishCard);

        // Hebrew card
        const hebrewCard = document.createElement('div');
        hebrewCard.className = 'word-card';
        hebrewCard.dataset.word = word.english;
        hebrewCard.textContent = word.hebrew;
        hebrewContainer.appendChild(hebrewCard);
    });

    // Shuffle Hebrew words
    const hebrewCards = Array.from(hebrewContainer.children);
    hebrewCards.sort(() => Math.random() - 0.5);
    hebrewContainer.innerHTML = '';
    hebrewCards.forEach(card => hebrewContainer.appendChild(card));

    // Game logic
    function handleCardClick(card, isEnglish) {
        if (!gameStarted || card.classList.contains('matched')) return;

        if (isEnglish) {
            if (selectedEnglish) {
                selectedEnglish.classList.remove('selected');
            }
            selectedEnglish = card;
            card.classList.add('selected');
        } else {
            if (selectedHebrew) {
                selectedHebrew.classList.remove('selected');
            }
            selectedHebrew = card;
            card.classList.add('selected');
        }

        if (selectedEnglish && selectedHebrew) {
            if (selectedEnglish.dataset.word === selectedHebrew.dataset.word) {
                // Match found
                selectedEnglish.classList.remove('selected');
                selectedHebrew.classList.remove('selected');
                selectedEnglish.classList.add('matched');
                selectedHebrew.classList.add('matched');
                score += 10;
                document.getElementById('score').textContent = score;

                // Check if game is complete
                if (document.querySelectorAll('.matched').length === gameWords.length * 2) {
                    endGame(true);
                }
            } else {
                // No match
                setTimeout(() => {
                    selectedEnglish.classList.remove('selected');
                    selectedHebrew.classList.remove('selected');
                }, 500);
            }
            selectedEnglish = null;
            selectedHebrew = null;
        }
    }

    // Add click handlers
    document.querySelectorAll('.english-words .word-card').forEach(card => {
        card.addEventListener('click', () => handleCardClick(card, true));
    });

    document.querySelectorAll('.hebrew-words .word-card').forEach(card => {
        card.addEventListener('click', () => handleCardClick(card, false));
    });

    // Timer function
    function updateTimer() {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame(false);
        }
    }

    // Start game
    document.getElementById('startGame').addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            document.getElementById('startGame').style.display = 'none';
            document.getElementById('resetGame').style.display = 'inline-block';
            timer = setInterval(updateTimer, 1000);
        }
    });

    // Reset game
    document.getElementById('resetGame').addEventListener('click', () => {
        startMatchingGame();
    });

    // End game
    function endGame(isWin) {
        clearInterval(timer);
        gameStarted = false;
        
        if (isWin) {
            score += timeLeft; // Bonus points for remaining time
            document.getElementById('score').textContent = score;
        }

        setTimeout(() => {
            saveGameScore('matching', score);
            const { imgFile, name } = getChildImageAndName();
            showCelebration({
                title: isWin ? 'כל הכבוד! ניצחת!' : 'הזמן נגמר!',
                score: score,
                childName: name,
                childImg: imgFile,
                onClose: () => startMatchingGame()
            });
        }, 500);
    }
}

// Quiz Game Implementation
function startQuizGame() {
    // Clear the game container
    const gameContainer = document.querySelector('.game-container');
    gameContainer.innerHTML = `
        <div class="quiz-game">
            <div class="quiz-header">
                <h2>חידון אנגלית</h2>
                <div class="quiz-stats">
                    <span>שאלה: <span id="currentQuestion">1</span>/<span id="totalQuestions">10</span></span>
                    <span>ניקוד: <span id="quizScore">0</span></span>
                </div>
            </div>
            <div class="quiz-content">
                <div class="question-container">
                    <div class="question-text"></div>
                    <div class="options-container"></div>
                </div>
            </div>
            <div class="quiz-controls">
                <button id="startQuiz">התחל חידון</button>
                <button id="nextQuestion" style="display: none;">שאלה הבאה</button>
            </div>
        </div>
    `;
    insertChildInfoBar(gameContainer);
    makeGameTitleHomeClickable();

    // Add quiz game styles
    const style = document.createElement('style');
    style.textContent = `
        .quiz-game {
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        .quiz-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .quiz-stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 10px;
            font-size: 1.2em;
        }
        .question-container {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .question-text {
            font-size: 1.3em;
            margin-bottom: 20px;
            text-align: center;
        }
        .options-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        .option {
            padding: 15px;
            border: 2px solid var(--secondary-color);
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            background: white;
        }
        .option:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .option.selected {
            background: var(--secondary-color);
            color: white;
        }
        .option.correct {
            background: var(--primary-color);
            color: white;
        }
        .option.wrong {
            background: #ff4444;
            color: white;
        }
        .quiz-controls {
            text-align: center;
            margin-top: 20px;
        }
        .quiz-controls button {
            padding: 10px 20px;
            font-size: 1.1em;
            border: none;
            border-radius: 8px;
            background: var(--accent-color);
            color: white;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        .quiz-controls button:hover {
            transform: scale(1.05);
        }
        .quiz-controls button:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // Game state
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let gameStarted = false;

    // Generate questions
    function generateQuestions() {
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        questions = shuffledWords.slice(0, 10).map(word => {
            // Get 3 random wrong answers
            const wrongAnswers = words
                .filter(w => w.english !== word.english)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map(w => w.hebrew);

            return {
                question: `מה התרגום של המילה "${word.english}"?`,
                correctAnswer: word.hebrew,
                options: [...wrongAnswers, word.hebrew].sort(() => Math.random() - 0.5)
            };
        });
    }

    // Display current question
    function displayQuestion() {
        const question = questions[currentQuestionIndex];
        document.querySelector('.question-text').textContent = question.question;
        
        const optionsContainer = document.querySelector('.options-container');
        optionsContainer.innerHTML = '';
        
        question.options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => handleAnswer(option));
            optionsContainer.appendChild(optionElement);
        });

        document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
        document.getElementById('nextQuestion').style.display = 'none';
    }

    // Handle answer selection
    function handleAnswer(selectedAnswer) {
        if (gameStarted) {
            const question = questions[currentQuestionIndex];
            const options = document.querySelectorAll('.option');
            
            options.forEach(option => {
                option.classList.remove('selected', 'correct', 'wrong');
                if (option.textContent === selectedAnswer) {
                    option.classList.add('selected');
                }
            });

            if (selectedAnswer === question.correctAnswer) {
                score += 10;
                document.getElementById('quizScore').textContent = score;
                options.forEach(option => {
                    if (option.textContent === selectedAnswer) {
                        option.classList.add('correct');
                    }
                });
            } else {
                options.forEach(option => {
                    if (option.textContent === selectedAnswer) {
                        option.classList.add('wrong');
                    }
                    if (option.textContent === question.correctAnswer) {
                        option.classList.add('correct');
                    }
                });
            }

            document.getElementById('nextQuestion').style.display = 'inline-block';
        }
    }

    // Start quiz
    document.getElementById('startQuiz').addEventListener('click', () => {
        if (!gameStarted) {
            gameStarted = true;
            generateQuestions();
            displayQuestion();
            document.getElementById('startQuiz').style.display = 'none';
        }
    });

    // Next question
    document.getElementById('nextQuestion').addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            // End of quiz
            setTimeout(() => {
                saveGameScore('quiz', score);
                const { imgFile, name } = getChildImageAndName();
                showCelebration({
                    title: 'החידון הסתיים!',
                    score: score,
                    childName: name,
                    childImg: imgFile,
                    onClose: () => startQuizGame()
                });
            }, 500);
        }
    });
}

// Save user progress to Supabase
async function saveUserProgress(progress) {
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .upsert({
                user_name: currentUser,
                progress: progress,
                updated_at: new Date()
            });

        if (error) throw error;
        console.log('Progress saved successfully');
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

// Add navigation to vocabulary page
function setupVocabBtn() {
    const vocabBtn = document.getElementById('vocabBtn');
    if (vocabBtn) {
        vocabBtn.addEventListener('click', () => {
            // Save user to localStorage for use in vocabulary page
            if (currentUser) localStorage.setItem('currentUser', currentUser);
            window.location.href = 'vocabulary.html';
        });
    }
}

// Show child image and score in user-info
function showChildInfo(score = 0) {
    const userInfo = document.querySelector('.user-info');
    const childImage = document.getElementById('childImage');
    const childScore = document.getElementById('childScore');
    if (!currentUser) {
        userInfo.style.display = 'none';
        return;
    }
    userInfo.style.display = 'flex';
    let imgFile = '';
    if (currentUser.includes('חירות')) imgFile = 'images/harut.jpg';
    else if (currentUser.includes('יאיר')) imgFile = 'images/yair.jpg';
    else if (currentUser.includes('רות')) imgFile = 'images/rut.jpg';
    childImage.src = imgFile;
    childImage.alt = currentUser;
    childScore.textContent = `ציון מצטבר: ${score}`;
}

// On page load, restore user from localStorage if exists
function restoreUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        document.getElementById('userSelect').value = savedUser;
        showChildInfo();
        loadUserProgress();
    }
}

// Show celebration overlay
function showCelebration({ title, score, childName, childImg, onClose }) {
    // Remove existing overlay if any
    const oldOverlay = document.getElementById('celebrationOverlay');
    if (oldOverlay) oldOverlay.remove();
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    overlay.id = 'celebrationOverlay';
    overlay.innerHTML = `
        <div class="trophy">🏆</div>
        <div class="celebration-title">${title}</div>
        <div class="celebration-score">ניקוד: ${score}</div>
        <div class="celebration-child">
            <img src="${childImg}" alt="${childName}">
            <span>${childName}</span>
        </div>
        <button class="celebration-home-btn">חזרה לדף הבית</button>
        <div class="celebration-fireworks"></div>
    `;
    document.body.appendChild(overlay);
    // Fireworks animation
    function launchFirework() {
        const fireworks = overlay.querySelector('.celebration-fireworks');
        for (let i = 0; i < 12; i++) {
            const fw = document.createElement('div');
            fw.className = 'firework';
            fw.style.left = Math.random() * 90 + '%';
            fw.style.top = Math.random() * 60 + 10 + '%';
            fw.style.background = `radial-gradient(circle, ${randomColor()} 60%, transparent 100%)`;
            fireworks.appendChild(fw);
            setTimeout(() => fw.remove(), 1200);
        }
    }
    function randomColor() {
        const colors = ['#FF9800','#F44336','#4CAF50','#2196F3','#FFD600','#E040FB','#00E676','#FF4081'];
        return colors[Math.floor(Math.random()*colors.length)];
    }
    // Launch fireworks every 700ms for 2.5s
    let fwCount = 0;
    const fwInterval = setInterval(() => {
        launchFirework();
        fwCount++;
        if (fwCount > 3) clearInterval(fwInterval);
    }, 700);
    // Home button
    overlay.querySelector('.celebration-home-btn').onclick = () => {
        overlay.remove();
        if (onClose) onClose();
        window.location.href = 'index.html';
    };
} 