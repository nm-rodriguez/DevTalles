/**
 * 
 * @param {string} card 
 * @returns {int} returns an integer
 */
export const cardValue = ( card ) => {
    const value = card.substring(0,card.length-1);
    return (isNaN(value)) ? (( value === 'A') ? 11 : 10) : value * 1;
}