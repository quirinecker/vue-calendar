<script setup lang="ts">
import type { Moment } from 'moment';
import type { Seperator } from '../lib';

defineProps<{
	seperator: Seperator
}>();

const relativePositionOf = function (time: Moment) {
	return `${(time.hours() / 24) * 100}%`
}

</script>

<template>
	<div :style="{top: relativePositionOf(seperator.time)}" class="h-10 w-full flex justify-center items-center text-white border-white absolute -translate-y-1/2">
		<slot />
	</div>
</template>

<style scoped></style>
