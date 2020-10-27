import { remote } from "electron";

const Shortcuts = {
	SHOW_HIDE_WINDOW: "showHideWindow",
	NEW_NOTE: "newNote",
	DELETE_NOTE: "deleteNote",
	GO_UP_NOTE: "goUpOneNote",
	GO_DOWN_NOTE: "goDownOneNote",
	COMPLETE_TODO: "completeTodo",
	TOGGLE_OMNIBAR: "toggleOmnibar",
	TOGGLE_THEME: "toggleTheme",
	TAB_SWITCH_MODIFIER: "tabSwitchModifier",
};

const defaultShortcuts = {
	darwin: {
		[Shortcuts.SHOW_HIDE_WINDOW]: [17, 18, 32],
		[Shortcuts.NEW_NOTE]: [91, 78],
		[Shortcuts.DELETE_NOTE]: [91, 68],
		[Shortcuts.GO_UP_NOTE]: [18, 91, 38],
		[Shortcuts.GO_DOWN_NOTE]: [18, 91, 40],
		[Shortcuts.COMPLETE_TODO]: [17, 67],
		[Shortcuts.TOGGLE_OMNIBAR]: [91, 80],
		[Shortcuts.TOGGLE_THEME]: [91, 16, 76],
		[Shortcuts.TAB_SWITCH_MODIFIER]: [91],
	},

	other: {
		[Shortcuts.SHOW_HIDE_WINDOW]: [17, 18, 32],
		[Shortcuts.NEW_NOTE]: [17, 78],
		[Shortcuts.DELETE_NOTE]: [17, 68],
		[Shortcuts.GO_UP_NOTE]: [17, 18, 38],
		[Shortcuts.GO_DOWN_NOTE]: [17, 18, 40],
		[Shortcuts.COMPLETE_TODO]: [17, 67],
		[Shortcuts.TOGGLE_OMNIBAR]: [17, 80],
		[Shortcuts.TOGGLE_THEME]: [17, 16, 76],
		[Shortcuts.TAB_SWITCH_MODIFIER]: [18],
	}
};

const shortcutOs = remote.process.platform === "darwin"
	? "darwin"
	: "other";

export default Shortcuts;
export { defaultShortcuts, shortcutOs };
