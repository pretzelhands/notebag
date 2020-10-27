const path = require("path");
const { BrowserWindow, globalShortcut, shell } = require("electron");

const { getAssetPath, getLocalLicenseInformation } = require("./utilities");

global.preferencesWindow = undefined;

async function createPreferencesWindow() {
	const queryString = await getLocalLicenseInformation();
	const windowUrl = process.env.NODE_ENV === "development"
		? `http://localhost:8080/index.html${queryString}#/preferences`
		: `file://${path.resolve(__dirname, "..", "vue-app")}/index.html${queryString}#/preferences`;

	if (global.preferencesWindow) {
		global.preferencesWindow.show();
		global.preferencesWindow.focus();
		return;
	}

	global.preferencesWindow = new BrowserWindow({
		width: 640,
		height: 480,
		frame: true,
		show: false,
		resizable: false,
		movable: true,
		title: "Preferences",
		icon: getAssetPath("icon.png"),
		webPreferences: {
			nodeIntegration: true,
			devTools: process.env.NODE_ENV === "development",
		}
	});

	if (process.platform === "windows") {
		global.preferencesWindow.setMenuBarVisibility(false);
	}

	await global.preferencesWindow.loadURL(windowUrl);
	global.preferencesWindow.focus();

	global.preferencesWindow.on("focus", () => globalShortcut.registerAll(["CommandOrControl+R", "F5"], () => {}));
	global.preferencesWindow.on("blur", () => {
		globalShortcut.unregister("CommandOrControl+R");
		globalShortcut.unregister("F5");
	});
	global.preferencesWindow.once("ready-to-show", () => global.preferencesWindow.show());
	global.preferencesWindow.on("closed", () => {
		global.preferencesWindow = null;
	});

	global.preferencesWindow.webContents.on("new-window", function(event, url) {
		event.preventDefault();

		if (url.includes("//localhost")) {
			return;
		}

		shell.openExternal(url);
	});
}

module.exports = {
	createPreferencesWindow,
};


