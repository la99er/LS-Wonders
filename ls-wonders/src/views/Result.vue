<template>
  <div class="container">
    <score-board />
    <div v-for="(score, index) in scoreTable" :key="index">

      <p>{{ score.name }} hat {{ score.score }} Punkte mit {{ score.wonder.name }} ({{ score.wonder.side }}) erzielt.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ScoreBoard from '@/components/ScoreBoard.vue';

export default {
  components: {
    ScoreBoard
  },
  computed: {
    ...mapState({
      players: state => state.game.players
    }),
    ...mapGetters([
      'scoreTable'
    ])
  },
};
</script>

<style scoped>
</style>