import { Node } from "tiptap";
import { toggleBlockType } from "tiptap-commands";

import inlineInputRule from "@/utilities/inlineInputRule";
import { latexToImage } from "@/utilities/math";

export default class Math extends Node {
	get name() {
		return "math_block";
	}

	get view() {
		return {
			props: ["node"],
			template: "<img class='math' :src='node.attrs.svg' :data-type='node.name' :data-formula='node.attrs.formula'>"
		};
	}

	get schema() {
		return {
			attrs: {
				formula: {
					default: "",
				},
				svg: {
					default: "",
				}
			},
			group: "inline",
			inline: true,
			focusable: true,
			selectable: true,
			atom: true,
			toDOM: node => {
				const { formula, svg } = node.attrs;

				return [
					"img",
					{
						"class": "math",
						"src": svg,
						"data-formula": formula.toString(),
						"data-type": this.name,
					},

				];
			},
			parseDOM: [{
				tag: "img[data-formula]",
				getAttrs: dom => ({
					src: dom.getAttribute("src"),
					formula: dom.getAttribute("data-formula"),
				}),
			}],
		};
	}

	commands({ type, schema }) {
		return attrs => {
			return toggleBlockType(type, schema.nodes.paragraph, attrs);
		};
	}

	inputRules({ type }) {
		return [
			inlineInputRule(/\$(.+)\$/, type, match => {
				let [, formula] = match;
				const svg = "data:image/svg+xml;base64," + btoa(latexToImage(formula));

				return { formula, svg };
			})
		];
	}
}
