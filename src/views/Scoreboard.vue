<script setup lang="ts">
import { useWindowSize } from "@vueuse/core"
import { computed, watch } from "vue"
import useScoreStore from "../data/store/scoreStore"

const store = useScoreStore()

const { width } = useWindowSize()
// TODO set prop from js here --column-width
const vw10 = computed(() => width.value / 8)

watch(
	() => store.points,
	(points) => {
		const maxPointsM6 =
			points.reduce((acc, cur) => (acc > cur ? acc : cur), 0) - 6
		const left = maxPointsM6 > 0 ? maxPointsM6 * vw10.value : 0

		scrollTo({
			left,
			behavior: "smooth",
		})
	}
)
</script>

<template>
	<div class="scoreboard">
		<div class="backdrop"></div>
		<div class="teams">
			<div
				class="team"
				v-for="(team, i) in store.$state.teams"
				:key="team.name"
				:style="`left: calc(${store.points[i]} * var(--column-width));`"
			>
				<img class="img" :src="team.logo" alt="team logo" />
			</div>
		</div>
		<div class="shadow"></div>
		<div class="question-modal" v-if="store.$state.showQuestion">
			<div class="question" v-html="store.currentQuestion.question"></div>
			<div class="answers">
				<div
					class="answer"
					v-for="answer in store.currentQuestion.answers"
					:class="store.$state.showAnswers && answer.correct ? 'correct' : ''"
					:key="answer.answer"
				>
					{{ answer.answer }}
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use "../style/vars" as *;
@use "sass:math" as math;

$column-width: var(--column-width);

.scoreboard {
	// TODO set this prop from JS
	--column-width: #{math.div(100, 8)}vw;
	height: 100vh;
}

.backdrop {
	position: absolute;
	top: 0;
	left: 0;
	width: calc($column-width * 20);
	height: 100vh;
	background-image: linear-gradient(
		to right,
		$theme-background 0,
		$theme-background $column-width,
		$theme-border $column-width,
		$theme-border calc($column-width * 2)
	);
	background-size: calc(#{$column-width} * 2) 100%;
	background-repeat: repeat-x;
}

.teams {
	display: grid;
	position: absolute;
	top: 0;
	left: $column-width;
	height: 100vh;
	width: calc($column-width * 20);
	grid-template-rows: 1fr 1fr 1fr;
	align-items: center;
	justify-items: left;
	user-select: none;
	.team {
		position: relative;
		width: $column-width;
		height: $column-width;
		transition: left 1s cubic-bezier(0.68, -0.3, 0.265, 1.3);
		padding: calc(#{$column-width} * 0.125);
		.img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			border-radius: 50%;
		}
	}
}

.shadow {
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: $column-width;
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 1) 0%,
		rgba(0, 0, 0, 0) 100%
	);
}

.question-modal {
	position: fixed;
	top: 50vh;
	left: 50vw;
	background-color: $theme-background;
	border: 2px solid $theme-border;
	border-radius: 20px;
	transform: translate(-50%, -50%);
	padding: 30px;

	.question {
		line-height: 3rem;
		font-size: 2.5rem;
		padding: 0 0 1rem;
		border-bottom: 2px solid $theme-border;
	}

	.answers {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-top: 20px;
		.answer {
			padding: 20px;
			font-size: 2rem;

			&.correct {
				color: rgb(49, 129, 35);
			}
		}
	}
}
</style>
