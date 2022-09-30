import type { Question, Team } from "../../types"

import { defineStore } from "pinia"
import createTeams from "../teams"
import createQuestions from "../questions"

interface State {
	teams: Team[],
	questions: Question[],
	points: number[]
	round: number,
	showQuestion: boolean,
	showAnswers: boolean,
}

const useScoreStore = defineStore("scoreStore", {
	state: () => ({
		teams: createTeams(),
		questions: createQuestions(),
		points: JSON.parse(localStorage.getItem("points")!!) ?? [0, 0, 0],
		round: JSON.parse(localStorage.getItem("round")!!) ?? 0,
		showQuestion: JSON.parse(localStorage.getItem("showQuestion")!!) ?? false,
		showAnswers: JSON.parse(localStorage.getItem("showAnswers")!!) ?? false,
	}) as State,
	actions: {
		ADD_POINTS(points: number[]) {
			for (let i = 0; i < 3; ++i) {
				if (typeof points[i] !== "number") {
					this.points[i] += Number(points[i])
					continue
				}
				this.points[i] += points[i]
			}
			this.PERSIST_ITEM("points")
		},
		NEXT_ROUND(): boolean {
			const nextRound = this.round + 1
			if (nextRound >= this.questions.length) return false
			this.round = nextRound
			this.showAnswers = false
			this.PERSIST_ITEM("round")
			this.PERSIST_ITEM("showAnswers")
			return true
		},
		PREV_ROUND(): boolean {
			if (this.$state.round <= 0) return false
			--this.$state.round
			this.showAnswers = false
			this.PERSIST_ITEM("round")
			this.PERSIST_ITEM("showAnswers")
			return true
		},
		SET_ROUND(round: number): boolean {
			if (round < 0 || this.questions.length <= round) {
				return false
			}
			this.round = round
			this.showAnswers = false
			this.PERSIST_ITEM("round")
			this.PERSIST_ITEM("showAnswers")
			return true
		},
		TOGGLE_QUESTION_SHOW() {
			this.showQuestion = !this.showQuestion
			this.PERSIST_ITEM("showQuestion")
		},
		HIDE_QUESTION() {
			this.showQuestion = false
			this.PERSIST_ITEM("showQuestion")
		},
		REVEAL_ANSWERS() {
			this.showAnswers = true
			this.PERSIST_ITEM("showAnswers")
		},
		LOAD_ITEM(key: keyof State) {
			if (key in this.$state) {
				const item = localStorage.getItem(key)
				if (item) {
					// @ts-ignore
					this[key] = JSON.parse(item)
				}
			} else if (key === null) {
				this.$reset()
			}
		},
		PERSIST_ITEM(key: keyof State) {
			localStorage.setItem(key, JSON.stringify(this[key]))
		},
		RESET() {
			if (!confirm("Biztosan újra akarod kezdeni a játékot?")) return
			localStorage.clear()
			this.$reset()
		},
	},
	getters: {
		currentQuestion: (state): Question => state.questions[state.round],
		nextQuestion: (state): Question => (
			state.questions[state.round + 1] ?? { question: "❌Nincs több kédés❌", answers: [] }
		),
	},
})

addEventListener("storage", ({ key }: StorageEvent) => {
	const store = useScoreStore()
	store.LOAD_ITEM(key as keyof State)
})

export default useScoreStore
