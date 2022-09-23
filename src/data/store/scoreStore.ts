import type { Question, Team } from "../../types"

import { defineStore } from "pinia"
import createTeams from "../teams"
import createQuestions from "../questions"

interface State {
	teams: Team[],
	questions: Question[],
	points: number[]
	round: number,
}

const useScoreStore = defineStore("scoreStore", {
	state: () => ({
		teams: createTeams(),
		questions: createQuestions(),
		points: JSON.parse(localStorage.getItem("points")!!) ?? [0, 0, 0],
		round: JSON.parse(localStorage.getItem("round")!!) ?? 0,
	}) as State,
	actions: {
		ADD_POINTS(points: number[]) {
			for (let i = 0; i < 3; i++) {
				this.$state.points[i] += points[i]
			}
			this.PERSIST_ITEM("points")
		},
		INCREMENT_ROUND() {
			++this.$state.round
			this.PERSIST_ITEM("round")
		},
		LOAD_ITEM(key: keyof State) {
			if (key in this.$state) {
				const item = localStorage.getItem(key)
				if (item) {
					this.$state[key] = JSON.parse(item)
				}
			} else if (key === null) {
				this.$reset()
			}
		},
		PERSIST_ITEM(key: keyof State) {
			localStorage.setItem(key, JSON.stringify(this.$state[key]))
		},
		RESET() {
			localStorage.clear()
			this.$reset()
		},
	},
	getters: {
		currentQuestion: (state) => state.questions[state.round]
	},
})


addEventListener("storage", (e: StorageEvent) => {
	const store = useScoreStore()
	console.log(e)

	store.LOAD_ITEM(e.key as keyof State)
})

export default useScoreStore
