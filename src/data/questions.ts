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
	},

	{
		question: "2 kérdés",
		answers: [
			{
				answer: "1 válasz",
				correct: false
			},
			{
				answer: "2 válasz",
				correct: false
			},
			{
				answer: "3 válasz",
				correct: false
			},
		]
	}
] as Question[]
