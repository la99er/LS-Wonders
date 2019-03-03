<template>
    <div>
        <h1>Zuteilung</h1>
        <assign v-for="(player, index) in players" :key="index"
                :name="player.name"
                :wonder="player.wonder"
                :side="player.side"></assign>
    </div>
</template>

<script>
import Assign from './Assign.vue';
    export default {
        components: {
            Assign
        },
        props: ["players"],
        data() {
            return {
            }
        },
    }
</script>

<style scoped>

</style>