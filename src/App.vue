<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Event, type SerializableEvent } from './event';
import Calendar from './components/Calendar.vue';

const events = ref<Event[]>([])

watch(events, () => {
	const serializableEvents: SerializableEvent[] = events.value.map((event) => event.toSerializable())
	localStorage.setItem('events', JSON.stringify(serializableEvents))
}, { deep: true })

onMounted(() => {
	const storedEvents = localStorage.getItem('events')
	if (storedEvents) {
		const serializableEvents = JSON.parse(storedEvents) as SerializableEvent[]
		events.value = serializableEvents.map((event) => Event.fromSerializable({
			title: event.title,
			from: event.from,
			to: event.to
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
