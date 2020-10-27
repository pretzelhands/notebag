<template>
	<div class="project-overview">
		<div class="project-overview__info">
			<h1 class="project-overview__title">Projects</h1>
			<p class="project-overview__current">
				<span v-if="activeProject" @click="setActiveProject('')" tabindex="0" class="project-overview__reset no-cycle">&times;</span>
				<span class="select-wrapper">
					<select tabindex="0" class="select no-cycle" @change="setActiveProject" :value="activeProject">
						<option :value="null">Project overview</option>
						<option v-for="project in sortedProjects" :key="project.tag" :value="project.tag">{{ project.title }}</option>
					</select>
				</span>
			</p>
		</div>

		<input v-model="searchInput" @focus="resetIndex" @keydown="handleEnter" ref="searchField" class="project-overview__search" :placeholder="inputPlaceholder" type="text" tabindex="0"/>

		<div class="project-list" v-if="!activeProject">
			<div
				class="project no-select"
				tabindex="0"
				v-for="project in searchResults"
				:key="project.tag"
				@click="setActiveProject(project.tag)"
				@keydown="event => setActiveProject(project.tag, event)"
			>
				<div class="project__summary">
					<h3 class="project__title">{{ project.title }}</h3>
					<p class="project__meta">{{ project.notes.length }} {{ project.notes.length === 1 ? "note" : "notes" }}</p>
				</div>

				<div class="project__actions">
					<svg
						tabindex="0"
						class="project__action action--sidebar-add no-cycle"
						fill="currentColor"
						viewBox="0 0 384 512"
						v-if="!project.pinned"
						@click.stop="toggleProjectInSidebar(project.tag)"
						@keydown="event => toggleProjectInSidebar(project.tag, event)"
						v-tippy="{ placement: 'right', animateFill: false, delay: 500 }"
						title="Add project to sidebar"
						content="Add project to sidebar"
					>
							<path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/>
					</svg>

					<svg
						tabindex="0"
						class="project__action action--sidebar-remove no-cycle"
						fill="currentColor"
						viewBox="0 0 384 512"
						v-if="project.pinned"
						@click.stop="toggleProjectInSidebar(project.tag)"
						@keydown.stop="event => toggleProjectInSidebar(project.tag, event)"
						v-tippy="{ placement: 'right', animateFill: false, delay: 500 }"
						title="Remove project from sidebar"
						content="Remove project from sidebar"
					>
						<path d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"/>
					</svg>


					<svg
						tabindex="0"
						class="project__action action--trash no-cycle" title="Delete note permanently"
						fill="currentColor"
						@click.stop="deleteProject(project.tag)"
						@keydown.stop="event => deleteProject(project.tag, event)"
						viewBox="0 0 448 512"
					>
						<path d="M432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0-41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16l21.2 339a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM173.6 48h100.8l19.2 32H154.4zm173.3 416H101.11l-21-336h287.8z"/>
					</svg>
				</div>
			</div>
		</div>

		<note-list :notes="searchResults" :project="activeProject" v-if="activeProject" />
	</div>
</template>

