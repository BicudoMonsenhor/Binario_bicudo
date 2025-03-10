const cardsArray = [
    { id: 1, binary: '0001', value: 1 },
    { id: 2, binary: '0010', value: 2 },
    { id: 3, binary: '0011', value: 3 },
    { id: 4, binary: '0100', value: 4 },
    { id: 5, binary: '0101', value: 5 },
    { id: 6, binary: '0110', value: 6 },
    { id: 7, binary: '0111', value: 7 },
    { id: 8, binary: '1000', value: 8 }
];

let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0; // Contador de correspondências

gameGrid.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = item.value;

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.innerText = item.binary;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.innerText = item.value;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    gameBoard.appendChild(card);

    card.addEventListener('click', () => {
        if (lockBoard || card === firstCard) return;
        playSound('flip-sound');
        card.classList.add('flip');

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkForMatch();
        }
    });
});

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        playSound('match-sound');
        matches++; // Incrementa o contador de correspondências
        resetCards();
        checkForWin(); // Verifica se todas as cartas foram combinadas
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function playSound(id) {
    const sound = document.getElementById(id);
    sound.currentTime = 0;
    sound.play();
}

function checkForWin() {
    if (matches === cardsArray.length) { // Verifica se todas as cartas foram combinadas
        playSound('victory-sound');
    }
}
