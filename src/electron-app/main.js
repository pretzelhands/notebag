/* eslint-disable */
"use strict";

const fs = require("fs");
const { app, ipcMain, globalShortcut, nativeTheme, dialog, Menu } = require("electron");
const ElectronStore = require("electron-store");
const mv = require("mv");
const keytar = require("keytar");

const { makeAccelerator } = require("./utilities/makeAccelerator");
const { createApplicationMenu } = require("./menu");
const { toggleWindow, createWindow } = require("./mainWindow");
const { setTrayTheme, createTray } = require("./tray");

let electronStore = new ElectronStore({ watch: true });
Menu.setApplicationMenu(createApplicationMenu());

if (!electronStore.get("preferences.showDock", true)) {
	app.dock.hide();
}

app.on("ready", async () => {
	const theme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
	const accelerator = makeAccelerator(electronStore.get("preferences.shortcuts.showHideWindow", [17, 18, 32]));

	createTray(theme);
	createWindow();

	globalShortcut.register(accelerator, toggleWindow);
});

app.on("window-all-closed", () => {});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if(!global.mainWindow) {
		createWindow();
	}
});

app.on("will-quit", () => {
	globalShortcut.unregisterAll();
});

ipcMain.on("valid-license", async (_, licenseKey) => {
	await keytar.setPassword(app.name, app.name, licenseKey);
});

ipcMain.on("deactivate-license", async () => {
	await keytar.deletePassword(app.name, app.name);
});

ipcMain.on("shortcut-changed:showHideWindow", (event , oldKeys, newKeys) => {
	const oldAccelerator = makeAccelerator(oldKeys);
	const accelerator = makeAccelerator(newKeys);

	globalShortcut.unregister(oldAccelerator);
	globalShortcut.register(accelerator, toggleWindow);
});

ipcMain.on("shortcut-suspended:showHideWindow", (event , oldKeys) => {
	const oldAccelerator = makeAccelerator(oldKeys);
	globalShortcut.unregister(oldAccelerator);
});

ipcMain.on("toggle-dock", (event, showDock) => {
	if (showDock) {
		app.dock.show();
		return;
	}

	app.dock.hide();
});

ipcMain.on("note-path-changed", (event , oldPath, newPath) => {
	const oldFile = `${oldPath}/notebag.json`;
	const newFile = `${newPath}/notebag.json`;

	try {
		if (fs.existsSync(newFile)) {
			app.relaunch();
			app.exit();

			return;
		}
	} catch (err) {
		dialog.showMessageBoxSync({
			type: "error",
			title: "Error changing file location",
			message: `Notebag was not able to change the location of your notes file. Please try again with another path. Error: ${err}`,
			buttons: ["OK"],
			icon: null,
		});

		return;
	}

	mv(oldFile, newFile, function(err) {
		if (err) {
			dialog.showMessageBoxSync({
				type: "error",
				title: "Error changing file location",
				message: `Notebag was not able to change the location of your notes file. Please try again with another path. Error: ${err}`,
				buttons: ["OK"],
				icon: null,
			});

			return;
		}

		app.relaunch();
		app.exit();
	});
});

nativeTheme.on("updated", () => {
	const newTheme = nativeTheme.shouldUseDarkColors
		? "dark"
		: "light";

	setTrayTheme(newTheme);
});
