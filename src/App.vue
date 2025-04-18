<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CalendarCollumn from './components/CalendarCollumn.vue';
import type { Seperator, Timespan } from './lib';
import CalendarHeader from './components/CalendarHeader.vue';
import moment from 'moment';

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
	console.log(timespan.to - timespan.from)
	alert(`Event from ${timespan.from * 24} to ${timespan.to * 24}`)
}


onMounted(() => {
	seperators.value.forEach(sep => {
		console.log(sep.text, sep.time.hours(), sep.time.hours() / 24)
	})
})
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

<style scoped></style>
