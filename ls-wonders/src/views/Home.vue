<template>
  <div class="container">
    <form @submit.prevent>
      <h2>Wähle deine Erweiterungen aus:</h2>
      <div class="check-small">
        <input type="checkbox" id="wonderPack" v-model="game.extensions.wonderPack">
        <label for="wonderPack">Wonder Pack</label>
      </div>
      <div class="check-small">
        <input type="checkbox" id="leaders" v-model="game.extensions.leaders">
        <label for="leaders">Leaders</label>
      </div>
      <div class="check-small">
        <input type="checkbox" id="cities" v-model="game.extensions.cities">
        <label for="cities">Cities</label>
      </div>
      <div class="check-small">
        <input type="checkbox" id="armada" v-model="game.extensions.armada">
        <label for="armada">Armada</label>
      </div>
      <div class="check-small">
        <input type="checkbox" id="babel" v-model="game.extensions.babel">
        <label for="babel">Turmbau zu Babel</label>
      </div>
      <div class="check-small">
        <input type="checkbox" id="projects" v-model="game.extensions.projects">
        <label for="projects">Bauvorhaben</label>
      </div>
      <hr>
      <h2>Sonstige Einstellungen:</h2>
      <div>
        <input type="checkbox" id="easy" v-model="game.easy">
        <label for="easy">Einfache Variante (A only)</label>
      </div>
      <hr>
      <h2>Gib alle Spielernamen ein:</h2>
      <div class="form-line" v-for="index in playerCount+1" :key="index">
        <label :for="`player${index}`">Spieler {{ index }}:</label>
        <input
          data-lpignore="true"
          :tabindex="index"
          autocomplete="off"
          type="text"
          :id="`player${index}`"
          v-model="game.players[index-1]"
          @input="calc()"
          @keydown.enter.prevent="focus()"
          @keydown.ctrl.enter="startGame"
        >
        <button
          class="btn delete"
          v-if="(game.players.length >= index)"
          @click.prevent="remove(index)"
        >X</button>
      </div>
      <button
        class="btn primary"
        v-if="playerCount > 1"
        @click.prevent="startGame()"
        :tabindex="playerCount + 1"
      >Los Geht's!</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      game: {
        players: [],
        extensions: {
          wonderPack: true,
          leaders: true,
          cities: true,
          armada: false,
          babel: false,
          projects: false
        },
        easy: false // If true, play only with A site
      }
    };
  },
  computed: {
    playerCount() {
      return Math.min(7, this.game.players.length + 1) - 1;
    }
  },
  methods: {
    calc() {
      this.game.players = this.game.players.filter(p => p != "");
    },
    remove(index) {
      this.game.players.splice(index - 1, 1);
    },
    startGame() {
      this.initGame(this.game);
      this.$router.push("assign");
    },
    focus() {
      const c = document.getElementById(
        `player${this.game.players.length + 1}`
      );
      c.focus();
    },
    ...mapActions(["initGame"])
  }
};
</script>

<style lang="scss" scoped>
</style>