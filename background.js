//TODO : Protocol Inclusion

// Set up the download trigger
chrome.downloads.onDeterminingFilename.addListener(function (downloadItem) {

    if (chrome.runtime.lastError) {
        console.log("Last Error : " + chrome.runtime.lastError.message);
    } else {
        // No Last Error
        console.log("Download URL : " + downloadItem.url);
        add_aria2_remote_task(downloadItem.url);
        chrome.downloads.cancel(downloadItem.id, download_cancel_callback);
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

    //TODO : Encode URL instead of replace
    url = url.replace("https://", "");
    url = url.replace("http://", "");
    url = url.replace("ftps://", "");
    url = url.replace("ftp://", "");

    PostUrl += encodeURIComponent(url);

    console.log("Post URL : " + PostUrl);

    //TODO : Post in background
    // Open the page up.
    chrome.tabs.create(
            {"url": PostUrl});
}