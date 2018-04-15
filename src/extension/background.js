//Connect to our native host helper application.  It will let us know when we need to do something
var hostName = "com.stephentmcdaniel.tabhelperhost";
var port = chrome.runtime.connectNative(hostName);

//Watch for messages and errors
port.onMessage.addListener(onNativeMessage);
port.onDisconnect.addListener(onDisconnected);

//When we get a message, see what it is a dispatch to the appropriate function
function onNativeMessage(message) {
    if (message.op === 'activate-tab') {
        activateTab(message.data);
    }
}

function activateTab(url) {
    //Look for a tab with this exact URL
    chrome.tabs.query({ url: url },
        function (res) {
            //If one wasn't found, just open it in a new tab
            if (res.length === 0) {
                chrome.tabs.create({ url: url });
            } else {
                //Otherwise, just grab the first one (hopefully there aren't multiple matches)
                var tab = res[0];

                //And then activate/focus/highlight the tab/window
                chrome.windows.update(tab.windowId, { focused: true });
                chrome.tabs.update(tab.id, { active: true, highlighted: true });
            }
        });
}

//Just log errors.  In the future, we could try to reconnect in case this is a transient error but that seems unlikely
function onDisconnected() {
    console.log("Failed to connect: " + chrome.runtime.lastError.message);
}