<template>
  <div class="container">
    <div v-for="(score, index) in scoreTable" :key="index">
      <p>{{ score.name }} hat {{ score.score }} Punkte mit {{ score.wonder.name }} ({{ score.wonder.side }}) erzielt.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
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