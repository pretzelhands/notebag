import showdown from "showdown";

import listParser from "@/converters/parsers/lists";

// const classMap = {};
// const HtmlClassExtensions = Object.keys(classMap)
// 	.map(key => ({
// 		type: "output",
// 		regex: new RegExp(`<${key}(.*)>`, "g"),
// 		replace: `<${key} class="${classMap[key]}" $1>`
// 	}));

/* eslint-disable no-useless-escape */
const NotebagExtension = () => [
	{
		type: "listener",
		listeners: {
			"italicsAndBold.after": function (event, text) {
				return text.replace(/\[\[([^+\n]+?)]]/g, function (wm, txt) {
					return `<span class='zettelkasten-link' tabindex='0' contenteditable='false' data-type='zettelkasten_link'>${txt}</span>`;
				});
			}
		}
	},

	{
		type: "listener",
		listeners: {
			"italicsAndBold.after": function (event, text) {
				return text.replace(/#([\w-/]+)/g, function (wm, txt) {
					return `<span class='category-pill' tabindex='0' contenteditable='false' data-type='category'>${txt}</span>`;
				});
			}
		}
	},

	{
		type: "output",
		regex: new RegExp("<pre><code class=\"(.+)\">", "g"),
		replace: function(s, substituteMatch) {
			const [, language] = substituteMatch.match(/language-(.+)/);

			return `<pre data-language="${language}" class='hljs ${language}'><code>`;
		}
	},

	/* eslint-disable quotes */
	{
		type: "output",
		regex: new RegExp(`<li>(<p>)?<input type="checkbox" checked>(.*?)(</p>)?</li>`, "g"),
		replace(s, _, text) {
			return `<li data-type="todo_item" data-done="true" data-drag-handle>
			  <span class="todo-checkbox"></span>
			  <div class="todo-content" ref="content" contenteditable="true">${text}</div>
			</li>`;
		}
	},

	{
		type: "output",
		regex: new RegExp(`<li>(<p>)?<input type="checkbox">(.*?)(</p>)?</li>`, "g"),
		replace(s, _, text) {
			return `<li data-type="todo_item" data-done="false" data-drag-handle>
			  <span class="todo-checkbox"></span>
			  <div class="todo-content" ref="content" contenteditable="true">${text}</div>
			</li>`;
		}
	},

	{
		type: "output",
		regex: new RegExp(`<ul>\n<li data-type="todo_item"`, "g"),
		replace() {
			return `<ul data-type="todo_list"><li data-type="todo_item"`;
		}
	},
];


showdown.subParser("lists", listParser);
const converter = new showdown.Converter({
	extensions: [ NotebagExtension ],
	requireSpaceBeforeHeadingText: true,
	tasklists: true,
	ghCodeBlocks: true,
	omitExtraWLInCodeBlocks: true,
	simpleLineBreaks: true,
});

window.toHtml = converter.makeHtml.bind(converter);
export default converter.makeHtml.bind(converter);
