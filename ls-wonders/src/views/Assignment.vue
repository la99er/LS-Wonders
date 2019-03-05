<template>
  <div class="container">
    <h1>Zuteilung</h1>
    <assign
      v-for="(assignment, index) in assignments"
      :key="index"
      :name="assignment.name"
      :wonder="assignment.wonder"
      :side="assignment.side"
    ></assign>
		<router-link to="/evaluate" class="btn primary">Auswerten</router-link>
  </div>
</template>

<script>
import Assign from "@/components/Assign.vue";
import { mapGetters } from 'vuex';

export default {
  components: {
    Assign
  },
  computed: {
    ...mapGetters([
      'assignments'
    ])
  }
};
</script>

<style scoped>
</style>