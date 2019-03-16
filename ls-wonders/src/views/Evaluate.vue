<template>
  <div class="container">
    <h1>Auswertung</h1>
    <nav>
      <div class="icon-container" @click="prev()">
        <fa-icon icon="arrow-left" v-if="state > 0"></fa-icon>
      </div>
      <h3>{{ phases[state] }}</h3>
    </nav>
    <form @submit.prevent="next()">
      <div class="number-line" v-for="(player, i) in players" :key="i">
        <label class="label col" :for="`player${i}`">{{ player }}:</label>
        <div class="wrapper">
          <input
            autocomplete="off"
            type="number"
            :name="`player${i}`"
            :id="`player${i}`"
            v-model="data[i]"
            @input="calc(i)"
          >
          <input
            autocomplete="off"
            v-if="state === SCIENCE"
            type="number"
            :name="`gear${i}`"
            :id="`gear${i}`"
            v-model="gears[i]"
            @input="calc(i)"
          >
          <input
            autocomplete="off"
            v-if="state === SCIENCE"
            type="number"
            :name="`compass${i}`"
            :id="`compass${i}`"
            v-model="compasses[i]"
            @input="calc(i)"
          >
        </div>
        <div class="col">
          <span v-if="state === SCIENCE" class="score">= ({{ score[i] }})</span>
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
      data: [],
      gears: [],
      compasses: []
    };
  },
  mounted() {
    this.init();
    this.calc(1);
  },
  computed: {
    SCIENCE: function() {
      return this.phases.includes("Seekrieg") ? 6 : 5;
    },
    ...mapState({
      players: state => state.game.players
    }),
    ...mapGetters(["phases", "scores"])
  },
  methods: {
    next() {
      if (this.state === this.SCIENCE) {
        this.setScore({
          key: this.state,
          values: {
            plates: this.data,
            gears: this.gears,
            compasses: this.compasses
          }
        });
      } else {
        this.setScore({ key: this.state, values: this.data });
      }

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
    calc(i = 0) {
      if (this.state === this.SCIENCE) {
        this.score[i] = Helper.calculateScience(
          this.data[i],
          this.gears[i],
          this.compasses[i]
        );
      }
    },
    init() {
      if (this.state === this.SCIENCE) {
        this.data = this.scores(this.state).plates;
        this.gears = this.scores(this.state).gears;
        this.compasses = this.scores(this.state).compasses;
      } else {
        this.data = this.scores(this.state);
      }
      document.getElementById("player0").focus();
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