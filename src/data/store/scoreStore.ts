import type { Question, Team } from "../../types"

import { defineStore } from "pinia"
import createTeams from "../teams"
import createQuestions from "../questions"

interface State {
	teams: Team[],
	questions: Question[],
	round: number,
}

const useScoreStore = defineStore("scoreStore", {
	state: () => ({
		teams: JSON.parse(localStorage.getItem("teams")!!) ?? createTeams(),
		questions: createQuestions(),
		round: JSON.parse(localStorage.getItem("round")!!) ?? 0,
	}) as State,
	actions: {
		ADD_POINTS(points: number[]) {
			this.$state.teams.forEach((team, i) => { team.points += points[i] })
			this.PERSIST_ITEM("teams")
		},
		LOAD_ITEM(key: keyof State) {
			if (key in this.$state) {
				const item = localStorage.getItem(key)
				if (item) {
					this.$state[key] = JSON.parse(item)
				}
			}
		},
		RESET() {
			localStorage.clear()
			this.$reset()
		},
		PERSIST_ITEM(key: keyof State) {
			localStorage.setItem(key, JSON.stringify(this.$state[key]))
		},
	},
})

addEventListener("storage", (e: StorageEvent) => {
	const store = useScoreStore()
	const { key } = e
	store.LOAD_ITEM(key as keyof State)
})

export default useScoreStore
