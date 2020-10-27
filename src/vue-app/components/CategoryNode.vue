<template>
	<div :class="nodeClass">
		<div class="category-node__meta" v-if="node.name" tabindex="0" ref="nodeElement" @click="searchCategory" @keydown="handleKeypress">
			<span class="category-node__title">
				<span class="category-node__hash">#</span>{{ node.name }}
			</span>

			<svg v-if="hasChildren" class="category-node__expander" @click.prevent.stop="toggleExpansion" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
			</svg>
		</div>

		<div class="category-node__children" v-if="hasChildren" v-show="expanded || isRootNode">
			<category-node v-for="child in node.subcategories.sort(this.sortByKey('name'))" :key="child.name" :node="child"></category-node>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
	import Actions from "@/store/actions";

	import { isActionableKey } from "@/utilities/keycode";

    export default {
        name: "CategoryNode",
		props: [ "node" ],
		methods: {
			pluralize: (notes) => notes === 1 ? "note" : "notes",
			toggleExpansion() {
				this.expanded = !this.expanded;
			},
			sortByKey(property) {
				let sortOrder = 1;

				if(property[0] === "-") {
					sortOrder = -1;
					property = property.substr(1);
				}

				return function (a,b) {
					if(sortOrder === -1){
						return b[property].localeCompare(a[property]);
					} else {
						return a[property].localeCompare(b[property]);
					}
				};
			},
			searchCategory() {
				this.$store.commit(Actions.SEARCH_CATEGORY, this.node.fullPath);
			},
			handleKeypress(event) {
				if(event.which === 37) return this.expanded = false;
				if(event.which === 39) return this.expanded = true;

				if(isActionableKey(event)) {
					return this.$store.commit(Actions.SEARCH_CATEGORY, this.node.fullPath);
				}
			}
		},
		computed: {
			nodeClass() {
				return {
					"category-node": true,
					"category-node--root": this.isRootNode,
					"category-node--expanded": this.expanded,
				};
			},
			notesTitle() {
				return this.node.notes.length === 1
					? "note"
					: "notes";
			},
			isRootNode() {
				return this.node.name === "";
			},
			hasChildren() {
				return this.node.subcategories && this.node.subcategories.length;
			}
		},
		data() {
			return {
				expanded: false,
			};
		},
    };
</script>

<style lang="scss">
	.category-node {
		&__meta:not(.category-node--root) {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: .66rem;
			user-select: none;
		}


		&__meta:hover:not(.category-node--root),
		&__meta:focus:not(.category-node--root) {
			outline: none;
			background: var(--muted);
			cursor: pointer;

			.category-node__title {
				color: var(--primary);
			}
		}

		&__title {
			font-weight: bold;
		}

		&__hash {
			color: var(--text--muted);
			padding-right: .25rem;
		}

		&__expander {
			width: 1rem;
			padding: .33rem;
			box-sizing: content-box;

			&:hover {
				color: var(--primary);
			}
		}

		&:not(.category-node--root) &__children {
			padding-left: 1rem;
		}
	}

	.category-node--expanded {
		& > .category-node__meta > .category-node__expander {
			transform: rotate(180deg);
		}
	}
</style>
