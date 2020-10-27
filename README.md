<p align="center">
	<img alt="Notebag" src="https://notebag.app/assets/logo.png" width="480">
</p>

---

Notebag is a note-taking app that has a razor-sharp focus on keeping you focused
making navigation as seamless as possible. It was developed between March and May 2020.

---

## Project structure

Notebag is split into two main parts. One is the Electron app responsible for handling
window management and OS-related things, the other is a Vue app handling the entire UI.


### Electron 
The Electron part is relatively small and the file structure is split up into the various
components that make up the app: the main window, the preferences window, the app menu,
the tray functionality and some helpers to deal with global keyboard shortcuts.

### Vue

The Vue app is built on `vuex` and `vue-router`. Anyone familiar with the Vue ecosystem
should find those parts reasonably easy to understand. The main editor component is based 
on `tiptap`, which in turn is based on ProseMirror. The various available formattings are
stored under `plugins` and `extensions` respectively.

Under `components` you can find all the parts that make up the main app interface.

Under `store` you will find everything related to storing notes and the vuex store

Under `import`, `directives`, `scanners` and `utilities` you will find many helpers for
various functionalities of the app. `scanners` specifically contains functionality related
to finding backlinks and categories inside a note.

#### CSS

The CSS is handwritten with some augmentations by the Tachyons CSS library. It's very messy.

## Developing the app

Everything you need to get started is available here. To run a development environment
you need only do the following (assuming you have `node` and `npm` installed):

```
$ npm install
$ npm run app
```

This will start the development build of Notebag which will hot reload for any changes
you make to the Vue app. Should you make any changes to the Electron app, you have to 
restart the process.

## Building the app

To build a standalone version of Notebag you can run one of the following:

```
$ npm run dist:all -- (Builds for all platforms)
$ npm run dist:w -- Windows
$ npm run dist:m -- Mac
$ npm run dist:l -- Linux
```

### Code-signing and notarizing the app

If you have a valid Windows Code Signing Certificate in p12 format, you can specify the path and
password to access it under `electron-builder.env` - Mine was usually located in the `build` directory
and named `windows_cert.p12` 

On Mac, if you have a valid developer certificate, it will be automatically used on building the app.
To notarize it on Apple's servers, be sure to replace the credentials in `.env.example` and rename it to
`.env`. Then edit `package.json` and remove the `DISABLED_` prefix for `build.afterSign`.

There are no special code-signing mechanisms in place for Linux.

## Questions

If you are interested in further developing Notebag and have questions about specific implementation details
or other intricacies of the app, please don't hesitate to contact me under hello@pretzelhands.com
