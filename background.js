//TODO : Protocol Inclusion

// Set up the download trigger
chrome.downloads.onDeterminingFilename.addListener(function (downloadItem) {
    console.log("Download URL : "+downloadItem.url);
//    alert(downloadItem.url);
    add_aria2_remote_task(downloadItem.url);
    chrome.downloads.cancel(downloadItem.id, function () {});
});

// Set up the context menus
chrome.contextMenus.create({
    "title": "Add to Downloads",
    "contexts": ["selection", "image", "link"],
    "onclick": generate_url_and_add_aria2_remote_task
});

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

    console.log("Post URL : "+PostUrl);
    // alert(PostUrl);

    //TODO : Post in background
    // Open the page up.
    chrome.tabs.create(
            {"url": PostUrl});
}