<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import CalendarSeperator from './CalendarSeperator.vue';
import type { AnonymousEvent, Seperator, Timespan } from '../lib';
import type { Moment } from 'moment';
import CalendarEvent from './CalendarEvent.vue';
import moment from 'moment';

const props = defineProps<{
	seperators: Seperator[],
	day: Moment
	events: AnonymousEvent[]
}>()

const emit = defineEmits<{
	(e: 'quick-create', day: Moment, event: Timespan): void,
}>()

const isDragging = ref(false)
const height = ref(0)
const startY = ref(0)
const column = useTemplateRef('column')

const top = computed(() => {
	if (height.value > 0) {
		return startY.value
	} else {
		return startY.value + height.value
	}
})

function dragStart(e: MouseEvent) {
	console.log(e.target)
	height.value = 0
	startY.value = offset(e.clientY)
	isDragging.value = true
}

function dragging(e: MouseEvent) {
	if (!isDragging.value) {
		return
	}

	height.value = offset(e.clientY) - startY.value
}

function offset(n: number) {
	return n - (column.value?.getBoundingClientRect().top ?? 0)
}

function dragStop(_: MouseEvent) {
	isDragging.value = false

	if (column.value === null) {
		console.error('column element is undefined')
		return
	}

	const timeFrom = startY.value / column.value.offsetHeight
	const timeTo = (startY.value + height.value) / column.value.offsetHeight
	emit('quick-create', moment(props.day), {
		from: timeFrom,
		to: timeTo
	})

	height.value = 0
	startY.value = 0
}
</script>

<template>
	<div class="flex flex-col h-full grow">
		<div class="flex justify-center items-center bg-gray-600 h-12 text-white border-b-2 border-white">
			{{ props.day.format('dddd') }}
		</div>

		<div ref="column" @mousedown="dragStart" @mouseup="dragStop" @mousemove="dragging"
			class="bg-gray-600 text-white relative flex flex-col grow justify-evenly">
			<CalendarSeperator v-for="sep in seperators" :seperator="sep">
				<hr class="w-full">
			</CalendarSeperator>
			<div class="absolute w-full top-20 bg-black opacity-45"
				:style="{ height: `${Math.abs(height)}px`, top: `${top}px` }">{{ startY }}, {{ height }}</div>

			<CalendarEvent v-for="event in events" :event="event" />
		</div>
	</div>
</template>


<style scoped></style>
