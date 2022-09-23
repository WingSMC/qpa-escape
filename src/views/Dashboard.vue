<script setup lang="ts">
import { computed, ref } from "vue"
import useScoreStore from "../data/store/scoreStore"

const store = useScoreStore()
const inputs = ref(null as unknown as HTMLInputElement[])
let teams = ref([0, 0, 0] as Array<number | string>)

const clearField = (i: number) => (teams.value[i] ||= "")
const fillField = (i: number) => (teams.value[i] ||= 0)

const commitTeams = () => {
	store.ADD_POINTS(teams.value as number[])
	teams.value = [0, 0, 0]
	inputs.value[0].focus()
}

const openScoreboard = () => {
	window.open("/#/scoreboard", "_blank", "popup=yes")
}

const currentQuestion = computed(() => store.currentQuestion)
</script>

<template>
	<div class="task">
		<div class="question">{{ currentQuestion.question }}</div>
		<div class="answers">
			<div
				class="answer"
				v-for="answer in currentQuestion.answers"
				:key="answer.answer"
			>
				{{ answer.answer }} {{ answer.correct ? "✔️" : "❌" }}
			</div>
		</div>
	</div>
	<form @submit.prevent="commitTeams">
		<table class="teams" ref="table">
			<tr class="team" v-for="(team, i) in store.$state.teams" :key="team.name">
				<td>{{ team.name }}</td>
				<td>
					<input
						type="number"
						aria-label="Points to add"
						min="0"
						max="3"
						step="1"
						tabindex="1"
						v-model.number="teams[i]"
						@focus="clearField(i)"
						@blur="fillField(i)"
						ref="inputs"
					/>
				</td>
				<td>
					<input
						type="number"
						min="0"
						max="20"
						step="1"
						tabindex="2"
						:aria-label="`Points of team ${team.name}`"
						v-model="store.$state.points[i]"
						@change="store.PERSIST_ITEM('points')"
					/>
				</td>
			</tr>
			<tr>
				<td>
					<button class="commit">Commit</button>
				</td>
				<td>
					<button type="button" @click="store.RESET">Reset</button>
				</td>
				<td>
					<button type="button" @click="openScoreboard">Scoreboard</button>
				</td>
			</tr>
		</table>
	</form>
</template>

<style></style>
