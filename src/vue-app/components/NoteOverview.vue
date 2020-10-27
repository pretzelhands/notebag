<template>
	<div :class="overviewClass(isArchive)">
		<h1 class="note-overview__title">
			{{ this.isArchive ? "Archive" : "Note overview" }}
		</h1>

		<input v-model="searchInput" @keydown="handleEnter" ref="searchField" class="note-overview__search" placeholder="Search for notes…" type="text" tabindex="0"/>
		<span class="tip" v-if="!isArchive">Tip: Press <code>Ctrl+1-9</code> to open notes quickly.</span>
		<span class="tip" v-if="isArchive">Tip: If you want to open a note again, move it back to your active notes.</span>

		<div class="note-overview__notes">
			<note-list ref="list" :archive="isArchive" :notes="searchResults"></note-list>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
import {isEnterKey} from "@/utilities/keycode";

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

	import { mapState, mapGetters } from "vuex";
	import Fuse from "fuse.js";
	import Mousetrap from "mousetrap";

	import EventBus, { Events } from "@/EventBus";
	import Actions from "@/store/actions";
	import Modes from "@/store/modes";

	import NoteList from "@/components/NoteList";

	export default {
		name: "NoteOverview",
		components: {NoteList},
		watch: {
			notes: {
				handler(newNotes) {
					const notes = Object.values(newNotes);

					this.searchAgent = new Fuse(notes, FUSE_OPTIONS);
				},
				deep: true,
			},
		},
		computed: {
			...mapGetters({
				notes: "sortedNotes"
			}),
			...mapState(["mode"]),
			isArchive() {
				return this.mode === Modes.ARCHIVE;
			},
			searchResults() {
				if (!this.mode === Modes.NOTES) return this.notes;
				if (!this.searchInput && this.mode === Modes.NOTES) return this.notes;
				if (!this.searchInput && this.isArchive) return this.$store.state.archivedNotes;

				return this.searchAgent.search(this.searchInput).map(result => result.item);
			},
		},
		events: {
			[Events.MODE_SWITCHED_AFTER]: {
				priority: 0,
				handler(event, mode) {
					if (mode === Modes.NOTES || mode === Modes.ARCHIVE) {
						this.setupNotesTab();
					}
				}
			},

			[Events.MODE_SWITCHED]: {
				priority: 10,
				handler(event, mode) {
					if (mode !== Modes.NOTES && mode !== Modes.ARCHIVE) {
						this.teardownNotesTab();
					}
				}
			},
		},
		methods: {
			handleEnter(event) {
				if (isEnterKey(event)) {
					const [ note ] = this.searchResults;
					if (!note || this.$store.state.activeNote === note.id) { return; }

					this.$store.commit(Actions.SET_ACTIVE_NOTE, note.id);
				}
			},
			cycleElements(event) {
				this.$nextTick(() => {
					const tabbableElements = document.querySelectorAll(".note-overview [tabindex]:not(.no-cycle)");

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
			setupNotesTab() {
				console.log("NOTES TAB -- SETUP");

				this.selectedIndex = 0;
				this.$nextTick(() => this.$refs.searchField.focus());

				for (let i=1; i<10; i++) {
					Mousetrap.bind(`ctrl+${i}`, () => this.switchToNote(i-1));
				}

				Mousetrap.bind("down", this.cycleElements);
				Mousetrap.bind("up", this.cycleElements);
			},
			teardownNotesTab() {
				console.log("NOTES TAB -- TEARDOWN");

				for (let i=1; i<10; i++) {
					Mousetrap.unbind(`ctrl+${i}`);
				}

				Mousetrap.unbind("down");
				Mousetrap.unbind("up");
			},
			overviewClass(isArchive) {
				return {
					"note-overview": true,
					"note-overview--archive": isArchive,
					"note-overview--regular": !isArchive,
				};
			}
		},
		data() {
			const notes = this.isArchive
				? Object.values(this.$store.state.archivedNotes)
				: Object.values(this.$store.getters.sortedNotes);

			return {
				searchInput: "",
				searchAgent: new Fuse(notes, FUSE_OPTIONS),
				selectedIndex: 0,
			};
		},
		created() {
			EventBus.$on(Events.SEARCHING_CATEGORY, category => this.searchInput = category);
		}
	};
</script>

<style lang="scss">
	.note-overview {
		height: 100vh;
		width: 100%;
		padding: 3rem;
		position: relative;
		background-color: var(--note-pane);
		overflow-y: auto;

		&__title {
			margin-top: 0;
			user-select: none;
		}

		&__search {
			color: var(--text);
			background: var(--muted);
			border-radius: 4px;
			padding: .66rem;
			width: 100%;
			outline: none;
			border: none;
		}

		&__notes {
			margin-top: 1rem;
		}
	}

	.note-overview::-webkit-scrollbar {
		display: none;
	}
</style>
