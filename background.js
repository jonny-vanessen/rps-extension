chrome.runtime.onInstalled.addListener(() => {
  console.log('PvP Rock Paper Scissors Extension Installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'popup.html' });
});
