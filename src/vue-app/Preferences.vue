<template>
	<div class="preferences">
		<nav class="preferences__navigation navigation">
			<button v-for="item in navigationItems" :key="item.id" :class="navigationItemClass(item)" @click="setActiveItem(item)">{{ item.label }}</button>
		</nav>

		<div class="preferences__content">
			<div v-if="activeItem === 'general'">
				<label class="no-select">
					Storage path
					<span @click="selectPath" class="form-field filepath">{{ selectedNotePath }}</span>
					<span class="preferences__tip tip">This is where Notebag saves your notes</span>
				</label>

				<label class="no-select">
					Application theme
					<span class="select-wrapper">
						<select class="select" :value="selectedTheme" @change="setTheme">
							<option :value="Payloads.THEME_LIGHT">Light</option>
							<option :value="Payloads.THEME_DARK">Dark</option>
						</select>
					</span>
					<span class="preferences__tip tip">This adjusts with your system settings, but you can override it</span>
				</label>

				<label class="no-select">
					Font size
					<span class="select-wrapper">
						<select class="select" :value="selectedFontSize" @change="setFontSize">
							<option value="10">10</option>
							<option value="12">12</option>
							<option value="14">14</option>
							<option value="16">16</option>
							<option value="18">18</option>
							<option value="20">20</option>
							<option value="22">22</option>
							<option value="24">24</option>
						</select>
					</span>
					<span class="preferences__tip tip">Your preferred font size for the editor</span>
				</label>

				<label v-show="isMac">
					<input type="checkbox" @change="setDockStatus" :checked="showInDock" />
					<span class="no-select">&nbsp;Show Notebag in Dock</span>
				</label>
			</div>

			<div v-if="activeItem === 'notes'">
				<label class="no-space no-select">Recreate tutorial notes</label>
				<button @click="recreateTutorial" class="btn-primary no-select">Recreate the tutorial</button>
				<span class="preferences__tip tip">If you are unsure how to do certain things you can get back the tutorial notes here</span>

				<label class="export-label no-space no-select">Export</label>
				<button @click="exportNotes" class="btn-primary no-select">Export notes</button>
				<span class="preferences__tip tip">We'll export your notes to a place of your choosing in Markdown format</span>

				<label class="export-label no-space no-select">Import</label>
				<button @click="importNotes" class="btn-primary no-select">Import notes</button>
				<span class="preferences__tip tip">Notebag currently supports importing .md files from a folder.</span>
			</div>

			<div v-if="activeItem === 'shortcuts'">
				<p class="preferences__explanation no-select">Click on a keyboard shortcut to assign a new one.</p>

				<table class="shortcuts-table">
					<tr>
						<th>Action</th>
						<th>Shortcut</th>
					</tr>


					<tr>
						<td>Show/hide window</td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.SHOW_HIDE_WINDOW" @captured="setShortcut" @recording="suspendShortcut" />
						</td>
					</tr>

					<tr>
						<td>Toggle light/dark mode</td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.TOGGLE_THEME" @captured="setShortcut" @recording="suspendShortcut" />
						</td>
					</tr>

					<tr>
						<td>Toggle omnibar</td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.TOGGLE_OMNIBAR" @captured="setShortcut" />
						</td>
					</tr>

					<tr>
						<td>Create new note</td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.NEW_NOTE" @captured="setShortcut" />
						</td>
					</tr>

					<tr>
						<td>Delete currently active note</td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.DELETE_NOTE" @captured="setShortcut" />
						</td>
					</tr>

					<tr>
						<td><abbr title="Can only be used when the caret is on the same line as the todo">Mark todo (in)complete</abbr></td>
						<td class="shortcuts-table__shortcut">
							<key-capture :shortcut="Shortcuts.COMPLETE_TODO" @captured="setShortcut" />
						</td>
					</tr>
				</table>
				<div class="preferences__tip tip">"cmd" means either the Command key or the Windows key</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	import { remote } from "electron";
	import { mapState } from "vuex";

	import KeyCapture from "@/components/KeyCapture";

	import Actions from "@/store/actions";
	import Preferences from "@/store/preferences";
	import Payloads from "@/store/payloads";
	import Shortcuts from "@/store/shortcuts";

	import getLicenseData from "@/utilities/getLicenseData";

	import ImportService from "@/import/ImportService";

	const importService = new ImportService();

	export default {
		name: "Preferences",
		components: { KeyCapture },
		methods: {
			exportNotes: () => importService.exportNotes(),
			importNotes: () => importService.importNotes(),
			navigationItemClass(item) {
				return {
					"navigation__pill": true,
					"is-active": item.id === this.activeItem
				};
			},
			setActiveItem(item) {
				this.activeItem = item.id;
			},
			setDockStatus(event) {
				this.$store.commit({
					type: Actions.SET_PREFERENCE,
					preference: Preferences.SHOW_DOCK,
					value: event.target.checked,
				});
			},
			setTheme(evt) {
				const newTheme = evt.target.value;

				this.$store.commit({
					type: Actions.SET_PREFERENCE,
					preference: Preferences.THEME,
					value: newTheme,
				});
			},
			setFontSize(evt) {
				const newFontSize = evt.target.value;

				this.$store.commit({
					type: Actions.SET_PREFERENCE,
					preference: Preferences.FONT_SIZE,
					value: newFontSize,
				});
			},
			setShortcut(shortcut, oldKeys, newKeys) {
				this.$store.commit({
					type: Actions.SET_SHORTCUT,
					shortcut,
					oldKeys,
					newKeys,
				});
			},
			suspendShortcut(shortcut, oldKeys) {
				this.$store.commit({
					type: Actions.SUSPEND_SHORTCUT,
					shortcut,
					oldKeys,
				});
			},
			deactivateLicense() {
				this.$store.commit({
					type: Actions.DEACTIVATE_LICENSE,
					halt: false,
				});

				window.close();
			},
			async selectPath() {
				const dialog = remote.require("electron").dialog;
				const { filePaths } = await dialog.showOpenDialog(remote.getGlobal("preferencesWindow"),{ properties: ["openDirectory"] });
				const path = filePaths[0];

				if (path) {
					const { response } = await dialog.showMessageBox(remote.getGlobal("preferencesWindow"), {
						type: "info",
						title: "Restart?",
						message: "Notebag has to restart for these changes to take effect. Restart now?",
						buttons: [ "Restart now", "Cancel" ],
						icon: null,
					});

					if (response === 0) {
						this.$store.commit({
							type: Actions.SET_PREFERENCE,
							preference: Preferences.NOTE_PATH,
							value: path,
						});
					}
				}
			},
			recreateTutorial() {
				remote.getGlobal("mainWindow").send("recreate-tutorial");
			}
		},
		asyncComputed: {
			async licenseData() {
				if (!this.licenseCache) {
					this.licenseCache = await getLicenseData(this.licenseKey);
				}

				return this.licenseCache;
			}
		},
		computed: {
			...mapState(["isTrial"]),
			isMac() {
				return remote.process.platform === "darwin";
			},
			showInDock() {
				return this.$store.state.preferences.showDock;
			},
			updatesDuration() {
				const created = new Date(this.licenseData.created_at);
				return new Date(created.setFullYear(created.getFullYear() + 1));
			},
			licenseKey() {
				return this.$store.state.licenseKey;
			},
			trialExpiry() {
				const lastChecked = new Date(this.$store.state.trialStartDate);
				return new Date(lastChecked.setDate(lastChecked.getDate() + 7));
			},
			selectedNotePath() {
				return this.$store.state.preferences.notePath;
			},
			selectedTheme() {
				return this.$store.state.preferences.theme;
			},
			selectedFontSize() {
				return this.$store.state.preferences.fontSize;
			}
		},
		data() {
			return {
				Shortcuts,
				Actions,
				Payloads,
				error: false,
				potentialLicenseKey: "",
				licenseCache: null,
				activeItem: "general",
				navigationItems: [
					{ id: "general", label: "General" },
					{ id: "notes", label: "Notes" },
					{ id: "shortcuts", label: "Shortcuts" },
					{ id: "license", label: "License" },
				]
			};
		},
	};
