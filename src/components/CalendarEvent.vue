<script setup lang="ts">
import { computed } from 'vue';
import type { AnonymousEvent } from '../lib';
import moment from 'moment';

const props = defineProps<{
	event: AnonymousEvent
}>()

const dimensions = computed(() => {
	const start_of_day = moment(props.event.from).startOf('day')
	const minutes_in_day = 24 * 60
	const from_percentage = props.event.from.diff(start_of_day, 'minutes') / minutes_in_day
	const to_percentage = props.event.to.diff(start_of_day, 'minutes') / minutes_in_day

	console.log(from_percentage, to_percentage)

	return {
		top: Math.abs(from_percentage) * 100,
		height: (to_percentage - from_percentage) * 100
	}
})

</script>

<template>
	<div class="absolute w-full h-0 top-20 bg-black opacity-45"
		:style="{ top: `${dimensions.top}%`, height: `${dimensions.height}%` }"></div>
</template>
