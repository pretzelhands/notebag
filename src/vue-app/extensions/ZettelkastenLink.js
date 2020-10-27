import {Node, Plugin} from "tiptap";
import { replaceText } from "tiptap-commands";
import SuggestionsPlugin from "tiptap-extensions/src/plugins/Suggestions";

import { isActionableKey } from "@/utilities/keycode";
import zettelInputRule from "@/utilities/zettelInputRule";

import store from "@/store/store";
import Actions from "@/store/actions";

export default class ZettelkastenLink extends Node {
	get name() {
		return "zettelkasten_link";
	}

	get schema() {
		return {
			group: "inline",
			inline: true,
			selectable: false,
			atom: true,
			attrs: {
				text: {
					default: null,
				},
				uniqueIdentifier: {
					default: null,
				}
			},
			toDOM: node => [ "span", {
				"data-type": this.name,
				"data-unique": node.attrs.uniqueIdentifier,
				"class": "zettelkasten-link",
				"tabindex": "0",
			}, node.attrs.text ],
			parseDOM: [
				{
					priority: 60,
					tag: `span[data-type=${this.name}]`,
					class: "zettelkasten-link",
					getAttrs: dom => ({
						text: dom.innerText,
						uniqueIdentifier: dom.getAttribute("data-unique")
					})
				}
			],
		};
	}

	inputRules({ type }) {
		return [
			zettelInputRule(/\[\[(.+)]]$/, type, match => {
				let [, text] = match;
				const uniqueIdentifier = text.toLowerCase().replace(/\s/g, "-") + "-" + Math.random().toString(36).substr(2, 9);

				return { text, uniqueIdentifier };
			})
		];
	}

	get plugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						if (event.target && event.target.classList.contains("zettelkasten-link") && isActionableKey(event)) {
							event.preventDefault();
							store.commit(Actions.DETERMINE_ZETTELKASTEN, event.target.innerText);
							return true;
						}
					},
					handleClick(view, pos, event) {
						if (event.target.classList.contains("zettelkasten-link")) {
							event.preventDefault();
							store.commit(Actions.DETERMINE_ZETTELKASTEN, event.target.innerText);
							return true;
						}
					},
				},
			}),
			SuggestionsPlugin({
				command: ({ range, attrs, schema }) => {
					store.dispatch({
						type: Actions.ADD_ZETTELKASTEN_BACKLINK,
						linkTo: attrs.text,
						linkFrom: store.state.activeNote,
						identifier: attrs.uniqueIdentifier,
					});

					return replaceText(range, schema.nodes[this.name], attrs);
				},
				matcher: {
					/* eslint-disable-next-line no-useless-escape */
					char: "\[\\[",
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
			})
		];
	}
}
