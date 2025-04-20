<script setup lang="ts">
import { computed } from 'vue';
import type { EventDimensions, EventWithCollisions, Event } from '../lib';
import moment from 'moment';

const props = defineProps<{
	event: EventWithCollisions
	columnIndex: number
}>()

const emit = defineEmits<{
	(e: 'move', event: Event, dimensions: EventDimensions): void,
}>()

const dimensions = computed<EventDimensions>(() => {
	const start_of_day = moment(props.event.from).startOf('day')
	const minutes_in_day = 24 * 60
	const from_percentage = props.event.from.diff(start_of_day, 'minutes') / minutes_in_day
	const to_percentage = props.event.to.diff(start_of_day, 'minutes') / minutes_in_day

	return {
		from: Math.min(from_percentage, to_percentage) * 100,
		to: Math.max(from_percentage, to_percentage) * 100
	}
})

const left = computed(() => {
	return (100 / (props.event.collisions + 1)) * props.columnIndex
})

const widht = computed(() => {
	return (100 / (props.event.collisions + 1))
})

const height = computed(() => {
	return Math.abs(dimensions.value.from - dimensions.value.to)
})

const top = computed(() => {
	return Math.min(dimensions.value.from, dimensions.value.to)
})

function dragStart(_: DragEvent) {
	emit('move', props.event as Event, dimensions.value)
}

</script>

<template>
	<div class="absolute rounded-lg h-0 top-20 bg-black opacity-45 p-2 flex flex-col" @mousedown.stop @mouseover.stop
		@mouseup.stop draggable="true" @dragstart="dragStart"
		:style="{ top: `${top}%`, height: `${height}%`, left: `${left}%`, width: `${widht}%` }">
		<div>{{ event.from.format('HH:mm') }} - {{ event.to.format('HH:mm') }}</div>
		<div>{{ event.title }}</div>
	</div>
</template>
