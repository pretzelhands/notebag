const { Menu, app } = require("electron");

const { createPreferencesWindow } = require("./preferences");
const { toggleWindow } = require("./mainWindow");

function createMenu() {
	const template = [
		{ label: "Preferences", accelerator: "CmdOrCtrl+,", click: createPreferencesWindow },
		{ label: "Show/hide window", click: toggleWindow },
		{ role: "quit" }
	];

	return Menu.buildFromTemplate(template);
}

function createApplicationMenu() {
	const isMac = process.platform === "darwin";
	const isDevelopment = process.env.NODE_ENV === "development";

	const template = [
		...(isMac ? [{
			label: app.name,
			submenu: [
				...(isDevelopment ? [{ role: "toggledevtools" }] : []),
				{ role: "about" },
				{ type: "separator" },
				{ role: "services" },
				{ type: "separator" },
				{ role: "hide" },
				{ role: "hideothers" },
				{ role: "unhide" },
				{ type: "separator" },
				{ role: "quit" }
			]
		}] : []),
		{
			label: "File",
			submenu: [
				isMac ? { role: "close" } : { role: "quit" },
				{ label: "Preferences", accelerator: "CmdOrCtrl+,", click: createPreferencesWindow },
			]
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ type: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				...(isMac ? [
					{ role: "delete" },
					{ role: "selectAll" },
					{ type: "separator" },
					{
						label: "Speech",
						submenu: [
							{ role: "startspeaking" },
							{ role: "stopspeaking" }
						]
					}
				] : [
					{ role: "delete" },
					{ type: "separator" },
					{ role: "selectAll" }
				])
			]
		},
		{
			label: "Window",
			submenu: [
				{ role: "minimize" },
				{ role: "zoom" },
				...(isMac ? [
					{ type: "separator" },
					{ role: "front" },
					{ type: "separator" },
					{ role: "window" }
				] : [
					{ role: "close" }
				])
			]
		},
		{
			role: "help",
			submenu: []
		}
	];

	return Menu.buildFromTemplate(template);
}


module.exports = {
	createMenu,
	createApplicationMenu
};
