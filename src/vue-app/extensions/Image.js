import { Node, Plugin } from "tiptap";
import { nodeInputRule } from "tiptap-commands";

import fs from "fs-extra";
import { remote } from "electron";
import uuid from "uuid/v4";

import store from "@/store/store";

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

const processImages = (images, view, schema, coordinates) => {
	images.forEach(image => {
		const reader = new FileReader();

		reader.onload = async readerEvent => {
			const { app } = remote;
			const Buffer = remote.getGlobal("Buffer");
			const extension = image.type.replace("image/", "");

			const encodedImage = readerEvent.target.result;
			const activeNote = store.state.notes[store.state.activeNote];
			const imagePath = app.getPath("userData") + "/assets/" + activeNote.id + "/";
			const imageFilePath = imagePath + uuid() + "." + extension;

			await fs.mkdirp(imagePath);
			fs.writeFile(imageFilePath, Buffer.from(encodedImage), () => {
				const node = schema.nodes.image.create({ src: "file://" + imageFilePath });
				const transaction = view.state.tr.insert(coordinates, node);

				view.dispatch(transaction);
			});
		};

		reader.readAsArrayBuffer(image);
	});
};

export default class Image extends Node {

	get name() {
		return "image";
	}

	get schema() {
		return {
			inline: true,
			attrs: {
				src: {},
				alt: {
					default: null,
				},
				title: {
					default: null,
				},
			},
			group: "inline",
			draggable: true,
			selectable: true,
			parseDOM: [
				{
					tag: "img[src]",
					getAttrs: dom => ({
						src: dom.getAttribute("src"),
						title: dom.getAttribute("title"),
						alt: dom.getAttribute("alt"),
					}),
				},
			],
			toDOM: node => ["img", { ...node.attrs, contenteditable: true }],
		};
	}

	commands({ type }) {
		return attrs => (state, dispatch) => {
			const { selection } = state;
			const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos;
			const node = type.create(attrs);
			const transaction = state.tr.insert(position, node);
			dispatch(transaction);
		};
	}

	inputRules({ type }) {
		return [
			nodeInputRule(IMAGE_INPUT_REGEX, type, match => {
				const [, alt, src, title] = match;
				return {
					src,
					alt,
					title,
				};
			}),
		];
	}

	get plugins() {
		return [
			new Plugin({
				props: {
					handleDOMEvents: {
						paste(view, event) {
							const hasFiles = event.clipboardData
								&& event.clipboardData.files
								&& event.clipboardData.files.length;

							if (!hasFiles) {
								return;
							}

							const images = Array
								.from(event.clipboardData.files)
								.filter(file => (/image/i).test(file.type));

							if (images.length === 0) {
								return;
							}

							event.preventDefault();

							const { schema } = view.state;
							const coordinates = view.posAtDOM(event.target);

							processImages(images, view, schema, coordinates);
						},

						drop(view, event) {
							const hasFiles = event.dataTransfer
								&& event.dataTransfer.files
								&& event.dataTransfer.files.length;

							if (!hasFiles) {
								return;
							}

							const images = Array
								.from(event.dataTransfer.files)
								.filter(file => (/image/i).test(file.type));

							if (images.length === 0) {
								return;
							}

							event.preventDefault();

							const {schema} = view.state;
							const coordinates = view.posAtCoords({left: event.clientX, top: event.clientY});

							processImages(images, view, schema, coordinates.pos);
						}
					},
				},
			}),
		];
	}
}
