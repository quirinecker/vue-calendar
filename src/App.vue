<script setup lang="ts">
import { ref } from 'vue';
import type { AnonymousEvent } from './lib';
import Calendar from './components/Calendar.vue';

const events = ref<(Event | AnonymousEvent)[]>([])
</script>

<template>
	<main>
		<Calendar :events="events" @quick-create="console.log" />
	</main>
</template>

<style scoped></style>
