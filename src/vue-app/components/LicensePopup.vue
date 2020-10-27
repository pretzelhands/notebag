<template>
	<div class="license-popup" v-if="(!isTrial && !licenseKey) || trialExpired">
		<form :class="modalClass" @submit="verifyLicense">
			<h2 v-if="!licenseKey" class="modal__title no-select">License activation</h2>
			<h2 v-if="trialExpired" class="modal__title no-select">Your Notebag trial has expired</h2>

			<label class="modal__explanation">
				Please enter your license key to activate Notebag.
				<span v-if="trialExpired" class="expired">
					<a href="https://notebag.app/#get-notebag" target="_blank">You can buy a license at notebag.app</a>.
					If you don't want to buy a Notebag license, you can export your notes below.
				</span>

				<input type="text" v-model="potentialLicenseKey" class="form-field" placeholder="AAAAAAAA-BBBB-CCCC-DDDD-EEEEEEEEEEEE">
				<span class="modal__error" v-if="error">There was an issue with activating your license. Please try again or contact support.</span>
			</label>

			<div class="modal__actions">
				<div class="modal__buttons">
					<button type="submit" class="btn-primary">Activate license</button>
					<button @click.prevent.stop="activateTrial" v-if="!trialExpired" class="btn-trial">Start 7-day trial</button>
					<button @click.prevent.stop="exportNotes" v-if="trialExpired" class="btn-trial">Export my notes</button>
				</div>

				<p class="tip">Having troubles? <a href="mailto:hello@pretzelhands.com?subject=Notebag Support: ...">Contact support</a></p>
			</div>
		</form>
	</div>
</template>

<script>
/* eslint-disable indent */
	import { ipcRenderer, remote } from "electron";
    import { mapState } from "vuex";

    import Actions from "@/store/actions";
	import getLicenseData from "@/utilities/getLicenseData";
	import toMarkdown from "@/converters/to-markdown";

	export default {
        name: "LicensePopup",
		data() {
			return {
				error: false,
				trialExpiredRecently: false,
				potentialLicenseKey: "",
			};
		},
		created() {
			ipcRenderer.on("trial-expired", () => this.trialExpiredRecently = true);
		},
		methods: {
			async verifyLicense(event) {
				event.preventDefault();

				const licenseData = await getLicenseData(this.potentialLicenseKey);
				if (licenseData !== null) {
					this.potentialLicenseKey = null;
					return this.$store.commit({
						type: Actions.SET_LICENSE_KEY,
						licenseKey: licenseData.license_key,
						emitEvent: true,
					});
				}

				this.error = true;
			},
			activateTrial() {
				return this.$store.commit({
					type: Actions.SET_LICENSE_KEY,
					isTrial: true,
				});
			},
			async exportNotes() {
				const dialog = remote.require("electron").dialog;
				const fs = remote.require("fs");

				const { filePaths } = await dialog.showOpenDialog(remote.getGlobal("preferencesWindow"),{ properties: ["openDirectory"] });
				const path = filePaths[0];
				const notes = Object.values(this.$store.state.notes);


				if (path) {
					fs.mkdir(`${path}/notebag-export/`, function(err) {
						if (err) {
							dialog.showErrorBox("Couldn't export your notes", err);
						}
					});

					for (const note of notes) {
						let content = toMarkdown(note.preview);
						content = `# ${note.title}\n\n${content}`;

						let fileName = note.title.replace(" ", "-").toLowerCase();

						fs.writeFile(`${path}/notebag-export/${fileName}.md`, content, function(err) {
							if (err) {
								dialog.showErrorBox("Couldn't export your notes", err);
							}
						});
					}

					dialog.showMessageBox({
						title: "Export completed",
						message: "All done! We've exported all your notes. The folder is called 'notebag-export'."
					});
				}
			}
		},
		computed: {
			...mapState(["licenseKey", "isTrial"]),
			trialExpired() {
				const urlParams = new URLSearchParams(window.location.search);
				const trialExpired = urlParams.get("trialExpired");

				if (!this.isTrial) {
					return false;
				}

				return (this.isTrial && trialExpired === "true") || this.trialExpiredRecently;
			},
			modalClass() {
				return {
					"license-popup__modal modal": true,
					"has-error": this.error
				};
			}
		}
    };
</script>

<style lang="scss">
	.license-popup {
		z-index: 9999;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-content: center;
		justify-content: center;

		.license-popup__modal {
			box-sizing: border-box;
			transform: translateY(-20%);
			align-self: center;
			padding: 2rem;
			color: var(--text);
			background: var(--omnibar-background);
			border: 1px solid var(--omnibar-border);
			border-radius: 4px;
			width: 100%;
			max-width: 560px;

			.form-field { background: var(--omnibar-input); margin-top: .25rem; user-select: all !important; }
			.btn-primary { padding: .5rem .75rem; margin-top: 0; }
			.tip { padding: 0; margin: 0; line-height: 1; }

			a {
				color: var(--muted--text);

				&:hover,
				&:focus,
				&:active {
					outline: none;
					text-decoration: none;
					color: var(--primary);
				}
			}
		}
	}

	.btn-trial {
		display: block;
		margin: 0;
		margin-left: .5rem;
		align-self: center;
		border: none;
		background-color: transparent;
		color: var(--text);
		font-size: .9rem;
		padding: .5rem .75rem;
		border-radius: 4px;

		&:hover,
		&:focus,
		&:active {
			cursor: pointer;
			background-color: var(--muted--intense);
		}
	}

	.modal {
		&.has-error {
			.form-field { border: 2px solid var(--primary--light); }
		}

		&__title {
			margin-top: 0;
			margin-bottom: .25rem;
			line-height: 1;
		}

		&__explanation {
			display: block;
			margin-top: .75rem;
		}

		&__error {
			font-size: .75rem;
			color: var(--primary--light);
		}

		&__actions {
			margin-top: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__buttons {
			display: flex;
		}
	}

	.expired {
		display: inline-block;
		padding-bottom: 1rem;
		padding-top: 1rem;
	}
</style>
