<script setup lang="ts">
import { computed } from 'vue';
import type { Event } from '../lib';
import moment from 'moment';

const props = defineProps<{
	event: Event,
	collision_index: number,
	collision_count: number
}>()

const dimensions = computed(() => {
	const start_of_day = moment(props.event.from).startOf('day')
	const minutes_in_day = 24 * 60
	const from_percentage = props.event.from.diff(start_of_day, 'minutes') / minutes_in_day
	const to_percentage = props.event.to.diff(start_of_day, 'minutes') / minutes_in_day

	return {
		top: Math.abs(from_percentage) * 100,
		height: (to_percentage - from_percentage) * 100
	}
})

const left = computed(() => {
	return props.collision_index / props.collision_count * 100
})

const widht = computed(() => {
	return (100 / props.collision_count)
})


</script>

<template>
	<div class="absolute rounded-lg h-0 top-20 bg-black opacity-45 p-2 flex flex-col"
		:style="{ top: `${dimensions.top}%`, height: `${dimensions.height}%`, left: `${left}%`, width: `${widht}%` }">
		<div>{{ event.from.format('HH:mm') }} - {{ event.to.format('HH:mm') }}</div>
		<div>{{ event.title }}</div>
	</div>
</template>
