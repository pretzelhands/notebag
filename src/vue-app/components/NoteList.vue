<template>
	<div :class="noteListClassName()">
		<div
			v-for="(note, arrayIdx, objectIdx) in notes"
			:class="noteClassName(note.id)"
			:key="note.id"
			ref="note"
			@keydown="evt => selectNote(evt, note.id)"
			@click="setActiveNote(note.id)"
			tabindex="0"
		>
			<div class="note__index shortcut-button" v-show="objectIdx !== undefined ? objectIdx < 9 && !archive : arrayIdx < 9 && !archive">{{
				objectIdx !== undefined ? objectIdx+1 : arrayIdx+1
			}}</div>

			<div>
				<div class="note__meta">
					<h3 class="note__title">{{ noteTitle(note) }}</h3>
					<div class="note__categories" v-if="note.categories && note.categories.length">
						<category-pill v-for="(category, idx) in note.categories.slice().reverse()" :key="idx" :category="category" />
					</div>
				</div>

				<div class="note__body" v-show="compact === undefined" v-html="notePreview(note)" />
			</div>

			<div class="note__actions">
				<svg tabindex="0" v-if="archive" @click.stop="dearchiveNote(note.id)" @keydown.stop="event => dearchiveNote(note.id, event)" class="no-cycle action action--dearchive" title="Move back to notes" viewBox="0 0 384 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"/></svg>
				<svg tabindex="0" @click.stop="deleteNote(note.id)" @keydown="event => deleteNote(note.id, event)" class="no-cycle action action--trash" title="Delete note permanently"  viewBox="0 0 448 512"><path d="M432 80h-82.4l-34-56.7A48 48 0 0 0 274.4 0H173.6a48 48 0 0 0-41.2 23.3L98.4 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16l21.2 339a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM173.6 48h100.8l19.2 32H154.4zm173.3 416H101.11l-21-336h287.8z"/></svg>
				<svg tabindex="0" v-if="!archive" @click.stop="archiveNote(note.id)" @keydown.stop="event => archiveNote(note.id, event)" class="no-cycle action action--archive" title="Move note to archive" viewBox="0 0 512 512"><path d="M464 32H48C21.5 32 0 53.5 0 80v80c0 8.8 7.2 16 16 16h16v272c0 17.7 14.3 32 32 32h384c17.7 0 32-14.3 32-32V176h16c8.8 0 16-7.2 16-16V80c0-26.5-21.5-48-48-48zm-32 400H80V176h352v256zm32-304H48V80h416v48zM204 272h104c6.6 0 12-5.4 12-12v-24c0-6.6-5.4-12-12-12H204c-6.6 0-12 5.4-12 12v24c0 6.6 5.4 12 12 12z"/></svg>
				<svg tabindex="0" v-if="!archive && note.pinned === computedProject" @click.stop="unpinNote(note.id)" class="no-cycle action action--unpin" viewBox="0 0 384 512"><path d="M298.028 214.267L285.793 96H328c13.255 0 24-10.745 24-24V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v48c0 13.255 10.745 24 24 24h42.207L85.972 214.267C37.465 236.82 0 277.261 0 328c0 13.255 10.745 24 24 24h136v104.007c0 1.242.289 2.467.845 3.578l24 48c2.941 5.882 11.364 5.893 14.311 0l24-48a8.008 8.008 0 0 0 .845-3.578V352h136c13.255 0 24-10.745 24-24-.001-51.183-37.983-91.42-85.973-113.733z"/></svg>
				<svg tabindex="0" v-if="!archive && (!note.pinned || note.pinned !== computedProject)" @click.stop="pinNote(note.id)" class="no-cycle action action--pin" viewBox="0 0 384 512"><path d="M306.5 186.6l-5.7-42.6H328c13.2 0 24-10.8 24-24V24c0-13.2-10.8-24-24-24H56C42.8 0 32 10.8 32 24v96c0 13.2 10.8 24 24 24h27.2l-5.7 42.6C29.6 219.4 0 270.7 0 328c0 13.2 10.8 24 24 24h144v104c0 .9.1 1.7.4 2.5l16 48c2.4 7.3 12.8 7.3 15.2 0l16-48c.3-.8.4-1.7.4-2.5V352h144c13.2 0 24-10.8 24-24 0-57.3-29.6-108.6-77.5-141.4zM50.5 304c8.3-38.5 35.6-70 71.5-87.8L138 96H80V48h224v48h-58l16 120.2c35.8 17.8 63.2 49.4 71.5 87.8z"/></svg>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	const ALLOWED_HTML_TAGS = [];

	import stripTags from "striptags";

	import Actions from "@/store/actions";

	import CategoryPill from "@/components/CategoryPill";

	import { isActionableKey } from "@/utilities/keycode";

	export default {
        name: "NoteList",
		props: ["notes", "compact", "archive", "project" ],
		components: { CategoryPill },
		computed: {
			computedProject() {
				if (!this.project) {
					return true;
				}

				return this.project;
			}
		},
		methods: {
			setActiveNote(id) {
				this.$store.commit(Actions.SET_ACTIVE_NOTE, id);
			},

			selectNote(event, id) {
				if(isActionableKey(event)) {
					return this.setActiveNote(id);
				}
			},

			pinned(id) {
				return this.$store.state.starredNotes.includes(id);
			},

			pinNote(id, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.PIN_NOTE, {
					id,
					project: this.project
				});
				this.$forceUpdate();
			},

			unpinNote(id, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.UNPIN_NOTE, id);
				this.$forceUpdate();
			},

			deleteNote(id, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.dispatch(Actions.DELETE_NOTE, id);
			},

			dearchiveNote(id, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.DEARCHIVE_NOTE, id);
			},

			archiveNote(id, event) {
				if (event && !isActionableKey(event)) {
					return;
				}

				this.$store.commit(Actions.ARCHIVE_NOTE, id);
			},

			noteClassName(id) {
				return {
					"note-list__note": true,
					"note": true,
					"note--compact": this.compact !== undefined,
					"note--rtl": this.$store.state.notes[id].isRtl,
					"is-active": this.$store.getters.isNoteActive(id)
				};
			},

			noteListClassName() {
				return {
					"note-list": true,
					"note-list--compact": this.compact !== undefined,
				};
			},

			noteTitle(note) {
				return note.title.trim().length > 0
					? note.title
					: "Untitled note";
			},

			notePreview(note) {
				const sanitizedNotePreview = note.preview.replace(/<span class="category-pill".*>.*<\/span>/gi, "");

				return stripTags(sanitizedNotePreview).trim().length > 0
					? stripTags(sanitizedNotePreview, ALLOWED_HTML_TAGS, " ").trim()
					: "No content";
			},
		},
	};
