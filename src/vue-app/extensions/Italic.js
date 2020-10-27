import { Mark } from "tiptap";
import { toggleMark, markInputRule, markPasteRule } from "tiptap-commands";

export default class Italic extends Mark {

	get name() {
		return "italic";
	}

	get schema() {
		return {
			parseDOM: [
				{ tag: "i" },
				{ tag: "em" },
				{ style: "font-style=italic" },
			],
			toDOM: () => ["em", 0],
		};
	}

	keys({ type }) {
		return {
			"Mod-i": toggleMark(type),
		};
	}

	commands({ type }) {
		return () => toggleMark(type);
	}

	inputRules({ type }) {
		return [
			markInputRule(/(?:^|[^_])(_([^_]+)_)$/, type),
			markInputRule(/(?:^|[^*])(\*([^*]+)\*)$/, type),
		];
	}

	pasteRules({ type }) {
		return [
			markPasteRule(/\b_([^_]+)_\b/g, type),
			markPasteRule(/\b\*([^*]+)\*\b/g, type),
		];
	}
}
