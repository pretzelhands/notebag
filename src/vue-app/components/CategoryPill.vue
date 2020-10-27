<template>
	<span class="category-pill" @click.stop="searchCategory">{{ this.sanitizedCategory }}</span>
</template>

<script>
/* eslint-disable indent */
	import Actions from "@/store/actions";

	export default {
		props: ["category"],
		methods: {
			searchCategory() {
				return this.$store.commit(Actions.SEARCH_CATEGORY, this.category.slice().join("/"));
			}
		},
		computed: {
			sanitizedCategory() {
				if (Array.isArray(this.category)) {
					return this.category.slice().join("/");
				}

				return this.category.replace("#", "");
			}
		}
	};
</script>

<style>

</style>
