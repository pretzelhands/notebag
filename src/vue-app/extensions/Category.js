import {Node, Plugin} from "tiptap";
import SuggestionsPlugin from "tiptap-extensions/src/plugins/Suggestions";
import {replaceText} from "tiptap-commands";

import { isActionableKey } from "@/utilities/keycode";
import inlineInputRule from "@/utilities/inlineInputRule";

import store from "@/store/store";
import Actions from "@/store/actions";

export default class Category extends Node {
	get name() {
		return "category";
	}

	get schema() {
		return {
			group: "inline",
			inline: true,
			selectable: false,
			atom: true,
			attrs: {
				id: {
					default: "",
				},
				text: {
					default: null,
				}
			},
			toDOM: node => [ "span", {
				"class": "category-pill",
				"data-type": this.name,
				"tabindex": "0",
			}, node.attrs.text ],
			parseDOM: [
				{
					priority: 60,
					tag: `span[data-type=${this.name}]`,
					class: "category-pill",
					getAttrs: dom => ({
						text: dom.innerText,
					})
				}
			],
		};
	}

	inputRules({ type }) {
		return [
			inlineInputRule(/#([^\s\t!@#$%^&*()=+./\\,[\]{};:'"?]+)([\s\t.,])/, type, match => {
				let [, text, endingCharacter] = match;

				return { text, endingCharacter };
			})
		];
	}

	commands({ schema }) {
		return attrs => replaceText(null, schema.nodes[this.name], attrs);
	}

	get plugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						if (event.target && event.target.classList.contains("category-pill") && isActionableKey(event)) {
							event.preventDefault();
							store.commit(Actions.SEARCH_CATEGORY, event.target.innerText);
						}
					},
					handleClick(view, pos, event) {
						if (event.target.classList.contains("category-pill")) {
							event.preventDefault();
							store.commit(Actions.SEARCH_CATEGORY, event.target.innerText);
						}
					},
				},
			}),
			SuggestionsPlugin({
				command: ({ range, attrs, schema }) => {
					return replaceText(range, schema.nodes[this.name], attrs);
				},
				matcher: {
					/* eslint-disable-next-line no-useless-escape */
					char: "#",
					allowSpaces: false,
					startOfLine: false,
				},

				appendText: " ",
				items: this.options.items,
				onEnter: this.options.onEnter,
				onChange: this.options.onChange,
				onExit: this.options.onExit,
				onKeyDown: this.options.onKeyDown,
				onFilter: this.options.onFilter,
				suggestionClass: "suggestion"
			})
		];
	}
}
