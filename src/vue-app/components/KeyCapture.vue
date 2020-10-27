<template>
	<div :class="keycaptureClass" tabindex="0" @click="startRecording" @keydown="addKeyToRecording" @keyup="removeKeyFromRecording">
		<span
			v-for="key in pressedKeys"
			:key="key"
			class="shortcut__button"
		>
				{{ keycode(key) }}
		</span>
	</div>
</template>

<script>
/* eslint-disable indent */
	import keycode from "@/utilities/keycode";

	// The following keys keep the recording going: 16 = Shift, 17 = Ctrl, 18 = Alt, 91 = Left Command, 93 = Right Command
	const SUSTAINING_KEYS = [16, 17, 18, 91, 93];

	export default {
		props: ["shortcut"],
		mounted() {
			this.oldKeys = this.$store.state.preferences.shortcuts[this.shortcut];
			this.pressedKeys = this.$store.state.preferences.shortcuts[this.shortcut];
		},
		data() {
			return {
				oldKeys: [],
				pressedKeys: [],
				isRecording: false,
			};
		},
		methods: {
			keycode,
			stoppedRecording() {
				this.$emit("captured", this.shortcut, this.oldKeys, this.pressedKeys);
			},
			startRecording() {
				if (this.isRecording) {
					return;
				}

				this.oldKeys = this.pressedKeys;
				this.pressedKeys = [];
				this.$el.focus();

				this.$emit("recording", this.shortcut, this.oldKeys);
				this.isRecording = true;
			},
			addKeyToRecording(event) {
				if (!this.isRecording) {
					return;
				}

				event.preventDefault();

				const elementIndex = this.pressedKeys.indexOf(event.keyCode);
				if (elementIndex === -1) {
					this.pressedKeys.push(event.keyCode);

					if (SUSTAINING_KEYS.indexOf(event.keyCode) === -1) {
						this.isRecording = false;
						this.stoppedRecording();
					}
				}
			},
			removeKeyFromRecording(event) {
				if (!this.isRecording) {
					return;
				}

				event.preventDefault();

				const elementIndex = this.pressedKeys.indexOf(event.keyCode);
				if (elementIndex !== -1) {
					this.pressedKeys.splice(elementIndex, 1);
				}
			}
		},
		computed: {
			keycaptureClass() {
				return {
					"keycapture": true,
					"keycapture--recording": this.isRecording,
				};
			}
		}
	};
</script>

<style lang="scss">
	.keycapture {
		outline: none;
		width: 100%;
		height: 1rem;

		&:hover {
			cursor: pointer;
		}
	}

	.keycapture--recording:after {
		content: "recording";
		font-size: 8px;
		text-transform: uppercase;
		color: var(--text);
		float: right;
		top: 6px;
		position: relative;
	}
</style>
