// const _ = require('./underscore-min');

//PATRON MODULO - Funcion anonima autoinvocada 
//Soluciona problema de seguridad desde el navegador encapsulando las variables
(() => {
    'use strict'
    
    let deck        = [];
    const types     = ['C','D','H','S'];
    const specials  = ['A','J','Q','K'];
    
    // let playerScore = 0;
    // let computerScore = 0;

    let playersScore = [];

    //HTML References
    const btnAsk          = document.querySelector('#btnAsk');
    const btnStop         = document.querySelector('#btnStop');
    const btnNewGame      = document.querySelector('#btnNewGame');
    const sPlayerScore    = document.querySelector('#playerScore');
    const sComputerScore  = document.querySelector('#computerScore');
    const divPlayerCard   = document.querySelector('#jugador-cartas');
    const divComputerCard = document.querySelector('#computadora-cartas');

    
    const stateButtoms = ( state ) => {
        btnAsk.disabled = state;
        btnStop.disabled = state;
    }
    
    stateButtoms(true);

    const startGame = ( numPlayers = 2) => {
       deck = createDeck();
       for (let i = 0; i < numPlayers; i++) {
        const element = array[i];
       }
    }
   
    //This function creates a new deck
    const createDeck = () => {
        deck = [];
        
        for (let i = 2; i <= 10 ; i++) {
            for (let type of types) {
                deck.push(i + type);
            }
        }

        for (let type of types) {
            for (let esp of specials) {
                deck.push( esp + type);
            }
        }

        return _.shuffle(deck);
    }

    

    //This function takes a card
    const askCard = ()=>{
        if(deck.length === 0 ) 
            throw 'There are not more cards'

        return deck.shift();;
    }
    // askCard();

    const cardValue = ( card ) => {
        const value = card.substring(0,card.length-1);
        return (isNaN(value)) ? (( value === 'A') ? 11 : 10) : value * 1;
    }

    const accumulatePlayerScore = () => {

    }
    //Computer's turn
    const computerSet = ( minScore) => {
        do {
            const card = askCard();
            
            computerScore = computerScore + cardValue(card);
            sComputerScore.innerText = computerScore;

            const imgCard = document.createElement('img');
            imgCard.src = `assets/cartas/${card}.png`;
            imgCard.classList.add('carta');
            divComputerCard.append(imgCard);
            if (minScore > 21)
                break;
        } while ((computerScore < minScore) && (playerScore <= 21));

        stateButtoms(true);
        
        setTimeout(() => {
            if (computerScore === minScore) {
                alert("Nobody wins");
            }else if(minScore > 21 ){
                alert("Computer wins");
            }else if(computerScore > 21){
                alert("Player 1 wins");
            }else{
                alert("Computer wins");
            }
        }, 20);

    
    };

    //Events
    btnAsk.addEventListener('click',() => {
        const card = askCard();
        
        playerScore = playerScore + cardValue(card);
        sPlayerScore.innerText = playerScore;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        divPlayerCard.append(imgCard);

        if (playerScore > 21) {
            console.warn('you lost, I am sorry');
            btnAsk.disabled = true;
            computerSet(playerScore);
        }else if (playerScore === 21){
            console.info("you get 21, congrats! Computer's turn");
            btnAsk.disabled = true;
            computerSet(playerScore);
        }
    });

    btnStop.addEventListener('click',() => {
        btnAsk.disabled = true;
        btnStop.disabled = true;
        
        computerSet(playerScore);
    });

    btnNewGame.addEventListener('click',() => {
        startGame();
        // deck = [];
        // deck = createDeck();
        
        playerScore              = 0;
        computerScore            = 0;
        sPlayerScore.innerText   = playerScore;
        sComputerScore.innerText = computerScore;

        divPlayerCard.innerHTML = '';
        divComputerCard.innerHTML = '';

        btnAsk.disabled = false;
        btnStop.disabled = false;
    });

})();
