<template>
  <div class="container">
    <form @submit.prevent>
      <h1>Wähle deine Erweiterungen aus:</h1>
      <div class="check-small">
        <input
          type="checkbox"
          id="wonderPack"
          :checked="extensions.wonderPack"
          @change="extensionChange($event)"
        >
        <label for="wonderPack">Wonder Pack</label>
      </div>
      <div class="check-small">
        <input
          type="checkbox"
          id="leaders"
          :checked="extensions.leaders"
          @change="extensionChange($event)"
        >
        <label for="leaders">Leaders</label>
      </div>
      <div class="check-small">
        <input
          type="checkbox"
          id="cities"
          :checked="extensions.cities"
          @change="extensionChange($event)"
        >
        <label for="cities">Cities</label>
      </div>
      <div class="check-small">
        <input
          type="checkbox"
          id="armada"
          :checked="extensions.armada"
          @change="extensionChange($event)"
        >
        <label for="armada">Armada</label>
      </div>
      <div class="check-small">
        <input
          type="checkbox"
          id="babel"
          :checked="extensions.babel"
          @change="extensionChange($event)"
        >
        <label for="babel">Turmbau zu Babel</label>
      </div>
      <div class="check-small">
        <input
          type="checkbox"
          id="projects"
          :checked="extensions.projects"
          @change="extensionChange($event)"
        >
        <label for="projects">Bauvorhaben</label>
      </div>
      <hr>
      <h1>Sonstige Einstellungen:</h1>
      <div>
        <input type="checkbox" id="easy" :checked="easy" @change="easyChanged($event)">
        <label for="easy">Einfache Variante (A only)</label>
      </div>
      <hr>
      <h1>Gib alle Spielernamen ein:</h1>
      <div class="form-line" v-for="index in playerCount+1" :key="index">
        <label :for="`player${index}`">Spieler {{ index }}:</label>
        <input
          data-lpignore="true"
          :tabindex="index"
          autocomplete="off"
          type="text"
          :id="`player${index}`"
          :value="players[index-1]"
          @input="calc($event, index)"
          @keydown.enter.prevent="focus()"
          @keydown.ctrl.enter="startGame"
        >
        <button class="btn delete" v-if="(players.length >= index)" @click.prevent="remove(index)">X</button>
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
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      game: {
        isSet: false
      }
    };
  },
  computed: {
    playerCount() {
      return Math.min(7, this.players.length + 1) - 1;
    },
    ...mapState({
      extensions: state => state.game.extensions,
      easy: state => state.game.easy,
      players: state => state.game.players
    })
  },
  methods: {
    /**
     * Caluclate the array of players and sets it to the store.
     */
    calc(e, i) {
      let tmp = this.players;
      tmp[i - 1] = e.target.value;
      this.setPlayers(tmp.filter(p => p != ""));
    },
    remove(index) {
      this.removePlayer(index - 1);
    },
    startGame() {
      this.game.isSet = true;
      this.initGame();
      this.$router.push("assign");
    },
    focus() {
      const c = document.getElementById(`player${this.players.length + 1}`);
      c.focus();
    },
    extensionChange(e) {
      this.setExtension({
        key: e.target.id,
        value: e.target.checked
      });
    },
    easyChanged(e) {
      this.setEasy(e.target.checked);
    },
    ...mapActions([
      "initGame",
      "setExtension",
      "setPlayers",
      "removePlayer",
      "setEasy"
    ])
  }
};
</script>

<style lang="scss" scoped>
</style>