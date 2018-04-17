//Connect to our native host helper application.  It will let us know when we need to do something
function connectNativeHost(){
    var hostName = "com.stephentmcdaniel.tabhelperhost";
    var port = chrome.runtime.connectNative(hostName);

    //Watch for messages and errors
    port.onMessage.addListener(onNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
}


//When we get a message, see what it is a dispatch to the appropriate function
function onNativeMessage(message) {
    if (message.op === 'activate-tab') {
        activateTab(message.data);
    } else if (message.op === 'new-tab'){
        openNewTab(message.data);
    }
}

//Just log errors.  In the future, we could try to reconnect in case this is a transient error but that seems unlikely
function onDisconnected() {
    console.log("Failed to connect: " + chrome.runtime.lastError.message);
}

