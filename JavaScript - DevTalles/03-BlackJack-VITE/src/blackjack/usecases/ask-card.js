/**
 * 
 * @param {string[]} deck 
 * @returns returns a card
 */
export const askCard = (deck)=>{
      if(deck.length === 0 ) 
          throw 'There are not more cards'

      return deck.shift();;
  }