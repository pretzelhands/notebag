<template>
	<div class="viewbar">
		<div>
			<div
				class="viewbar__entry viewbar--add"
				@keydown="addNote"
				@click="addNote()"
				v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
				title="Add new note"
				content="Add new note"
				tabindex="0"
			>
				<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 384 512"><path d="M369.9,97.9,286,14A48,48,0,0,0,252.1-.1H48A48.16,48.16,0,0,0,0,48V464a48,48,0,0,0,48,48H336a48,48,0,0,0,48-48V131.9A48.23,48.23,0,0,0,369.9,97.9ZM256,51.9,332.1,128H256ZM336,464H48V48H208V152a23.94,23.94,0,0,0,24,24H336ZM215,223.75a16,16,0,0,0-16-16H183a16,16,0,0,0-16,16v56.5h-55.5a16,16,0,0,0-16,16v16a16,16,0,0,0,16,16H167v56a16,16,0,0,0,16,16h16a16,16,0,0,0,16-16v-56h56.5a16,16,0,0,0,16-16v-16a16,16,0,0,0-16-16H215Z"/></svg>
			</div>

			<div
				:class="viewbarEntryClass(Modes.EDITOR)"
				@keydown="evt => setMode(Modes.EDITOR, evt)"
				@click="setMode(Modes.EDITOR)"
				v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
				title="Write"
				content="Write"
				tabindex="0"
			>
				<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
			</div>

			<div
				:class="viewbarEntryClass(Modes.NOTES)"
				@keydown="evt => setMode(Modes.NOTES, evt)"
				@click="setMode(Modes.NOTES)"
				v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
				title="Note overview"
				content="Note overview"
				tabindex="0"
			>
				<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" /></svg>
			</div>

			<div
				:class="viewbarEntryClass(Modes.CATEGORIES)"
				@keydown="evt => setMode(Modes.CATEGORIES, evt)"
				@click="setMode(Modes.CATEGORIES)"
				v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
				title="Projects"
				content="Projects"
				tabindex="0"
			>
				<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 640 512"><path d="M592 64H400L345.37 9.37c-6-6-14.14-9.37-22.63-9.37H176c-26.51 0-48 21.49-48 48v80H48c-26.51 0-48 21.49-48 48v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48v-80h80c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zM464 464H48V176h80v160c0 26.51 21.49 48 48 48h288v80zm128-128H176V48h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H592v224z"/></svg>
			</div>

			<div class="viewbar__projects" v-if="pinnedProjects.length">
				<div
					v-for="project in pinnedProjects"
					v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
					class="viewbar__entry"
					@keydown="evt => setActiveProject(project.tag, evt)"
					@click="setActiveProject(project.tag)"
					:title="project.title"
					:content="project.title"
					:key="project.tag"
					tabindex="0"
				>
					<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 512 512"><path d="M464 128H272l-54.63-54.63c-6-6-14.14-9.37-22.63-9.37H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm0 272H48V112h140.12l54.63 54.63c6 6 14.14 9.37 22.63 9.37H464v224z"/></svg>
				</div>
			</div>
		</div>

		<div>
			<div :class="viewbarEntryClass(Modes.ARCHIVE)"
				@keydown="evt => setMode(Modes.ARCHIVE, evt)"
				@click="setMode(Modes.ARCHIVE)"
				v-tippy="{ placement: 'right', animateFill: false, delay: 300 }"
				title="Archive"
				content="Archive"
				tabindex="0"
			>
				<svg class="viewbar__icon" fill="currentColor" viewBox="0 0 512 512"><path d="M464 32H48C21.5 32 0 53.5 0 80v80c0 8.8 7.2 16 16 16h16v272c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V176h16c8.8 0 16-7.2 16-16V80c0-26.5-21.5-48-48-48zm-32 400H80V176h352v256zm32-304H48V80h416v48zM204 272h104c6.6 0 12-5.4 12-12v-24c0-6.6-5.4-12-12-12H204c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12z"/></svg>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	import Modes from "@/store/modes";
	import Actions from "@/store/actions";

	import { isActionableKey } from "@/utilities/keycode";

	export default {
		data() {
			return {
				Modes,
			};
		},
		computed: {
			currentMode() {
				return this.$store.state.mode;
			},
			pinnedProjects() {
				return Object.values(this.$store.state.projects)
					.filter(project => project.pinned);
			}
		},
		methods: {
			setMode(mode, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				return this.$store.commit(Actions.SET_MODE, mode);
			},

			setActiveProject(tag, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.SET_ACTIVE_PROJECT, tag);
				return this.$store.commit(Actions.SET_MODE, Modes.CATEGORIES);
			},

			addNote(event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				return this.$store.dispatch(Actions.ADD_NOTE);
			},

			isNoteActive(id) {
				return this.$store.state.activeNote === id;
			},

			viewbarEntryClass(mode) {
				return {
					"viewbar__entry": true,
					"viewbar--editor": mode === Modes.EDITOR,
					"viewbar--notes": mode === Modes.NOTES,
					"viewbar--categories": mode === Modes.CATEGORIES,
					"is-active": this.currentMode === mode,
				};
			},
		}
	};
</script>


<style lang="scss">
	.viewbar {
		display: flex;
		flex-direction: column;
		height:100vh;
		background: var(--muted);
		padding: .33rem;
		justify-content: space-between;

		&__entry {
			display: flex;
			padding: .66rem;
			color: var(--text--dark);
			margin: .1666667rem 0;
			border-radius: 4px;
			max-height: 42px;

			&:hover,
			&:focus {
				cursor: pointer;
				background: var(--muted--intense);
				outline: none;
				color: var(--text);

				&.is-active {
					background: var(--primary--light);
					color: var(--primary--inverse);
				}
			}

			&:first-child { margin-top: 0; }
			&:last-child { margin-bottom: 0; }

			&.is-active {
				cursor: pointer;
				background: var(--muted--intense);
				outline: none;
				color: var(--text);

			}

			&.viewbar--add {
				color: var(--primary);
			}
		}

		&__icon {
			line-height: 1;
			width: 20px;
		}

		&__projects {
			margin-top: 1rem;
			padding-top: 1rem;
			border-top: 1px solid var(--muted--intense);
		}
	}
</style>
