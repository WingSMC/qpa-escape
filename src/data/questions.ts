import type { Question } from "../types"

export default () => [
	{
		question: "What is the capital of the United States?",
		answers: [
			{
				answer: "Washington D.C.",
				correct: true
			},
			{
				answer: "New York",
				correct: false
			},
			{
				answer: "Los Angeles",
				correct: false
			},
		]
	}
] as Question[]
