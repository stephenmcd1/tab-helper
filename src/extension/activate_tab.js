function activateTab(url) {
    //Look for a tab with this exact URL
    chrome.tabs.query({ url: url },
        function (res) {
            //If one wasn't found, just open it in a new tab
            if (res.length === 0) {
                openNewTab(url);
            } else {
                //Otherwise, just grab the first one (hopefully there aren't multiple matches)
                var tab = res[0];

                //And then activate/focus/highlight the tab/window
                chrome.windows.update(tab.windowId, { focused: true });
                chrome.tabs.update(tab.id, { active: true, highlighted: true });
            }
        });
}