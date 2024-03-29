import { createRouter, createWebHashHistory } from "vue-router"

import Dashboard from "../views/Dashboard.vue"
import Scoreboard from "../views/Scoreboard.vue"
import Grid from "../views/Grid.vue"

const router = createRouter({
	routes: [
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard,
			meta: {
				title: "Dashboard"
			},
		},
		{
			path: "/scoreboard",
			name: "scoreboard",
			component: Scoreboard,
			meta: {
				title: "Scoreboard"
			},
		},
		{
			path: "/grid",
			name: "grid",
			component: Grid,
			meta: {
				title: "Grid"
			},
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: { name: "dashboard" },
		}
	],
	history: createWebHashHistory(),
})

router.beforeEach((to, from, next) => {
	document.title = `QPA Escape | ${to.meta.title}`
	next()
})

export default router
