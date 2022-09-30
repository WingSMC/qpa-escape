import type { Question } from "../types"

export default () => [
	{
		question: "Fóbiák",
		answers: [
			{
				answer: "Amaxophobia",
				correct: true
			},
			{
				answer: "Acrophobia",
				correct: true
			},
			{
				answer: "Gynophobia",
				correct: true
			},
		]
	},
	{
		question: "Filmek beszélő állatokkal",
		answers: [
			{
				answer: "Shrek",
				correct: true
			},
			{
				answer: "King-kong",
				correct: false
			},
			{
				answer: "A Gondozoo (Zookeeper)",
				correct: true
			},
		]
	},
	{
		question: "Merevedési zavarra szedett gyógyszerek",
		answers: [
			{
				answer: "Allegra",
				correct: false
			},
			{
				answer: "Viagra",
				correct: true
			},
			{
				answer: "Adderall",
				correct: false
			},
		]
	},
	{
		question: "Sci-Fi univerzum galaktikus birodalommal",
		answers: [
			{
				answer: "Dan Simmons: Hyperion",
				correct: false
			},
			{
				answer: "Isaac Asimov: Az Alapítvány",
				correct: true
			},
			{
				answer: "Liu Cixin: Háromtest-probléma",
				correct: false
			},
		]
	},
	{
		question: "Gombafajták",
		answers: [
			{
				answer: "Szikla Pirosító",
				correct: false
			},
			{
				answer: "Nyálkás Tűpárna",
				correct: false
			},
			{
				answer: "Szemcsésnyelű fenyőtinórú",
				correct: true
			},
		]
	},
	{
		question: "A Gyűrűk Ura univerzum valamely 3 tünde gyűrűjének volt/aktuális tulajdonosa",
		answers: [
			{
				answer: "Gandalf",
				correct: true
			},
			{
				answer: "Elrond",
				correct: true
			},
			{
				answer: "Arwen",
				correct: false
			},
		]
	},
	{
		question: "Millenium problémák",
		answers: [
			{
				answer: "Birch és Swinnerton-Dyer-sejtés",
				correct: true
			},
			{
				answer: "P=NP probléma",
				correct: true
			},
			{
				answer: "Fermat-sejtés",
				correct: false
			},
		]
	},
	{
		question: "Liszt Ferenc művek",
		answers: [
			{
				answer: "Mazeppa",
				correct: true
			},
			{
				answer: "Tannhäuser",
				correct: false
			},
			{
				answer: "20. Magyar rapszódia",
				correct: false
			},
		]
	},
	{
		question: "Évfordulók",
		answers: [
			{
				// 6
				answer: "Vas",
				correct: true
			},
			{
				// 50
				answer: "Platina",
				correct: true
			},
			{
				// 30
				answer: "Gyöngy",
				correct: true
			},
		]
	},
	{
		question: "Kia által gyártott autók",
		answers: [
			{
				answer: "Expedition",
				correct: false
			},
			{
				answer: "Reaver",
				correct: false
			},
			{
				answer: "Rio",
				correct: true
			},
		]
	},
	{
		question: "Felhőosztályok",
		answers: [
			{
				answer: "Cumulus",
				correct: true
			},
			{
				answer: "Cirmius",
				correct: false
			},
			{
				answer: "Cirrus",
				correct: true
			},
		]
	},
	{
		question: "Szökőévek",
		answers: [
			{
				answer: "1900",
				correct: false
			},
			{
				// 1752 az első szökőév
				answer: "1748",
				correct: false
			},
			{
				answer: "2000",
				correct: true
			},
		]
	},
	{
		question: "Fővárosok",
		answers: [
			{
				answer: "Sydney",
				correct: false
			},
			{
				answer: "Mumbai",
				correct: false
			},
			{
				answer: "Shanghai",
				correct: false
			},
		]
	}
] as Question[]
