<script setup lang="ts">
import { ref } from 'vue';
import type { AnonymousEvent } from './lib';
import Calendar from './components/Calendar.vue';

const events = ref<AnonymousEvent[]>([])
</script>

<template>
	<main class="flex justify-center items-center h-screen w-screen">
		<div class="w-11/12 h-11/12 overflow-scroll">
			<Calendar v-model:events="events" />
		</div>
	</main>
</template>

<style scoped></style>
