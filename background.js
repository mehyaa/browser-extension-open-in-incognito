/**
 * Open in Incognito - Background Script
 */

// Create context menu items on installation
// Create context menu items on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "open-link-incognito",
        title: chrome.i18n.getMessage("contextLink"),
        contexts: ["link"]
    });

    chrome.contextMenus.create({
        id: "open-selection-incognito",
        title: chrome.i18n.getMessage("contextSelection"),
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "open-page-incognito",
        title: chrome.i18n.getMessage("contextPage"),
        contexts: ["page"]
    });
});

/**
 * Helper to open a URL in an incognito window
 * @param {string} url
 */
function openInIncognito(url) {
    if (!url) return;

    // Create new incognito window with the URL
    chrome.windows.create({
        url: url,
        incognito: true,
        focused: true
    });
}

/**
 * Helper to check if text is a valid URL
 * Simple check: starts with http:// or https:// or looks like domain.com
 * @param {string} text
 * @returns {boolean}
 */
function isUrl(text) {
    try {
        const url = new URL(text);

        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        // If new URL() fails, check for simple domain pattern (e.g. google.com)
        // This is a basic check, can be improved.
        return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(text);
    }
}

/**
 * Handle context menu clicks
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "open-link-incognito") {
        openInIncognito(info.linkUrl);
    } else if (info.menuItemId === "open-selection-incognito") {
        const selection = info.selectionText.trim();

        if (isUrl(selection)) {
            let url = selection;

            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            openInIncognito(url);
        } else {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selection)}`;

            openInIncognito(searchUrl);
        }
    } else if (info.menuItemId === "open-page-incognito") {
        openInIncognito(info.pageUrl);
    }
});

/**
 * Handle toolbar icon click
 */
chrome.action.onClicked.addListener((tab) => {
    if (tab?.url) {
        openInIncognito(tab.url);
    }
});

/**
 * Handle keyboard shortcuts
 */
chrome.commands.onCommand.addListener((command) => {
    if (command === "open_in_incognito") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs.length > 0) {
                openInIncognito(tabs[0].url);
            }
        });
    }
});
