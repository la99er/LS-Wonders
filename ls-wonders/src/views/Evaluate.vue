<template>
  <div class="container">
    <h1>Auswertung</h1>
    <nav>
      <div class="icon-container" @click="prev()">
        <fa-icon icon="arrow-left" v-if="state > 0"></fa-icon>
      </div>
      <h3>{{ currentPhase.title }}</h3>
    </nav>
    <form @submit.prevent="next()">
      <div class="number-line" v-for="(player, i) in players" :key="i">
        <label class="label col">{{ player }}:</label>
        <div class="wrapper">
          <input
            v-for="j in currentPhase.inputFields"
            :key="j"
            autocomplete="off"
            type="number"
            :id="`player-${j-1}-${i}`"
            v-model="data[j-1][i]"
            @input="calcPlayerScore(i)"
          >
        </div>
        <div class="col">
          <span v-if="isScience" class="score">= ({{ score[i] }})</span>
        </div>
      </div>
      <button class="btn primary">Next</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Helper from "@/helpers/helper.js";

export default {
  data() {
    return {
      state: 0,
      score: [],
      data: []
    };
  },
  beforeMount() {
    this.data = this.scores(this.currentPhase.name).slice();
  },
  mounted() {
    this.init();
  },
  computed: {
    currentPhase: function() {
      return this.phases[this.state];
    },
    // Returns if we are currently in the science state.
    isScience: function() {
      return this.currentPhase.name === "science";
    },
    ...mapState({
      players: state => state.game.players,
      phases: state => state.game.phases
    }),
    ...mapGetters(["scores"])
  },
  methods: {
    next() {
      // Make sure that if no number was entered, the value gets 0.
      this.setScore({ key: this.currentPhase.name, values: this.data });

      if (this.state < this.phases.length - 1) {
        this.state++;
        this.init();
      } else {
        // All data was entered.
        // Start calculating the score and navigate to the final result page.
        this.$router.push("/result");
      }
    },
    prev() {
      if (this.state > 0) {
        this.state--;
        this.init();
      }
    },
    // Calculates the score of the player with id i
    calcPlayerScore(i = 0) {
      if (this.currentPhase.name === "science") {
        this.score[i] = Helper.calculateScience(
          this.data[0][i],
          this.data[1][i],
          this.data[2][i]
        );
      }
    },
    // Gets executed each time the player presses next and on loading the page.
    init() {
      document.getElementById("player-0-0").focus();

      // TODO: initialize the values of the data array
      // by the scores that are already set.
      // If no values are set, set values to 0.
      this.data = this.scores(this.currentPhase.name).slice();
      console.log(this.data);
      if (this.isScience) {
        for (let i = 0; i < this.players.length; i++) {
          this.calcPlayerScore(i);
        }
      }
    },
    ...mapActions([
      // Takes an object as argument with the following form:
      // {key: number, values: [numbers]}
      // key is the state of the assignment
      // values is an array of all values in the order or players.
      "setScore"
    ])
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
}

nav {
  .icon-container {
    height: 30px;
    width: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    float: left;
  }
  h3 {
    margin: 4px 10px;
    display: inline-block;
    position: relative;
    right: 14px;
  }
}
</style>