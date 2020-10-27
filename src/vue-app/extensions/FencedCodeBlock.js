/** setBlockType for enter keyhandler */
import { textblockTypeInputRule } from "tiptap-commands";

import CodeBlock from "@/extensions/CodeBlock.js";
import languages from "@/utilities/supportedLanguages";

const CODE_BLOCK_REGEX = /^```(.*)\s$/;
// const CODE_BLOCK_ENTER_REGEX = /^```(.*)$/;

export default class FencedCodeBlock extends CodeBlock {
	get defaultOptions() {
		return {
			languages
		};
	}

	get name() {
		return "code_block";
	}

	get schema() {
		return {
			content: "inline*",
			marks: "",
			group: "block",
			code: true,
			defining: true,
			draggable: false,
			attrs: {
				cssClass: {
					default: null
				},
				language: {
					default: null
				}
			},
			parseDOM: [
				{
					tag: "pre",
					getAttrs: dom => ({
						cssClass: dom.getAttribute("class"),
						language: dom.getAttribute("data-language"),
					}),
					preserveWhitespace: "full"
				},
			],
			toDOM: node => {
				return [
					"pre",
					{
						"class": node.attrs.cssClass,
						"data-language": node.attrs.language || "auto"
					},
					[ "code", 0 ]
				];
			},
		};
	}

	inputRules({ type }) {
		return [
			textblockTypeInputRule(CODE_BLOCK_REGEX, type, match => {
				let [, language] = match;
				let cssClass = "hljs";

				if (language.length === 0) {
					language = "auto";
				} else {
					cssClass += ` ${language}`;
				}


				return {
					cssClass,
					language
				};
			}),
		];
	}

	// keys({ type }) {
	// 	return {
	// 		Enter(state, dispatch) {
	// 			if (!state.selection.$cursor) {
	// 				return false;
	// 			}
	//
	// 			const { nodeBefore } = state.selection.$from;
	//
	// 			if (!nodeBefore) {
	// 				return false;
	// 			}
	//
	// 			if (!nodeBefore.isText) {
	// 				return false;
	// 			}
	//
	// 			const matches = nodeBefore.text.match(CODE_BLOCK_ENTER_REGEX);
	// 			if (matches) {
	// 				let [, language] = matches;
	// 				let cssClass = "hljs";
	//
	// 				if (language.length === 0) {
	// 					language = "auto";
	// 				} else {
	// 					cssClass += ` ${language}`;
	// 				}
	//
	// 				const transaction = state.tr
	// 					.setBlockType(state.selection.ranges[0].$from.pos, state.selection.ranges[0].$from.pos, type, { language, cssClass });
	//
	// 				dispatch(transaction);
	//
	// 				return true;
	// 			}
	//
	// 			return false;
	// 		}
	// 	};
	// }
}
