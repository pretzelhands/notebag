import TurndownService from "turndown";

const turndownService = new TurndownService({
	codeBlockStyle: "fenced",
	headingStyle: "atx",
});

turndownService.addRule("fencedCodeBlock", {
	filter: function (node, options) {
		return (
			options.codeBlockStyle === "fenced" &&
			node.nodeName === "PRE" &&
			node.firstChild &&
			node.firstChild.nodeName === "CODE"
		);
	},

	replacement: function (content, node, options) {
		const language = node.getAttribute("data-language");

		return (
			"\n\n" + options.fence + language + "\n" +
			node.firstChild.textContent +
			"\n" + options.fence + "\n\n"
		);
	}
});

turndownService.addRule("zettellinks", {
	filter(node) {
		return node.nodeName === "SPAN"
			&& node.className === "zettelkasten-link";
	},

	replacement(content) {
		return `[[${content}]]`;
	}
});

turndownService.addRule("categories", {
	filter(node) {
		return node.nodeName === "SPAN"
			&& node.className === "category-pill";
	},

	replacement(content) {
		return `#${content}`;
	}
});

turndownService.addRule("todo-list", {
	filter(node) {
		return node.nodeName === "LI"
			&& node.dataset.type === "todo_item";
	},

	replacement(content) {
		var trimmedContent = content.replace(/^\n+/, "") // remove leading newlines
			.replace(/\n+$/, "\n") // replace trailing newlines with just a single one
			.replace(/\n/gm, "\n    ") ;// indent

		return `- [ ] ${trimmedContent}\n`;
	}
});

turndownService.addRule("todo-list:done", {
	filter(node) {
		return node.nodeName === "LI"
			&& node.dataset.type === "todo_item"
			&& node.dataset.done === "true";
	},

	replacement(content) {
		var trimmedContent = content.replace(/^\n+/, "") // remove leading newlines
			.replace(/\n+$/, "\n") // replace trailing newlines with just a single one
			.replace(/\n/gm, "\n    ") ;// indent

		return `- [x] ${trimmedContent}\n`;
	}
});

turndownService.addRule("strikethrough", {
	filter: ["del", "s", "strike"],
	replacement: function (content) {
		return "~" + content + "~";
	}
});

export default turndownService.turndown.bind(turndownService);
