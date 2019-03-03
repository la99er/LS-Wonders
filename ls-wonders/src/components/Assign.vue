<template>
    <div>
        <p>{{ name }} - {{ wonder }} ({{ side }})</p>
    </div>
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