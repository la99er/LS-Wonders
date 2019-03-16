<template>
  <div class="container">
    <score-board v-for="(score, index) in scoreTable" :key="index" :score="score" />
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