<template>
	<div class="editing-area" :style="cssVariables" ref="editingArea">
		<div class="editor" v-if="activeNote">
			<input @keyup="setNoteTitle" @keydown="switchFocusToContent" :value="activeNote.title" class="editor__title" placeholder="New note" ref="editorTitle">
			<editor-content class="editor__content" :editor="editor" />
			<div class="editor__backlinks backlinks" v-show="links.length">
				<div v-for="(link, idx) in links" :key="idx" class="backlinks__note" tabindex="0" @keydown="evt => switchToBacklink(notes[link.originNote].title, evt)" @click="() => switchToBacklink(notes[link.originNote].title)">
					<h4 class="backlinks__title">{{ backlinkTitle(notes[link.originNote].title) }}</h4>
					<p class="backlinks__context" v-html="contextSnippet(link)"></p>
				</div>
			</div>

			<div ref="searchBar" v-show="searching" class="editor__search">
				<input
					ref="search"
					@keydown.enter.prevent="runSearch"
					placeholder="Search …"
					type="text"
					v-model="searchTerm"
					class="form-field"
				/>

				<input
					ref="replace"
					@keydown.enter.prevent="runReplace"
					placeholder="Replace …"
					type="text"
					v-model="replaceWith"
					class="form-field"
				/>

				<button
					ref="replaceButton"
					class="search__action"
					@click="runReplaceButton"
					@keydown.enter.prevent="runReplaceButton"
					@keydown.space.prevent="runReplaceButton"
				>
					Replace
				</button>

				<button
					ref="replaceAllButton"
					class="search__action"
					@click="runReplaceAll"
					@keydown.enter.prevent="runReplaceAll"
					@keydown.space.prevent="runReplaceAll"
				>
					Replace All
				</button>
			</div>
		</div>

		<div class="intro" v-else-if="shouldShowIntro">
			<h1 class="intro__title">Welcome to Notebag!</h1>

			<p class="intro__instructions">
				You don't seem to have any notes yet. To get started, you can create your first notes by pressing one of
				the buttons below. The tutorial consists of five notes that will show you everything that Notebag has to
				offer! It is <strong>highly</strong> recommended to begin.
			</p>

			<div>
				<button @click="$store.commit(Actions.ADD_TUTORIAL_NOTE)" class="intro__cta">Start with a tutorial</button>
				<button @click="$store.dispatch(Actions.ADD_NOTE)" class="intro__cta cta--secondary">Create empty note</button>
			</div>
		</div>

		<div class="unselected" v-else>
			No note is selected.
		</div>

		<div class="suggestions" ref="suggestions">
			<div
				v-for="(suggestion, idx) in filteredResults"
				:key="suggestion.id"
				@click="selectSuggestion(suggestion)"
				:class="{ suggestions__suggestion: true, 'suggestions__suggestion--active': selectedResultIndex === idx }"
			>
				{{ suggestion.title }}
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	import {ipcRenderer, remote} from "electron";
	import {EditorContent} from "tiptap";
	import {mapState} from "vuex";

	import Mousetrap from "mousetrap";
	import stripTags from "striptags";

	import { NoteSuggestions, CategorySuggestions } from "@/plugins/NotebagSuggestions";

	import EventBus, {Events} from "@/EventBus";
	import Actions from "@/store/actions";
	import Modes from "@/store/modes";

	import {updateNote, setNoteTitle} from "@/utilities/notes";
	import {setCurrentCursorPosition} from "@/utilities/text";
	import {convertClipboardToMarkdown} from "@/utilities/clipboard";
    import {isEnterKey, isActionableKey} from "@/utilities/keycode";
	import {makeEditor} from "@/utilities/editor";

	import {asyncDebounce, debounce} from "@/utilities/debounce";


	export default {
		name: "Editor",
		components: {
			EditorContent,
		},
		data() {
			return {
				Actions,
				editor: null,

				// Search
				searching: false,
				searchTerm: null,
				replaceWith: null,

				// Suggestions
				popup: null,
				query: null,
				suggestionRange: null,
				suggestionCommand: () => {},
				filteredResults: [],
				selectedResultIndex: 0,
			};
		},
		methods: {
			setNoteTitle: debounce(setNoteTitle, 400),
			updateNote: asyncDebounce(updateNote, 400),
			reloadEditor() {
				this.editor.destroy();
				this.editor = makeEditor(this.activeNote, this.updateNote, NoteSuggestions(this));
			},
			setEditorFocus() {
				setTimeout(() => {
					if (!this.activeNote || !this.$refs.editorTitle) {
						return;
					}

					if (stripTags(this.editor.getHTML()).length > 0 && this.activeNote.cursorPosition) {
						setCurrentCursorPosition(this.activeNote.cursorPosition);
						return;
					}

					if (this.$refs.editorTitle.value.length > 0) {
						this.editor.focus();
						return;
					}

					this.$refs.editorTitle.focus();
				}, 25);
			},
			onActiveNoteChanged(activeNote) {
				this.editor.setContent(activeNote.body);
				this.setEditorFocus();
			},
			onOmnibarHidden() {
				if (!this.activeNote) {
					return;
				}

				this.editor.focus();
			},
			refocusSelection(event) {
				if (event.target == document.body) {
					event.preventDefault();

					if (!document.querySelector(".ProseMirror")) {
						return;
					}

					var range = document.createRange();
					range.selectNodeContents(document.querySelector(".ProseMirror"));

					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range);
				}
			},
			runSearch() {
				this.editor.commands.clearSearch();
				this.editor.commands.find(this.searchTerm);
				this.$refs.search.focus();
			},
			runReplace() {
				this.editor.commands.clearSearch();
				this.editor.commands.find(this.searchTerm);
				this.editor.commands.replace(this.replaceWith);
				this.$refs.replace.focus();
			},
			runReplaceButton() {
				this.editor.commands.clearSearch();
				this.editor.commands.find(this.searchTerm);
				this.editor.commands.replace(this.replaceWith);
				this.$refs.replaceButton.focus();
			},
			runReplaceAll() {
				this.editor.commands.clearSearch();
				this.editor.commands.find(this.searchTerm);
				this.editor.commands.replaceAll(this.replaceWith);
				this.$refs.replaceAllButton.focus();
			},
			toggleSearch() {
				this.searching = true;
				this.searchTerm = "";
				this.replaceWith = "";
				this.$nextTick(() => this.$refs.search.focus());
			},
			hideSearch() {
				this.searching = false;
			},
			contextSnippet(link) {
				const noteBody = this.notes[link.originNote].preview;
				const parser = new DOMParser();
				const doc = parser.parseFromString(noteBody, "text/html");
				const contextLink = doc.querySelector(`[data-unique="${link.identifier}"]`);

				if (contextLink) {
					return contextLink.parentElement.innerHTML;
				}

				return;
			},
			switchFocusToContent(event) {
				if (isEnterKey(event)) {
					this.editor.focus();
				}
			},
			switchToBacklink(note, event) {
				if (event && isActionableKey(event)) {
					this.$store.commit(Actions.DETERMINE_ZETTELKASTEN, note);
					return;
				}

				this.$store.commit(Actions.DETERMINE_ZETTELKASTEN, note);
			},
			backlinkTitle(title) {
				if (title.trim().length === 0) {
					return "Untitled note";
				}

				return title;
			},
			selectSuggestion(suggestion) {
				const uniqueIdentifier = suggestion.title.toLowerCase().replace(/\s/g, "-") + "-"
					+ Math.random().toString(36).substr(2, 9);

				this.suggestionCommand({
					range: this.suggestionRange,
					attrs: {
						text: suggestion.title,
						uniqueIdentifier,
					},
				});
			}
		},
		events: {
			[Events.MODE_SWITCHED](event, mode) {
				if (this.popup) {
					this.popup[0].destroy();
					this.popup = null;
				}

				if (mode === Modes.EDITOR) this.setEditorFocus();
			},
		},
		computed: {
			...mapState([ "notes" ]),
			cssVariables() {
				return {
					"--font-size": this.$store.state.preferences.fontSize + "px",
				};
			},
			activeNote() {
				return this.$store.state.notes[this.$store.state.activeNote];
			},
			links() {
				return this.$store.state.links
					.slice()
					.filter(link => link.targetNote === this.activeNote.id)
					.sort((a, b) => a.identifier < b.identifier ? 1 : -1);
			},

			appVersion() {
				return remote.app.getVersion();
			},

			shouldShowIntro() {
				const noteAmount = Object.keys(this.$store.state.notes).length;
				return noteAmount === 0;
			}
		},
		mounted() {
			this.editor = makeEditor(this.activeNote, this.updateNote, NoteSuggestions(this), CategorySuggestions(this));

			setTimeout(() => {
				let proseMirror = document.querySelector(".ProseMirror");
				proseMirror.addEventListener("copy", convertClipboardToMarkdown);

				Mousetrap.bind("mod+f", this.toggleSearch);
				Mousetrap(this.$refs.searchBar).bind("esc", this.hideSearch);
			}, 25);


			EventBus.$on(Events.ACTIVE_NOTE_CHANGED, this.onActiveNoteChanged);
			EventBus.$on(Events.OMNIBAR_HIDDEN, this.onOmnibarHidden);


			ipcRenderer.on("shortcut-changed:completeTodo", this.reloadEditor);
			window.addEventListener("selectstart", this.refocusSelection);

		},
		beforeDestroy() {
			this.editor.destroy();
		}
	};
