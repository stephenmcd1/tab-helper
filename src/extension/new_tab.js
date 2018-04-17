var targetWindowId;

//Configures the Browser Action to make the target window active
function setupBrowserAction() {
    chrome.browserAction.onClicked.addListener(function (tab) {
        //If this new window is already the target, nothing to do
        if (tab.windowId === targetWindowId) {
            return;
        }

        //Otherwise, remember this new target and then update all the tabs
        targetWindowId = tab.windowId;
        resetAllTabs();
    });
}

//Opens the given URL in the target window
function openNewTab(url) {
    chrome.tabs.create({url: url, windowId: targetWindowId});
}

//Sets up the tracking of the target window
function startTrackingTargetWindow() {

    //For now, just grab whatever happens to be the current window and use that as the default target
    //TODO: Try to maintain the target window across launches of Chrome.  This will require a way to uniquely identity windows
    //      because the windowId is not persisted across application launches.
    findCurrentWindow(function () {
        //Once we know initial target window, update all the tabs
        resetAllTabs();
    });

    //If the target window gets closed, look for a new window to become the target
    chrome.windows.onRemoved.addListener(function (w) {
        if (w === targetWindowId) {
            targetWindowId = null;
            findCurrentWindow();
        }
    });

    //When any tab-related action occurs, make sure our Browser Action is in sync
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        checkTargetTab(tab);
    });

    chrome.tabs.onActivated.addListener(function (activeInfo) {
        checkTarget(activeInfo.tabId, activeInfo.windowId);
    });

    chrome.tabs.onDetached.addListener(function (tabId, detachInfo) {
        //If the tab was just removed from a window, it can't possibly be in the target window any longer
        checkTarget(tabId, -9999);
    });

    chrome.tabs.onAttached.addListener(function (tabId, attachInfo) {
        checkTarget(tabId, attachInfo.newWindowId);
    });

    chrome.tabs.onCreated.addListener(checkTargetTab);
}

function findCurrentWindow(cb) {
    chrome.windows.getLastFocused({}, function (win) {
        targetWindowId = win.id;
        if (cb) {
            cb();
        }
    });
}

function resetAllTabs() {
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(function (t) {
            checkTargetTab(t);
        });
    });
}

function checkTargetTab(tab) {
    checkTarget(tab.id, tab.windowId);
}

function checkTarget(tabId, windowId) {
    var isTarget = windowId === targetWindowId;
    var badge = isTarget ? 'Pri' : '';
    var icon = isTarget ? 'browsers-128.png' : 'browsers-gray-128.png';
    var title = isTarget ? 'Tab Controller - Primary Window' : 'Tab Controller - Not Primary Window';
    chrome.browserAction.setBadgeText({text: badge, tabId: tabId});
    chrome.browserAction.setIcon({path: icon, tabId: tabId});
    chrome.browserAction.setTitle({title: title,  tabId: tabId});
}



