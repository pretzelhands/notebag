import { Node, Plugin } from "tiptap";
import inlineInputRule  from "@/utilities/inlineInputRule";

export default class MarkdownLink extends Node {
	get name() {
		return "markdown_link";
	}

	get defaultOptions() {
		return {
			openOnClick: true,
		};
	}

	get schema() {
		return {
			group: "inline",
			content: "text*",
			inline: true,
			selectable: true,
			attrs: {
				text: {
					default: null,
				},
				href: {
					default: null,
				},
			},
			toDOM: node => ["a", {
				href: node.attrs.href,
				rel: "noopener noreferrer nofollow",
				target: "_blank",
				tabindex: 0,
			}, node.attrs.text],
			parseDOM: [{
				tag: "a",
				getAttrs: dom => ({
					href: dom.getAttribute("href"),
					rel: dom.getAttribute("rel"),
					target: dom.getAttribute("target"),
				})
			}]
		};
	}

	commands({ type }) {
		return attrs => {
			return (state, dispatch) => {
				dispatch(state.tr.replaceSelectionWith(type.create(attrs)));
			};
		};
	}

	inputRules({ type }) {
		return [
			inlineInputRule(/\[(.+)]\((.+)\)$/, type, match => {
				let [, text, href] = match;

				return { text, href };
			}),
		];
	}

	get plugins() {
		return [
			new Plugin({
				handleDOMEvents: {
					keydown(view, event) {
						if (event.target instanceof HTMLAnchorElement) {
							// Meh.
						}
					},
					click(view, event) {
						if (event.target instanceof HTMLAnchorElement) {
							// whatev
						}
					}
				}
			})
		];
	}
}
