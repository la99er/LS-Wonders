<template>
  <div class="container">
    <score-board
      v-for="(score, index) in scoreTable"
      :key="index"
      :score="score"
      :id="index"
      :max="maxScore"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Helper from "@/helpers/helper";
import ScoreBoard from "@/components/ScoreBoard.vue";

export default {
  components: {
    ScoreBoard
  },
  computed: {
    scoreTable() {
      let score = Helper.calculateScore(this.score, this.players);
      let result = [];
      for (let i = 0; i < score.totalScore.length; i++) {
        result.push({
          name: this.players[i],
          total: score.totalScore[i],
          single: score.singleScores[i],
          wonder: this.wonders[i]
        });
      }
      return result.sort((obj1, obj2) => {
        return obj2.total - obj1.total;
      });
    },
    maxScore() {
      let max = 0;
      this.scoreTable.forEach(element => {
        const o = Object.keys(element.single).reduce((a, b) =>
          element.single[a] > element.single[b] ? a : b
        );
        max = Math.max(element.single[o], max);
      });
      return max;
    },
    ...mapState({
      players: state => state.game.players,
      score: state => state.game.score,
      wonders: state => state.game.wonders
    })
  }
};
</script>

<style scoped>
</style>