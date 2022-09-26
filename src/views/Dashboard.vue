<script setup lang="ts">
import { computed, ref } from "vue"
import useScoreStore from "../data/store/scoreStore"

const store = useScoreStore()
const inputs = ref(null as unknown as HTMLInputElement[])
let teams = ref([0, 0, 0] as Array<number | string>)

const clearField = (i: number) => (teams.value[i] ||= "")
const fillField = (i: number) => (teams.value[i] ||= 0)

const setRound = (e: Event) => {
	const el = e.target as HTMLInputElement
	const value = Number(el.value)
	if (store.SET_ROUND(value)) {
		return
	}
	el.value = store.$state.round.toString()
}

const commitTeams = () => {
	store.ADD_POINTS(teams.value as number[])
	teams.value = [0, 0, 0]
	inputs.value[0].focus()
}

const openScoreboard = () => {
	window.open("/#/scoreboard", "_blank", "popup=yes")
}

const currentQuestion = computed(() => store.currentQuestion)
const nextQuestion = computed(() => store.nextQuestion)
</script>

<template>
	<div class="tasksk">
		<div class="task next">
			<div class="question">{{ nextQuestion.question }}</div>
			<div class="answers">
				<div
					class="answer"
					v-for="answer in nextQuestion.answers"
					:key="answer.answer"
				>
					{{ answer.answer }} {{ answer.correct ? "✔️" : "❌" }}
				</div>
			</div>
		</div>
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
	</div>
	<form @submit.prevent="commitTeams">
		<table class="teams" ref="table">
			<tbody>
				<tr
					class="team"
					v-for="(team, i) in store.$state.teams"
					:key="team.name"
				>
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
			</tbody>
			<tfoot>
				<tr>
					<td>Round</td>
					<td>
						<button type="button" @blur="store.NEXT_ROUND">⏭️</button>
					</td>
					<input
						type="number"
						min="0"
						max="20"
						:value="store.$state.round"
						@change="setRound"
					/>
				</tr>
			</tfoot>
		</table>
		<button class="commit">Commit</button>
		<button type="button" @click="store.RESET">Reset</button>
		<button type="button" @click="openScoreboard">Scoreboard</button>
	</form>
</template>

<style>
.task {
	margin: 10px 0;
	width: 100%;
	border: 1px solid var(--theme-1);
	border-radius: 15px;
	padding: 10px;
}

.question {
	font-size: 1.5rem;
	padding: 10px;
	margin-bottom: 10px;
}

.task.next {
	transform: scale(0.6);
}
</style>
