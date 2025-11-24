# Open in Incognito

Open in Incognito is a browser extension that allows you to quickly open the current tab, a link, or selected text in an incognito window. It supports Chrome, Firefox, and Opera.

## Features

- **Toolbar Icon**: Click the extension icon in the toolbar to open the current page in an incognito window.
- **Context Menu**:
    - Right-click on a **page** to open it in incognito.
    - Right-click on a **link** to open it in incognito.
    - Right-click on **selected text**:
        - If it's a URL, it opens in incognito.
        - If it's not a URL, it performs a Google search for the text in incognito.
- **Keyboard Shortcut**: Press `Ctrl+Shift+I` (or `Command+Shift+I` on Mac) to open the current tab in incognito.

## Installation

### Chrome / Edge / Opera / Brave
1. Download the extension or clone this repository.
2. Open your browser's extensions page (e.g., `chrome://extensions/`).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory containing the extension files.

### Firefox
1. Open `about:debugging`.
2. Click **This Firefox**.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` file.

## Permissions

This extension requires the following permissions:
- `contextMenus`: To add items to the right-click menu.
- `tabs`: To access the current tab's URL.

## License

[MIT](LICENSE)