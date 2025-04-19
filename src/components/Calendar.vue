<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Seperator, Timespan, Event } from '../lib';
import CalendarHeader from './CalendarHeader.vue';
import CalendarCollumn from './CalendarCollumn.vue';
import moment, { type Moment } from 'moment';

const events = defineModel<Event[]>('events', { required: true })
const dateString = ref(moment().format("YYYY-MM-DD"))
const date = computed(() => moment(dateString.value))

type Day = {
	date: Moment
	events: Event[]
}

const week = computed(() => {
	return moment(date.value).startOf('week')
})

const days = computed<Day[]>(() => {
	return [1, 2, 3, 4, 5, 6, 0].map((i) => ({
		date: moment(week.value.day(i)),
		events: events.value.filter(
			(event) => event.from >= week.value.day(i).startOf('day') && event.to <= week.value.day(i).endOf('day')
		)
	}))
})

const emits = defineEmits<{
	(e: 'create', timespan: Event): void
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
	const eventTitle = prompt("Event title")

	if (eventTitle === null) {
		return
	}

	const newEvent: Event = {
		title: eventTitle,
		from: moment(date).startOf('day').minutes(timespan.from * 24 * 60),
		to: moment(date).startOf('day').minutes(timespan.to * 24 * 60)
	}

	emits('create', newEvent)
	events.value.push(newEvent)
}

</script>

<template>
	<div class="w-full h-full flex flex-col">
		<div><input type="date" v-model="dateString" /></div>
		<div class="calendar flex flex-row w-full flex-1 items-stretch">
			<CalendarHeader :seperators="seperators" />

			<CalendarCollumn v-for="day in days" :seperators="seperators" :day="day.date" :events="day.events"
				@quick-create="quickCreate" />
		</div>

	</div>
</template>
