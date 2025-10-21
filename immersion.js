let percent = 0.2;
let paused = false;
let targetLanguage = 'es'; // Default to Spanish
const cache = {}; // To avoid redundant translations

function getTextNodes(node) {
  let textNodes = [];
  if (node.nodeType === Node.TEXT_NODE) {
    textNodes.push(node);
  } else if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT','STYLE','NOSCRIPT','IFRAME','CANVAS'].includes(node.tagName)) {
    for (let child of node.childNodes) {
      textNodes = textNodes.concat(getTextNodes(child));
    }
  }
  return textNodes;
}

// Asynchronously translate a word with Google Translate API
async function translateWord(word, targetLang) {
  const cacheKey = `${word}_${targetLang}`;
  if (cache[cacheKey]) return cache[cacheKey];
  
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(word)}`;
    const response = await fetch(url);
    const data = await response.json();
    let translation = data[0][0][0];
    
    // If translation is the same as original, return original
    if (translation.toLowerCase() === word.toLowerCase()) return word;
    
    cache[cacheKey] = translation;
    return translation;
  } catch (err) {
    console.error('Translation error:', err);
    return word;
  }
}

async function immersionTextAsync(text) {
  const words = text.split(/\b/);
  let promises = words.map(async (w, i) => {
    // Only translate words that are purely alphabetic and meet the random threshold
    if (/^[a-zA-Z]+$/.test(w) && Math.random() < percent) {
      return await translateWord(w, targetLanguage);
    }
    return w;
  });
  let translated = await Promise.all(promises);
  return translated.join('');
}

async function immersionPageAsync() {
  if (paused) return;
  
  const nodes = getTextNodes(document.body);
  for (let node of nodes) {
    if (node.parentNode && node.nodeValue.trim().length > 1) {
      let newText = await immersionTextAsync(node.nodeValue);
      node.nodeValue = newText;
    }
  }
}

// Initialize settings from storage
chrome.storage.local.get(['percent', 'paused', 'targetLanguage'], function(result) {
  if (typeof result.percent === "number") percent = result.percent;
  paused = !!result.paused;
  targetLanguage = result.targetLanguage || 'es';
  
  // Run immersion on page load
  immersionPageAsync();
});

// Listen for updates from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "updatePercent") {
    percent = msg.value;
    immersionPageAsync();
  }
  if (msg.type === "updatePaused") {
    paused = msg.value;
    if (!paused) {
      immersionPageAsync();
    }
  }
  if (msg.type === "updateLanguage") {
    targetLanguage = msg.value;
    // Clear cache when language changes to force retranslation
    Object.keys(cache).forEach(key => {
      if (key.includes('_')) {
        delete cache[key];
      }
    });
    immersionPageAsync();
  }
});

// Optional: Watch for dynamic content changes (like infinite scroll)
const observer = new MutationObserver((mutations) => {
  if (!paused) {
    // Debounce the immersion to avoid too frequent translations
    clearTimeout(observer.timer);
    observer.timer = setTimeout(() => {
      immersionPageAsync();
    }, 1000);
  }
});

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true
});
