"use strict";

import "@/utilities/math";

import { remote, ipcRenderer } from "electron";

import Vue from "vue";
import VueRouter from "vue-router";
import AsyncComputed from "vue-async-computed";
import VueEventManager from "vue-event-manager";
import VueToast from "vue-toast-notification";
import VueTippy from "vue-tippy";

import App from "@/App";
import MainView from "@/Main";
import PreferencesView from "@/Preferences";

import store from "@/store/store";
import Actions from "@/store/actions";
import Preferences from "@/store/preferences";
import Payloads from "@/store/payloads";


const updatePreferenceInVuexStore = (preference, value) => {
	store.commit({
		type: Actions.SET_PREFERENCE,
		halt: true,
		preference,
		value,
	});
};

const addNotesToVuexStore = (notes) => {
	store.dispatch({
		type: Actions.ADD_NOTES,
		notes,
	});
};

const router = new VueRouter({
	mode: "hash",
	routes: [
		{
			path: "/",
			component: MainView,
			meta: {
				title: "Notebag"
			}
		},

		{
			path: "/preferences",
			component: PreferencesView,
			meta: {
				title: "Preferences"
			}
		},
	],
});

router.beforeEach((to, from, next) => {
	document.title = to.meta.title;
	next();
});


ipcRenderer.on("notes-added", (_, value) => addNotesToVuexStore(value));
ipcRenderer.on("theme-changed", (_, value) => updatePreferenceInVuexStore(Preferences.THEME, value));
ipcRenderer.on("font-size-changed", (_, value) => updatePreferenceInVuexStore(Preferences.FONT_SIZE, value));

remote.nativeTheme.on("updated", () => {
	const newTheme = remote.nativeTheme.shouldUseDarkColors
		? Payloads.THEME_DARK
		: Payloads.THEME_LIGHT;

	updatePreferenceInVuexStore(Preferences.THEME, newTheme);
});

Vue.use(VueEventManager);
Vue.use(VueRouter);
Vue.use(AsyncComputed);
Vue.use(VueToast);
Vue.use(VueTippy);

new Vue({
	render: (h) => h(App),
	router,
	store,
}).$mount("#app");
