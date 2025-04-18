import type { Moment } from "moment"

export type Seperator = {
	text: string,
	time: Moment
}

export type Timespan = {
	from: number,
	to: number
}

export type Event = {
	title: string,
	from: Moment,
	to: Moment
}

export type AnonymousEvent = Omit<Event, 'title'>
