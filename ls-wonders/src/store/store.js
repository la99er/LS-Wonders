import Vue from "vue";
import Vuex from "vuex";
import { wonders } from '@/helpers/wonders.js';
import Helper from '@/helpers/helper.js';

Vue.use(Vuex);

export const PUSH_SCORE = "PUSH_SCORE";
export const CLEAR_SCORE = "CLEAR_SCORE";
export const SET_GAME = "SET_GAME";
export const CATEGORIES = [
  "war",
  "money",
  "wonder",
  "profane",
  "markets",
  "science",
  "guild",
  "leader",
  "blackCards"
];

export default new Vuex.Store({
  state: {
    game: {
      phases: [],
      players: [],
      score: {
        war: [],
        money: [],
        wonder: [],
        profane: [],
        markets: [],
        science: [],
        guild: [],
        leader: [],
        blackCards: []
      },
      wonders: [],
      extensions: {
        wonderPack: false,
        leaders: false,
        cities: false,
        babylon: false
      },
      easy: false
    },
    phases: [
      "Krieg",
      "Geld & Schulden",
      "Weltwunder",
      "Profanbauten",
      "Märkte",
      "Wissenschaft",
      "Gilden"
    ]
  },
  getters: {
    phases: state => {
      let result = state.phases;
      if (state.game.extensions.leaders) {
        result.push("Leader");
      }
      if (state.game.extensions.cities) {
        result.push("Schwarze Karten");
      }
      if (state.game.extensions.babylon) {
        result.push("Babelkarten");
      }
      return result;
    },
    scores: state => key => {
      return state.game.score[CATEGORIES[key]];
    },
    assignments: state => {
      let result = [];
      state.game.players.forEach((player, index) => {
        result.push({
          name: player,
          wonder: state.game.wonders[index].name,
          side: state.game.wonders[index].side
        });
      });
      return result;
    }
  },
  mutations: {
    [SET_GAME](state, game) {
      Object.assign(state.game, game);
    },
    [PUSH_SCORE](state, payload) {
      state.game.score[payload.key].push(payload.value);
    },
    [CLEAR_SCORE](state, payload) {
      state.game.score[payload] = [];
    }
  },
  actions: {
    // Takes an object as argument with the following form:
    // {key: number, values: [numbers]}
    // key is the state of the assignment
    // values is an array of all values in the order of players.
    setScore({ commit }, scores) {
      commit(CLEAR_SCORE, CATEGORIES[scores.key]);
      scores.values.forEach(score => {
        commit(PUSH_SCORE, { key: CATEGORIES[scores.key], value: score });
      });
    },
    setGame({ commit }, game) {
      const w = wonders.getRandomWonders(game.players.length, game.extensions, game.easy);
      Object.assign(game, {['wonders']: w});
      commit(SET_GAME, game);
    }
  }
});
