import Helper from './helper';

const wonders = {
  vanilla: [
    'Rhodos',
    'Alexandria',
    'Éphesos',
    'Babylon',
    'Olympia',
    'Halikarnassos',
    'Gizeh'
  ],
  wonderPack: [
    'Stonehenge',
    'Manneken Pis',
    'The Great Wall',
    'Abu Simbel'
  ],
  leaders: [
    'Rom'
  ],
  cities: [
    'Petra',
    'Byzantium'
  ],

  /**
   * Returns a random array with length of count that contains objects
   * with names of the wonders and sides. {name: string, side: char}
   * 
   * @param {Number} count Number of wonders you want;
   * @param {Object} extensions Object which holds the information which extension is enabled.
   * @param {Boolean} easy If easy is true, only return A sides.
   */
  getRandomWonders(count, extensions, easy) {
    let result = [];
    let wonders = this.vanilla;
    if (extensions.wonderPack) {
      wonders = wonders.concat(this.wonderPack);
    }
    if (extensions.leaders) {
      wonders = wonders.concat(this.leaders);
    }
    if (extensions.cities) {
      wonders = wonders.concat(this.cities);
    }
    let _side = 'A';
    wonders = Helper.shuffle(wonders);
    wonders = wonders.slice(0, count);
    wonders.forEach((wonder, i) => {
      if (!easy) {
        _side = Math.round(Math.random()) ? 'A' : 'B';
      }
      result.push({
        name: wonder,
        side: _side
      });
    });
    return result;
  }
}

export { wonders };