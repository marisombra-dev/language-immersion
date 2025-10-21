chrome.runtime.onInstalled.addListener(() => {
  // Initialize default settings
  chrome.storage.local.set({
    percent: 0.2,
    paused: false,
    targetLanguage: 'es'
  });
});
