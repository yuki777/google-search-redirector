chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'redirectToJapanese' && sender.tab) {
    const url = new URL(sender.tab.url);
    url.searchParams.set('lr', 'lang_ja');
    chrome.tabs.update(sender.tab.id, { url: url.toString() });
  }
});
