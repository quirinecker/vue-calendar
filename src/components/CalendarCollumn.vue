<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import CalendarSeperator from './CalendarSeperator.vue';
import type { Seperator, Timespan } from '../lib';

defineProps<{
	seperators: Seperator[],
}>()

const emit = defineEmits<{
	(e: 'quick-create', event: Timespan): void,
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
	startY.value = e.clientY
	isDragging.value = true
}

function dragging(e: MouseEvent) {
	if (!isDragging.value) {
		return
	}

	height.value = e.clientY - startY.value
}

function dragStop(_: MouseEvent) {
	isDragging.value = false

	if (column.value === null) {
		console.error('column element is undefined')
		return
	}

	const timeFrom = startY.value / column.value.offsetHeight
	const timeTo = (startY.value + height.value) / column.value.offsetHeight
	emit('quick-create', {
		from: timeFrom,
		to: timeTo
	})
}
</script>

<template>
	<div ref="column" @mousedown="dragStart" @mouseup="dragStop" @mousemove="dragging"
		class="bg-gray-600 text-white relative h-screen w-32 flex flex-col justify-evenly">
		<CalendarSeperator v-for="sep in seperators" :seperator="sep">
			<hr class="w-full">
		</CalendarSeperator>
		<div class="absolute w-full h-32 top-20 bg-black opacity-45"
			:style="{ height: `${Math.abs(height)}px`, top: `${top}px` }">{{ startY }}, {{ height }}</div>
	</div>
</template>


<style scoped></style>
