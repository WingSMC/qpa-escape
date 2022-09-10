import type { Question, Team } from "../types"

import { defineStore } from "pinia"
import createTeams from "./teams"
import createQuestions from "./questions"

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
		},
	},
	getters: {

	},
})

export default useScoreStore
