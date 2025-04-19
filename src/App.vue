<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Event, SerializableEvent } from './lib';
import Calendar from './components/Calendar.vue';
import moment from 'moment';

const events = ref<Event[]>([])

watch(events, () => {
	const serializableEvents: SerializableEvent[] = events.value.map((event) => ({
		title: event.title,
		from: event.from.toISOString(),
		to: event.to.toISOString()
	}))

	console.log("events", serializableEvents, events.value)

	localStorage.setItem('events', JSON.stringify(serializableEvents))

}, { deep: true })

onMounted(() => {
	const storedEvents = localStorage.getItem('events')
	if (storedEvents) {
		const serializableEvents = JSON.parse(storedEvents) as SerializableEvent[]
		events.value = serializableEvents.map((event) => ({
			title: event.title,
			from: moment(event.from),
			to: moment(event.to)
		}))
	}
})

function clearCalendar() {
	events.value = []
}

</script>

<template>
	<main class="flex justify-center items-center h-screen w-screen">
		<div class="w-11/12 h-11/12 overflow-scroll">
			<button class="bg-black rounded-lg text-white px-2 py-1 cursor-pointer" @click="clearCalendar">Clear
				Calendar</button>
			<Calendar v-model:events="events" />
		</div>
	</main>
</template>

<style scoped></style>
