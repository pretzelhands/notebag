<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script>
/* eslint-disable indent */
	import Payloads from "@/store/payloads";

	export default {
		name: "App",
		computed: {
			theme() {
				return this.$store.state.preferences.theme;
			},
		},
		watch: {
			theme(newVal) {
				if (newVal === Payloads.THEME_DARK) {
					document.body.classList.add("is-dark-mode");
					return;
				}

				document.body.classList.remove("is-dark-mode");
			}
		},
		mounted() {
			if (this.theme === Payloads.THEME_DARK) {
				document.body.classList.add("is-dark-mode");
			}
		}
	};
</script>

<style lang="scss">
	@import "~tachyons";
	@import "~modern-normalize";

	:root {
		--primary: #cc251d;
		--primary--light: #ff2f24;
		--primary-dark: #222222;
		--primary--inverse: white;

		--link: var(--primary);

		--body: #fcfcfb;
		--muted: #efefee;
		--muted--intense: #d1d1d0;

		--text: #222222;
		--text--muted: #a9a9a9;
		--text--dark: #888888;

		--placeholder: var(--text--dark);

		--todo: var(--primary);
		--todo-checkmark: var(--primary--inverse);
		--todo-border: var(--text);
		--todo-border--active: var(--primary);

		--note-pane: var(--body);

		--note-background--inactive: var(--muted);
		--note-background--active: var(--primary);
		--note-background--hover: var(--muted--intense);

		--note-text--active: var(--primary--inverse);
		--note-text--inactive: #555555;

		--note-title--active: var(--primary--inverse);
		--note-title--inactive: #555555;

		--note-actions--active: var(--primary--light);
		--note-actions--inactive: #555555;

		--shortcut-header: var(--muted--intense);
		--shortcut-border: var(--muted--intense);

		--omnibar-background: var(--body);
		--omnibar-border: #cccccc;
		--omnibar-input: var(--muted);
		--omnibar-focus: var(--muted);
	}

	::selection {
		color: white;
		background: var(--primary);
	}

	img.math::selection {
		color: white;
		background: #33dae2;
	}

	html, body {
		background-color: var(--body);
		color: var(--text);
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		line-height: 1.5;

		margin: 0;
		padding: 0;
	}

	a,
	.zettelkasten-link {
		text-decoration: none;
		color: var(--primary);

		&:hover,
		&:focus {
			outline: none;
			text-decoration: underline;
			color: var(--primary--light);
			cursor: pointer;
		}
	}

	abbr:hover {
		cursor: help;
	}

	.layout {
		flex: 1;
	}

	.tip {
		font-size: 0.75rem;
		color: var(--text--dark);
		line-height: 1;
		user-select: none;
	}

	.tippy-tooltip {
		box-shadow: 0 1px 2px rgba(0, 0, 0, .33);
	}

	.category-pill {
		color: var(--primary);
		font-size: 12px;
		margin-right: 2px;
		border-radius: 4px;
		position: relative;
		top: -2px;

		&::before {
			content: "#";
			display: inline
		}

		&:hover,
		&:focus {
			outline: none;
			text-decoration: underline;
			color: var(--primary--light);
			cursor: pointer;
		}
	}

	.hljs {
		display: block;
		overflow-x: auto;
		padding: .75rem;
		line-height: 1.5;
		font-size: 14px;
		color: var(--text);
		background: var(--muted);
	}

	.hljs::before {
		content: attr(data-language);
		font-size: 10px;
		display: block;
		color: var(--text--dark);
		letter-spacing: .5px;
		text-transform: uppercase;
		padding-bottom: .5rem;
	}

	.hljs-comment,
	.hljs-quote {
		color: #696969;
	}

	/* Red */
	.hljs-variable,
	.hljs-template-variable,
	.hljs-tag,
	.hljs-name,
	.hljs-selector-id,
	.hljs-selector-class,
	.hljs-regexp,
	.hljs-deletion {
		color: #d91e18;
	}

	/* Orange */
	.hljs-number,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-literal,
	.hljs-type,
	.hljs-params,
	.hljs-meta,
	.hljs-link {
		color: #aa5d00;
	}

	/* Yellow */
	.hljs-attribute {
		color: #aa5d00;
	}

	/* Green */
	.hljs-string,
	.hljs-symbol,
	.hljs-bullet,
	.hljs-addition {
		color: #008000;
	}

	/* Blue */
	.hljs-title,
	.hljs-section {
		color: #007faa;
	}

	/* Purple */
	.hljs-keyword,
	.hljs-selector-tag {
		color: #7928a1;
	}

	.hljs-emphasis {
		font-style: italic;
	}

	.hljs-strong {
		font-weight: bold;
	}

	@media screen and (-ms-high-contrast: active) {
		.hljs-addition,
		.hljs-attribute,
		.hljs-built_in,
		.hljs-builtin-name,
		.hljs-bullet,
		.hljs-comment,
		.hljs-link,
		.hljs-literal,
		.hljs-meta,
		.hljs-number,
		.hljs-params,
		.hljs-string,
		.hljs-symbol,
		.hljs-type,
		.hljs-quote {
			color: highlight;
		}

		.hljs-keyword,
		.hljs-selector-tag {
			font-weight: bold;
		}
	}

	/**
     * Dark mode styles
     */
	.is-dark-mode {
		--primary: #cc251d;
		--primary--light: #ff2f24;
		--primary-dark: #222222;
		--primary--inverse: white;

		--link: var(--primary);

		--body: #222222;
		--muted: #333333;
		--muted--intense: #4a4a4a;

		--text: #f8f8f8;
		--text--muted: #c5c5c5;
		--text--dark: #a9a9a9;


		--placeholder: var(--text--dark);

		--todo: var(--primary);
		--todo-checkmark: var(--primary--inverse);
		--todo-border: var(--text);
		--todo-border--active: var(--primary);

		--note-pane: var(--body);

		--note-background--inactive: var(--muted);
		--note-background--active: var(--primary);
		--note-background--hover: var(--muted--intense);

		--note-text--active: var(--primary--inverse);
		--note-text--inactive: #888888;

		--note-title--active: var(--primary--inverse);
		--note-title--inactive: var(--text);

		--note-actions--inactive: #888888;

		--shortcut-header: var(--muted--intense);
		--shortcut-border: var(--muted--intense);

		--omnibar-background: var(--muted);
		--omnibar-border: #6f6f6f;
		--omnibar-input: var(--muted--intense);
		--omnibar-focus: var(--muted--intense);

		.main {
			background-color: var(--body);
			color: var(--text);
		}

		/* Comment */
		.hljs-comment,
		.hljs-quote {
			color: #d4d0ab;
		}

		/* Red */
		.hljs-variable,
		.hljs-template-variable,
		.hljs-tag,
		.hljs-name,
		.hljs-selector-id,
		.hljs-selector-class,
		.hljs-regexp,
		.hljs-deletion {
			color: #ffa07a;
		}

		/* Orange */
		.hljs-number,
		.hljs-built_in,
		.hljs-builtin-name,
		.hljs-literal,
		.hljs-type,
		.hljs-params,
		.hljs-meta,
		.hljs-link {
			color: #f5ab35;
		}

		/* Yellow */
		.hljs-attribute {
			color: #ffd700;
		}

		/* Green */
		.hljs-string,
		.hljs-symbol,
		.hljs-bullet,
		.hljs-addition {
			color: #abe338;
		}

		/* Blue */
		.hljs-title,
		.hljs-section {
			color: #00e0e0;
		}

		/* Purple */
		.hljs-keyword,
		.hljs-selector-tag {
			color: #dcc6e0;
		}

		.hljs {
			display: block;
			overflow-x: auto;
			background-color: var(--muted);
			color: #f8f8f2;
			padding: 0.5em;
		}

		.hljs-emphasis {
			font-style: italic;
		}

		.hljs-strong {
			font-weight: bold;
		}

		@media screen and (-ms-high-contrast: active) {
			.hljs-addition,
			.hljs-attribute,
			.hljs-built_in,
			.hljs-builtin-name,
			.hljs-bullet,
			.hljs-comment,
			.hljs-link,
			.hljs-literal,
			.hljs-meta,
			.hljs-number,
			.hljs-params,
			.hljs-string,
			.hljs-symbol,
			.hljs-type,
			.hljs-quote {
				color: highlight;
			}

			.hljs-keyword,
			.hljs-selector-tag {
				font-weight: bold;
			}
		}
	}

	.checkbox {
		appearance: none;
		-webkit-appearance: none;
		display: block;
		border: 1px solid var(--todo-border);
		height: 1rem;
		width: 1rem;
		box-sizing: border-box;
		margin-right: 0.5rem;
		margin-top: 0.33rem;
		user-select: none;
		cursor: pointer;
		border-radius: 0.2em;
		background-color: transparent;
		transition: background 0.15s ease-in, border-color 0.15s  ease-in;

		&:hover,
		&:active,
		&:focus {
			border-color: var(--todo-border--active);
			background-color: var(--todo);
		}

		&:checked {
			border-color: var(--todo-border--active);
			background-color: var(--todo);
			color: var(--todo-checkmark);
			display: flex;
			align-items: center;
			justify-content: center;

			&:active,
			&:hover,
			&:focus {
				background-color: var(--primary--light);
				border-color: var(--primary--light);
			}

			&:after {
				position: relative;
				left: 0;
				content: '\2713';
				font-size: 12px;
				color: var(--todo-checkmark);
			}
		}
	}

	.btn-primary {
		display: block;
		margin: .5rem 0 0;
		align-self: center;
		border: none;
		background-color: var(--primary);
		color: var(--primary--inverse);
		font-size: .9rem;
		padding: .75rem 1.5rem;
		border-radius: 4px;

		&:hover,
		&:focus,
		&:active 		{
			cursor: pointer;
			background-color: var(--primary--light);
		}
	}

	.select,
	.form-field {
		-webkit-appearance: none;
		outline: none;
		width: 100%;
		padding: .5rem;
		border-radius: 4px;
		background-color: var(--muted);
		border: 1px solid var(--muted);
		color: var(--text);
		font-size: .9rem;
		letter-spacing: .2px;
	}

	.select:focus {
		background-color: var(--muted--intense);
	}

	.select-wrapper {
		position: relative;

		&:after {
			position: absolute;
			right: .5rem;
			top: -6px;
			display: block;
			color: var(--text);
			content: "\2304";
		}
	}

	.no-select {
		user-select: none;
	}

	ol.rtl, ul.rtl {
		direction: rtl;

	}
	ol.rtl>li, ul.rtl>li {
		margin-right: 30px;
		margin-left: 0;
	}

	ol.rtl>li:before, ul.rtl>li:before, {
		margin-left: 0;
		margin-right: -78px;
	}

	label .select {
		margin-top: .33rem;
	}

	@keyframes fadein {
		from {
			opacity:0;
		}

		to {
			opacity:1;
		}
	}

	.notices {
		position: fixed;
		left: 50%;
		width: 66%;
		top: 1rem;
		height: 50px;
		transform: translateX(-50%);
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
	}

	.notices.is-bottom {
		top: auto;
		bottom: 2rem;
	}

	.toast {
		background-color: var(--muted);
		color: var(--text);
		padding: .5rem .75rem;
		border-radius: 4px;
		display: inline-block;
		box-shadow: 0px 1px 2px rgba(0, 0, 0, .33);
		font-size: .8rem;
		animation: fadein .15s;
		margin-bottom: .5rem;

		&:hover {
			cursor: pointer;
		}

		* {
			margin: 0;
		}
	}
</style>
