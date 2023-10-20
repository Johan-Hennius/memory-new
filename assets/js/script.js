document.addEventListener("DOMContentLoaded", function() {

    //array of colors used for cards
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];
    //empy array thhat will hold colors
    let gameArray = [];
    //keeps track of flipped cards
    let flippedCards = [];
    //counts how many pairs of cards have been matched
    let matchedPairs = 0;

    //duplicate the colors
    gameArray = colors.concat(colors);
    //shuffles array
    gameArray.sort(() => 0.5 - Math.random());

    //obtains gameboard from html
    const gameBoard = document.getElementById('gameBoard');

    /** we loop through the gameArray and generate card (div) 
     * each card is set a color based on its array index
     * each card recieves an event listener
    */
    for (let i = 0; gameArray.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = gameArray[i];
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    }


    function handleCardClick(event) {

        //define clicked card
        const clickedCard = event.target;

        //ignore if card is clicked or has matched
        if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) {
            return;
        }

        //change card color to make it appear flipped
        const cardColor = clickedCard.dataset.color;
        clickedCard.style.backgroundColor = cardColor;
        clickedCard.classList.add('flipped');

        //add to flippedCards array
        flippedCards.push(clickedCard);

        //check for match
        if (flippedCards.length === 2) {
            const [firstCard, secondCard] = flippedCards;
            if (firstCard.dataset.color === secondCard.dataset.color) {

                //cards match
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                matchedPairs++;

                //reset flipped cards array
                flippedCards = [];

                //check for game completion
                if (matchedPairs === colors.length) {
                    alert('You won!');
                }
            } else {
                //cards do not match
                //flip back after short delay
                setTimeout(() => {
                    firstCard.style.backgroundColor = '';
                    secondCard.style.backgroundColor = '';
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');

                    //reset flippedCards array
                    flippedCards = [];
                }, 500);
            }
        }
    }


});