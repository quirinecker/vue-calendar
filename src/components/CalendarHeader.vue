<script setup lang="ts">
import type { Seperator } from '../lib';
import CalendarSeperator from './CalendarSeperator.vue';

defineProps<{
	seperators: Seperator[],
}>()



</script>

<template>
	<div class="calendar-legend bg-gray-600 text-white relative h-full w-fit flex flex-col flex-1 justify-evenly">
		<CalendarSeperator v-for="sep in seperators" :seperator="sep">
			{{ sep.text }}
		</CalendarSeperator>
	</div>
</template>

<style scoped></style>
