import fs from "fs-extra";
import glob from "glob-promise";
import escapeStringRegexp from "escape-string-regexp";
import { DOMParser } from "prosemirror-model";
import { remote } from "electron";

const dialog = remote.require("electron").dialog;
const path = remote.require("path");
const mainWindow = remote.getGlobal("mainWindow");

import { noteStorage, NOTES } from "@/store/electronStore";

import { makeEditor } from "@/utilities/editor";
import { replaceFromArrays } from "@/utilities/text";

import toMarkdown from "@/converters/to-markdown";
import toHtml from "@/converters/to-html";

class ImportService {
	async importNotes()
	{
		const { schema } = makeEditor();
		const { filePaths } = await dialog.showOpenDialog(remote.getGlobal("preferencesWindow"),{ properties: ["openDirectory"] });
		const [ filePath ] = filePaths;
		const domParser = DOMParser.fromSchema(schema);
		let files = [];

		if (filePath) {
			try {
				files = await glob(`${filePath}/**/*.md`);
			} catch (err) {
				dialog.showErrorBox("Error", `Couldn't import notes: ${err}`);
				return;
			}

			if (files.length === 0) {
				dialog.showMessageBox(remote.getGlobal("preferencesWindow"), {
					title: "Nothing to import",
					message: "This directory does not contain any files to import."
				});

				return;
			}

			for (let file of files) {
				let importData = await this.processFile(file);
				importData = await this.processAssets(filePath, importData);

				if (!importData) {
					continue;
				}

				let bodyDom = document.createElement("div");
				bodyDom.innerHTML = importData.preview;

				mainWindow.send("imported-note", JSON.stringify({
					title: importData.title,
					preview: importData.preview,
					body: domParser.parse(bodyDom)
				}));
			}

			dialog.showMessageBox(remote.getGlobal("preferencesWindow"), {
				title: "Import completed",
				message: `${files.length} notes have been sucessfully imported!`
			});
		}
	}

	async processFile(file) {
		const importBody = fs.readFileSync(file, "utf-8");
		const paragraphs = importBody.split("\n");

		let title = path.basename(file, ".md");
		let body = "";

		if (paragraphs[0].trim().indexOf("#") === 0) {
			body = paragraphs.slice(1).join("\n");
		} else {
			body = paragraphs.join("\n");
		}

		let preview = toHtml(body);

		return {
			title,
			body,
			preview,
		};
	}

	async processAssets(filePath, importData) {
		const assetsDirectory = `${filePath}/${importData.title}`;
		const destinationDirectory = `${remote.app.getPath("userData")}/assets/${importData.title}`;

		if (!await fs.exists(assetsDirectory)) {
			return importData;
		}

		try {
			await fs.ensureDir(destinationDirectory);
			await fs.copy(assetsDirectory, destinationDirectory);

			/* eslint-disable-next-line no-useless-escape */
			const importableFiles = await glob(`${assetsDirectory}/*.+(gif|jpeg|jpg|png|webp)`);

			const replaceableFileNames = importableFiles
				.map(file => `${importData.title}/${path.basename(file)}`.replace(/\s/g, "%20"))
				.map(path => `src="${path}"`);

			const insertableFileNames = importableFiles
				.map(file => encodeURIComponent(`${destinationDirectory}/${path.basename(file)}`).replace(/%2F/g, "/"))
				.map(path => `src="file://${path}"`);

			importData.preview = replaceFromArrays(importData.preview, replaceableFileNames, insertableFileNames);
		} catch (err) {
			dialog.showErrorBox("Error", `Couldn't import note "${importData.title}: ${err}`);
			return;
		}

		return importData;
	}

	async exportNotes() {
		let hasError = false;
		const { filePaths } = await dialog.showOpenDialog(remote.getGlobal("preferencesWindow"),{ properties: ["openDirectory"] });
		const path = filePaths[0];
		const notes = Object.values(noteStorage.get(NOTES));

		if (path) {
			fs.mkdir(`${path}/notebag-export/`, function(err) {
				if (err && err.toString().indexOf("EEXIST") === -1) {
					hasError = true;
					dialog.showErrorBox("Couldn't export your notes", `There was an issue exporting your notes: ${err}`);
				}
			});

			if (hasError) return;

			for (const note of notes) {
				let content = toMarkdown(note.preview);
				let fileName = note.title || "Untitled note";

				const existingFiles = glob.sync(`${path}/notebag-export/${fileName}*.md`);
				if (existingFiles.length > 0) {
					fileName = `${fileName} ${existingFiles.length+1}`;
				}

				const exportPath = `${path}/notebag-export/${fileName}.md`;
				const exportImagesPath = `${path}/notebag-export/${fileName}`;

				const assetsPath = remote.app.getPath("userData") + "/assets/";
				const noteAssetsPath =  assetsPath + note.id;

				const pathRegexp = new RegExp(escapeStringRegexp("file://" + assetsPath), "g");
				content = content.replace(pathRegexp, "");

				if (fs.existsSync(noteAssetsPath)) {
					await fs.copy(noteAssetsPath, exportImagesPath);
				}

				fs.writeFile(exportPath, content, (err) => {
					if (err) {
						hasError = true;
						dialog.showErrorBox("Couldn't export your notes", `There was an issue exporting your notes: ${err}`);
					}
				});
			}

			if (hasError) return;

			dialog.showMessageBox({
				title: "Export completed",
				message: "All done! We've exported all your notes. The folder is called 'notebag-export'."
			});
		}
	}
}

export default ImportService;
