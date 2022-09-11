<script setup lang="ts">
import useScoreStore from "../data/store/scoreStore"

const store = useScoreStore()
</script>

<template>
	<div class="teams">
		<div class="team" v-for="team in store.$state.teams" :key="team.name">
			{{ team.name }} {{ team.points }}
		</div>
	</div>
</template>

<style></style>
