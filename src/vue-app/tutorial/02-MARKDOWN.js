export default {
	"id": "f5fdb941-6c1d-4c18-8823-0b7efee054c9",
	"title": "Markdown formatting",
	"body": {
		"type": "doc",
		"content": [
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "Notebag brings along a wide range of markdown formattings that you can use to write and format your notes in the way that suits you best. This is an overview of everything that's included. Code examples are provided!"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"marks": [
							{
								"type": "bold"
							}
						],
						"text": "Note:"
					},
					{
						"type": "text",
						"text": " The markdown formatting is triggered by using typing a "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "Space"
					},
					{
						"type": "text",
						"text": " after the formatting."
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Text styles"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can apply the following inline text formattings: "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "bold"
							}
						],
						"text": "bold"
					},
					{
						"type": "text",
						"text": ", "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "italic"
							}
						],
						"text": "italics"
					},
					{
						"type": "text",
						"text": ", "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "strike"
							}
						],
						"text": "strikethrough"
					},
					{
						"type": "text",
						"text": " and "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "monospaced"
					},
					{
						"type": "text",
						"text": ". Basically everything you're used to from document editing program."
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "**bold**"
					},
					{
						"type": "text",
						"text": "\n"
					},
					{
						"type": "text",
						"text": "*italics*"
					},
					{
						"type": "text",
						"text": "\n"
					},
					{
						"type": "text",
						"text": "~strike~"
					},
					{
						"type": "text",
						"text": "\n"
					},
					{
						"type": "text",
						"text": "`monospaced`"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Lists"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "I've included three separate list types. These are the bulleted list, the ordered list and the todo list. You're guaranteed to find one you like. Let's start with bulleted."
					}
				]
			},
			{
				"type": "bullet_list",
				"content": [
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "This list is unsorted"
									}
								]
							}
						]
					},
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "You can apply "
									},
									{
										"type": "text",
										"marks": [
											{
												"type": "bold"
											}
										],
										"text": "any"
									},
									{
										"type": "text",
										"text": " style in here"
									}
								]
							},
							{
								"type": "bullet_list",
								"content": [
									{
										"type": "list_item",
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "And you can nest them too!"
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "Then you have ordered lists, which are just lists that count upwards starting at 1."
					}
				]
			},
			{
				"type": "ordered_list",
				"attrs": {
					"order": 1
				},
				"content": [
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "This list is ordered"
									}
								]
							}
						]
					},
					{
						"type": "list_item",
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "And the number keeps rising."
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "And finally we have the todo list. It does what the name says and helps you keep track of things that need to get done."
					}
				]
			},
			{
				"type": "todo_list",
				"content": [
					{
						"type": "todo_item",
						"attrs": {
							"done": false
						},
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "This is a to-do list."
									}
								]
							}
						]
					},
					{
						"type": "todo_item",
						"attrs": {
							"done": true
						},
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "You can even check them off!"
									}
								]
							}
						]
					},
					{
						"type": "todo_item",
						"attrs": {
							"done": false
						},
						"content": [
							{
								"type": "paragraph",
								"content": [
									{
										"type": "text",
										"text": "Just try clicking on the checkbox."
									}
								]
							},
							{
								"type": "todo_list",
								"content": [
									{
										"type": "todo_item",
										"attrs": {
											"done": false
										},
										"content": [
											{
												"type": "paragraph",
												"content": [
													{
														"type": "text",
														"text": "Or try pressing "
													},
													{
														"type": "text",
														"marks": [
															{
																"type": "code"
															}
														],
														"text": "Ctrl+C"
													},
													{
														"type": "text",
														"text": "! It works too."
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "* Bulleted lists\n1. Ordered list\n[ ] Todo item"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Code blocks"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can add code blocks with triple backticks ("
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "```"
					},
					{
						"type": "text",
						"text": "). If you don't add a language, they'll try their best to guess what you're putting inside. I've included around 170 languages."
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs",
					"language": "auto"
				},
				"content": [
					{
						"type": "text",
						"text": "def auto"
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "italic"
							}
						],
						"text": "code"
					},
					{
						"type": "text",
						"text": "block\n  puts \"This code block guesses what language you're using!\"\nend"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "To define a specific language just add the language name directly after the backticks (like so: "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "```php"
					},
					{
						"type": "text",
						"text": "). This would result in something like this:"
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs php",
					"language": "php"
				},
				"content": [
					{
						"type": "text",
						"text": "function specificCodeBlock() {\n  echo \"This code block only accepts PHP!\"\n}"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "When you're done typing in a code block you can press "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "Command/Ctrl+Enter"
					},
					{
						"type": "text",
						"text": " to jump out of it."
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Categories"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "Every note can have hashtag-based categories associated with them. You write them the same way as you would on Twitter or Instagram. Here's an example: "
					},
					{
						"type": "category",
						"attrs": {
							"id": "",
							"text": "tutorial"
						}
					},
					{
						"type": "text",
						"text": ". You can also nest them by adding a slash. This looks like this "
					},
					{
						"type": "category",
						"attrs": {
							"id": "",
							"text": "tutorial/markdown"
						}
					},
					{
						"type": "text",
						"text": ". If you click on a category the app will immediately search for it. "
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "#category #category/nested"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Zettels"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can link notes between each other to build a Zettelkasten system of your own! To do so, simply wrap the note title between double angle brackets. If the note does not yet exist, it will be created for you when you first click the link. Zettel links are case insensitive."
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "[[Introduction to note taking]]"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can learn more about Zettelkasten in "
					},
					{
						"type": "zettelkasten_link",
						"attrs": {
							"text": "organizing your notes",
							"uniqueIdentifier": "organizing-your-notes-8jbr46wom"
						}
					},
					{
						"type": "text",
						"text": ". "
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Links"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You have two options to create links. If you're in a hurry, just paste in an URL and the app will convert it to a clickable link. But you can also use "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "link",
								"attrs": {
									"href": "https://pretzelhands.com"
								}
							}
						],
						"text": "inline links"
					},
					{
						"type": "text",
						"text": " if you need to be a bit more descriptive."
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "[Inline links look like this]("
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "link",
								"attrs": {
									"href": "https://pretzelhands.com"
								}
							}
						],
						"text": "https://pretzelhands.com"
					},
					{
						"type": "text",
						"text": ")"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Math"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can insert LaTeX equations at any point during writing a note. Simply wrap your LaTeX expression in "
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "code"
							}
						],
						"text": "$"
					},
					{
						"type": "text",
						"text": " signs and you can have the following:  "
					},
					{
						"type": "math_block",
						"attrs": {
							"formula": "x=1",
							"svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1LjQ0MmV4IiBoZWlnaHQ9IjEuNjkyZXgiIHJvbGU9ImltZyIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAtNjY2IDI0MDUuNiA3NDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOiAtMC4xODZleDsiPjxkZWZzPjxwYXRoIGlkPSJNSlgtOS1URVgtSS0xRDQ2NSIgZD0iTTUyIDI4OVE1OSAzMzEgMTA2IDM4NlQyMjIgNDQyUTI1NyA0NDIgMjg2IDQyNFQzMjkgMzc5UTM3MSA0NDIgNDMwIDQ0MlE0NjcgNDQyIDQ5NCA0MjBUNTIyIDM2MVE1MjIgMzMyIDUwOCAzMTRUNDgxIDI5MlQ0NTggMjg4UTQzOSAyODggNDI3IDI5OVQ0MTUgMzI4UTQxNSAzNzQgNDY1IDM5MVE0NTQgNDA0IDQyNSA0MDRRNDEyIDQwNCA0MDYgNDAyUTM2OCAzODYgMzUwIDMzNlEyOTAgMTE1IDI5MCA3OFEyOTAgNTAgMzA2IDM4VDM0MSAyNlEzNzggMjYgNDE0IDU5VDQ2MyAxNDBRNDY2IDE1MCA0NjkgMTUxVDQ4NSAxNTNINDg5UTUwNCAxNTMgNTA0IDE0NVE1MDQgMTQ0IDUwMiAxMzRRNDg2IDc3IDQ0MCAzM1QzMzMgLTExUTI2MyAtMTEgMjI3IDUyUTE4NiAtMTAgMTMzIC0xMEgxMjdRNzggLTEwIDU3IDE2VDM1IDcxUTM1IDEwMyA1NCAxMjNUOTkgMTQzUTE0MiAxNDMgMTQyIDEwMVExNDIgODEgMTMwIDY2VDEwNyA0NlQ5NCA0MUw5MSA0MFE5MSAzOSA5NyAzNlQxMTMgMjlUMTMyIDI2UTE2OCAyNiAxOTQgNzFRMjAzIDg3IDIxNyAxMzlUMjQ1IDI0N1QyNjEgMzEzUTI2NiAzNDAgMjY2IDM1MlEyNjYgMzgwIDI1MSAzOTJUMjE3IDQwNFExNzcgNDA0IDE0MiAzNzJUOTMgMjkwUTkxIDI4MSA4OCAyODBUNzIgMjc4SDU4UTUyIDI4NCA1MiAyODlaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC05LVRFWC1OLTNEIiBkPSJNNTYgMzQ3UTU2IDM2MCA3MCAzNjdINzA3UTcyMiAzNTkgNzIyIDM0N1E3MjIgMzM2IDcwOCAzMjhMMzkwIDMyN0g3MlE1NiAzMzIgNTYgMzQ3Wk01NiAxNTNRNTYgMTY4IDcyIDE3M0g3MDhRNzIyIDE2MyA3MjIgMTUzUTcyMiAxNDAgNzA3IDEzM0g3MFE1NiAxNDAgNTYgMTUzWiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtOS1URVgtTi0zMSIgZD0iTTIxMyA1NzhMMjAwIDU3M1ExODYgNTY4IDE2MCA1NjNUMTAyIDU1Nkg4M1Y2MDJIMTAyUTE0OSA2MDQgMTg5IDYxN1QyNDUgNjQxVDI3MyA2NjNRMjc1IDY2NiAyODUgNjY2UTI5NCA2NjYgMzAyIDY2MFYzNjFMMzAzIDYxUTMxMCA1NCAzMTUgNTJUMzM5IDQ4VDQwMSA0Nkg0MjdWMEg0MTZRMzk1IDMgMjU3IDNRMTIxIDMgMTAwIDBIODhWNDZIMTE0UTEzNiA0NiAxNTIgNDZUMTc3IDQ3VDE5MyA1MFQyMDEgNTJUMjA3IDU3VDIxMyA2MVY1NzhaIj48L3BhdGg+PC9kZWZzPjxnIHN0cm9rZT0iY3VycmVudENvbG9yIiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWF0aCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC05LVRFWC1JLTFENDY1Ij48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg0OS44LCAwKSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTktVEVYLU4tM0QiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkwNS42LCAwKSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTktVEVYLU4tMzEiPjwvdXNlPjwvZz48L2c+PC9nPjwvc3ZnPg=="
						}
					},
					{
						"type": "text",
						"text": "."
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "Or if you have a long equation, you can put it on its own line:"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "math_block",
						"attrs": {
							"formula": "\\lim{x\\to 0}{\\frac{e^x-1}{2x}} \\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}} \\lim{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}",
							"svg": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNy45ODZleCIgaGVpZ2h0PSI1LjQxM2V4IiByb2xlPSJpbWciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgLTE1NjAuNiAxNjc4OS44IDIzOTIuNSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246IC0xLjg4MmV4OyI+PGRlZnM+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi02QyIgZD0iTTQyIDQ2SDU2UTk1IDQ2IDEwMyA2MFY2OFExMDMgNzcgMTAzIDkxVDEwMyAxMjRUMTA0IDE2N1QxMDQgMjE3VDEwNCAyNzJUMTA0IDMyOVExMDQgMzY2IDEwNCA0MDdUMTA0IDQ4MlQxMDQgNTQyVDEwMyA1ODZUMTAzIDYwM1ExMDAgNjIyIDg5IDYyOFQ0NCA2MzdIMjZWNjYwUTI2IDY4MyAyOCA2ODNMMzggNjg0UTQ4IDY4NSA2NyA2ODZUMTA0IDY4OFExMjEgNjg5IDE0MSA2OTBUMTcxIDY5M1QxODIgNjk0SDE4NVYzNzlRMTg1IDYyIDE4NiA2MFExOTAgNTIgMTk4IDQ5UTIxOSA0NiAyNDcgNDZIMjYzVjBIMjU1TDIzMiAxUTIwOSAyIDE4MyAyVDE0NSAzVDEwNyAzVDU3IDFMMzQgMEgyNlY0Nkg0MloiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTY5IiBkPSJNNjkgNjA5UTY5IDYzNyA4NyA2NTNUMTMxIDY2OVExNTQgNjY3IDE3MSA2NTJUMTg4IDYwOVExODggNTc5IDE3MSA1NjRUMTI5IDU0OVExMDQgNTQ5IDg3IDU2NFQ2OSA2MDlaTTI0NyAwUTIzMiAzIDE0MyAzUTEzMiAzIDEwNiAzVDU2IDFMMzQgMEgyNlY0Nkg0MlE3MCA0NiA5MSA0OVExMDAgNTMgMTAyIDYwVDEwNCAxMDJWMjA1VjI5M1ExMDQgMzQ1IDEwMiAzNTlUODggMzc4UTc0IDM4NSA0MSAzODVIMzBWNDA4UTMwIDQzMSAzMiA0MzFMNDIgNDMyUTUyIDQzMyA3MCA0MzRUMTA2IDQzNlExMjMgNDM3IDE0MiA0MzhUMTcxIDQ0MVQxODIgNDQySDE4NVY2MlExOTAgNTIgMTk3IDUwVDIzMiA0NkgyNTVWMEgyNDdaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi02RCIgZD0iTTQxIDQ2SDU1UTk0IDQ2IDEwMiA2MFY2OFExMDIgNzcgMTAyIDkxVDEwMiAxMjJUMTAzIDE2MVQxMDMgMjAzUTEwMyAyMzQgMTAzIDI2OVQxMDIgMzI4VjM1MVE5OSAzNzAgODggMzc2VDQzIDM4NUgyNVY0MDhRMjUgNDMxIDI3IDQzMUwzNyA0MzJRNDcgNDMzIDY1IDQzNFQxMDIgNDM2UTExOSA0MzcgMTM4IDQzOFQxNjcgNDQxVDE3OCA0NDJIMTgxVjQwMlExODEgMzY0IDE4MiAzNjRUMTg3IDM2OVQxOTkgMzg0VDIxOCA0MDJUMjQ3IDQyMVQyODUgNDM3UTMwNSA0NDIgMzM2IDQ0MlEzNTEgNDQyIDM2NCA0NDBUMzg3IDQzNFQ0MDYgNDI2VDQyMSA0MTdUNDMyIDQwNlQ0NDEgMzk1VDQ0OCAzODRUNDUyIDM3NFQ0NTUgMzY2TDQ1NyAzNjFMNDYwIDM2NVE0NjMgMzY5IDQ2NiAzNzNUNDc1IDM4NFQ0ODggMzk3VDUwMyA0MTBUNTIzIDQyMlQ1NDYgNDMyVDU3MiA0MzlUNjAzIDQ0MlE3MjkgNDQyIDc0MCAzMjlRNzQxIDMyMiA3NDEgMTkwVjEwNFE3NDEgNjYgNzQzIDU5VDc1NCA0OVE3NzUgNDYgODAzIDQ2SDgxOVYwSDgxMUw3ODggMVE3NjQgMiA3MzcgMlQ2OTkgM1E1OTYgMyA1ODcgMEg1NzlWNDZINTk1UTY1NiA0NiA2NTYgNjJRNjU3IDY0IDY1NyAyMDBRNjU2IDMzNSA2NTUgMzQzUTY0OSAzNzEgNjM1IDM4NVQ2MTEgNDAyVDU4NSA0MDRRNTQwIDQwNCA1MDYgMzcwUTQ3OSAzNDMgNDcyIDMxNVQ0NjQgMjMyVjE2OFYxMDhRNDY0IDc4IDQ2NSA2OFQ0NjggNTVUNDc3IDQ5UTQ5OCA0NiA1MjYgNDZINTQyVjBINTM0TDUxMCAxUTQ4NyAyIDQ2MCAyVDQyMiAzUTMxOSAzIDMxMCAwSDMwMlY0NkgzMThRMzc5IDQ2IDM3OSA2MlEzODAgNjQgMzgwIDIwMFEzNzkgMzM1IDM3OCAzNDNRMzcyIDM3MSAzNTggMzg1VDMzNCA0MDJUMzA4IDQwNFEyNjMgNDA0IDIyOSAzNzBRMjAyIDM0MyAxOTUgMzE1VDE4NyAyMzJWMTY4VjEwOFExODcgNzggMTg4IDY4VDE5MSA1NVQyMDAgNDlRMjIxIDQ2IDI0OSA0NkgyNjVWMEgyNTdMMjM0IDFRMjEwIDIgMTgzIDJUMTQ1IDNRNDIgMyAzMyAwSDI1VjQ2SDQxWiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtMTItVEVYLUktMUQ0NjUiIGQ9Ik01MiAyODlRNTkgMzMxIDEwNiAzODZUMjIyIDQ0MlEyNTcgNDQyIDI4NiA0MjRUMzI5IDM3OVEzNzEgNDQyIDQzMCA0NDJRNDY3IDQ0MiA0OTQgNDIwVDUyMiAzNjFRNTIyIDMzMiA1MDggMzE0VDQ4MSAyOTJUNDU4IDI4OFE0MzkgMjg4IDQyNyAyOTlUNDE1IDMyOFE0MTUgMzc0IDQ2NSAzOTFRNDU0IDQwNCA0MjUgNDA0UTQxMiA0MDQgNDA2IDQwMlEzNjggMzg2IDM1MCAzMzZRMjkwIDExNSAyOTAgNzhRMjkwIDUwIDMwNiAzOFQzNDEgMjZRMzc4IDI2IDQxNCA1OVQ0NjMgMTQwUTQ2NiAxNTAgNDY5IDE1MVQ0ODUgMTUzSDQ4OVE1MDQgMTUzIDUwNCAxNDVRNTA0IDE0NCA1MDIgMTM0UTQ4NiA3NyA0NDAgMzNUMzMzIC0xMVEyNjMgLTExIDIyNyA1MlExODYgLTEwIDEzMyAtMTBIMTI3UTc4IC0xMCA1NyAxNlQzNSA3MVEzNSAxMDMgNTQgMTIzVDk5IDE0M1ExNDIgMTQzIDE0MiAxMDFRMTQyIDgxIDEzMCA2NlQxMDcgNDZUOTQgNDFMOTEgNDBROTEgMzkgOTcgMzZUMTEzIDI5VDEzMiAyNlExNjggMjYgMTk0IDcxUTIwMyA4NyAyMTcgMTM5VDI0NSAyNDdUMjYxIDMxM1EyNjYgMzQwIDI2NiAzNTJRMjY2IDM4MCAyNTEgMzkyVDIxNyA0MDRRMTc3IDQwNCAxNDIgMzcyVDkzIDI5MFE5MSAyODEgODggMjgwVDcyIDI3OEg1OFE1MiAyODQgNTIgMjg5WiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtMTItVEVYLU4tMjE5MiIgZD0iTTU2IDIzN1Q1NiAyNTBUNzAgMjcwSDgzNVE3MTkgMzU3IDY5MiA0OTNRNjkyIDQ5NCA2OTIgNDk2VDY5MSA0OTlRNjkxIDUxMSA3MDggNTExSDcxMVE3MjAgNTExIDcyMyA1MTBUNzI5IDUwNlQ3MzIgNDk3VDczNSA0ODFUNzQzIDQ1NlE3NjUgMzg5IDgxNiAzMzZUOTM1IDI2MVE5NDQgMjU4IDk0NCAyNTBROTQ0IDI0NCA5MzkgMjQxVDkxNSAyMzFUODc3IDIxMlE4MzYgMTg2IDgwNiAxNTJUNzYxIDg1VDc0MCAzNVQ3MzIgNFE3MzAgLTYgNzI3IC04VDcxMSAtMTFRNjkxIC0xMSA2OTEgMFE2OTEgNyA2OTYgMjVRNzI4IDE1MSA4MzUgMjMwSDcwUTU2IDIzNyA1NiAyNTBaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi0zMCIgZD0iTTk2IDU4NVExNTIgNjY2IDI0OSA2NjZRMjk3IDY2NiAzNDUgNjQwVDQyMyA1NDhRNDYwIDQ2NSA0NjAgMzIwUTQ2MCAxNjUgNDE3IDgzUTM5NyA0MSAzNjIgMTZUMzAxIC0xNVQyNTAgLTIyUTIyNCAtMjIgMTk4IC0xNlQxMzcgMTZUODIgODNRMzkgMTY1IDM5IDMyMFEzOSA0OTQgOTYgNTg1Wk0zMjEgNTk3UTI5MSA2MjkgMjUwIDYyOVEyMDggNjI5IDE3OCA1OTdRMTUzIDU3MSAxNDUgNTI1VDEzNyAzMzNRMTM3IDE3NSAxNDUgMTI1VDE4MSA0NlEyMDkgMTYgMjUwIDE2UTI5MCAxNiAzMTggNDZRMzQ3IDc2IDM1NCAxMzBUMzYyIDMzM1EzNjIgNDc4IDM1NCA1MjRUMzIxIDU5N1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1JLTFENDUyIiBkPSJNMzkgMTY4UTM5IDIyNSA1OCAyNzJUMTA3IDM1MFQxNzQgNDAyVDI0NCA0MzNUMzA3IDQ0MkgzMTBRMzU1IDQ0MiAzODggNDIwVDQyMSAzNTVRNDIxIDI2NSAzMTAgMjM3UTI2MSAyMjQgMTc2IDIyM1ExMzkgMjIzIDEzOCAyMjFRMTM4IDIxOSAxMzIgMTg2VDEyNSAxMjhRMTI1IDgxIDE0NiA1NFQyMDkgMjZUMzAyIDQ1VDM5NCAxMTFRNDAzIDEyMSA0MDYgMTIxUTQxMCAxMjEgNDE5IDExMlQ0MjkgOThUNDIwIDgyVDM5MCA1NVQzNDQgMjRUMjgxIC0xVDIwNSAtMTFRMTI2IC0xMSA4MyA0MlQzOSAxNjhaTTM3MyAzNTNRMzY3IDQwNSAzMDUgNDA1UTI3MiA0MDUgMjQ0IDM5MVQxOTkgMzU3VDE3MCAzMTZUMTU0IDI4MFQxNDkgMjYxUTE0OSAyNjAgMTY5IDI2MFEyODIgMjYwIDMyNyAyODRUMzczIDM1M1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTIyMTIiIGQ9Ik04NCAyMzdUODQgMjUwVDk4IDI3MEg2NzlRNjk0IDI2MiA2OTQgMjUwVDY3OSAyMzBIOThRODQgMjM3IDg0IDI1MFoiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTMxIiBkPSJNMjEzIDU3OEwyMDAgNTczUTE4NiA1NjggMTYwIDU2M1QxMDIgNTU2SDgzVjYwMkgxMDJRMTQ5IDYwNCAxODkgNjE3VDI0NSA2NDFUMjczIDY2M1EyNzUgNjY2IDI4NSA2NjZRMjk0IDY2NiAzMDIgNjYwVjM2MUwzMDMgNjFRMzEwIDU0IDMxNSA1MlQzMzkgNDhUNDAxIDQ2SDQyN1YwSDQxNlEzOTUgMyAyNTcgM1ExMjEgMyAxMDAgMEg4OFY0NkgxMTRRMTM2IDQ2IDE1MiA0NlQxNzcgNDdUMTkzIDUwVDIwMSA1MlQyMDcgNTdUMjEzIDYxVjU3OFoiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTMyIiBkPSJNMTA5IDQyOVE4MiA0MjkgNjYgNDQ3VDUwIDQ5MVE1MCA1NjIgMTAzIDYxNFQyMzUgNjY2UTMyNiA2NjYgMzg3IDYxMFQ0NDkgNDY1UTQ0OSA0MjIgNDI5IDM4M1QzODEgMzE1VDMwMSAyNDFRMjY1IDIxMCAyMDEgMTQ5TDE0MiA5M0wyMTggOTJRMzc1IDkyIDM4NSA5N1EzOTIgOTkgNDA5IDE4NlYxODlINDQ5VjE4NlE0NDggMTgzIDQzNiA5NVQ0MjEgM1YwSDUwVjE5VjMxUTUwIDM4IDU2IDQ2VDg2IDgxUTExNSAxMTMgMTM2IDEzN1ExNDUgMTQ3IDE3MCAxNzRUMjA0IDIxMVQyMzMgMjQ0VDI2MSAyNzhUMjg0IDMwOFQzMDUgMzQwVDMyMCAzNjlUMzMzIDQwMVQzNDAgNDMxVDM0MyA0NjRRMzQzIDUyNyAzMDkgNTczVDIxMiA2MTlRMTc5IDYxOSAxNTQgNjAyVDExOSA1NjlUMTA5IDU1MFExMDkgNTQ5IDExNCA1NDlRMTMyIDU0OSAxNTEgNTM1VDE3MCA0ODlRMTcwIDQ2NCAxNTQgNDQ3VDEwOSA0MjlaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi0zRCIgZD0iTTU2IDM0N1E1NiAzNjAgNzAgMzY3SDcwN1E3MjIgMzU5IDcyMiAzNDdRNzIyIDMzNiA3MDggMzI4TDM5MCAzMjdINzJRNTYgMzMyIDU2IDM0N1pNNTYgMTUzUTU2IDE2OCA3MiAxNzNINzA4UTcyMiAxNjMgNzIyIDE1M1E3MjIgMTQwIDcwNyAxMzNINzBRNTYgMTQwIDU2IDE1M1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTQ4IiBkPSJNMTI4IDYyMlExMjEgNjI5IDExNyA2MzFUMTAxIDYzNFQ1OCA2MzdIMjVWNjgzSDM2UTU3IDY4MCAxODAgNjgwUTMxNSA2ODAgMzI0IDY4M0gzMzVWNjM3SDMwMlEyNjIgNjM2IDI1MSA2MzRUMjMzIDYyMkwyMzIgNTAwVjM3OEg1MTdWNjIyUTUxMCA2MjkgNTA2IDYzMVQ0OTAgNjM0VDQ0NyA2MzdINDE0VjY4M0g0MjVRNDQ2IDY4MCA1NjkgNjgwUTcwNCA2ODAgNzEzIDY4M0g3MjRWNjM3SDY5MVE2NTEgNjM2IDY0MCA2MzRUNjIyIDYyMlY2MVE2MjggNTEgNjM5IDQ5VDY5MSA0Nkg3MjRWMEg3MTNRNjkyIDMgNTY5IDNRNDM0IDMgNDI1IDBINDE0VjQ2SDQ0N1E0ODkgNDcgNDk4IDQ5VDUxNyA2MVYzMzJIMjMyVjE5N0wyMzMgNjFRMjM5IDUxIDI1MCA0OVQzMDIgNDZIMzM1VjBIMzI0UTMwMyAzIDE4MCAzUTQ1IDMgMzYgMEgyNVY0Nkg1OFExMDAgNDcgMTA5IDQ5VDEyOCA2MVY2MjJaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtU08tNUIiIGQ9Ik0yMDIgLTM0OVY4NTBIMzk0VjgxMEgyNDJWLTMwOUgzOTRWLTM0OUgyMDJaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtU08tNUQiIGQ9Ik0yMiA4MTBWODUwSDIxNFYtMzQ5SDIyVi0zMDlIMTc0VjgxMEgyMloiPjwvcGF0aD48L2RlZnM+PGcgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDApIj48ZyBkYXRhLW1tbC1ub2RlPSJtYXRoIj48ZyBkYXRhLW1tbC1ub2RlPSJtbyI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTZDIj48L3VzZT48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tNjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3OCwgMCkiPjwvdXNlPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi02RCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU2LCAwKSI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9IlRlWEF0b20iIGRhdGEtbWp4LXRleGNsYXNzPSJPUkQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NTUuNywgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQ5LjgsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMjE5MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTI3LjYsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDE4My4yLCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiPjxnIGRhdGEtbW1sLW5vZGU9Im1yb3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyMCwgNjc2KSI+PGcgZGF0YS1tbWwtbm9kZT0ibXN1cCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtSS0xRDQ1MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1pIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjYsIDM2Mykgc2NhbGUoMC43MDcpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExNDIuNywgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0yMjEyIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNDIuOSwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMSI+PC91c2U+PC9nPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtcm93IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDA1LjUsIC02ODYpIj48ZyBkYXRhLW1tbC1ub2RlPSJtbiI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTMyIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibWkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMCwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtSS0xRDQ2NSI+PC91c2U+PC9nPjwvZz48cmVjdCB3aWR0aD0iMjg0Mi45IiBoZWlnaHQ9IjYwIiB4PSIxMjAiIHk9IjIyMCI+PC9yZWN0PjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW92ZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1NDMuOSwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im11bmRlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg2LjQsIDApIj48ZyBkYXRhLW1tbC1ub2RlPSJtbyI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTNEIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIzLjgsIC03MzIpIHNjYWxlKDAuNzA3KSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi00OCI+PC91c2U+PC9nPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibXJvdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgODQ5KSBzY2FsZSgwLjcwNykiPjxnIGRhdGEtbW1sLW5vZGU9Im1vIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLVNPLTVCIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxNywgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDM5NCkgc2NhbGUoMC43MDcpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIwLCAtMzQ1KSBzY2FsZSgwLjcwNykiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMCI+PC91c2U+PC9nPjxyZWN0IHdpZHRoPSI1NTMuNiIgaGVpZ2h0PSI2MCIgeD0iMTIwIiB5PSIyMjAiPjwvcmVjdD48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMTAuNiwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtU08tNUQiPjwvdXNlPjwvZz48L2c+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1vIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OTcyLjUsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tNkMiPjwvdXNlPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi02OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjc4LCAwKSI+PC91c2U+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTZEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NTYsIDApIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA1MjguMiwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQ5LjgsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMjE5MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTI3LjYsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMxNTUuOCwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1mcmFjIj48ZyBkYXRhLW1tbC1ub2RlPSJtc3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDY3NikiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NTIiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtaSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDY2LCAzNjMpIHNjYWxlKDAuNzA3KSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1JLTFENDY1Ij48L3VzZT48L2c+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MzAuMiwgLTY4NikiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMiI+PC91c2U+PC9nPjxyZWN0IHdpZHRoPSIxMTIwLjUiIGhlaWdodD0iNjAiIHg9IjEyMCIgeT0iMjIwIj48L3JlY3Q+PC9nPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3OTQsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tM0QiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJUZVhBdG9tIiBkYXRhLW1qeC10ZXhjbGFzcz0iT1JEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTg0OS44LCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDY3NikiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMSI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIC02ODYpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzIiPjwvdXNlPjwvZz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjYwIiB4PSIxMjAiIHk9IjIyMCI+PC9yZWN0PjwvZz48L2c+PC9nPjwvZz48L3N2Zz4="
						}
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Images"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "You can also add images! This is super handy if you want to add a graph or something. To add an image you can either drag it into the editor, paste it from your clipboard or link it using Markdown. For demonstration purposes, have a kitten"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "image",
						"attrs": {
							"src": "https://placekitten.com/600/300",
							"alt": "Kitten",
							"title": null
						}
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "![Images are linked like this]("
					},
					{
						"type": "text",
						"marks": [
							{
								"type": "link",
								"attrs": {
									"href": "https://placekitten.com/600/300"
								}
							}
						],
						"text": "https://placekitten.com/600/300"
					},
					{
						"type": "text",
						"text": ")"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Headings"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "text",
						"text": "To section your document you can use headings! There's a total of three levels that you can use. They look like this"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 1
				},
				"content": [
					{
						"type": "text",
						"text": "Heading 1"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 2
				},
				"content": [
					{
						"type": "text",
						"text": "Heading 2"
					}
				]
			},
			{
				"type": "heading",
				"attrs": {
					"level": 3
				},
				"content": [
					{
						"type": "text",
						"text": "Heading 3"
					}
				]
			},
			{
				"type": "code_block",
				"attrs": {
					"cssClass": "hljs markdown",
					"language": "markdown"
				},
				"content": [
					{
						"type": "text",
						"text": "# Heading 1\n## Heading 2\n### Heading 3"
					}
				]
			},
			{
				"type": "paragraph",
				"content": [
					{
						"type": "category",
						"attrs": {
							"id": "",
							"text": "tutorial"
						}
					}
				]
			}
		]
	},
	"preview": "<p>Notebag brings along a wide range of markdown formattings that you can use to write and format your notes in the way that suits you best. This is an overview of everything that's included. Code examples are provided!</p><p><strong>Note:</strong> The markdown formatting is triggered by using typing a <code>Space</code> after the formatting.</p><h2>Text styles</h2><p>You can apply the following inline text formattings: <strong>bold</strong>, <em>italics</em>, <s>strikethrough</s> and <code>monospaced</code>. Basically everything you're used to from document editing program.</p><pre class=\"hljs markdown\" data-language=\"markdown\"><code>**bold**\n*italics*\n~strike~\n`monospaced`</code></pre><h2>Lists</h2><p>I've included three separate list types. These are the bulleted list, the ordered list and the todo list. You're guaranteed to find one you like. Let's start with bulleted.</p><ul><li><p>This list is unsorted</p></li><li><p>You can apply <strong>any</strong> style in here</p><ul><li><p>And you can nest them too!</p></li></ul></li></ul><p>Then you have ordered lists, which are just lists that count upwards starting at 1.</p><ol><li><p>This list is ordered</p></li><li><p>And the number keeps rising.</p></li></ol><p>And finally we have the todo list. It does what the name says and helps you keep track of things that need to get done.</p><ul data-type=\"todo_list\"><li data-type=\"todo_item\" data-done=\"false\"><span class=\"todo-checkbox\" contenteditable=\"false\"></span><div class=\"todo-content\"><p>This is a to-do list.</p></div></li><li data-type=\"todo_item\" data-done=\"true\"><span class=\"todo-checkbox\" contenteditable=\"false\"></span><div class=\"todo-content\"><p>You can even check them off!</p></div></li><li data-type=\"todo_item\" data-done=\"false\"><span class=\"todo-checkbox\" contenteditable=\"false\"></span><div class=\"todo-content\"><p>Just try clicking on the checkbox.</p><ul data-type=\"todo_list\"><li data-type=\"todo_item\" data-done=\"false\"><span class=\"todo-checkbox\" contenteditable=\"false\"></span><div class=\"todo-content\"><p>Or try pressing <code>Ctrl+C</code>! It works too.</p></div></li></ul></div></li></ul><pre class=\"hljs markdown\" data-language=\"markdown\"><code>* Bulleted lists\n1. Ordered list\n[ ] Todo item</code></pre><h2>Code blocks</h2><p>You can add code blocks with triple backticks (<code>```</code>). If you don't add a language, they'll try their best to guess what you're putting inside. I've included around 170 languages.</p><pre class=\"hljs\" data-language=\"auto\"><code>def auto<em>code</em>block\n  puts \"This code block guesses what language you're using!\"\nend</code></pre><p>To define a specific language just add the language name directly after the backticks (like so: <code>```php</code>). This would result in something like this:</p><pre class=\"hljs php\" data-language=\"php\"><code>function specificCodeBlock() {\n  echo \"This code block only accepts PHP!\"\n}</code></pre><p>When you're done typing in a code block you can press <code>Command/Ctrl+Enter</code> to jump out of it.</p><h2>Categories</h2><p>Every note can have hashtag-based categories associated with them. You write them the same way as you would on Twitter or Instagram. Here's an example: <span class=\"category-pill\" data-type=\"category\" tabindex=\"0\">tutorial</span>. You can also nest them by adding a slash. This looks like this <span class=\"category-pill\" data-type=\"category\" tabindex=\"0\">tutorial/markdown</span>. If you click on a category the app will immediately search for it. </p><pre class=\"hljs markdown\" data-language=\"markdown\"><code>#category #category/nested</code></pre><h2>Zettels</h2><p>You can link notes between each other to build a Zettelkasten system of your own! To do so, simply wrap the note title between double angle brackets. If the note does not yet exist, it will be created for you when you first click the link. Zettel links are case insensitive.</p><pre class=\"hljs markdown\" data-language=\"markdown\"><code>[[Introduction to note taking]]</code></pre><p>You can learn more about Zettelkasten in <span data-type=\"zettelkasten_link\" data-unique=\"organizing-your-notes-8jbr46wom\" class=\"zettelkasten-link\" tabindex=\"0\">organizing your notes</span>. </p><h2>Links</h2><p>You have two options to create links. If you're in a hurry, just paste in an URL and the app will convert it to a clickable link. But you can also use <a href=\"https://pretzelhands.com\" rel=\"noopener noreferrer nofollow\" target=\"_blank\" tabindex=\"0\">inline links</a> if you need to be a bit more descriptive.</p><pre class=\"hljs markdown\" data-language=\"markdown\"><code>[Inline links look like this](<a href=\"https://pretzelhands.com\" rel=\"noopener noreferrer nofollow\" target=\"_blank\" tabindex=\"0\">https://pretzelhands.com</a>)</code></pre><h2>Math</h2><p>You can insert LaTeX equations at any point during writing a note. Simply wrap your LaTeX expression in <code>$</code> signs and you can have the following:  <img class=\"math\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1LjQ0MmV4IiBoZWlnaHQ9IjEuNjkyZXgiIHJvbGU9ImltZyIgZm9jdXNhYmxlPSJmYWxzZSIgdmlld0JveD0iMCAtNjY2IDI0MDUuNiA3NDgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOiAtMC4xODZleDsiPjxkZWZzPjxwYXRoIGlkPSJNSlgtOS1URVgtSS0xRDQ2NSIgZD0iTTUyIDI4OVE1OSAzMzEgMTA2IDM4NlQyMjIgNDQyUTI1NyA0NDIgMjg2IDQyNFQzMjkgMzc5UTM3MSA0NDIgNDMwIDQ0MlE0NjcgNDQyIDQ5NCA0MjBUNTIyIDM2MVE1MjIgMzMyIDUwOCAzMTRUNDgxIDI5MlQ0NTggMjg4UTQzOSAyODggNDI3IDI5OVQ0MTUgMzI4UTQxNSAzNzQgNDY1IDM5MVE0NTQgNDA0IDQyNSA0MDRRNDEyIDQwNCA0MDYgNDAyUTM2OCAzODYgMzUwIDMzNlEyOTAgMTE1IDI5MCA3OFEyOTAgNTAgMzA2IDM4VDM0MSAyNlEzNzggMjYgNDE0IDU5VDQ2MyAxNDBRNDY2IDE1MCA0NjkgMTUxVDQ4NSAxNTNINDg5UTUwNCAxNTMgNTA0IDE0NVE1MDQgMTQ0IDUwMiAxMzRRNDg2IDc3IDQ0MCAzM1QzMzMgLTExUTI2MyAtMTEgMjI3IDUyUTE4NiAtMTAgMTMzIC0xMEgxMjdRNzggLTEwIDU3IDE2VDM1IDcxUTM1IDEwMyA1NCAxMjNUOTkgMTQzUTE0MiAxNDMgMTQyIDEwMVExNDIgODEgMTMwIDY2VDEwNyA0NlQ5NCA0MUw5MSA0MFE5MSAzOSA5NyAzNlQxMTMgMjlUMTMyIDI2UTE2OCAyNiAxOTQgNzFRMjAzIDg3IDIxNyAxMzlUMjQ1IDI0N1QyNjEgMzEzUTI2NiAzNDAgMjY2IDM1MlEyNjYgMzgwIDI1MSAzOTJUMjE3IDQwNFExNzcgNDA0IDE0MiAzNzJUOTMgMjkwUTkxIDI4MSA4OCAyODBUNzIgMjc4SDU4UTUyIDI4NCA1MiAyODlaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC05LVRFWC1OLTNEIiBkPSJNNTYgMzQ3UTU2IDM2MCA3MCAzNjdINzA3UTcyMiAzNTkgNzIyIDM0N1E3MjIgMzM2IDcwOCAzMjhMMzkwIDMyN0g3MlE1NiAzMzIgNTYgMzQ3Wk01NiAxNTNRNTYgMTY4IDcyIDE3M0g3MDhRNzIyIDE2MyA3MjIgMTUzUTcyMiAxNDAgNzA3IDEzM0g3MFE1NiAxNDAgNTYgMTUzWiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtOS1URVgtTi0zMSIgZD0iTTIxMyA1NzhMMjAwIDU3M1ExODYgNTY4IDE2MCA1NjNUMTAyIDU1Nkg4M1Y2MDJIMTAyUTE0OSA2MDQgMTg5IDYxN1QyNDUgNjQxVDI3MyA2NjNRMjc1IDY2NiAyODUgNjY2UTI5NCA2NjYgMzAyIDY2MFYzNjFMMzAzIDYxUTMxMCA1NCAzMTUgNTJUMzM5IDQ4VDQwMSA0Nkg0MjdWMEg0MTZRMzk1IDMgMjU3IDNRMTIxIDMgMTAwIDBIODhWNDZIMTE0UTEzNiA0NiAxNTIgNDZUMTc3IDQ3VDE5MyA1MFQyMDEgNTJUMjA3IDU3VDIxMyA2MVY1NzhaIj48L3BhdGg+PC9kZWZzPjxnIHN0cm9rZT0iY3VycmVudENvbG9yIiBmaWxsPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgLTEgMCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWF0aCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC05LVRFWC1JLTFENDY1Ij48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg0OS44LCAwKSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTktVEVYLU4tM0QiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkwNS42LCAwKSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTktVEVYLU4tMzEiPjwvdXNlPjwvZz48L2c+PC9nPjwvc3ZnPg==\" data-formula=\"x=1\" data-type=\"math_block\">.</p><p>Or if you have a long equation, you can put it on its own line:</p><p><img class=\"math\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNy45ODZleCIgaGVpZ2h0PSI1LjQxM2V4IiByb2xlPSJpbWciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgLTE1NjAuNiAxNjc4OS44IDIzOTIuNSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246IC0xLjg4MmV4OyI+PGRlZnM+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi02QyIgZD0iTTQyIDQ2SDU2UTk1IDQ2IDEwMyA2MFY2OFExMDMgNzcgMTAzIDkxVDEwMyAxMjRUMTA0IDE2N1QxMDQgMjE3VDEwNCAyNzJUMTA0IDMyOVExMDQgMzY2IDEwNCA0MDdUMTA0IDQ4MlQxMDQgNTQyVDEwMyA1ODZUMTAzIDYwM1ExMDAgNjIyIDg5IDYyOFQ0NCA2MzdIMjZWNjYwUTI2IDY4MyAyOCA2ODNMMzggNjg0UTQ4IDY4NSA2NyA2ODZUMTA0IDY4OFExMjEgNjg5IDE0MSA2OTBUMTcxIDY5M1QxODIgNjk0SDE4NVYzNzlRMTg1IDYyIDE4NiA2MFExOTAgNTIgMTk4IDQ5UTIxOSA0NiAyNDcgNDZIMjYzVjBIMjU1TDIzMiAxUTIwOSAyIDE4MyAyVDE0NSAzVDEwNyAzVDU3IDFMMzQgMEgyNlY0Nkg0MloiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTY5IiBkPSJNNjkgNjA5UTY5IDYzNyA4NyA2NTNUMTMxIDY2OVExNTQgNjY3IDE3MSA2NTJUMTg4IDYwOVExODggNTc5IDE3MSA1NjRUMTI5IDU0OVExMDQgNTQ5IDg3IDU2NFQ2OSA2MDlaTTI0NyAwUTIzMiAzIDE0MyAzUTEzMiAzIDEwNiAzVDU2IDFMMzQgMEgyNlY0Nkg0MlE3MCA0NiA5MSA0OVExMDAgNTMgMTAyIDYwVDEwNCAxMDJWMjA1VjI5M1ExMDQgMzQ1IDEwMiAzNTlUODggMzc4UTc0IDM4NSA0MSAzODVIMzBWNDA4UTMwIDQzMSAzMiA0MzFMNDIgNDMyUTUyIDQzMyA3MCA0MzRUMTA2IDQzNlExMjMgNDM3IDE0MiA0MzhUMTcxIDQ0MVQxODIgNDQySDE4NVY2MlExOTAgNTIgMTk3IDUwVDIzMiA0NkgyNTVWMEgyNDdaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi02RCIgZD0iTTQxIDQ2SDU1UTk0IDQ2IDEwMiA2MFY2OFExMDIgNzcgMTAyIDkxVDEwMiAxMjJUMTAzIDE2MVQxMDMgMjAzUTEwMyAyMzQgMTAzIDI2OVQxMDIgMzI4VjM1MVE5OSAzNzAgODggMzc2VDQzIDM4NUgyNVY0MDhRMjUgNDMxIDI3IDQzMUwzNyA0MzJRNDcgNDMzIDY1IDQzNFQxMDIgNDM2UTExOSA0MzcgMTM4IDQzOFQxNjcgNDQxVDE3OCA0NDJIMTgxVjQwMlExODEgMzY0IDE4MiAzNjRUMTg3IDM2OVQxOTkgMzg0VDIxOCA0MDJUMjQ3IDQyMVQyODUgNDM3UTMwNSA0NDIgMzM2IDQ0MlEzNTEgNDQyIDM2NCA0NDBUMzg3IDQzNFQ0MDYgNDI2VDQyMSA0MTdUNDMyIDQwNlQ0NDEgMzk1VDQ0OCAzODRUNDUyIDM3NFQ0NTUgMzY2TDQ1NyAzNjFMNDYwIDM2NVE0NjMgMzY5IDQ2NiAzNzNUNDc1IDM4NFQ0ODggMzk3VDUwMyA0MTBUNTIzIDQyMlQ1NDYgNDMyVDU3MiA0MzlUNjAzIDQ0MlE3MjkgNDQyIDc0MCAzMjlRNzQxIDMyMiA3NDEgMTkwVjEwNFE3NDEgNjYgNzQzIDU5VDc1NCA0OVE3NzUgNDYgODAzIDQ2SDgxOVYwSDgxMUw3ODggMVE3NjQgMiA3MzcgMlQ2OTkgM1E1OTYgMyA1ODcgMEg1NzlWNDZINTk1UTY1NiA0NiA2NTYgNjJRNjU3IDY0IDY1NyAyMDBRNjU2IDMzNSA2NTUgMzQzUTY0OSAzNzEgNjM1IDM4NVQ2MTEgNDAyVDU4NSA0MDRRNTQwIDQwNCA1MDYgMzcwUTQ3OSAzNDMgNDcyIDMxNVQ0NjQgMjMyVjE2OFYxMDhRNDY0IDc4IDQ2NSA2OFQ0NjggNTVUNDc3IDQ5UTQ5OCA0NiA1MjYgNDZINTQyVjBINTM0TDUxMCAxUTQ4NyAyIDQ2MCAyVDQyMiAzUTMxOSAzIDMxMCAwSDMwMlY0NkgzMThRMzc5IDQ2IDM3OSA2MlEzODAgNjQgMzgwIDIwMFEzNzkgMzM1IDM3OCAzNDNRMzcyIDM3MSAzNTggMzg1VDMzNCA0MDJUMzA4IDQwNFEyNjMgNDA0IDIyOSAzNzBRMjAyIDM0MyAxOTUgMzE1VDE4NyAyMzJWMTY4VjEwOFExODcgNzggMTg4IDY4VDE5MSA1NVQyMDAgNDlRMjIxIDQ2IDI0OSA0NkgyNjVWMEgyNTdMMjM0IDFRMjEwIDIgMTgzIDJUMTQ1IDNRNDIgMyAzMyAwSDI1VjQ2SDQxWiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtMTItVEVYLUktMUQ0NjUiIGQ9Ik01MiAyODlRNTkgMzMxIDEwNiAzODZUMjIyIDQ0MlEyNTcgNDQyIDI4NiA0MjRUMzI5IDM3OVEzNzEgNDQyIDQzMCA0NDJRNDY3IDQ0MiA0OTQgNDIwVDUyMiAzNjFRNTIyIDMzMiA1MDggMzE0VDQ4MSAyOTJUNDU4IDI4OFE0MzkgMjg4IDQyNyAyOTlUNDE1IDMyOFE0MTUgMzc0IDQ2NSAzOTFRNDU0IDQwNCA0MjUgNDA0UTQxMiA0MDQgNDA2IDQwMlEzNjggMzg2IDM1MCAzMzZRMjkwIDExNSAyOTAgNzhRMjkwIDUwIDMwNiAzOFQzNDEgMjZRMzc4IDI2IDQxNCA1OVQ0NjMgMTQwUTQ2NiAxNTAgNDY5IDE1MVQ0ODUgMTUzSDQ4OVE1MDQgMTUzIDUwNCAxNDVRNTA0IDE0NCA1MDIgMTM0UTQ4NiA3NyA0NDAgMzNUMzMzIC0xMVEyNjMgLTExIDIyNyA1MlExODYgLTEwIDEzMyAtMTBIMTI3UTc4IC0xMCA1NyAxNlQzNSA3MVEzNSAxMDMgNTQgMTIzVDk5IDE0M1ExNDIgMTQzIDE0MiAxMDFRMTQyIDgxIDEzMCA2NlQxMDcgNDZUOTQgNDFMOTEgNDBROTEgMzkgOTcgMzZUMTEzIDI5VDEzMiAyNlExNjggMjYgMTk0IDcxUTIwMyA4NyAyMTcgMTM5VDI0NSAyNDdUMjYxIDMxM1EyNjYgMzQwIDI2NiAzNTJRMjY2IDM4MCAyNTEgMzkyVDIxNyA0MDRRMTc3IDQwNCAxNDIgMzcyVDkzIDI5MFE5MSAyODEgODggMjgwVDcyIDI3OEg1OFE1MiAyODQgNTIgMjg5WiI+PC9wYXRoPjxwYXRoIGlkPSJNSlgtMTItVEVYLU4tMjE5MiIgZD0iTTU2IDIzN1Q1NiAyNTBUNzAgMjcwSDgzNVE3MTkgMzU3IDY5MiA0OTNRNjkyIDQ5NCA2OTIgNDk2VDY5MSA0OTlRNjkxIDUxMSA3MDggNTExSDcxMVE3MjAgNTExIDcyMyA1MTBUNzI5IDUwNlQ3MzIgNDk3VDczNSA0ODFUNzQzIDQ1NlE3NjUgMzg5IDgxNiAzMzZUOTM1IDI2MVE5NDQgMjU4IDk0NCAyNTBROTQ0IDI0NCA5MzkgMjQxVDkxNSAyMzFUODc3IDIxMlE4MzYgMTg2IDgwNiAxNTJUNzYxIDg1VDc0MCAzNVQ3MzIgNFE3MzAgLTYgNzI3IC04VDcxMSAtMTFRNjkxIC0xMSA2OTEgMFE2OTEgNyA2OTYgMjVRNzI4IDE1MSA4MzUgMjMwSDcwUTU2IDIzNyA1NiAyNTBaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi0zMCIgZD0iTTk2IDU4NVExNTIgNjY2IDI0OSA2NjZRMjk3IDY2NiAzNDUgNjQwVDQyMyA1NDhRNDYwIDQ2NSA0NjAgMzIwUTQ2MCAxNjUgNDE3IDgzUTM5NyA0MSAzNjIgMTZUMzAxIC0xNVQyNTAgLTIyUTIyNCAtMjIgMTk4IC0xNlQxMzcgMTZUODIgODNRMzkgMTY1IDM5IDMyMFEzOSA0OTQgOTYgNTg1Wk0zMjEgNTk3UTI5MSA2MjkgMjUwIDYyOVEyMDggNjI5IDE3OCA1OTdRMTUzIDU3MSAxNDUgNTI1VDEzNyAzMzNRMTM3IDE3NSAxNDUgMTI1VDE4MSA0NlEyMDkgMTYgMjUwIDE2UTI5MCAxNiAzMTggNDZRMzQ3IDc2IDM1NCAxMzBUMzYyIDMzM1EzNjIgNDc4IDM1NCA1MjRUMzIxIDU5N1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1JLTFENDUyIiBkPSJNMzkgMTY4UTM5IDIyNSA1OCAyNzJUMTA3IDM1MFQxNzQgNDAyVDI0NCA0MzNUMzA3IDQ0MkgzMTBRMzU1IDQ0MiAzODggNDIwVDQyMSAzNTVRNDIxIDI2NSAzMTAgMjM3UTI2MSAyMjQgMTc2IDIyM1ExMzkgMjIzIDEzOCAyMjFRMTM4IDIxOSAxMzIgMTg2VDEyNSAxMjhRMTI1IDgxIDE0NiA1NFQyMDkgMjZUMzAyIDQ1VDM5NCAxMTFRNDAzIDEyMSA0MDYgMTIxUTQxMCAxMjEgNDE5IDExMlQ0MjkgOThUNDIwIDgyVDM5MCA1NVQzNDQgMjRUMjgxIC0xVDIwNSAtMTFRMTI2IC0xMSA4MyA0MlQzOSAxNjhaTTM3MyAzNTNRMzY3IDQwNSAzMDUgNDA1UTI3MiA0MDUgMjQ0IDM5MVQxOTkgMzU3VDE3MCAzMTZUMTU0IDI4MFQxNDkgMjYxUTE0OSAyNjAgMTY5IDI2MFEyODIgMjYwIDMyNyAyODRUMzczIDM1M1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTIyMTIiIGQ9Ik04NCAyMzdUODQgMjUwVDk4IDI3MEg2NzlRNjk0IDI2MiA2OTQgMjUwVDY3OSAyMzBIOThRODQgMjM3IDg0IDI1MFoiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTMxIiBkPSJNMjEzIDU3OEwyMDAgNTczUTE4NiA1NjggMTYwIDU2M1QxMDIgNTU2SDgzVjYwMkgxMDJRMTQ5IDYwNCAxODkgNjE3VDI0NSA2NDFUMjczIDY2M1EyNzUgNjY2IDI4NSA2NjZRMjk0IDY2NiAzMDIgNjYwVjM2MUwzMDMgNjFRMzEwIDU0IDMxNSA1MlQzMzkgNDhUNDAxIDQ2SDQyN1YwSDQxNlEzOTUgMyAyNTcgM1ExMjEgMyAxMDAgMEg4OFY0NkgxMTRRMTM2IDQ2IDE1MiA0NlQxNzcgNDdUMTkzIDUwVDIwMSA1MlQyMDcgNTdUMjEzIDYxVjU3OFoiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTMyIiBkPSJNMTA5IDQyOVE4MiA0MjkgNjYgNDQ3VDUwIDQ5MVE1MCA1NjIgMTAzIDYxNFQyMzUgNjY2UTMyNiA2NjYgMzg3IDYxMFQ0NDkgNDY1UTQ0OSA0MjIgNDI5IDM4M1QzODEgMzE1VDMwMSAyNDFRMjY1IDIxMCAyMDEgMTQ5TDE0MiA5M0wyMTggOTJRMzc1IDkyIDM4NSA5N1EzOTIgOTkgNDA5IDE4NlYxODlINDQ5VjE4NlE0NDggMTgzIDQzNiA5NVQ0MjEgM1YwSDUwVjE5VjMxUTUwIDM4IDU2IDQ2VDg2IDgxUTExNSAxMTMgMTM2IDEzN1ExNDUgMTQ3IDE3MCAxNzRUMjA0IDIxMVQyMzMgMjQ0VDI2MSAyNzhUMjg0IDMwOFQzMDUgMzQwVDMyMCAzNjlUMzMzIDQwMVQzNDAgNDMxVDM0MyA0NjRRMzQzIDUyNyAzMDkgNTczVDIxMiA2MTlRMTc5IDYxOSAxNTQgNjAyVDExOSA1NjlUMTA5IDU1MFExMDkgNTQ5IDExNCA1NDlRMTMyIDU0OSAxNTEgNTM1VDE3MCA0ODlRMTcwIDQ2NCAxNTQgNDQ3VDEwOSA0MjlaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtTi0zRCIgZD0iTTU2IDM0N1E1NiAzNjAgNzAgMzY3SDcwN1E3MjIgMzU5IDcyMiAzNDdRNzIyIDMzNiA3MDggMzI4TDM5MCAzMjdINzJRNTYgMzMyIDU2IDM0N1pNNTYgMTUzUTU2IDE2OCA3MiAxNzNINzA4UTcyMiAxNjMgNzIyIDE1M1E3MjIgMTQwIDcwNyAxMzNINzBRNTYgMTQwIDU2IDE1M1oiPjwvcGF0aD48cGF0aCBpZD0iTUpYLTEyLVRFWC1OLTQ4IiBkPSJNMTI4IDYyMlExMjEgNjI5IDExNyA2MzFUMTAxIDYzNFQ1OCA2MzdIMjVWNjgzSDM2UTU3IDY4MCAxODAgNjgwUTMxNSA2ODAgMzI0IDY4M0gzMzVWNjM3SDMwMlEyNjIgNjM2IDI1MSA2MzRUMjMzIDYyMkwyMzIgNTAwVjM3OEg1MTdWNjIyUTUxMCA2MjkgNTA2IDYzMVQ0OTAgNjM0VDQ0NyA2MzdINDE0VjY4M0g0MjVRNDQ2IDY4MCA1NjkgNjgwUTcwNCA2ODAgNzEzIDY4M0g3MjRWNjM3SDY5MVE2NTEgNjM2IDY0MCA2MzRUNjIyIDYyMlY2MVE2MjggNTEgNjM5IDQ5VDY5MSA0Nkg3MjRWMEg3MTNRNjkyIDMgNTY5IDNRNDM0IDMgNDI1IDBINDE0VjQ2SDQ0N1E0ODkgNDcgNDk4IDQ5VDUxNyA2MVYzMzJIMjMyVjE5N0wyMzMgNjFRMjM5IDUxIDI1MCA0OVQzMDIgNDZIMzM1VjBIMzI0UTMwMyAzIDE4MCAzUTQ1IDMgMzYgMEgyNVY0Nkg1OFExMDAgNDcgMTA5IDQ5VDEyOCA2MVY2MjJaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtU08tNUIiIGQ9Ik0yMDIgLTM0OVY4NTBIMzk0VjgxMEgyNDJWLTMwOUgzOTRWLTM0OUgyMDJaIj48L3BhdGg+PHBhdGggaWQ9Ik1KWC0xMi1URVgtU08tNUQiIGQ9Ik0yMiA4MTBWODUwSDIxNFYtMzQ5SDIyVi0zMDlIMTc0VjgxMEgyMloiPjwvcGF0aD48L2RlZnM+PGcgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIGZpbGw9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDApIj48ZyBkYXRhLW1tbC1ub2RlPSJtYXRoIj48ZyBkYXRhLW1tbC1ub2RlPSJtbyI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTZDIj48L3VzZT48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tNjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI3OCwgMCkiPjwvdXNlPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi02RCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTU2LCAwKSI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9IlRlWEF0b20iIGRhdGEtbWp4LXRleGNsYXNzPSJPUkQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1NTUuNywgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQ5LjgsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMjE5MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTI3LjYsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDE4My4yLCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiPjxnIGRhdGEtbW1sLW5vZGU9Im1yb3ciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyMCwgNjc2KSI+PGcgZGF0YS1tbWwtbm9kZT0ibXN1cCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtSS0xRDQ1MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1pIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0NjYsIDM2Mykgc2NhbGUoMC43MDcpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExNDIuNywgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0yMjEyIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNDIuOSwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMSI+PC91c2U+PC9nPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtcm93IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDA1LjUsIC02ODYpIj48ZyBkYXRhLW1tbC1ub2RlPSJtbiI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTMyIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibWkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDUwMCwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtSS0xRDQ2NSI+PC91c2U+PC9nPjwvZz48cmVjdCB3aWR0aD0iMjg0Mi45IiBoZWlnaHQ9IjYwIiB4PSIxMjAiIHk9IjIyMCI+PC9yZWN0PjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW92ZXIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDc1NDMuOSwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im11bmRlciIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg2LjQsIDApIj48ZyBkYXRhLW1tbC1ub2RlPSJtbyI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTNEIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIzLjgsIC03MzIpIHNjYWxlKDAuNzA3KSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCI+PGcgZGF0YS1tbWwtbm9kZT0ibWkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi00OCI+PC91c2U+PC9nPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibXJvdyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgODQ5KSBzY2FsZSgwLjcwNykiPjxnIGRhdGEtbW1sLW5vZGU9Im1vIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLVNPLTVCIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQxNywgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDM5NCkgc2NhbGUoMC43MDcpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIwLCAtMzQ1KSBzY2FsZSgwLjcwNykiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMCI+PC91c2U+PC9nPjxyZWN0IHdpZHRoPSI1NTMuNiIgaGVpZ2h0PSI2MCIgeD0iMTIwIiB5PSIyMjAiPjwvcmVjdD48L2c+PGcgZGF0YS1tbWwtbm9kZT0ibW8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMTAuNiwgMCkiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtU08tNUQiPjwvdXNlPjwvZz48L2c+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1vIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4OTcyLjUsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tNkMiPjwvdXNlPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi02OSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjc4LCAwKSI+PC91c2U+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1OLTZEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NTYsIDApIj48L3VzZT48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTA1MjguMiwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NjUiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODQ5LjgsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMjE5MiI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTI3LjYsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzAiPjwvdXNlPjwvZz48L2c+PGcgZGF0YS1tbWwtbm9kZT0iVGVYQXRvbSIgZGF0YS1tangtdGV4Y2xhc3M9Ik9SRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMxNTUuOCwgMCkiPjxnIGRhdGEtbW1sLW5vZGU9Im1mcmFjIj48ZyBkYXRhLW1tbC1ub2RlPSJtc3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDY3NikiPjxnIGRhdGEtbW1sLW5vZGU9Im1pIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLUktMUQ0NTIiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtaSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDY2LCAzNjMpIHNjYWxlKDAuNzA3KSI+PHVzZSB4bGluazpocmVmPSIjTUpYLTEyLVRFWC1JLTFENDY1Ij48L3VzZT48L2c+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MzAuMiwgLTY4NikiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMiI+PC91c2U+PC9nPjxyZWN0IHdpZHRoPSIxMTIwLjUiIGhlaWdodD0iNjAiIHg9IjEyMCIgeT0iMjIwIj48L3JlY3Q+PC9nPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJtbyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ3OTQsIDApIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tM0QiPjwvdXNlPjwvZz48ZyBkYXRhLW1tbC1ub2RlPSJUZVhBdG9tIiBkYXRhLW1qeC10ZXhjbGFzcz0iT1JEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTg0OS44LCAwKSI+PGcgZGF0YS1tbWwtbm9kZT0ibWZyYWMiPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIDY3NikiPjx1c2UgeGxpbms6aHJlZj0iI01KWC0xMi1URVgtTi0zMSI+PC91c2U+PC9nPjxnIGRhdGEtbW1sLW5vZGU9Im1uIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMjAsIC02ODYpIj48dXNlIHhsaW5rOmhyZWY9IiNNSlgtMTItVEVYLU4tMzIiPjwvdXNlPjwvZz48cmVjdCB3aWR0aD0iNzAwIiBoZWlnaHQ9IjYwIiB4PSIxMjAiIHk9IjIyMCI+PC9yZWN0PjwvZz48L2c+PC9nPjwvZz48L3N2Zz4=\" data-formula=\"\\lim{x\\to 0}{\\frac{e^x-1}{2x}} \\overset{\\left[\\frac{0}{0}\\right]}{\\underset{\\mathrm{H}}{=}} \\lim{x\\to 0}{\\frac{e^x}{2}}={\\frac{1}{2}}\" data-type=\"math_block\"></p><h2>Images</h2><p>You can also add images! This is super handy if you want to add a graph or something. To add an image you can either drag it into the editor, paste it from your clipboard or link it using Markdown. For demonstration purposes, have a kitten</p><p><img src=\"https://placekitten.com/600/300\" alt=\"Kitten\" contenteditable=\"true\"></p><pre class=\"hljs markdown\" data-language=\"markdown\"><code>![Images are linked like this](<a href=\"https://placekitten.com/600/300\" rel=\"noopener noreferrer nofollow\" target=\"_blank\" tabindex=\"0\">https://placekitten.com/600/300</a>)</code></pre><h2>Headings</h2><p>To section your document you can use headings! There's a total of three levels that you can use. They look like this</p><h1>Heading 1</h1><h2>Heading 2</h2><h3>Heading 3</h3><pre class=\"hljs markdown\" data-language=\"markdown\"><code># Heading 1\n## Heading 2\n### Heading 3</code></pre><p><span class=\"category-pill\" data-type=\"category\" tabindex=\"0\">tutorial</span></p>",
	"categories": [
		[
			"tutorial"
		],
		[
			"tutorial",
			"markdown"
		]
	],
	"pinned": false,
	"lastEdited": 1592486826710,
	"cursorPosition": 2977,
	"isRtl": false
};