<script>
/* eslint-disable indent */
	import Vue from "vue";
	import Mousetrap from "mousetrap";
	import Fuse from "fuse.js";
	import {firstBy} from "thenby";
	import {mapState} from "vuex";

	import {Events} from "@/EventBus";

	import Modes from "@/store/modes";
	import Actions from "@/store/actions";

	import NoteList from "@/components/NoteList";

	import {isActionableKey, isEnterKey} from "@/utilities/keycode";

	const NOTE_FUSE_OPTIONS = {
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

	const PROJECT_FUSE_OPTIONS = {
		isCaseSensitive: false,
		includeMatches: false,
		includeScore: false,
		useExtendedSearch: true,
		findAllMatches: false,
		minMatchCharLength: 5,
		shouldSort: true,
		threshold: 0.2,
		location: 0,
		distance: 10000,
		keys: [
			"title",
		],
	};

	export default {
		name: "ProjectOverview",
		components: {NoteList},
		data() {
			return {
				selectedIndex: 0,
				searchInput: "",
				searchAgent: null,
			};
		},
		watch: {
			activeProject(newProject) {
				this.searchInput = "";
				this.selectedIndex = 0;

				if (newProject.length > 0) {
					this.searchAgent = new Fuse(Object.values(this.activeProjectNotes), NOTE_FUSE_OPTIONS);
					for (let i=1; i<10; i++) {
						Mousetrap.bind(`ctrl+${i}`, () => this.switchToNote(i-1));
					}

					return;
				}

				this.searchAgent = new Fuse(Object.values(this.sortedProjects), PROJECT_FUSE_OPTIONS);
				for (let i=1; i<10; i++) {
					Mousetrap.unbind(`ctrl+${i}`);
				}
			}
		},
		events: {
			[Events.MODE_SWITCHED_AFTER]: {
				priority: 0,
				handler(event, mode) {
					if (mode === Modes.CATEGORIES) {
						this.setupProjectTab();
					}
				}
			},

			[Events.MODE_SWITCHED]: {
				priority: 10,
				handler(event, mode) {
					if (mode !== Modes.CATEGORIES) {
						this.teardownProjectTab();
					}
				}
			},
		},
		computed: {
			...mapState(["projects", "activeProject", "notes"]),
			searchResults() {
				if (!this.activeProject && this.searchInput.length === 0) return this.sortedProjects.filter(project => project.notes.length > 0);
				if (this.activeProject && this.searchInput.length === 0) return this.activeProjectNotes;

				let results = this.searchAgent.search(this.searchInput).map(result => result.item);

				if (!this.activeProject) {
					results = results.filter(item => item.notes && item.notes.length > 0);
				}

				return results;
			},
			sortedProjects() {
				const projects = Object.values(this.$store.state.projects).filter(project => project.notes.length > 0);
				return projects.sort(
					firstBy("title")
				);
			},
			pinnedProjects() {
				return Object.values(this.$store.state.projects).filter(project => project.pinned);
			},
			activeProjectNotes() {
				if (!this.activeProject) {
					return [];
				}

				const activeProject = this.$store.state.projects[this.activeProject];
				if (!activeProject) {
					return [];
				}

				const notes = activeProject.notes.map(id => this.notes[id]);

				const pinnedNotes = Object.values(notes).filter(note => note && note.pinned === this.activeProject);
				const unpinnedNotes = Object.values(notes).filter(note => note && note.pinned !== this.activeProject);

				pinnedNotes.sort(firstBy("lastEdited", "desc"));
				unpinnedNotes.sort(firstBy("lastEdited", "desc"));

				return pinnedNotes.concat(...unpinnedNotes);
			},
			inputPlaceholder() {
				return this.activeProject.length === 0
					? "Search for projects…"
					: "Search for notes…";
			}
		},
		methods: {
			switchToNote(idx) {
				const notes = Object.values(this.searchResults);
				const note = notes[idx];

				if (note) {
					this.$store.commit(Actions.SET_ACTIVE_NOTE, note.id);
				}
			},
			resetIndex() {
				this.selectedIndex = 0;
			},
			handleEnter(event) {
				if (this.activeProject.length === 0) {
					if (isEnterKey(event)) {
						const [ project ] = this.searchResults;
						if (project) {
							this.$store.commit(Actions.SET_ACTIVE_PROJECT, project.tag);
						}
					}

					return;
				}

				if (isEnterKey(event)) {
					const [ note ] = this.searchResults;
					if (!note || this.$store.state.activeNote === note.id) { return; }

					this.$store.commit(Actions.SET_ACTIVE_NOTE, note.id);
				}
			},
			setupProjectTab() {
				console.log("PROJECT TAB -- SETUP");

				this.selectedIndex = 0;
				this.searchAgent = new Fuse(Object.values(this.sortedProjects), PROJECT_FUSE_OPTIONS);
				this.$nextTick(() => {
					if (this.$refs.searchField) {
						this.$refs.searchField.focus();
					}
				});

				Mousetrap.bind("down", this.cycleElements);
				Mousetrap.bind("up", this.cycleElements);


				if (this.activeProject) {
					this.searchAgent = new Fuse(Object.values(this.activeProjectNotes), NOTE_FUSE_OPTIONS);
					for (let i=1; i<10; i++) {
						Mousetrap.bind(`ctrl+${i}`, () => this.switchToNote(i-1));
					}
				}
			},
			teardownProjectTab() {
				console.log("PROJECT TAB -- TEARDOWN");

				Mousetrap.unbind("down");
				Mousetrap.unbind("up");

				for (let i=1; i<10; i++) {
					Mousetrap.unbind(`ctrl+${i}`);
				}
			},
			cycleElements(event) {
				this.$nextTick(() => {
					const tabbableElements = document.querySelectorAll(".project-overview [tabindex]:not(.no-cycle)");

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
			setActiveProject(change, event) {
				if (event && isActionableKey(event)) {
					this.$store.commit(Actions.SET_ACTIVE_PROJECT, change);
					this.selectedIndex = 0;
					this.$nextTick(() => this.$refs.searchField.focus());
					return;
				}

				// Came from <select> event.
				if (change.target && change.target.nodeName === "SELECT") {
					this.$store.commit(Actions.SET_ACTIVE_PROJECT, change.target.value);
					this.selectedIndex = 0;
					this.$nextTick(() => this.$refs.searchField.focus());
					return;
				}

				if (!event) {
					this.$store.commit(Actions.SET_ACTIVE_PROJECT, change);
					this.selectedIndex = 0;
					this.$nextTick(() => this.$refs.searchField.focus());
				}
			},
			deleteProject(tag, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.DELETE_PROJECT, tag);
			},
			toggleProjectInSidebar(tag, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				if (!this.$store.state.projects[tag].pinned && this.pinnedProjects.length === 6) {
					Vue.$toast.info("You cannot pin more than 6 projects at a time.", {
						position: "bottom",
						duration: 3000,
						queue: false,
					});

					return;
				}

				this.$store.commit(Actions.TOGGLE_PROJECT_IN_SIDEBAR, tag);
			}
		},
	};
</script>

<style lang="scss">
	.project-overview {
		height: 100vh;
		width: 100%;
		padding: 3rem;
		position: relative;
		background-color: var(--note-pane);
		overflow-y: auto;

		&__info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 1rem;
			user-select: none;
		}

		&__title {
			margin: 0;
		}

		&__current {
			display: flex;
			align-items: center;
			flex-grow: 1;
			max-width: 45%;
			color: var(--note-actions--inactive);
			margin: 0;

			.select-wrapper {
				flex-grow: 1;
				&::after { top: 0; }
			}
		}

		&__reset {
			margin-right: .5rem;
			font-size: 1.33rem;
			line-height: 0;

			&:hover,
			&:focus,
			&:active {
				cursor: pointer;
				color: var(--primary);
				outline: none;
			}
		}

		&__search {
			color: var(--text);
			background: var(--muted);
			border-radius: 4px;
			padding: .66rem;
			width: 100%;
			outline: none;
			border: none;
			margin-bottom: 1rem;
		}
	}

	.project-list {
		display: flex;
		flex-wrap: wrap;
		margin-left: -8px;
		margin-right: -8px;

		.project {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background: var(--muted);
			width: calc(50% - 1rem);
			max-width: 320px;
			max-height: 320px;
			margin-bottom: 1rem;
			margin-left: 8px;
			margin-right: 8px;
			padding: 1.33rem;
			border-radius: 4px;
			color: var(--note-text--inactive);

			&__title {
				margin: 0;
				font-size: 1rem;
				max-width: 75%;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--note-title--inactive);
				user-select: none;
			}

			&__meta {
				margin: 0;
			}

			&__summary {
				display: flex;
				justify-content: space-between;
			}

			&__actions {
				margin-top: 1rem;
				margin-bottom: 0;
				display: flex;
			}

			&__action {
				width: 1rem;
				display: block;
				margin-right: .66rem;

				&:hover,
				&:focus,
				&:active {
					color: var(--primary);
					outline: none;
				}
			}

			&:hover,
			&:active,
			&:focus,
			&:focus-within {
				outline: none;
				cursor: pointer;
				background-color: var(--note-background--hover);
			}
		}
	}
</style>
