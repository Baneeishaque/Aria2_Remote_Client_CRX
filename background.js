//TODO : Protocol Inclusion

// Set up the download trigger
chrome.downloads.onDeterminingFilename.addListener(function (downloadItem) {

    console.log("Download State : " + downloadItem.state);

    //TODO : Fix Download must be in progress error
    if (downloadItem.state === "in_progress") {
        console.log("Download URL : " + downloadItem.url + " & Final Download URL : " + downloadItem.finalUrl);
        add_aria2_remote_task(downloadItem.finalUrl);
        chrome.downloads.cancel(downloadItem.id, download_cancel_callback);
    } else {
        // Not in progress
        console.log("Error : Download URL : " + downloadItem.url + " & Final Download URL : " + downloadItem.finalUrl + " not in progress");
    }

});

// Set up the context menus
chrome.contextMenus.create({
    "title": "Add to Downloads",
    "contexts": ["selection", "image", "link"],
    "onclick": generate_url_and_add_aria2_remote_task
});

function download_cancel_callback() {
    if (chrome.runtime.lastError) {
        console.log("Download Cancel Error : " + chrome.runtime.lastError.message);
    } else {
        // Download cancel success
        console.log("Download Cancel Success...");
    }
}

function generate_url_and_add_aria2_remote_task(e) {

    var url = e.pageUrl;

    if (e.selectionText) {
        // The user selected some text.
        url = e.selectionText;
    }

    if (e.mediaType === "image") {
        url = e.srcUrl;
    }

    if (e.linkUrl) {
        // The user wants to buzz a link.
        url = e.linkUrl;
    }

    add_aria2_remote_task(url);
}

function add_aria2_remote_task(url)
{
    var PostUrl = "http://vfmob.com.md-in-64.webhostbox.net/wp-production/aria2_remote_server/http_API/insert_Task.php?url=";

    //TODO : Encript URL instead of replace
//    url = url.replace("https://", "");
//    url = url.replace("http://", "");
//    url = url.replace("ftps://", "");
//    url = url.replace("ftp://", "");

    console.log("Download URL : " + url);

//    PostUrl += encodeURIComponent(url);
    PostUrl += url;

    console.log("Post URL : " + PostUrl);

    // Encrypt
//    var ciphertext = CryptoJS.DES.encrypt('Test', 'Key');
//    console.log("Cipher of \"Test \" Using \"Key\" : " + ciphertext.toString());
//
//    // Decrypt
//    var bytes = CryptoJS.DES.decrypt(ciphertext.toString(), 'Key');
//    console.log("Decode of " + ciphertext.toString() + " Using \"Key\" : " + bytes.toString(CryptoJS.enc.Utf8));
    
    // Encrypt
    var ciphertext = CryptoJS.DES.encrypt(PostUrl, 'Key');
    console.log("Cipher of "+PostUrl+" Using \"Key\" : " + ciphertext.toString());

    // Decrypt
    var bytes = CryptoJS.DES.decrypt(ciphertext.toString(), 'Key');
    console.log("Decode of " + ciphertext.toString() + " Using \"Key\" : " + bytes.toString(CryptoJS.enc.Utf8));

    //TODO : Post in background
    // Open the page up.
//    chrome.tabs.create(
//            {"url": PostUrl});
}