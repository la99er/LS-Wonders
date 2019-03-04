import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    game: {
      phases: [],
      players: ['Lars', 'Sebi', 'Felix'],
      wonders: [],
      extensions: {
        wonderPack: false,
        leaders: false,
        cities: true,
        babylon: false
      },
			easy: false
		},
		phases: ['Krieg', 'Geld & Schulden', 'Weltwunder', 'Profanbauten', 'Märkte', 'Wissenschaft', 'Gilden'],
    wonders: [],
  },
  getters: {
    phases: state => {
			let result = state.phases;
			if (state.game.extensions.leaders) {
				result.push('Leader');
			}
			if (state.game.extensions.cities) {
				result.push('Schwarze Karten');
			}
			if (state.game.extensions.babylon) {
				result.push('Babelkarten');
			}
			console.log('Phases Getter got executed!')
			return result;
		}
  }
});
