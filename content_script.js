// 検索結果の本文だけを対象にする（ナビゲーションやフッターなどGoogleのUI文言を含めない）
function getSearchResultsText() {
  const container = document.querySelector('#search') || document.querySelector('#rso');
  return container ? container.textContent : '';
}

// 漢字に対するかなの割合で判定する
// 日本語の文章はかなを多く含むが、中国語はほぼ漢字のみになる
function detectLanguage(text) {
  const kanaCount = (text.match(/[぀-ゟ゠-ヿ]/g) || []).length;
  const kanjiCount = (text.match(/[一-鿿]/g) || []).length;

  if (kanjiCount < 20) {
    return null;
  }

  if (kanaCount / (kanaCount + kanjiCount) < 0.1) {
    return 'zh';
  }

  return null;
}

function analyzeSearchResults() {
  return detectLanguage(getSearchResultsText());
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
