<script setup>
    import { ref } from 'vue'

    let count = ref(0)
</script>

<template>
    <h1>Hello vue</h1>
    <button @click="count++">
        count is: {{ count }}
    </button>
</template>

<style></style>