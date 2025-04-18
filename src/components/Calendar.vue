<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { AnonymousEvent, Seperator, Timespan } from '../lib';
import CalendarHeader from './CalendarHeader.vue';
import CalendarCollumn from './CalendarCollumn.vue';
import moment, { type Moment } from 'moment';

const events = defineModel<AnonymousEvent[]>('events', {required: true})
const dateString = ref("")
const date = computed(() => moment(dateString.value))

type Day = {
	date: Moment
	events: AnonymousEvent[]
}

const week = computed(() => {
	return moment(date.value).startOf('week')
})

const days = computed<Day[]>(() => {
	return [...Array(7).keys()].map((i) => ({
		date: moment(week.value.day(i)),
		events: events.value.filter(
			(event) => event.from >= week.value.day(i).startOf('day') && event.to <= week.value.day(i).endOf('day')
		)
	}))
})

watch(days, () => {
	console.log("days", days.value)
})


const emits = defineEmits<{
	(e: 'quick-create', timespan: AnonymousEvent): void
}>()

const seperators = ref<Seperator[]>([
	{ text: '3 AM', time: moment().hour(3) },
	{ text: '6 AM', time: moment().hour(6) },
	{ text: '9 AM', time: moment().hour(9) },
	{ text: '12 PM', time: moment().hour(12) },
	{ text: '3 PM', time: moment().hour(15) },
	{ text: '6 PM', time: moment().hour(18) },
	{ text: '9 PM', time: moment().hour(21) },
])

function quickCreate(date: Moment, timespan: Timespan) {
	console.log(`Event from ${timespan.from * 24 * 3600 * 1000} to ${timespan.to * 24 * 3600 * 1000} `)
	const newEvent: AnonymousEvent = {
		from: moment(date).minutes(timespan.from * 24 * 60),
		to: moment(date).minutes(timespan.to * 24 * 60)
	}
	emits('quick-create', newEvent)
	events.value.push(newEvent)
}

</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div><input type="date" v-model="dateString" /></div>
		<div class="calendar flex flex-row w-full flex-1 items-stretch">
			<CalendarHeader :seperators="seperators" />

			<CalendarCollumn
				v-for="day in days"
				:seperators="seperators"
				:day="day.date"
				:events="day.events"
				@quick-create="quickCreate"
			/>

		</div>

	</div>
</template>
