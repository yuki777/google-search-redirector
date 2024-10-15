function getSearchResultLinks() {
  const linkElements = document.querySelectorAll('a');
  return Array.from(linkElements);
}

function detectLanguage(text) {
  const hiragana = /[\u3040-\u309F]/;
  const katakana = /[\u30A0-\u30FF]/;
  const kanji = /[\u4E00-\u9FFF]/;
  const hasHiragana = hiragana.test(text);
  const hasKatakana = katakana.test(text);
  const hasKanji = kanji.test(text);

  if (hasKanji && !hasHiragana && !hasKatakana) {
    return 'zh';
  }

  return null;
}

function analyzeSearchResults() {
  const linkElements = getSearchResultLinks();
  const linkTexts = linkElements
    .map(el => el.textContent.trim())
    .filter(text => text.length > 0);
  const combinedText = linkTexts.join(' ');
  return detectLanguage(combinedText);
}

function main() {
  if (!window.location.search.includes('lr=lang_ja')) {
    const detectedLanguage = analyzeSearchResults();
    if (detectedLanguage === 'zh') {
      chrome.runtime.sendMessage({ action: 'redirectToJapanese' });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
