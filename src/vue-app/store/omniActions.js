import store from "@/store/store";
import Actions from "@/store/actions";
import Modes from "@/store/modes";

export default [
	{
		shortcut: "cn",
		name: "Create new note",
		handler() {
			store.dispatch(Actions.ADD_NOTE);
		}
	},
	{
		shortcut: "dn",
		name: "Delete current note",
		handler() {
			store.commit(Actions.DELETE_NOTE, store.state.activeNote);
		}
	},
	{
		shortcut: "gonote",
		name: "Switch to note overview",
		handler() {
			store.commit(Actions.SET_MODE, Modes.NOTES);
		}
	},
	{
		shortcut: "gocat",
		name: "Switch to category view",
		handler() {
			store.commit(Actions.SET_MODE, Modes.CATEGORIES);
		}
	},
	{
		shortcut: "goar",
		name: "Switch to archive",
		handler() {
			store.commit(Actions.SET_MODE, Modes.ARCHIVE);
		}
	},
];
