<template>
  <div class="container" @keyup="$router.push('evaluate');">
    <h1>Zuteilung</h1>
    <div class="wrapper">
      <assign
        v-for="(assignment, index) in assignments"
        :key="index"
        :name="assignment.name"
        :wonder="assignment.wonder"
        :side="assignment.side"
      ></assign>
    </div>
    <router-link to="/evaluate" class="btn primary">Auswerten</router-link>
  </div>
</template>

<script>
import Assign from "@/components/Assign.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    // Component to display the assigned wonders
    Assign
  },
  computed: {
    ...mapGetters([
      // Get the assignments by the store.
      // {name: string, wonder: string, side: char (A/B)}
      "assignments"
    ])
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;

  .wrapper {
    margin: 10px;
  }
}
</style>