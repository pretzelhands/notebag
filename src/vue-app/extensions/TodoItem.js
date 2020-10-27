import { remote } from "electron";
import { Node } from "tiptap";
import { sinkListItem, splitToDefaultListItem, liftListItem } from "tiptap-commands";
import { findParentNode } from "prosemirror-utils";

import electronStore from "@/store/electronStore";
import Shortcuts, { defaultShortcuts } from "@/store/shortcuts";
import { makeAccelerator } from "@/utilities/shortcuts";

function isTodoItem(node, schema) {
	return node.type === schema.nodes.todo_item;
}

const shortcutOs = remote.process.platform === "darwin"
	? "darwin"
	: "other";

export default class TodoItem extends Node {

	get name() {
		return "todo_item";
	}

	get defaultOptions() {
		return {
			nested: true,
		};
	}

	get view() {
		return {
			props: ["node", "updateAttrs", "view"],
			methods: {
				onChange() {
					this.updateAttrs({
						done: !this.node.attrs.done,
					});
				},
			},
			template: `
				<li :data-type="node.type.name" :data-done="node.attrs.done.toString()" data-drag-handle>
				  <span class="todo-checkbox" @click="onChange"></span>
				  <span class="todo-content" ref="content" :contenteditable="view.editable.toString()"></span>
				</li>
			`,
		};
	}

	get schema() {
		return {
			attrs: {
				done: {
					default: false,
				},
			},
			draggable: true,
			content: this.options.nested ? "(paragraph|todo_list)+" : "paragraph+",
			toDOM: node => {
				const { done } = node.attrs;

				return [
					"li",
					{
						"data-type": this.name,
						"data-done": done.toString(),
					},
					["span", { class: "todo-checkbox", contenteditable: "false" }],
					["div", { class: "todo-content" }, 0],
				];
			},
			parseDOM: [{
				priority: 51,
				tag: `li[data-type="${this.name}"]`,
				getAttrs: dom => ({
					done: dom.getAttribute("data-done") === "true",
				}),
			}],
		};
	}

	keys({ type }) {
		const accelerator = makeAccelerator(
			electronStore.get(`preferences.shortcuts.${Shortcuts.COMPLETE_TODO}`, defaultShortcuts[shortcutOs][Shortcuts.COMPLETE_TODO])
		);

		return {
			Enter: splitToDefaultListItem(type),
			Tab:  sinkListItem(type),
			"Shift-Tab": liftListItem(type),
			[accelerator]: (state, dispatch) => {
				const { selection, schema } = state;
				const todoItem = findParentNode(node => isTodoItem(node, schema))(selection);

				const transaction = state.tr.setNodeMarkup(
					todoItem.pos,
					undefined,
					{ done: !todoItem.node.attrs.done }
				);

				dispatch(transaction);

				return true;
			}
		};
	}
}
