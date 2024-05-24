// const _ = require('./underscore-min');

//PATRON MODULO - Funcion anonima autoinvocada 
//Soluciona problema de seguridad desde el navegador encapsulando las variables
const myModule = (() => {
    'use strict'
    
    let deck        = [];
    const types     = ['C','D','H','S'];
    const specials  = ['A','J','Q','K'];
    
    let playersScore = [];

    //HTML References
    const btnAsk          = document.querySelector('#btnAsk');
    const btnStop         = document.querySelector('#btnStop');
    const btnNewGame      = document.querySelector('#btnNewGame');

    const sPlayerScore    = document.querySelectorAll('small');
    const divPlayerCards  = document.querySelectorAll('.divCards');
    
    const stateButtoms = ( state ) => {
        btnAsk.disabled = state;
        btnStop.disabled = state;
    }
    
    stateButtoms(true);

    const startGame = ( numPlayers = 2) => {
       deck = createDeck();
       playersScore = [];
       for (let i = 0; i < numPlayers; i++) {
         playersScore.push(0);
       }

       for (let i = 0; i < playersScore.length; i++) {
        sPlayerScore[i].innerText = 0;
        divPlayerCards[i].innerText = '';
        }
    stateButtoms(false);
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

    //Turno: 0 first player, and n-1 is the computer
    const accumulatePlayerScore = ( card, turno ) => {
        playersScore[turno] = playersScore[turno] + cardValue(card);
        sPlayerScore[turno].innerText = playersScore[turno];
       
        return playersScore[turno];
    }

    const createCard = (card,turno) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('carta');
        divPlayerCards[turno].append(imgCard);
    }

    const winner = () => {
        const [minScore, computerScore] = playersScore;

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
    }
    //Computer's turn
    const computerSet = ( minScore) => {
        let computerScore = 0;
        
        do {
            const card = askCard();
            computerScore = accumulatePlayerScore( card , playersScore.length - 1);
            createCard(card , playersScore.length - 1);
           if(minScore > 21) break;     
        } while ((computerScore < minScore) && (computerScore <= 21));

        winner();
        stateButtoms(true);
        
    };

    //Events

    //BTN ASK A CARD
    btnAsk.addEventListener('click',() => {
        const card = askCard();
        const playerScore = accumulatePlayerScore( card , 0);

        createCard(card,0);

        if (playerScore > 21) {
            console.warn('you lost, I am sorry');
            stateButtoms(true);
            computerSet(playerScore);
        }else if (playerScore === 21){
            console.info("you get 21, congrats! Computer's turn");
            stateButtoms(true);
            computerSet(playerScore);
        }
    });

    //BTN STOP GAME
    btnStop.addEventListener('click',() => {
        stateButtoms(true);
        computerSet(playersScore[0]);
    });
    
    //BTN NEW GAME
    btnNewGame.addEventListener('click',() => {
        startGame();
    });

    return {
        newGame: startGame
    };
})();
