import { remote, ipcRenderer } from "electron";
import ElectronStore from "electron-store";

import Vue from "vue";
import Vuex from "vuex";

import { firstBy } from "thenby";

import EventBus, { Events } from "@/EventBus";

import store from "./electronStore";

import Actions from "@/store/actions";
import Payloads from "@/store/payloads";
import Preferences from "@/store/preferences";
import Modes from "@/store/modes";
import Shortcuts, { defaultShortcuts } from "@/store/shortcuts";
import electronStore, { noteStorage, licenseStorage, NOTES, PROJECTS, ARCHIVED_NOTES, LINKS, PREFERENCES, SHORTCUTS, ACTIVE_NOTE, ACTIVE_PROJECT } from "@/store/electronStore";

import TUTORIAL_LINKS from "@/tutorial/00-LINKS";
import TUTORIAL_INTRO from "@/tutorial/01-INTRO";
import TUTORIAL_MARKDOWN from "@/tutorial/02-MARKDOWN";
import TUTORIAL_ORGANIZING from "@/tutorial/03-ORGANIZING";
import TUTORIAL_SHORTCUTS from "@/tutorial/04-SHORTCUTS";
import TUTORIAL_OMNIBAR from "@/tutorial/05-OMNIBAR";


import {makeProject} from "@/utilities/projects";
import {makeNote} from "@/utilities/notes";
import getLicenseData from "@/utilities/getLicenseData";

const DEFAULT_THEME = remote.nativeTheme.shouldUseDarkColors
	? Payloads.THEME_DARK
	: Payloads.THEME_LIGHT;