</script>

<style lang="scss">
	.preferences {
		min-height: 100vh;
		background-color: var(--body);
		color: var(--text);

		&__title {
			line-height: 1;
			margin-top: 0;
		}

		&__navigation {
			display: flex;
		}

		&__content {
			padding: 2rem;
			padding-top: 4rem;

			label {
				display: block;
				margin-bottom: 1rem;

				&.no-space {
					margin-bottom: 0rem;
				}
			}
		}

		&__explanation,
		&__tip {
			margin-top: 0;
		}

		&__license-label {
			display: block;
			margin-bottom: 1rem;
		}
	}

	.navigation {
		position: fixed;
		width: 100%;
		background: var(--muted);

		&__pill {
			border: none;
			background: transparent;
			color: var(--text);
			padding: .66rem 1rem;
			user-select: none;
			transition: background 0.15s ease-in;

			&:hover,
			&:focus,
			&:active {
				background-color: var(--muted--intense);
				color: var(--text);
				cursor: pointer;
			}

			&.is-active {
				background-color: var(--primary);
				color: var(--primary--inverse);

				&:hover,
				&:focus {
					background-color: var(--primary--light);
				}
			}
		}
	}

	.shortcuts-table {
		width: 100%;
		height: 100%;
		margin-bottom: .5rem;
		border-collapse: collapse;
		line-height: 1;

		th {
			background-color: var(--shortcut-header);
		}

		tr {
			background-color: var(--muted);
			border-bottom: 1px solid var(--shortcut-border);

		}

		th, td {
			width: 50%;
			text-align: left;
			padding: .5rem .5rem .5rem;
			user-select: none;
		}

		td {
			font-size: 12px;
		}

		&__shortcut {
			display: flex;
			width: 100% !important;
			font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
		}

		.shortcut__button {
			font-size: 10px;
			display: inline-block;
			background: var(--text--dark);
			color: var(--body);
			padding: 4px;
			margin-right: 4px;
			border-radius: 4px;
			position: relative;
			top: -1px;
		}
	}

	.filepath {
		margin-top: .25rem;
		padding: .33rem;
		display: block;

		&:hover {
			cursor: pointer;
		}
	}

	.export-label {
		margin-top: 1rem;
	}

	.license-tab {
		p:first-child {
			margin-top: 0;
		}

		label {
			display: inline-block;
			margin-bottom: 0;
			width: 100%;
		}

		.btn-primary {
			display: block;
			margin-top: 1rem;
			text-decoration: none;
			color: white !important;
			margin-bottom: 0;
		}

		a {
			color: var(--text);

			&:hover,
			&:focus,
			&:active {
				outline: none;
				text-decoration: none;
				color: var(--primary);
			}
		}
	}
</style>