</script>

<style lang="scss">
	.editing-area {
		overflow-y: auto;
		width: 100%;
		height: 100vh;
		padding: 3rem;
		position: relative;
		font-size: var(--font-size);
	}

	.editor {
		margin: 0 auto;
		max-width: 640px;
		min-height: 100%;
		width: 100%;

		&__title {
			width: 100%;
			font-size: calc(var(--font-size) * 2);
			font-weight: bold;
			border: none;
			color: var(--text);
			background: transparent;
			user-select: all;
			line-height: 1.5;
		}

		&__search {
			display: flex;
			width: calc(100% - 51.625px);
			padding: .5rem;
			position: fixed;
			left: 51.625px;
			bottom: 0;
			background: var(--muted);
			border-left: 1px solid var(--muted--intense);
			font-size: .75rem;

			.search__action {
				background: var(--primary);
				color: var(--primary--inverse);
				border: none;
				border-radius: 4px;
				align-self: center;
				flex-shrink: 0;
				margin: 0 .25rem;
				padding: .6rem;
				line-height: 1;

				&:hover,
				&:focus,
				&:active {
					background: var(--primary--light);
				}

				&:first-of-type { margin-left: .5rem; }
				&:last-of-type { margin-right: 0; }
			}

			.form-field {
				background: var(--muted--intense);
				margin: 0 .25rem;

				&:first-of-type { margin-left: 0; }
				&:last-of-type { margin-right: 0; }
			}
		}

		&__content {
			line-height: 1.5;
			outline: none;
		}

		&__backlinks {
			margin-bottom: 3rem;
		}

		&__content .ProseMirror {
			white-space: pre-wrap;
		}

		&__content p.is-empty:only-child::before {
			content: "Your next big idea …";
			float: left;
			color: var(--placeholder);
			pointer-events: none;
			height: 0;
		}

		&__content .find {
			background: rgba(255, 213, 0, 0.4);
		}

		&__content h1,
		&__content h2,
		&__content h3 {
			margin-bottom: var(--font-size);
		}

		&__content h1 { font-size: calc(var(--font-size) * 1.66); }
		&__content h2 { font-size: calc(var(--font-size) * 1.33); }
		&__content h3 { font-size: var(--font-size) }

		&__content li p { margin: 0; }

		&__content pre.hljs {
			overflow-x: auto;
			white-space: pre;
		}

		&__content code {
			width: 100%;
			overflow-x: auto;
		}

		&__content ul[data-type="todo_list"] {
			padding-left: 1.33rem;
		}

		&__content li[data-type="todo_item"] {
			display: flex;
			flex-direction: row;
		}

		&__content .todo-content {
			flex: 1;

			> p { margin: 0; position: relative; top: 1px; }
			> ul[data-type="todo_list"] { margin: .5rem 0; }
		}

		&__content .todo-checkbox {
			border: 1px solid var(--todo-border);
			height: 1rem;
			width: 1rem;
			box-sizing: border-box;
			margin-right: 0.5rem;
			margin-top: 0.33rem;
			cursor: pointer;
			border-radius: 0.2em;
			background-color: transparent;
			transition: background 0.15s ease-in, border-color 0.15s  ease-in;
		}

		&__content li[data-done="true"] {
			position: relative;

			> .todo-content p {
				text-decoration: line-through;
				color: var(--text--dark);
			}

			> .todo-content a {
				color: var(--text--dark);
			}

			> .todo-checkbox {
				border: 1px solid var(--todo-border);
				height: 1rem;
				width: 1rem;
				box-sizing: border-box;
				margin-right: 0.5rem;
				margin-top: 0.33rem;
				cursor: pointer;
				border-radius: 0.2em;
				background-color: transparent;
				transition: background 0.15s ease-in, border-color 0.15s  ease-in;

				border-color: var(--todo-border--active);
				background-color: var(--todo);
				color: var(--todo-checkmark);
				display: flex;
				align-items: center;
				justify-content: center;

				&:after {
					position: relative;
					left: 0px;
					content: '\2713';
					font-size: 12px;
					color: var(--todo-checkmark);
				}
			}
		}

		&__content li[data-done="false"] {
			text-decoration: none;
		}

		&__content .category-pill {
			font-size: var(--font-size);
			line-height: 1.5;
			padding: 0;
			position: relative;
			top: 0;
		}

		&__content img {
			max-width: 100%;
		}

		&__content code {
			background: var(--muted--intense);
			padding: 4px 6px;
			font-size: calc(var(--font-size) * 0.8);
			border-radius: 4px;
		}

		&__content pre code {
			background: transparent;
			padding: 0;
			font-size: calc(var(--font-size) * 0.875);
		}
	}


	.backlinks {
		&__note {
			background: var(--muted);
			margin-top: .5rem;
			padding: 1rem;
			border-radius: 4px;
			box-sizing: border-box;
			transition: background 0.15s ease-in;

			&:hover,
			&:focus,
			&:focus-within {
				background: var(--muted--intense);
				cursor: pointer;
				outline: none;
			}
		}

		&__title {
			user-select: none;
			margin-top: 0;
			margin-bottom: 1rem;
		}

		&__context {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			margin-bottom: 0;
		}
	}

	.is-dark-mode {
		.editor {
			&__title {
				background: var(--body);
			}
		}

		img.math {
			filter: invert(1);
		}
	}

	.intro {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		max-width: 60ch;
		height: 100%;
		text-align: center;

		&__title {
			margin: 0;
		}

		&__cta {
			margin: .5rem .5rem 0;
			align-self: center;
			border: none;
			background-color: var(--primary);
			color: var(--primary--inverse);
			font-size: .9rem;
			padding: .75rem 1.5rem;
			border-radius: 4px;

			&:hover,
			&:focus {
				cursor: pointer;
				background-color: var(--primary--light);
			}
		}

		.cta--secondary {
			background-color: var(--body);
			color: var(--text);

			&:hover,
			&:focus {
				background-color: var(--muted);
			}
		}
	}

	img.math {
		position: relative;
		top: 1px;
	}

	.tippy-box {
		background: var(--muted);
		border-radius: 4px;
		width: 40ch;
		padding: .5rem 0;

		&:focus {
			outline: none;
		}
	}

	.suggestions {
		&__suggestion {
			line-height: 1;
			padding: .5rem;
			margin: 0 .5rem;
		}

		&__suggestion:hover,
		&__suggestion:active,
		&__suggestion:focus,
		&__suggestion.suggestions__suggestion--active {
			cursor: pointer;
			background: var(--muted--intense);
		}
	}

	.unselected {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		max-width: 60ch;
		height: 100%;
		text-align: center;
		color: var(--text--dark);
	}

	.beta-notice {
		font-size: 12px;
		color: var(--text--dark);
		margin-top: 2rem;

		a {
			color: var(--text--dark);
		}
	}

	input, button, .ProseMirror {
		outline: none;
		transform : none !important;
	}
</style>
