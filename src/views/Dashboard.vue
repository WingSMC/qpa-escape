<script setup lang="ts">
import { ref } from "vue"
import useScoreStore from "../data/store/scoreStore"
import router from "../router"

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
	window.open("/#/scoreboard")
}

// TODO edit final points
</script>

<template>
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
						v-model.number="teams[i]"
						@focus="clearField(i)"
						@blur="fillField(i)"
						ref="inputs"
					/>
				</td>
				<td>{{ team.points }}</td>
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
