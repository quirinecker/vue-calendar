<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import CalendarSeperator from './CalendarSeperator.vue';
import type { Seperator, Timespan } from '../lib';
import type { Moment } from 'moment';
import CalendarEvent from './CalendarEvent.vue';
import moment from 'moment';
import type { Event } from '../lib';

const props = defineProps<{
	seperators: Seperator[],
	day: Moment
	events: Event[][]
}>()

const emit = defineEmits<{
	(e: 'quick-create', day: Moment, event: Timespan): void,
}>()

const isDragging = ref(false)
const startY = ref(0)
const endY = ref(0)
const column = useTemplateRef('column')

const height = computed(() => {
	return Math.abs(endY.value - startY.value)
})

const top = computed(() => {
	return Math.min(startY.value, endY.value)
})

function dragStart(e: MouseEvent) {
	startY.value = absoluteToRelativeY(e.clientY)
	endY.value = absoluteToRelativeY(e.clientY)
	isDragging.value = true
}

function dragging(e: MouseEvent) {
	if (!isDragging.value) {
		return
	}

	endY.value = absoluteToRelativeY(e.clientY)
}

function absoluteToRelativeY(n: number) {
	return n - (column.value?.getBoundingClientRect().top ?? 0)
}

function dragStop(_: MouseEvent) {
	isDragging.value = false

	if (column.value === null) {
		console.error('column element is undefined')
		return
	}

	const timeFrom = Math.min(endY.value, startY.value) / column.value.offsetHeight
	const timeTo = Math.max(endY.value, startY.value) / column.value.offsetHeight
	emit('quick-create', moment(props.day), {
		from: timeFrom,
		to: timeTo
	})

	startY.value = 0
	endY.value = 0
}
</script>

<template>
	<div class="flex flex-col h-full grow">
		<div class="flex justify-center items-center flex-col bg-gray-600 h-18 text-white border-b-2 border-white">
			<div>{{ props.day.format('dd').toUpperCase() }}</div>
			<div>{{ props.day.date() }}</div>
		</div>

		<div ref="column" @mousedown="dragStart" @mouseup="dragStop" @mousemove="dragging"
			class="bg-gray-600 text-white relative flex flex-col grow items-center">
			<CalendarSeperator v-for="sep in seperators" :seperator="sep">
				<hr class="w-full">
			</CalendarSeperator>
			<div class="absolute w-11/12 top-20 bg-black opacity-45 rounded-lg"
				:style="{ height: `${height}px`, top: `${top}px`, display: isDragging }"></div>

			<div v-for="collissionGroup in events" class="flex flex-row w-11/12 h-full absolute top-0">
				<CalendarEvent v-for="[index, event] in collissionGroup.entries()" :event="event" :collision_index="index" :collision_count="collissionGroup.length" />
			</div>
		</div>
	</div>
</template>


<style scoped></style>
