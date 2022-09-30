<script lang="ts" setup>
import { ref } from "vue"

const { question } = defineProps<{
	question: string
}>()

let flipped = ref(false)
</script>

<template>
	<div class="task" :class="{ flipped }" @click="flipped = true">
		<div class="question" v-html="question"></div>
	</div>
</template>

<style lang="scss" scoped></style>
