export default {
  shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  },
  calculateScience(plates = 0, gears = 0, compasses = 0) {
    const sets = Math.min(plates, gears, compasses) * 7;
    const singles = Math.pow(plates, 2) + Math.pow(gears, 2) + Math.pow(compasses, 2);
    return sets + singles;
  },

  /**
   * Returns an array that contains the total score of all players. 
   * Index of the score is the number of the player.
   * @param {Object} scores Scores object of the store.js file
   * @param {Array} players Array of all player names.
   */
  calculateScore(scores, players) {
    // Create an empty array in length of number of players and initialize them with 0.
    let result = Array.apply(null, Array(players.length)).map(Number.prototype.valueOf,0);
    for (let [category, values] of Object.entries(scores)) {
      if (category === 'science') {
        for (let i = 0; i < players.length; i++) {
          result[i] += this.calculateScience(
            values.plates[i],
            values.gears[i],
            values.compasses[i]
          );
        }
      } else {
        values.forEach((value, index) => {
          result[index] += Number(value);
        });
      }
    }
    return result;
  },

}