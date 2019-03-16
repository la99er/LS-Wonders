import Vue from "vue";
import Vuex from "vuex";
import { wonders } from "@/helpers/wonders.js";
import Helper from "@/helpers/helper";
import Phases from "@/helpers/phases";
import { stat } from "fs";

Vue.use(Vuex);

export const PUSH_SCORE = "PUSH_SCORE";
export const CLEAR_SCORE = "CLEAR_SCORE";
export const SET_SCORE = "SET_SCORE";
export const SET_GAME = "SET_GAME";

export default new Vuex.Store({
  state: {
    game: {
      phases: [],
      players: [],
      score: {
        war: [],
        navalWar: [],
        money: [],
        wonder: [],
        profane: [],
        markets: [],
        science: {
          plates: [],
          gears: [],
          compasses: []
        },
        guild: [],
        islands: [],
        leader: [],
        blackCards: []
      },
      wonders: [],
      extensions: {
        wonderPack: false,
        leaders: false,
        cities: false,
        armada: false,
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
    ],
    categories: []
  },
  getters: {
    phases: state => {
      let result = state.phases;
      if (state.game.extensions.armada) {
        result.splice(1, 0, "Seekrieg");
        result.push("Inseln");
      }
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
      console.log(state.game.score);
      return state.game.score[state.categories[key]];
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
    scoreTable: state => {
      let totals = Helper.calculateScore(state.game.score, state.game.players);
      let result = [];
      for (let i = 0; i < totals.length; i++) {
        result.push({
          name: state.game.players[i],
          total: totals[i],
          wonder: state.game.wonders[i]
        });
      }
      return result.sort((obj1, obj2) => {
        return obj2.total - obj1.total;
      });
    }
  },
  mutations: {
    [SET_GAME](state, game) {
      Object.assign(state.game, game);
    },
    [PUSH_SCORE](state, payload) {
      state.game.score[payload.key].push(payload.value);
    },
    [SET_SCORE](state, payload) {
      state.game.score[payload.key] = payload.value;
    },
    [CLEAR_SCORE](state, payload) {
      state.game.score[payload.key] = payload.value;
    }
  },
  actions: {
    // Takes an object as argument with the following form:
    // {key: number, values: [numbers]}
    // key is the state of the assignment
    // values is an array of all values in the order of players.
    setScore({ state, commit }, scores) {
      commit(SET_SCORE, {
        key: state.categories[scores.key],
        value: scores.values
      });
    },
    initGame({ commit }, game) {
      const w = wonders.getRandomWonders(
        game.players.length,
        game.extensions,
        game.easy
      );
      Object.assign(game, { ["wonders"]: w });
      const p = Phases.getPhases(game.extensions);

      const categories = [
        "war",
        "money",
        "wonder",
        "profane",
        "markets",
        "science",
        "guild"
      ];
      if (game.extensions.armada) {
        categories.splice(1, 0, "navalWar");
        categories.push("islands");
      }
      if (game.extensions.leaders) {
        categories.push("leader");
      }
      if (game.extensions.cities) {
        categories.push("blackCards");
      }
      if (game.extensions.babylon) {
        categories.push("babel");
      }
      game.categories = categories;
      commit(SET_GAME, game);
    }
  }
});
