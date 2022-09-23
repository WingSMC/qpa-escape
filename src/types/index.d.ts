export type Answer = {
	answer: string,
	correct: boolean
}

export type Question = {
	question: string
	answers: Answer[]
}

export type Team = {
	name: string,
	logo: string,
}
