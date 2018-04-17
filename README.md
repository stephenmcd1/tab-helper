# Tab Helper Chrome Extension

## Features

### Summary

Chrome Extension (and companion application) to control tabs from external applications.

### Activating Tabs

By using the `activate-tab` action, the extension will find a tab that matches the given URL and then activate / focus / highlight that tab (and the window hosting it).  If there are multiple matching tabs, then the first one is used.

If a matching tab is not found, the URL is opened in a new tab.

### Future Features

Additional features may be added in the future if requested (or if I need them :-) )

## Usage

The main use case for this extension is to be able to have shortcuts that activate specific tabs.  To accomplish this, setup a shortcut with a path like:

`c:\path\to\TabHelperHost.exe activate-tab http://example.com/my/favorite/place`

## Installing

### Chrome Web Store

To install the latest version of the extension, just head over to the [Chrome Web Store](https://chrome.google.com/webstore/detail/tab-controller/bpmgleddgmadhhfeekjcnfcgfeaklpbl) and follow the simple instructions there.

NOTE: This extension uses Native Messaging which means the extension communicates with a separate, standalone application.  This application is necessary for the extension to function but it cannot come bundled with the extension.  It must be acquired and installed manually.  For now, you'll need to get this application by building it from source in `./src/native-host/`.  Once you've built the app, you can install it using the script in `./install/Host-Install.bat`.

### Manual Installation / Development

#### Extension

To setup the extension in Chrome from source (e.g. to test out local changes you've made):

1. Go to the Extensions window in Chrome (Menu > More Tools > Extensions)
2. Check 'Developer Mode'
3. Click 'Load unpacked extension...'
4. Navigate to the `./src/extension/` directory in your local copy of the code

#### Native Host

The native host is a simple .NET application.  Open it in Visual Studio 2015 or later.

## Etc.

### Issues / Questions / Contributing

If you run into any issues, have questions/comments/etc., feel free to open an issue over on the [issue tracker](https://github.com/stephenmcd1/tab-helper/issues).  If you'd like to contribute to this extension and have some programming prowess, feel free to submit a pull request.

### License

[MIT](https://github.com/stephenmcd1/paste-as-markdown/blob/master/LICENSE)

### Thanks

The icon for this extension was made by [Freepik](http://www.freepik.com) from [Flaticon](https://www.flaticon.com/) and is licensed under [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/)
