const phases = {
  vanilla: [
    "Krieg",
    "Geld",
    "Weltwunder",
    "Profanbauten",
    "Märkte",
    "Wissenschaft",
    "Gilden"
  ]
};

export default {
  /**
   * Returns a list of phases that are going to be asked
   * when evaluating the scores.
   * @param {Object} extensions Contains information which extensions are used
   */
  getPhases(extensions) {
    let result = phases.vanilla;
    if (extensions.babel && extensions.projects) {
      result.splice(1, 0, "Babelplättchen & Marker");
    } else {
      if (extensions.babel) {
        result.splice(1, 0, "Babelplättchen");
      } else if (extensions.projects) {
        result.splice(1, 0, "Marker");
      }
    }
    if (extensions.armada) {
      result.splice(0, 1, "Landkrieg");
      result.splice(1, 0, "Seekrieg");
      result.push("Inselns");
    }
    if (extensions.leaders) {
      result.push("Leader");
    }
    if (extensions.cities) {
      result.push("Schwarze Karten");
    }
    return result;
  }
};
