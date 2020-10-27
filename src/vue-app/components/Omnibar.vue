<template>
	<div v-show="active" v-click-outside="hideOmnibar" class="omnibar">
		<div class="omnibar__categories omnibar-categories">
			<div :class="categoryClass(Modes.NOTES)" tabindex="0" @keydown="event => setMode(Modes.NOTES, event)" @click="setMode(Modes.NOTES)">Notes</div>
			<div :class="categoryClass(Modes.ACTIONS)" tabindex="0" @keydown="event => setMode(Modes.ACTIONS, event)" @click="setMode(Modes.ACTIONS)">Actions</div>
		</div>

		<input v-model="searchInput" @keydown="handleEnter" ref="omniInput" tabindex="0" type="text" placeholder="Start searching…" class="omnibar__input">
		<div class="omnibar__results">
			<note-list v-if="mode === Modes.NOTES" :notes="searchResults" compact />
			<action-list v-if="mode === Modes.ACTIONS" :actions="searchResults" @action="hideOmnibar" />
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	import { ipcRenderer } from "electron";
	import { mapGetters } from "vuex";
	import Mousetrap from "mousetrap";
	import Fuse from "fuse.js";

	import EventBus, { Events } from "@/EventBus";

	import electronStore from "@/store/electronStore";
	import Shortcuts, { defaultShortcuts, shortcutOs } from "@/store/shortcuts";
	import Actions from "@/store/actions";
	import OMNI_ACTIONS from "@/store/omniActions";

	import { isEnterKey } from "@/utilities/keycode";
	import { makeAccelerator, redefineMousetrapShortcut } from "@/utilities/shortcuts";
	import ClickOutside from "@/directives/ClickOutside";

	import NoteList from "@/components/NoteList";
	import ActionList from "@/components/ActionList";


	const Modes = {
		NOTES: "notes",
		ACTIONS: "actions",
	};

	const FUSE_OPTIONS = {
		isCaseSensitive: false,
		includeMatches: false,
		includeScore: false,
		useExtendedSearch: true,
		findAllMatches: false,
		minMatchCharLength: 5,
		shouldSort: true,
		threshold: 0.6,
		location: 0,
		distance: 10000,
		keys: [
			"title",
			"preview",
			"categories",
		],
	};

	export default {
		name: "Omnibar",
		props: [ "editor" ],
		directives: { ClickOutside },
		components: { NoteList, ActionList },
		methods: {
			redefineShortcut: redefineMousetrapShortcut.bind(this),
			handleEnter(event) {
				if (isEnterKey(event) && this.mode === Modes.NOTES) {
					const [ note ] = this.searchResults;
					if (!note || this.$store.state.activeNote === note.id) { return; }

					this.$store.commit(Actions.SET_ACTIVE_NOTE, note.id);
					return;
				}

				if (isEnterKey(event) && this.mode === Modes.ACTIONS) {
					const [ action ] = this.searchResults;

					action.handler();
					this.hideOmnibar();
					return;
				}
			},
			categoryClass(mode) {
				return {
					"omnibar-categories__category": true,
					"is-active": this.mode === mode,
				};
			},
			hideOmnibar() {
				this.active = false;
			},
			[Shortcuts.TOGGLE_OMNIBAR]() {
				this.active = !this.active;

				if (this.active) {
					this.searchInput = "";
					return setTimeout(() => this.$refs.omniInput.focus(), 25);
				}

				return setTimeout(() => EventBus.$emit(Events.OMNIBAR_HIDDEN), 25);
			},
			cycleElements(event) {
				this.$nextTick(() => {
					const tabbableElements = document.querySelectorAll(".omnibar [tabindex]:not(.omnibar-categories__category):not(.action)");

					let operand = event.which === 40 ? 1 : -1;

					this.selectedIndex = this.selectedIndex + operand;

					if (this.selectedIndex > tabbableElements.length - 1) {
						this.selectedIndex = 0;
					}

					if (this.selectedIndex < 0) {
						this.selectedIndex = tabbableElements.length - 1;
					}

					tabbableElements[this.selectedIndex].focus();
				});
			},
			switchToNote(idx) {
				const notes = Object.values(this.searchResults);
				const note = notes[idx];

				if (note) {
					this.$store.commit(Actions.SET_ACTIVE_NOTE, note.id);
				}
			},
			setupOmnibarShortcuts() {
				this.selectedIndex = 0;

				for (let i=1; i<10; i++) {
					Mousetrap.bind(`ctrl+${i}`, () => this.switchToNote(i-1));
				}

				Mousetrap.bind("down", this.cycleElements);
				Mousetrap.bind("up", this.cycleElements);
			},
			teardownOmnibarShortcuts() {
				for (let i=1; i<10; i++) {
					Mousetrap.unbind(`ctrl+${i}`);
				}

				Mousetrap.unbind("down");
				Mousetrap.unbind("up");
			},
			setMode(mode, event) {
				if (event && event.which !== 13 && event.which !== 32) {
					return;
				}

				this.mode = mode;
			}
		},
		watch: {
			notes: {
				handler(newNotes) {
					const notes = Object.values(newNotes);
					this.searchAgent = new Fuse(notes, FUSE_OPTIONS);
				},
				deep: true,
			},

			mode(newMode) {
				if (newMode === Modes.NOTES) {
					this.searchAgent = new Fuse(this.notes, FUSE_OPTIONS);
				}

				if (newMode === Modes.ACTIONS) {
					const actionOptions = {
						...FUSE_OPTIONS,
						threshold: 0.3,
						keys: [
							"shortcut",
							"name",
						],
					};
					this.searchAgent = new Fuse(OMNI_ACTIONS, actionOptions);
				}

				this.searchInput = "";
			},

			active(isActive) {
				isActive
					? this.setupOmnibarShortcuts()
					: this.teardownOmnibarShortcuts();
			}
		},
		events: {
			[Events.MODE_SWITCHED]() {
				this.hideOmnibar();
			}
		},
		computed: {
			...mapGetters({
				notes: "sortedNotes",
			}),
			editorMode() {
				return this.$store.state.mode;
			},
			searchResults() {
				if (this.mode === Modes.NOTES) {
					if (!this.active) return this.notes;
					if (!this.searchInput) return this.notes;
				}

				if (this.mode === Modes.ACTIONS) {
					if (!this.active) return OMNI_ACTIONS;
					if (!this.searchInput) return OMNI_ACTIONS;
				}

				return this.searchAgent.search(this.searchInput).map(result => result.item);
			}
		},
		data() {
			return {
				Modes,
				active: false,
				mode: Modes.NOTES,
				selectedIndex: 0,
				searchInput: "",
				searchAgent: new Fuse(this.$store.getters.sortedNotes, FUSE_OPTIONS)
			};
		},
		created() {
			const toggleOmnibarAccelerator = makeAccelerator(
				electronStore.get(`preferences.shortcuts.${Shortcuts.TOGGLE_OMNIBAR}`, defaultShortcuts[shortcutOs][Shortcuts.TOGGLE_OMNIBAR]),
				true
			);

			Mousetrap(this.$el).bind("esc", this.hideOmnibar);
			Mousetrap.bind(toggleOmnibarAccelerator, this[Shortcuts.TOGGLE_OMNIBAR]);

			EventBus.$on(Events.ACTIVE_NOTE_CHANGED, () => this.hideOmnibar());
			ipcRenderer.on(`shortcut-changed:${Shortcuts.TOGGLE_OMNIBAR}`, (_, oldKeys, newKeys) => this.redefineShortcut(Shortcuts.TOGGLE_OMNIBAR, oldKeys, newKeys));
		}
	};
</script>

<style lang="scss">
	.omnibar {
		position: absolute;
		top: 20%;
		left: 50%;
		border-radius: 4px;
		transform: translateX(-50%);
		box-shadow: 0 4px 36px -12px rgba(0, 0, 0, 1);
		width: 100%;
		max-width: 640px;
		z-index: 9999;
		background: var(--omnibar-background);
		border: 1px solid var(--omnibar-border);
		overflow: hidden;


		&__categories {
			display: flex;
		}

		&__input {
			border-bottom-right-radius: 4px;
			border-bottom-left-radius: 4px;
			width: 100%;
			padding: .66rem;
			border: none;
			background: transparent;
			color: var(--text);
			background: var(--omnibar-input);

		}

		&__results {
			overflow-y: auto;
			max-height: 50vh;
		}
	}

	.omnibar-categories {
		&__category {
			line-height: 1;
			padding: .66rem 1rem;

			&:hover,
			&:focus {
				outline: none;
				cursor: pointer;
				background: var(--omnibar-focus);
			};

			&.is-active {
				background: var(--primary);
				color: var(--primary--inverse);

				&:hover,
				&:focus {
					background-color: var(--primary--light);
				}
			}
		}
	}
</style>
