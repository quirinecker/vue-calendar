import type { Moment } from "moment"

export type Seperator = {
	text: string,
	time: Moment
}

export type Timespan = {
	from: number,
	to: number
}

export type AnonymousEvent = {
	from: Moment,
	to: Moment
}
