chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'redirectToJapanese') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      const url = new URL(currentTab.url);
      url.searchParams.set('lr', 'lang_ja');
      chrome.tabs.update(currentTab.id, { url: url.toString() });
    });
  }
});
