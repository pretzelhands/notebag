import Vue from "vue";

const EventBus = new Vue();

export default EventBus;
export const Events = {
	ACTIVE_NOTE_CHANGED: "activeNoteChanged",
	OMNIBAR_HIDDEN: "omnibarHidden",
	MODE_SWITCHED: "modeSwitched",
	MODE_SWITCHED_AFTER: "modeSwitchedAfter",
	SEARCHING_CATEGORY: "searchingCategory",
	MIGRATED_NOTES: "migratedNotes",
};