</script>

<style lang="scss">
	.note-list:not(.note-list--compact) {
		display: flex;
		flex-wrap: wrap;
		margin-left: -8px;
		margin-right: -8px;
	}

	.note {
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
		position: relative;

		&__index {
			font-size: 10px;
			display: inline-block;
			background: var(--text--dark);
			color: var(--body);
			padding: 4px;
			margin-right: 4px;
			border-radius: 4px;
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			opacity: 0;
		}

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

		&__body {
			margin-bottom: 0;
			line-height: 1.5;
			letter-spacing: .15px;
			margin-top: 1rem;
			font-size: .75rem;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 5;
			-webkit-box-orient: vertical;

			& > :last-child { margin-bottom: 0; }
		}

		&__actions {
			user-select: none;
			margin-top: 1rem;
			/*opacity: 0;*/
			/*visibility: hidden;*/
			transition: visibility 0s ease-in 0ms, opacity 0ms;
			fill: var(--note-actions--inactive);
			color: var(--note-actions--inactive);

			svg {
				width: 20px;
				height: 20px;
				box-sizing: content-box;
				padding: 0;
				margin-right: .5rem;
			}
		}

		&__categories {
			margin-top: .66rem;
			line-height: 1.2;
			overflow: hidden;

			.category-pill { margin-right: .2rem; }
		}

		&:hover,
		&:active,
		&:focus,
		&:focus-within {
			outline: none;
			cursor: pointer;
			background-color: var(--note-background--hover);

			.note__index {
				opacity: 1;
			}

			.note__actions {
				opacity: 1;
				visibility: visible;
				transition: visibility 0s ease-in 0s, opacity 0ms;
			}
		}

		&:not(.note--compact).is-active {
			outline: none;
			border: 4px solid var(--note-background--active);
		}

		&--compact {
			margin: 0;
			width: 100%;
			max-width: 100%;
			padding: .66rem;
			background-color: transparent;

			.note__meta {
				display: flex;
				justify-content: space-between;
			}

			.note__title {
				font-size: .75rem;
				align-self: center;
			}

			.note__index {
				display: none;
			}

			.note__categories {
				margin-top: 0;
			}

			.note__actions {
				display: none;
			}
		}

		&--rtl {
			.note__title,
			.note__meta,
			.note__body {
				direction: rtl;
				font-family: sans-serif;
				text-align: right;
			}
		};
	}

	.action:hover,
	.action:focus {
		outline: none;
		fill: var(--primary);
	}
</style>
