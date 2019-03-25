import Vue from "vue";
import Vuex from "vuex";
import { wonders } from "@/helpers/wonders.js";
import Phases from "@/helpers/phases";
import { stat } from "fs";

Vue.use(Vuex);

export const SET_SCORE = "SET_SCORE";
export const SET_GAME = "SET_GAME";
export const SET_EXTENSION = "SET_EXTENSION";
export const SET_EASY = "SET_EASY";
export const SET_PLAYERS = "SET_PLAYERS";
export const REMOVE_PLAYER = "REMOVE_PLAYER";

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
      if (state.game.wonders.length === 0) return;
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
    [SET_SCORE](state, payload) {
      state.game.score[payload.key] = payload.values;
    },
    [SET_EXTENSION](state, payload) {
      state.game.extensions[payload.key] = payload.value;
    },
    [SET_EASY](state, easy) {
      state.game.easy = easy;
    },
    [SET_PLAYERS](state, players) {
      state.game.players = players;
    },
    [REMOVE_PLAYER](state, index) {
      state.game.players.splice(index, 1);
    }
  },
  actions: {
    // Takes an object as argument with the following form:
    // {key: number, values: [numbers]}
    // key is the state of the assignment
    // values is an array of all values in the order of players.
    setScore({ commit }, scores) {
      commit(SET_SCORE, scores);
    },
    setExtension({ commit }, extension) {
      commit(SET_EXTENSION, extension);
    },
    setPlayers({ commit }, players) {
      commit(SET_PLAYERS, players);
    },
    removePlayer({ commit }, index) {
      commit(REMOVE_PLAYER, index);
    },
    setEasy({ commit }, easy) {
      commit(SET_EASY, easy);
    },
    initGame({ state, commit }) {
      // Initialize all wonders
      const w = wonders.getRandomWonders(
        state.game.players.length,
        state.game.extensions,
        state.game.easy
      );
      const game = { isSet: true };
      Object.assign(game, { ["wonders"]: w });

      // Initialize all phases.
      const p = Phases.getPhases(state.game.extensions);
      Object.assign(game, { ["phases"]: p });

      console.log(game);
      commit(SET_GAME, game);
    }
  }
});
