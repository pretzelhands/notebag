/* eslint-disable */
import { remote } from "electron";
import ElectronStore from "electron-store";

import EventBus, { Events } from "@/EventBus";
import getAllBacklinks from "@/scanners/backlinks";

export const NOTES = "notes";
export const ARCHIVED_NOTES = "archivedNotes";
export const PROJECTS = "projects";
export const LINKS = "links";
export const PREFERENCES = "preferences";
export const SHORTCUTS = "shortcuts";
export const ACTIVE_NOTE = "activeNote";
export const ACTIVE_PROJECT = "activeProject";

const urlParams = new URLSearchParams(window.location.search);
const licenseKey = urlParams.get("licenseKey");

const store = new ElectronStore({ watch: true });

export const licenseStorage = new ElectronStore({
	watch: true,
	name: "license",
	encryptionKey: "trial",
});

export const noteStorage = new ElectronStore({
	watch: true,
	name: "notebag",
	encryptionKey: "ENCRYPTION_KEY",
	cwd: store.get("preferences.notePath", remote.app.getPath("userData")),
	projectVersion: "1.1.0",
	migrations: {
		"1.1.0": async store => {
			let links = [];
			const notes = store.get(NOTES);

			for (let note of Object.values(store.get(NOTES))) {
				const linkNodes = await getAllBacklinks(note.body);
				for (const node of linkNodes) {
					if (!node.attrs.text) {
						return;
					}

					const { text } = node.attrs;
					const [ targetNote ] = Object.values(store.get(NOTES)).filter(note => note.title.toLowerCase() === text.toLowerCase());
					const identifier = text.toLowerCase().replace(/\s/g, "-") + "-" + Math.random().toString(36).substr(2, 9);

					const serializedNoteBody = JSON.stringify(note.body);
					const serializedNode = JSON.stringify(node);
					const newNode = JSON.stringify({ ...node, attrs: { uniqueIdentifier: identifier, text }});

					note.body = JSON.parse(serializedNoteBody.replace(serializedNode, newNode));
					note.preview = note.preview.replace(
						`<span data-type="zettelkasten_link" class="zettelkasten-link" tabindex="0">${text}</span>`,
						`<span data-unique="${identifier}" data-type="zettelkasten_link" class="zettelkasten-link" tabindex="0">${text}</span>`
					);

					notes[note.id] = note;
					links.push({
						identifier,
						originNote: note.id,
						targetNote: targetNote.id,
					});
				}
			}

			store.set(NOTES, notes);
			store.set(LINKS, [
				...store.get(LINKS),
				...links,
			]);

			EventBus.$emit(Events.MIGRATED_NOTES, store.get(LINKS), store.get(NOTES));
		}
	}
});

window.electronStorage = store;
window.noteStorage = noteStorage;

export default store;
