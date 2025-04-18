<script setup lang="ts">
import { defineProps, ref } from 'vue';
import type { AnonymousEvent, Seperator, Timespan } from '../lib';
import CalendarHeader from './CalendarHeader.vue';
import CalendarCollumn from './CalendarCollumn.vue';
import moment from 'moment';

defineProps<{
	events: (AnonymousEvent | Event)[]
}>()

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

function quickCreate(timespan: Timespan) {
	console.log(`Event from ${timespan.from * 24} to ${timespan.to * 24}`)
	emits('quick-create', {
		to: moment().hours(timespan.to * 24),
		from: moment().hours(timespan.from * 24)
	})
}

</script>

<template>
	<div class="calendar flex flex-row">
		<CalendarHeader :seperators="seperators" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
		<CalendarCollumn :seperators="seperators" @quick-create="quickCreate" />
	</div>
</template>
