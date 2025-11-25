/**
 * Open in Incognito - Background Script
 */

// Create context menu items on installation
browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "open-link-incognito",
        title: browser.i18n.getMessage("contextLink"),
        contexts: ["link"]
    });

    browser.contextMenus.create({
        id: "open-selection-incognito",
        title: browser.i18n.getMessage("contextSelection"),
        contexts: ["selection"]
    });

    browser.contextMenus.create({
        id: "open-page-incognito",
        title: browser.i18n.getMessage("contextPage"),
        contexts: ["page"]
    });
});

/**
 * Handle context menu clicks
 */
browser.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "open-link-incognito") {
        await openInIncognito(info.linkUrl);
    } else if (info.menuItemId === "open-selection-incognito") {
        const selection = info.selectionText.trim();

        if (isUrl(selection)) {
            let url = selection;

            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }

            await openInIncognito(url);
        } else {
            const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(selection)}`;

            await openInIncognito(searchUrl);
        }
    } else if (info.menuItemId === "open-page-incognito") {
        await openInIncognito(info.pageUrl);
    }
});

/**
 * Handle toolbar icon click
 */
browser.action.onClicked.addListener(async (tab) => {
    if (tab?.url) {
        await openInIncognito(tab.url);
    }
});

/**
 * Handle keyboard shortcuts
 */
browser.commands.onCommand.addListener(async (command) => {
    if (command === "open_in_incognito") {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        if (tabs && tabs.length > 0) {
            await openInIncognito(tabs[0].url);
        }
    }
});

/**
 * Helper to open a URL in an incognito window
 * @param {string} url
 */
async function openInIncognito(url) {
    if (!url) return;

    try {
        // Create new incognito window with the URL
        await browser.windows.create({
            url,
            incognito: true,
            focused: true
        });
    } catch (err) {
        if (err.message === "Extension does not have permission for incognito mode") {
            browser.notifications.create("open-in-incognito-permission", {
                type: "basic",
                iconUrl: "icons/icon-128.png",
                title: "Permission Required",
                message: "Please grant 'Run in Private Windows' permission for 'Open in Incognito' extension to open links in incognito mode."
            });
        }
        console.error("Failed to open URL in incognito:", err);
    }
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
    } catch {
        // If new URL() fails, check for simple domain pattern (e.g. google.com)
        // This is a basic check, can be improved.
        return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/.test(text);
    }
}
