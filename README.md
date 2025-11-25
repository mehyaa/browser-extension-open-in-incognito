# Open in Incognito
[![Chrome Users](https://img.shields.io/chrome-web-store/users/hfdpikfannfpibndlihjglbjmklhicgf?style=for-the-badge&logo=googlechrome&label=Chrome%20Users)](https://chromewebstore.google.com/detail/hfdpikfannfpibndlihjglbjmklhicgf) [![Mozilla Add-on Users](https://img.shields.io/amo/users/vscode-marketplace-downloader?style=for-the-badge&logo=firefoxbrowser&label=Firefox%20Users)](https://addons.mozilla.org/en-US/firefox/addon/vscode-marketplace-downloader)

Open in Incognito is a browser extension that allows you to quickly open the current tab, a link, or selected text in an incognito window.

## Installation

Download the extension or clone this repository, then follow the instructions below:

### Chrome / Edge / Opera / Brave
1. Copy the `manifest.chrome.json` file to `manifest.json`.
2. Open your browser's extensions page (e.g., `chrome://extensions/`).
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the directory containing the extension files.

### Firefox
1. Copy the `manifest.firefox.json` file to `manifest.json`.
2. Open `about:debugging`.
3. Click **This Firefox**.
4. Click **Load Temporary Add-on...**.
5. Select the `manifest.json` file.

## Building

To create zip files for Chrome and Firefox:

1. Run the `build.sh` script (requires a bash environment like Git Bash or WSL on Windows):
   ```bash
   chmod +x build.sh
   ./build.sh
   ```
2. This will create a `dist` directory containing:
   - `extension-chrome.zip`
   - `extension-firefox.zip`

## Permissions

This extension requires the following permissions:
- `contextMenus`: To add items to the right-click menu.
- `tabs`: To access the current tab's URL.

## Usage

### Toolbar Icon
Click the extension icon in the toolbar to open the current page in an incognito window.

### Context Menu
Right-click on a **page** to open it in incognito.
Right-click on a **link** to open it in incognito.
Right-click on **selected text**:
    - If it's a URL, it opens in incognito.
    - If it's not a URL, it performs a Google search for the text in incognito.

### Keyboard Shortcut
Press `Ctrl+Shift+I` (or `Command+Shift+I` on Mac) to open the current tab in incognito.

## License

[MIT](LICENSE)