<template>
	<div class="action-list">
		<div
			v-for="action in actions"
			class="action-list__action action"
			:key="action.shortcut"
			@keydown="event => handleKeydown(action, event)"
			@click="handleClick(action)"
			tabindex="0"
		>
			<div class="action__meta">
				<h3 class="action__name">{{ action.name }}</h3>
				<div class="action__shortcut">
					{{ action.shortcut }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* eslint-disable indent */
    import { isActionableKey } from "@/utilities/keycode";

	export default {
        name: "ActionList",
		props: [ "actions" ],
		methods: {
			handleClick(action) {
				action.handler();
				this.$emit("action");
			},
			handleKeydown(action, event) {
				if (isActionableKey(event)) {
					action.handler();
					this.$emit("action");
				}
			}
		}
    };
</script>

<style lang="scss" scoped>
	.action {
		padding: 0 .66rem;
		background-color: transparent;

		&__name {
			font-size: .75rem;
			align-self: center;
		}

		&__shortcut {
			margin-top: 0;
			font-size: .75rem;
			color: var(--text--dark);
		}

		&__meta {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&:hover,
		&:focus {
			outline: none;
			cursor: pointer;
			background-color: var(--note-background--hover);
		}
	}
</style>
