import _ from 'underscore'
import {createDeck, askCard, cardValue} from './usecases/index'
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
     deck = createDeck(types,specials);
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
 
 
  const createCard = (card,turno) => {
    const imgCard = document.createElement('img');
    imgCard.src =  `./public/assets/cartas/${card}.png`;
    imgCard.classList.add('carta');
    divPlayerCards[turno].append(imgCard);
}

  //Turno: 0 first player, and n-1 is the computer
  const accumulatePlayerScore = ( card, turno ) => {
      playersScore[turno] = playersScore[turno] + cardValue(card);
      sPlayerScore[turno].innerText = playersScore[turno];
     
      return playersScore[turno];
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
          const card = askCard(deck);
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
      const card = askCard(deck);
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
