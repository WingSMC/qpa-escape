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
		teams: createTeams(),
		questions: createQuestions(),
		round: 0,
	}) as State,
	actions: {
		ADD_POINTS(points: number[]) {
			const [a, b, c] = points
			const teams = this.$state.teams
			teams[0].points += a
			teams[1].points += b
			teams[2].points += c
			localStorage.setItem("teams", JSON.stringify(this.$state.teams))
		},
		LOAD_ITEM(key: keyof State) {
			this.$state[key] = JSON.parse(localStorage.getItem(key)!)
		}
	},
})

window.addEventListener("storage", (e: StorageEvent) => {
	const store = useScoreStore()
	const { key } = e
	store.LOAD_ITEM(key as keyof State)
})

export default useScoreStore
