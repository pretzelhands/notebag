<template>
	<div class="category-tree">
		<h1 class="category-tree__title">Categories</h1>
		<p class="tip">Tip: Use left and right arrow keys to expand and close categories</p>

		<div class="category-tree__tree">
			<category-node :node="categoryTree"></category-node>
		</div>
<!--		<pre>{{ categoryTree }}</pre>-->
	</div>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable no-prototype-builtins */
	import { mapState } from "vuex";

	import CategoryNode from "@/components/CategoryNode";

	const convertCategoriesToParentIndex = categories => {
		return categories.map(category =>
			category.map((name, idx) => ({
				name,
				fullPath: category.slice(0, idx+1).join("/"),
				parent: category[idx - 1] || "root",
				notes: []
			})
		)).flat();
	};

	export default {
		name: "CategoryTree",
		components: { CategoryNode },
		computed: {
			...mapState(["notes"]),
			categoryTree() {
				const notes = Object.values(this.notes);

				let categories = [];
				let notesMap = {};
				let subcategoryMap = {};
				let tree = {
					name,
					subcategories: [],
					notes: [],
				};

				notes.forEach(note => {
					categories = categories.concat(note.categories.map(cat => [ ...cat, note ]));
				});

				categories = convertCategoriesToParentIndex(categories);
				categories.forEach(node => {
					// No parentId means top level
					if (node.parent === "root") {
						const nodeExists = tree.subcategories.find(({ name }) => name === node.name);
						return nodeExists || tree.subcategories.push(node);
					}

					if (node.name.hasOwnProperty("body")) {
						// Insert note as child of parent in flat array
						let parentIndex = notesMap[node.parent];
						if (!parentIndex) {
							parentIndex = categories.findIndex(el => el.name === node.parent);
							notesMap[node.parent] = parentIndex;
						}

						if (!categories[parentIndex].notes) {
							return categories[parentIndex].notes = [node.name.id];
						}

						const nodeExists = categories[parentIndex].notes.find(({ id }) => id === node.name.id);
						return nodeExists || categories[parentIndex].notes.push(node.name.id);
					}

					// Insert node as child of parent in flat array
					let parentIndex = subcategoryMap[node.parent];
					if (!parentIndex) {
						parentIndex = categories.findIndex(el => el.name === node.parent);
						subcategoryMap[node.parent] = parentIndex;
					}

					if (!categories[parentIndex].subcategories) {
						return categories[parentIndex].subcategories = [node];
					}

					const nodeExists = categories[parentIndex].subcategories.find(({ name }) => name === node.name);
					return nodeExists || categories[parentIndex].subcategories.push(node);
				});

				return tree;
			}
		},
		methods: {

		},
	};
</script>

<style lang="scss">
	.category-tree {
		height: 100vh;
		width: 100%;
		padding: 3rem;
		position: relative;
		background-color: var(--note-pane);
		overflow-y: auto;

		&__title {
			margin-top: 0;
			margin-bottom: 0;
			user-select: none;
		}

		.tip {
			margin-bottom: 1rem;
		}
	}
</style>
