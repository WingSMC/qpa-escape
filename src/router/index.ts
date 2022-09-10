import { createRouter, createWebHashHistory } from "vue-router"

import Dashboard from "../views/Dashboard.vue"
import Scoreboard from "../views/Scoreboard.vue"

const router = createRouter({
	routes: [
		{
			path: "/dashboard",
			name: "dashboard",
			component: Dashboard
		},
		{
			path: "/scoreboard",
			name: "scoreboard",
			component: Scoreboard
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: { name: "dashboard" }
		}
	],
	history: createWebHashHistory()
})

export default router
