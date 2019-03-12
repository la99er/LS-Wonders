<template>
    <p>{{ name }} - {{ wonder }} ({{ side }})</p>
</template>

<script>
    export default {
        props: [
            "name",
            "wonder",
            "side"
        ]
    }
</script>

<style scoped>

</style>