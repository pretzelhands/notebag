import tippy, { sticky } from "tippy.js";
import Fuse from "fuse.js";
import firstBy from "thenby";

import store from "@/store/store";

const renderPopup = function (node) {
	if (this.popup) {
		return;
	}

	this.popup = tippy(".editor", {
		getReferenceClientRect: node.getBoundingClientRect,
		appendTo: () => document.body,
		interactive: true,
		sticky: true, // make sure position of tippy is updated when content changes
		plugins: [sticky],
		content: this.$refs.suggestions,
		trigger: "click",
		hideOnClick: false,
		showOnCreate: true,
		theme: "dark",
		placement: "bottom-start",
		inertia: true,
		duration: [400, 200],
	});
};

const destroyPopup = function() {
	if (this.popup) {
		this.popup[0].destroy();
		this.popup = null;
	}
};

const upHandler = function() {
	this.selectedResultIndex = ((this.selectedResultIndex + this.filteredResults.length) - 1) % this.filteredResults.length;
};

const downHandler = function() {
	this.selectedResultIndex = (this.selectedResultIndex + 1) % this.filteredResults.length;
};

const enterHandler = function() {
	const suggestion = this.filteredResults[this.selectedResultIndex];
	if (suggestion) {
		this.selectSuggestion(suggestion);
		this.filteredResults = [];
		this.selectedResultIndex = 0;
		this.suggestionRange = null;

		const destroyTippy = destroyPopup.bind(this);
		destroyTippy();
	}
};

const onEnter = function ({ query, range, command, virtualNode }) {
	this.items = Object.values(store.state.notes).filter(note => note.title.length > 0);
	this.query = query;
	this.suggestionRange = range;
	this.filteredResults = Object.values(store.state.notes).filter(note => note.title.length > 0);
	this.suggestionCommand = command;

	if (this.items.length === 0) {
		return;
	}

	const popup = renderPopup.bind(this);
	popup(virtualNode);
};

const onEnterCategories = function ({ query, range, command, virtualNode }) {
	const notes = Object.values(store.state.notes);
	let categories = new Map();

	notes.forEach(note => {
		note.categories.forEach(category => {
			categories.set(category.join(""), category.join("/"));
		});
	});

	categories = Array.from(categories.values());
	categories = categories.map(category => ({ title: category })).sort(firstBy("title"));

	this.items = categories;
	this.query = query;
	this.suggestionRange = range;
	this.filteredResults = categories;
	this.suggestionCommand = command;

	if (categories.length === 0) {
		return;
	}

	const popup = renderPopup.bind(this);
	popup(virtualNode);
};

const onExit = function() {
	this.query = null;
	this.filteredResults = [];
	this.selectedResultIndex = 0;
	this.suggestionRange = null;

	const destroyTippy = destroyPopup.bind(this);
	destroyTippy();
};

const onChange = function({ items, query, range, virtualNode }) {
	this.query = query;
	this.filteredResults = items;
	this.selectedResultIndex = 0;
	this.suggestionRange = range;

	if (items.length === 0) {
		const destroy = destroyPopup.bind(this);
		destroy();
		return;
	}

	const popup = renderPopup.bind(this);
	popup(virtualNode);
};

const onKeyDown = function({ event }) {
	if (event.key === "ArrowUp") {
		const handler = upHandler.bind(this);
		handler();
		return true;
	}
	if (event.key === "ArrowDown") {
		const handler = downHandler.bind(this);
		handler();
		return true;
	}
	if (event.key === "Enter") {
		const handler = enterHandler.bind(this);
		handler();
		return true;
	}

	return false;
};

const onFilter = function (items, query) {
	if (!query) return items;

	const fuse = new Fuse(items, {
		isCaseSensitive: false,
		includeMatches: false,
		includeScore: true,
		useExtendedSearch: true,
		findAllMatches: false,
		minMatchCharLength: 5,
		shouldSort: true,
		threshold: 0.4,
		location: 0,
		distance: 10000,
		keys: ["title"],
	});

	return fuse.search(query).map(result => result.item);
};

export function NoteSuggestions(boundContext) {
	return {
		items: () => Object.values(store.state.notes).filter(note => note.title.length > 0),
		onEnter: onEnter.bind(boundContext),
		onChange: onChange.bind(boundContext),
		onExit: onExit.bind(boundContext),
		onKeyDown: onKeyDown.bind(boundContext),
		onFilter: onFilter.bind(boundContext),
	};
}

export function CategorySuggestions(boundContext) {
	const notes = Object.values(store.state.notes);
	let categories = new Map();

	notes.forEach(note => {
		note.categories.forEach(category => {
			categories.set(category.join(""), category.join("/"));
		});
	});

	categories = Array.from(categories.values());
	categories = categories.map(category => ({ title: category })).sort(firstBy("title"));

	return {
		items: () => categories,
		onEnter: onEnterCategories.bind(boundContext),
		onChange: onChange.bind(boundContext),
		onExit: onExit.bind(boundContext),
		onKeyDown: onKeyDown.bind(boundContext),
		onFilter: onFilter.bind(boundContext),
	};
}
