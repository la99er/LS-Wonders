import Vue from "vue";
import Vuex from "vuex";
import { wonders } from "@/helpers/wonders.js";
import Phases from "@/helpers/phases";
import { stat } from "fs";

Vue.use(Vuex);

export const SET_SCORE = "SET_SCORE";
export const SET_GAME = "SET_GAME";

export default new Vuex.Store({
  state: {
    game: {
      isSet: false,
      players: [],
      phases: [],
      score: {
        war: [[]],
        navalWar: [[]],
        babel: [[], []],
        money: [[]],
        wonder: [[]],
        profane: [[]],
        market: [[]],
        science: [[], [], []],
        guild: [[]],
        island: [[]],
        leader: [[]],
        blackCards: [[]]
      },
      wonders: [],
      extensions: {
        wonderPack: false,
        leaders: false,
        cities: false,
        armada: false,
        babel: false,
        projects: false
      },
      easy: false
    }
  },
  getters: {
    phases: state => {
      return state.phases;
    },
    scores: state => phase => {
      return state.game.score[phase];
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
    },
    /**
     * Returns an array of objects that have:
     * - name: name of the player,
     * - total: total score the player achieved
     * - wonder: wonder object that contains:
     *  + name: name of the wonder
     *  + side: side of the wonder
     */
    scoreTable: state => {}
  },
  mutations: {
    [SET_GAME](state, game) {
      Object.assign(state.game, game);
    },
    [SET_SCORE](state, payload) {
      state.game.score[payload.key] = payload.values;
    }
  },
  actions: {
    // Takes an object as argument with the following form:
    // {key: number, values: [numbers]}
    // key is the state of the assignment
    // values is an array of all values in the order of players.
    setScore({ state, commit }, scores) {
      commit(SET_SCORE, scores);
    },
    initGame({ commit }, game) {
      // Initialize all wonders
      const w = wonders.getRandomWonders(
        game.players.length,
        game.extensions,
        game.easy
      );
      Object.assign(game, { ["wonders"]: w });

      // Initialize all phases.
      const p = Phases.getPhases(game.extensions);
      Object.assign(game, { ["phases"]: p });

      commit(SET_GAME, game);
    }
  }
});
