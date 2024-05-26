import _ from 'underscore';

/**
 * 
 * @param {string[]} cardtypes 
 * @param {string[]} specialtypes 
 * @returns  {string[]} returns a new deck
 */
export const createDeck = (cardtypes,specialtypes) => {
    if (!cardtypes || cardtypes.length === 0) throw new Error('CardTypes is required')
    if (!specialtypes || specialtypes.length === 0) throw new Error('SpecialTypes is required')

    let deck = [];
    
    for (let i = 2; i <= 10 ; i++) {
        for (let type of cardtypes) {
            deck.push(i + type);
        }
    }

    for (let type of cardtypes) {
        for (let esp of specialtypes) {
            deck.push( esp + type);
        }
    }

    return _.shuffle(deck);
}


// export default createDeck; tipo de exportacion por defecto, la contraria es la independiente