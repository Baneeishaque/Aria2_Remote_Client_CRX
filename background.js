 // Set up the context menus
      chrome.contextMenus.create({
        "title": "Add to Downloads",
        "contexts": ["selection", "image", "link"],
        "onclick" : function(e) {
          var url = e.pageUrl;
          var PostUrl = "http://vfmob.com.md-in-64.webhostbox.net/wp-production/aria2_remote_server/http_API/insert_Task.php?url=";
          
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
          
          url=url.replace("https://","");
          url=url.replace("http://","");
          url=url.replace("ftps://","");
          url=url.replace("ftp://","");
          
          PostUrl += encodeURIComponent(url);
          
          // alert(PostUrl);
          
          // Open the page up.
           chrome.tabs.create(
              {"url" : PostUrl });
        }
      });