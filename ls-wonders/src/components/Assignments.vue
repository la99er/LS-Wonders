<template>
  <div class="container">
    <h1>Zuteilung</h1>
    <assign
      v-for="(player, index) in players"
      :key="index"
      :name="player.name"
      :wonder="player.wonder"
      :side="player.side"
    ></assign>
		<router-link to="/evaluate" class="btn primary">Auswerten</router-link>
  </div>
</template>

<script>
import Assign from "./Assign.vue";
export default {
  components: {
    Assign
  },
  props: ["players"],
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>