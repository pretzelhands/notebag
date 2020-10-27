import store from "@/store/store";
import Actions from "@/store/actions";

import {getCurrentCursorPosition} from "@/utilities/text";
import {difference} from "@/utilities/array";
import {handleRtlParagraphs} from "@/utilities/rtl";

import getAllCategories from "@/scanners/category";
import getAllBacklinks from "@/scanners/backlinks";

import {v4 as uuid} from "uuid";

const syncNoteCategories = async (content) => {
	const categoryNodes = await getAllCategories(content);
	const categories = categoryNodes.map(node => node.attrs.text.split("/"));
	const oldCategories = store.state.notes[store.state.activeNote].categories.map(cat => cat.join("/"));
	const newCategories = categories.map(cat => cat.join("/"));
	const unique = new Map();

	categories.forEach((category) => unique.set(category.join(), category));
	const dedupedCategories = Array.from(unique.values());
	store.commit(Actions.SET_NOTE_CATEGORIES, dedupedCategories);

	const addedCategories = newCategories.filter(cat => !oldCategories.includes(cat));
	const removedCategories = oldCategories.filter(cat => !newCategories.includes(cat));

	addedCategories.forEach(tag => {
		store.commit(Actions.ADD_NOTE_TO_PROJECT, {
			tag,
			note: store.state.activeNote,
		});
	});

	removedCategories.forEach(tag => {
		store.commit(Actions.REMOVE_NOTE_FROM_PROJECT, {
			tag,
			note: store.state.activeNote
		});
	});
};

const syncNoteBacklinks = async (content) => {
	const linksRelatedToNote = store.state.links.filter(link => link.originNote === store.state.activeNote);
	const linksNotRelatedToNote = store.state.links.filter(link => link.originNote !== store.state.activeNote);

	const linkNodes = await getAllBacklinks(content);
	const activeLinks = await Promise.all(linkNodes.map(async (node) => {
		const { text } = node.attrs;
		const targetNote = await getNoteByTitle(text);

		return {
			originNote: store.state.activeNote,
			targetNote: targetNote.id,
		};
	}));

	const relevantLinks = linksRelatedToNote.filter(difference(activeLinks));
	if (linksRelatedToNote.length === relevantLinks.length) {
		return;
	}

	store.commit(Actions.SET_LINKS, linksNotRelatedToNote.concat(relevantLinks));
};

const getNoteByTitle = async (title) => {
	const notes = Object.values(store.state.notes);
	let [ note ] = notes.filter(note => note.title.toLowerCase() === title.toLowerCase());

	if (!note) {
		let title = title.charAt(0).toUpperCase() + title.slice(1);
		note = await store.dispatch(Actions.ADD_NOTE, { title });
	}

	return note;
};

const setNoteTitle = (event) => {
	const hasRtl = handleRtlParagraphs();

	store.commit(Actions.SET_NOTE_RTL, hasRtl);
	store.commit(Actions.SET_NOTE_TITLE, event.target.value);
};

const updateNote = async (content) => {
	const hasRtl = handleRtlParagraphs();

	store.commit(Actions.SET_NOTE_RTL, hasRtl);
	store.commit(Actions.SET_NOTE_CURSOR, getCurrentCursorPosition());
	store.commit(Actions.SET_NOTE_BODY, content);

	try {
		await syncNoteBacklinks(content.getJSON());
		await syncNoteCategories(content.getJSON());
	} catch(e) {
		// This is fine.
	}
};

const makeNote = (note) => {
	const newNote = note || {};
	const id = newNote.id || uuid();
	const title = newNote.title || "";
	const preview = newNote.preview || "";
	const categories = newNote.categories || [];
	const pinned = newNote.pinned || false;
	const isRtl = newNote.isRtl || false;
	const body = newNote.body || {
		type: "doc",
		content: [
			{ type: "paragraph" }
		]
	};

	return {
		id,
		title,
		body,
		preview,
		categories,
		pinned,
		isRtl,
		lastEdited: Date.now(),
		cursorPosition: 0,
	};
};

export {
	syncNoteBacklinks,
	syncNoteCategories,
	getNoteByTitle,
	setNoteTitle,
	updateNote,
	makeNote
};
