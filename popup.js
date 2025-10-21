const slider = document.getElementById('slider');
const percentLabel = document.getElementById('percent');
const pauseBtn = document.getElementById('pauseBtn');
const languageSelect = document.getElementById('languageSelect');

// Load saved settings
chrome.storage.local.get(['percent', 'paused', 'targetLanguage'], function(result) {
  slider.value = result.percent || 0.2;
  percentLabel.textContent = Math.round((slider.value || 0.2) * 100) + "%";
  
  const isPaused = result.paused || false;
  pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  if (isPaused) {
    pauseBtn.classList.add('paused');
  }
  
  languageSelect.value = result.targetLanguage || 'es';
});

// Handle immersion level slider
slider.oninput = function() {
  let val = parseFloat(this.value);
  percentLabel.textContent = Math.round(val * 100) + "%";
  chrome.storage.local.set({percent: val});
  
  // Send update to active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "updatePercent", value: val}).catch(() => {
        // Tab might not have content script loaded yet, silently fail
      });
    }
  });
};

// Handle language selection
languageSelect.onchange = function() {
  const targetLang = this.value;
  chrome.storage.local.set({targetLanguage: targetLang});
  
  // Send update to active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      chrome.tabs.sendMessage(tabs[0].id, {type: "updateLanguage", value: targetLang}).catch(() => {
        // Tab might not have content script loaded yet, silently fail
      });
    }
  });
};

// Handle pause/resume button
pauseBtn.onclick = function() {
  chrome.storage.local.get(['paused'], function(result) {
    const paused = !result.paused;
    chrome.storage.local.set({paused});
    pauseBtn.textContent = paused ? "Resume" : "Pause";
    
    if (paused) {
      pauseBtn.classList.add('paused');
    } else {
      pauseBtn.classList.remove('paused');
    }
    
    // Send update to active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "updatePaused", value: paused}).catch(() => {
          // Tab might not have content script loaded yet, silently fail
        });
      }
    });
  });
};
