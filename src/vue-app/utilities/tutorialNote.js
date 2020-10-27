export default {
	"type": "doc",
	"content": [{
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "Hi there! This note will show you all the formattings you can use with this app. All of the following demonstrated features can be applied with your typical Markdown shorthands. Code examples are provided"
		}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "Text styles"}]
	}, {
		"type": "paragraph",
		"content": [{"type": "text", "text": "You can apply the following inline text formattings: "}, {
			"type": "text",
			"marks": [{"type": "bold"}],
			"text": "bold"
		}, {"type": "text", "text": ", "}, {
			"type": "text",
			"marks": [{"type": "italic"}],
			"text": "italics"
		}, {"type": "text", "text": ", "}, {
			"type": "text",
			"marks": [{"type": "strike"}],
			"text": "strikethrough"
		}, {"type": "text", "text": " and "}, {
			"type": "text",
			"marks": [{"type": "code"}],
			"text": "monospaced"
		}, {"type": "text", "text": ". Basically everything you're used to from document editing program."}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs markdown", "language": "markdown"},
		"content": [{"type": "text", "text": "**bold**\n*italics*\n~strike~\n`monospaced`"}]
	}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Lists"}]}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "I've included three separate list types. These are the bulleted list, the ordered list and the todo list. You're guaranteed to find one you like. Let's start with bulleted."
		}]
	}, {
		"type": "bullet_list",
		"content": [{
			"type": "list_item",
			"content": [{"type": "paragraph", "content": [{"type": "text", "text": "This list is unsorted"}]}]
		}, {
			"type": "list_item",
			"content": [{
				"type": "paragraph",
				"content": [{"type": "text", "text": "You can apply "}, {
					"type": "text",
					"marks": [{"type": "bold"}],
					"text": "any"
				}, {"type": "text", "text": " style in here"}]
			}, {
				"type": "bullet_list",
				"content": [{
					"type": "list_item",
					"content": [{
						"type": "paragraph",
						"content": [{"type": "text", "text": "And you can nest them too!"}]
					}]
				}]
			}]
		}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "Then you have ordered lists, which are just lists that count upwards starting at 1."
		}]
	}, {
		"type": "ordered_list",
		"attrs": {"order": 1},
		"content": [{
			"type": "list_item",
			"content": [{"type": "paragraph", "content": [{"type": "text", "text": "This list is ordered"}]}]
		}, {
			"type": "list_item",
			"content": [{"type": "paragraph", "content": [{"type": "text", "text": "And the number keeps rising."}]}]
		}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "And finally we have the todo list. It does what the name says and helps you keep track of things that need to get done."
		}]
	}, {
		"type": "todo_list",
		"content": [{
			"type": "todo_item",
			"attrs": {"done": false},
			"content": [{"type": "paragraph", "content": [{"type": "text", "text": "This is a to-do list."}]}]
		}, {
			"type": "todo_item",
			"attrs": {"done": true},
			"content": [{"type": "paragraph", "content": [{"type": "text", "text": "You can even check them off!"}]}]
		}, {
			"type": "todo_item",
			"attrs": {"done": false},
			"content": [{
				"type": "paragraph",
				"content": [{"type": "text", "text": "Just try clicking on the checkbox."}]
			}]
		}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs markdown", "language": "markdown"},
		"content": [{"type": "text", "text": "* Bulleted lists\n1. Ordered list\n[ ] Todo item"}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "Code blocks"}]
	}, {
		"type": "paragraph",
		"content": [{"type": "text", "text": "You can add code blocks with triple backticks ("}, {
			"type": "text",
			"marks": [{"type": "code"}],
			"text": "```"
		}, {
			"type": "text",
			"text": "). If you don't add a language, they'll try their best to guess what you're putting inside. I've included around 170 languages."
		}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs", "language": "auto"},
		"content": [{
			"type": "text",
			"text": "def auto_code_block\n  puts \"This code block guesses what language you're using!\"\nend"
		}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "To define a specific language just add the language name directly after the backticks (like so: ```"
		}, {"type": "text", "marks": [{"type": "code"}], "text": "php"}, {
			"type": "text",
			"text": " ). This would result in something like this:"
		}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs php", "language": "php"},
		"content": [{
			"type": "text",
			"text": "function specificCodeBlock() {\n  echo \"This code block only accepts PHP!\"\n}"
		}]
	}, {
		"type": "paragraph",
		"content": [{"type": "text", "text": "When you're done typing in a code block you can press "}, {
			"type": "text",
			"marks": [{"type": "bold"}],
			"text": "Command+Enter"
		}, {"type": "text", "text": " to jump out of it."}]
	}, {"type": "heading", "attrs": {"level": 2}, "content": [{"type": "text", "text": "Links"}]}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "You have two options to create links. If you're in a hurry, just paste in an URL and the app will convert it to a clickable link. But you can also use "
		}, {
			"type": "text",
			"marks": [{"type": "link", "attrs": {"href": "https://pretzelhands.com"}}],
			"text": "inline links"
		}, {"type": "text", "text": " if you need to be a bit more descriptive."}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs markdown", "language": "markdown"},
		"content": [{"type": "text", "text": "[Inline links look like this](https://pretzelhands.com)"}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "Images"}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "You can also add images! This is super handy if you want to add a graph or something. To add an image you can either drag it into the editor or link it using Markdown. For demonstration purposes, have a kitten"
		}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "image",
			"attrs": {"src": "https://placekitten.com/600/300", "alt": "Kitten", "title": null}
		}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs markdown", "language": "markdown"},
		"content": [{"type": "text", "text": "![Images are linked like this](https://placekitten.com/600/300)"}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "Headings"}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "To section your document you can use headings! There's a total of three levels that you can use. They look like this"
		}]
	}, {
		"type": "heading",
		"attrs": {"level": 1},
		"content": [{"type": "text", "text": "Heading 1"}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "Heading 2"}]
	}, {
		"type": "heading",
		"attrs": {"level": 3},
		"content": [{"type": "text", "text": "Heading 3"}]
	}, {
		"type": "code_block",
		"attrs": {"cssClass": "hljs markdown", "language": "markdown"},
		"content": [{"type": "text", "text": "# Heading 1\n## Heading 2\n### Heading 3"}]
	}, {
		"type": "heading",
		"attrs": {"level": 2},
		"content": [{"type": "text", "text": "That's a wrap"}]
	}, {
		"type": "paragraph",
		"content": [{
			"type": "text",
			"text": "Now you know all the things you need to know to go ahead and write great notes. I hope you find this application useful and that it becomes and indispensable part of your workflow, like it has for me!"
		}]
	}, {"type": "paragraph"}]
};
