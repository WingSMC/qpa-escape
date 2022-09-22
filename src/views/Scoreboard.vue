<script setup lang="ts">
import useScoreStore from "../data/store/scoreStore"

const store = useScoreStore()
</script>

<template>
	<table class="teams" ref="table">
		<tr class="team" v-for="(team, i) in store.$state.teams" :key="team.name">
			<td>{{ team.name }}</td>
			<td>{{ team.points }}</td>
		</tr>
	</table>
</template>

<style></style>
