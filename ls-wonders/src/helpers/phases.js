const phases = [
  {
    name: "war",
    title: "Krieg",
    inputFields: 1
  },
  {
    name: "money",
    title: "Geld",
    inputFields: 1
  },
  {
    name: "wonder",
    title: "Weltwunder",
    inputFields: 1
  },
  {
    name: "profane",
    title: "Profanbauten",
    inputFields: 1
  },
  {
    name: "market",
    title: "Märkte",
    inputFields: 1
  },
  {
    name: "science",
    title: "Wissenschaft",
    inputFields: 3
  },
  {
    name: "guild",
    title: "Gilden",
    inputFields: 1
  }
];

export default {
  /**
   * Returns a list of phases that are going to be asked
   * when evaluating the scores.
   * @param {Object} extensions Contains information which extensions are used
   */
  getPhases(extensions) {
    const result = phases.slice(); // Copy original phases into result.
    if (extensions.babel || extensions.projects) {
      let title = "";
      let fields = 1;
      if (extensions.babel && extensions.projects) {
        title = "Babelplättchen & Marker";
        fields = 2;
      } else if (extensions.babel) {
        title = "Babelplättchen";
      } else {
        title = "Marker";
      }
      result.splice(1, 0, {
        name: "babel",
        title: title,
        inputFields: fields
      });
    }
    if (extensions.armada) {
      result.splice(0, 1, {
        name: "war",
        title: "Landkrieg",
        inputFields: 1
      });
      result.splice(1, 0, {
        name: "navalWar",
        title: "Seekrieg",
        inputFields: 1
      });
      result.push({
        name: "island",
        title: "Werften & Inselns",
        inputFields: 1
      });
    }
    if (extensions.leaders) {
      result.push({
        name: "leader",
        title: "Leader",
        inputFields: 1
      });
    }
    if (extensions.cities) {
      result.push({
        name: "blackCards",
        title: "Schwarze Karten",
        inputFields: 1
      });
    }
    return result;
  },

  /**
   * war: 1
   * returns an array of all numbers that belong to the phases that
   * should not get displayed at the final result.
   * navalWar: 2, babel: 3, islands: 10, leaders: 11, blackCards: 12
   * @param {Object} extensions Information, which extension is enabled.
   */
  getPhasesToRemove(extensions) {
    let result = [];
    if (!extensions.armada) {
      result.push(2);
      result.push(10);
    }
    if (!extensions.babel && !extensions.projects) {
      result.push(3);
    }
    if (!extensions.leaders) {
      result.push(11);
    }
    if (!extensions.cities) {
      result.push(12);
    }
    return result;
  }
};
