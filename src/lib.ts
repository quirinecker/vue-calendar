import type { Moment } from "moment"

export type Seperator = {
	text: string,
	time: Moment
}

export type Timespan = {
	from: number,
	to: number
}

export type Event = AnonymousEvent & {
	title: string
}

export type AnonymousEvent = {
	from: Moment,
	to: Moment
}

export type SerializableEvent = {
	title: string,
	from: string,
	to: string
}
