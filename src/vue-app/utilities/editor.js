import { Editor } from "tiptap";
import {
	Heading,

	// Text formatting
	Bold,
	Code,
	Strike,
	Underline,

	// Lists
	ListItem,
	BulletList,
	OrderedList,

	// Todos
	TodoList,

	// Editor related
	HardBreak,
	Search,
	Placeholder,
	History,
	TrailingNode,
} from "tiptap-extensions";

import Italic from "@/extensions/Italic";
import Link from "@/extensions/Link";
import MarkdownLink from "@/extensions/MarkdownLink";
import ZettelkastenLink from "@/extensions/ZettelKastenLink";
import FencedCodeBlock from "@/extensions/FencedCodeBlock";
import TodoItem from "@/extensions/TodoItem";
import Category from "@/extensions/Category";
import Image from "@/extensions/Image";
import Math from "@/extensions/Math";

import {handleRtlParagraphs} from "@/utilities/rtl";

const makeEditor = (note, onUpdate, suggestionsData, categorySuggestions) => {
	return new Editor({
		content: note ? note.body : "",
		onUpdate: async (content) => {
			return onUpdate(content);
		},
		onInit() {
			handleRtlParagraphs();
		},
		extensions: [
			new Heading({levels: [1, 2, 3]}),

			new Bold(),
			new Code(),
			new Italic(),
			new Strike(),
			new Underline(),

			new Image(),

			new Link(),
			new MarkdownLink(),

			new Category(categorySuggestions),
			new ZettelkastenLink(suggestionsData),

			new FencedCodeBlock(),

			new ListItem(),
			new BulletList(),
			new OrderedList(),

			new TodoItem(),
			new TodoList(),

			new Math(),

			new HardBreak(),
			new Search(),
			new History(),
			new Placeholder({
				showOnlyWhenEditable: true,
				showOnlyCurrent: true,
				emptyEditorClass: "is-empty",
			}),
			new TrailingNode({
				node: "paragraph",
				notAfter: "paragraph"
			})
		],
	});
};

export {
	makeEditor
};
