const path = require("path");
const keytar = require("keytar");
const ElectronStore = require("electron-store");
const qs = require("query-string");
const { app } = require("electron");

function getAssetPath(asset) {
	return path.resolve(__dirname, "assets", asset);
}

async function getLicenseKey() {
	return await keytar.getPassword(app.name, app.name);
}

async function isTrialExpired() {
	const licenseStore = new ElectronStore({
		watch: true,
		name: "license",
		encryptionKey: "trial",
	});

	const trialInitiated = new Date(licenseStore.get("trialStartDate"));
	const trialExpires = new Date(trialInitiated.setDate(trialInitiated.getDate() + 7));

	return new Date() > trialExpires;
}


async function getLocalLicenseInformation() {
	const licenseKey = await getLicenseKey();
	const trialExpired = await isTrialExpired();

	return "?" + qs.stringify({
		licenseKey,
		trialExpired,
	});
}

module.exports = {
	getAssetPath,
	getLocalLicenseInformation,
	isTrialExpired,
};
