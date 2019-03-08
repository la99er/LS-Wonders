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
  }
}