const shortcutOs = remote.process.platform === "darwin"
	? "darwin"
	: "other";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		preferences: {
			[Preferences.NOTE_PANE_WIDTH]: electronStore.get(`${PREFERENCES}.${Preferences.NOTE_PANE_WIDTH}`, 256),
			[Preferences.THEME]: electronStore.get(`${PREFERENCES}.${Preferences.THEME}`, DEFAULT_THEME),
			[Preferences.FONT_SIZE]: electronStore.get(`${PREFERENCES}.${Preferences.FONT_SIZE}`, "16"),
			[Preferences.SHOW_DOCK]: electronStore.get(`${PREFERENCES}.${Preferences.SHOW_DOCK}`, true),

			shortcuts: {
				[Shortcuts.SHOW_HIDE_WINDOW]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.SHOW_HIDE_WINDOW}`, defaultShortcuts[shortcutOs][Shortcuts.SHOW_HIDE_WINDOW]),
				[Shortcuts.TOGGLE_THEME]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.TOGGLE_THEME}`, defaultShortcuts[shortcutOs][Shortcuts.TOGGLE_THEME]),
				[Shortcuts.TOGGLE_OMNIBAR]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.TOGGLE_OMNIBAR}`, defaultShortcuts[shortcutOs][Shortcuts.TOGGLE_OMNIBAR]),
				[Shortcuts.NEW_NOTE]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.NEW_NOTE}`, defaultShortcuts[shortcutOs][Shortcuts.NEW_NOTE]),
				[Shortcuts.DELETE_NOTE]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.DELETE_NOTE}`, defaultShortcuts[shortcutOs][Shortcuts.DELETE_NOTE]),
				[Shortcuts.COMPLETE_TODO]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.COMPLETE_TODO}`, defaultShortcuts[shortcutOs][Shortcuts.COMPLETE_TODO]),
				[Shortcuts.GO_UP_NOTE]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.GO_UP_NOTE}`, defaultShortcuts[shortcutOs][Shortcuts.GO_UP_NOTE]),
				[Shortcuts.GO_DOWN_NOTE]: electronStore.get(`${PREFERENCES}.${SHORTCUTS}.${Shortcuts.GO_DOWN_NOTE}`, defaultShortcuts[shortcutOs][Shortcuts.GO_DOWN_NOTE]),
			},

			notePath: electronStore.get(`${PREFERENCES}.${Preferences.NOTE_PATH}`, remote.app.getPath("userData")),
		},
		licenseKey: undefined,
		isTrial: licenseStorage.get("isTrial", false),
		trialStartDate: licenseStorage.get("trialStartDate", Date.now()),
		licenseLastChecked: licenseStorage.get("licenseLastChecked", 0),
		activeNote: electronStore.get(ACTIVE_NOTE, null),
		notes: noteStorage.get(NOTES, {}),
		activeProject: noteStorage.get(ACTIVE_PROJECT, ""),
		projects: noteStorage.get(PROJECTS, {}),
		archivedNotes: noteStorage.get(ARCHIVED_NOTES, {}),
		links: noteStorage.get(LINKS, []),
		mode: Modes.EDITOR,
	},
	mutations: {
		[Actions.ADD_TUTORIAL_NOTE](state) {
			const linksToInclude = TUTORIAL_LINKS.filter(
				tutorialLink => !state.links.map(existingLink => existingLink.identifier).includes(tutorialLink.identifier)
			);

			state.links = state.links.concat(linksToInclude);

			if (!this.state.notes[TUTORIAL_OMNIBAR.id]) {
				this.dispatch(Actions.ADD_NOTE, {...TUTORIAL_OMNIBAR, switchToNote: "no"});
			}

			if (!this.state.notes[TUTORIAL_SHORTCUTS.id]) {
				this.dispatch(Actions.ADD_NOTE, {...TUTORIAL_SHORTCUTS, switchToNote: "no"});
			}

			if (!this.state.notes[TUTORIAL_ORGANIZING.id]) {
				this.dispatch(Actions.ADD_NOTE, {...TUTORIAL_ORGANIZING, switchToNote: "no"});
			}

			if (!this.state.notes[TUTORIAL_MARKDOWN.id]) {
				this.dispatch(Actions.ADD_NOTE, {...TUTORIAL_MARKDOWN, switchToNote: "no"});
			}

			if (!this.state.notes[TUTORIAL_INTRO.id]) {
				this.dispatch(Actions.ADD_NOTE, {...TUTORIAL_INTRO });
			}

			noteStorage.set(LINKS, state.links);
			noteStorage.set(NOTES, state.notes);
		},

		[Actions.ARCHIVE_NOTE](state, id) {
			let notes = Object.assign({}, state.notes);
			let note = Object.assign({}, notes[id]);

			delete notes[id];

			state.notes = notes;
			state.archivedNotes = {
				...state.archivedNotes,
				[note.id]: note
			};

			noteStorage.set(NOTES, state.notes);
			noteStorage.set(ARCHIVED_NOTES, state.archivedNotes);

			Vue.$toast.info("Note has been archived.", {
				position: "bottom",
				duration: 3000,
				queue: false,
			});
		},

		[Actions.DEARCHIVE_NOTE](state, id) {
			let archivedNotes = Object.assign({}, state.archivedNotes);
			let note = Object.assign({}, archivedNotes[id]);

			delete archivedNotes[id];

			state.archivedNotes = archivedNotes;
			state.notes = {
				...state.notes,
				[note.id]: note
			};

			noteStorage.set(ARCHIVED_NOTES, state.archivedNotes);
			noteStorage.set(NOTES, state.notes);

			Vue.$toast.info("Note has been re-activated.", {
				position: "bottom",
				duration: 3000,
				queue: false,
			});
		},

		[Actions.SET_NOTE_TITLE](state, payload) {
			const { activeNote } = state;

			state.notes[activeNote].title = payload;
			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_NOTE_BODY](state, content) {
			const { activeNote } = state;

			state.notes[activeNote].preview = content.getHTML();
			state.notes[activeNote].body = content.getJSON();
			state.notes[activeNote].lastEdited = Date.now();

			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_NOTE_CATEGORIES](state, categories) {
			const { activeNote } = state;

			state.notes[activeNote].categories = categories;
			state.notes[activeNote].lastEdited = Date.now();

			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_NOTE_CURSOR](state, position) {
			const { activeNote } = state;

			state.notes[activeNote].cursorPosition = position;
			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_NOTE_SCROLL](state, position) {
			const { activeNote } = state;

			state.notes[activeNote].scrollPosition = position;
			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_NOTE_RTL](state, hasRtl) {
			const { activeNote } = state;

			state.notes[activeNote].isRtl = hasRtl;
			noteStorage.set(NOTES, state.notes);
		},

		[Actions.SET_ACTIVE_NOTE](state, id) {
			if (!(id in state.notes)) {
				state.activeNote = null;
				return;
			}

			if (state.mode !== Modes.EDITOR) {
				state.mode = Modes.EDITOR;
			}

			state.activeNote = id;

			electronStore.set(ACTIVE_NOTE, id);
			noteStorage.set(NOTES, state.notes);

			EventBus.$emit(Events.ACTIVE_NOTE_CHANGED, state.notes[id]);
			EventBus.$trigger(Events.MODE_SWITCHED, "editor");
			EventBus.$trigger(Events.MODE_SWITCHED_AFTER, "editor");
		},

		[Actions.MOVE_ONE_NOTE](state, direction) {
			const indexModifier = direction === Payloads.MOVE_DOWN
				? 1
				: -1;

			const noteKeys = Object.keys(state.notes);
			const currentNoteIndex = noteKeys.indexOf(state.activeNote);
			const newNoteIndex = currentNoteIndex + indexModifier;
			const id = noteKeys[newNoteIndex];

			if (noteKeys[newNoteIndex]) {
				state.activeNote = noteKeys[newNoteIndex];
				electronStore.set(ACTIVE_NOTE, id);
				EventBus.$emit(Events.ACTIVE_NOTE_CHANGED, state.notes[id]);
			}
		},

		[Actions.SET_PREFERENCE](state, payload) {
			const { preference, value } = payload;

			if (preference === Preferences.THEME && !payload.halt) {
				remote.getGlobal("mainWindow").send("theme-changed", value);
				remote.getGlobal("preferencesWindow").send("theme-changed", value);
			}

			if (preference === Preferences.FONT_SIZE && !payload.halt) {
				remote.getGlobal("mainWindow").send("font-size-changed", value);
			}

			if (preference === Preferences.SHOW_DOCK && !payload.halt) {
				ipcRenderer.send("toggle-dock", value);
			}

			if (preference === Preferences.NOTE_PATH) {
				ipcRenderer.send("note-path-changed", state.preferences[preference], value);
			}

			state.preferences[preference] = value;
			electronStore.set(PREFERENCES, state.preferences);
		},

		[Actions.SET_SHORTCUT](state, payload) {
			const { shortcut, oldKeys, newKeys } = payload;

			state.preferences.shortcuts[shortcut] = newKeys.slice();
			electronStore.set(`${PREFERENCES}.${SHORTCUTS}`, state.preferences.shortcuts);

			ipcRenderer.send(`shortcut-changed:${shortcut}`, oldKeys, newKeys);
			remote.getGlobal("mainWindow").send(`shortcut-changed:${shortcut}`, oldKeys, newKeys);
		},
		[Actions.SUSPEND_SHORTCUT](state, payload) {
			const { shortcut, oldKeys } = payload;

			ipcRenderer.send(`shortcut-suspended:${shortcut}`, oldKeys);
			remote.getGlobal("mainWindow").send(`shortcut-suspended:${shortcut}`, oldKeys);
		},
		[Actions.SET_MODE](state, payload) {
			state.mode = payload;
			EventBus.$trigger(Events.MODE_SWITCHED, payload);
			EventBus.$trigger(Events.MODE_SWITCHED_AFTER, payload);
		},
		[Actions.SET_LICENSE_KEY](state, { licenseKey, isTrial = false, emitEvent }) {
			state.licenseKey = licenseKey;
			state.trialStartDate = Date.now();

			if (emitEvent) {
				ipcRenderer.send("valid-license", licenseKey);

				let noteStore = new ElectronStore({
					watch: true,
					name: "notebag",
					encryptionKey: licenseKey,
					cwd: store.get("preferences.notePath", remote.app.getPath("userData"))
				});

				noteStore.set(NOTES, state.notes);
				licenseStorage.set("isTrial", false);
				state.isTrial = false;
			}

			if (isTrial) {
				licenseStorage.set("trialStartDate", Date.now());
				licenseStorage.set("isTrial", isTrial);

				state.trialStartDate = Date.now();
				state.isTrial = true;
			}
		},
		[Actions.DEACTIVATE_LICENSE](state, payload) {
			state.licenseKey = null;
			state.isTrial = false;

			if (payload && payload.halt === false) {
				ipcRenderer.send("deactivate-license");
				remote.getGlobal("mainWindow").send("deactivate-license");
			}
		},
		[Actions.SEARCH_CATEGORY](state, payload) {
			state.mode = Modes.NOTES;

			EventBus.$trigger(Events.MODE_SWITCHED, Modes.NOTES);
			EventBus.$trigger(Events.MODE_SWITCHED_AFTER, Modes.NOTES);
			EventBus.$emit(Events.SEARCHING_CATEGORY, "#" + payload);
		},
		[Actions.DETERMINE_ZETTELKASTEN](state, payload) {
			let [ note ] = Object.values(state.notes).filter(note => note.title.toLowerCase() === payload.toLowerCase());
			let [ archiveNote ] = Object.values(state.archivedNotes).filter(note => note.title.toLowerCase() === payload.toLowerCase());

			if (archiveNote) {
				Vue.$toast.info("Note is archived and cannot be viewed. Restore note to view it again.", {
					position: "bottom",
					duration: 3000,
					queue: false,
				});

				return;
			}

			if (!note) {
				let title = payload.charAt(0).toUpperCase() + payload.slice(1);
				note = this.dispatch(Actions.ADD_NOTE, { title });
				return;
			}

			this.commit(Actions.SET_ACTIVE_NOTE, note.id);
		},
		[Actions.SET_LINKS](state, payload) {
			state.links = payload;
			noteStorage.set(LINKS, state.links);
		},
		[Actions.SET_NOTES](state, payload) {
			state.notes = payload;
			noteStorage.set(NOTES, state.notes);
		},
		[Actions.ADD_NOTES](state, payload) {
			state.notes = {
				...state.notes,
				...payload,
			};
		},
		[Actions.PIN_NOTE](state, payload) {


			state.notes[payload.id].pinned = payload.project || true;
			noteStorage.set(NOTES, state.notes);
		},
		[Actions.UNPIN_NOTE](state, payload) {
			state.notes[payload].pinned = false;
			noteStorage.set(NOTES, state.notes);
		},
		[Actions.ADD_PROJECT](state, payload) {
			const project = makeProject(payload);

			state.projects = {
				...state.projects,
				[project.tag]: project
			};

			noteStorage.set(PROJECTS, state.projects);
		},
		[Actions.ADD_NOTE_TO_PROJECT](state, payload) {
			const { tag, note } = payload;

			const projectExists = state.projects[tag] !== undefined;

			if (projectExists) {
				this.state.projects[tag].notes.push(note);
				noteStorage.set(PROJECTS, state.projects);
				return;
			}

			this.commit(Actions.ADD_PROJECT, {
				tag,
				notes: [note],
			});
		},
		[Actions.REMOVE_NOTE_FROM_PROJECT](state, payload) {
			const { tag, note } = payload;
			const project = state.projects[tag];

			if (project !== undefined) {
				this.state.projects[tag].notes = project.notes.filter(pNote => pNote !== note);

				noteStorage.set(PROJECTS, state.projects);
			}
		},
		[Actions.SET_ACTIVE_PROJECT](state, payload) {
			state.activeProject = payload;
			noteStorage.set(ACTIVE_PROJECT, state.activeProject);
		},
		[Actions.DELETE_PROJECT](state, payload) {
			const projects = Object.assign({}, state.projects);
			delete projects[payload];

			state.projects = projects;
			noteStorage.set(PROJECTS, state.projects);
		},
		[Actions.TOGGLE_PROJECT_IN_SIDEBAR](state, payload) {
			state.projects[payload].pinned = !state.projects[payload].pinned;
			noteStorage.set(PROJECTS, state.projects);
		}
	},
	actions: {
		[Actions.ADD_NOTE]({ state }, payload) {
			const note = makeNote(payload);

			const safePayload = payload || {};
			const switchToNote = safePayload.switchToNote !== "no";
			const persist = safePayload.persist !== "no";

			state.notes = {
				[note.id]: note,
				...state.notes,
			};

			if (switchToNote) {
				state.activeNote = note.id;
				state.mode = Modes.EDITOR;
				electronStore.set(ACTIVE_NOTE, note.id);

				EventBus.$trigger(Events.MODE_SWITCHED, Modes.EDITOR);
				EventBus.$trigger(Events.MODE_SWITCHED_AFTER, Modes.EDITOR);
				EventBus.$emit(Events.ACTIVE_NOTE_CHANGED, state.notes[note.id]);
			}

			if (persist) {
				noteStorage.set(NOTES, state.notes);
			}

			return note;
		},

		async [Actions.DELETE_NOTE]({ state }, id) {
			const dialog = remote.require("electron").dialog;
			const { response } = await dialog.showMessageBox(remote.getGlobal("mainWindow"), {
				type: "info",
				title: "Permanently delete note?",
				message: "Are you sure you want to delete this note forever? This cannot be undone.",
				buttons: [ "Delete note", "Cancel" ],
				icon: null,
			});

			if (response === 0) {
				let notes = Object.assign({}, state.notes);
				delete notes[id];

				let archivedNotes = Object.assign({}, state.archivedNotes);
				delete archivedNotes[id];

				if (state.activeNote === id) {
					state.activeNote = null;
				}

				state.links = state.links.filter(link => link.originNote !== id);
				state.notes = notes;
				state.archivedNotes = archivedNotes;

				noteStorage.set(LINKS, state.links);
				noteStorage.set(NOTES, state.notes);
				noteStorage.set(ARCHIVED_NOTES, state.archivedNotes);

				Vue.$toast.info("Note has been deleted permanently.", {
					position: "bottom",
					duration: 3000,
					queue: false,
				});
			}
		},

		async [Actions.ADD_ZETTELKASTEN_BACKLINK]({ state, dispatch }, payload) {
			const zettelNotes = Object.values(state.notes).filter(note => note.title.toLowerCase() === payload.linkTo.toLowerCase());
			const originNote = state.notes[payload.linkFrom];
			let [ targetNote ] = zettelNotes;

			if (!targetNote) {
				targetNote = await dispatch(Actions.ADD_NOTE, {
					title: payload.linkTo.charAt(0).toUpperCase() + payload.linkTo.slice(1),
					switchToNote: "no",
				});
			}

			state.links.push({
				identifier: payload.identifier,
				originNote: originNote.id,
				targetNote: targetNote.id,
			});

			noteStorage.set(LINKS, state.links);
		},

		async [Actions.VERIFY_LICENSE](context) {
			if (licenseStorage.get("isTrial", false)) {
				return;
			}

			const licenseData = await getLicenseData(context.state.licenseKey);
			if (!licenseData) {
				return context.commit(Actions.DEACTIVATE_LICENSE);
			}
		}
	},
	getters: {
		sortedNotes: (state) => {
			const pinnedNotes = Object.values(state.notes).filter(note => note.pinned === true);
			const unpinnedNotes = Object.values(state.notes).filter(note => note.pinned !== true);

			pinnedNotes.sort(firstBy("lastEdited", "desc"));
			unpinnedNotes.sort(firstBy("lastEdited", "desc"));

			return pinnedNotes.concat(...unpinnedNotes);
		},
		isNoteActive: (state) => (id) => state.activeNote === id
	}
});
