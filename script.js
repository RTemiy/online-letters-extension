document.querySelector('#save-button').onclick = function () {
  chrome.tabs.query({active: true}, (tabs) => {
    chrome.scripting.executeScript(
      {
        target:{tabId: tabs[0].id, allFrames: true},
        func:savePosition
      },
      onResult
    )
  })
};

const loadButton = document.querySelector('#load-button')

loadButton.onclick = function () {
  chrome.tabs.query({active: true}, (tabs) => {
    chrome.scripting.executeScript(
      {
        target:{tabId: tabs[0].id, allFrames: true},
        func:loadPosition
      }
    )
  })
};

const locationInfo = document.querySelector('#saved-location')

localStorage.getItem('scrollTop') !== null && activateSaved(localStorage.getItem('url'))

function savePosition() {
  const fromTop = document.querySelector('html').scrollTop
  localStorage.setItem('scrollTop', fromTop.toString())
  return {scrollTop: fromTop, url: location.href};
}

function activateSaved(categoryText) {
  loadButton.style.display = 'block';
  let resultText;
  const preText = 'Сохраненная категория: '
  switch (categoryText){
    default:
      resultText = 'Произошла ошибка'
      break;

    case 'script':
      resultText = preText + 'Плавный каллиграфический';
      break;

    case 'dreamy':
      resultText = preText + 'Сказочный';
      break;

    case 'fancy':
      resultText = preText + 'Декоративный';
      break;

    case 'outline':
      resultText = preText + 'Контурный';
      break;

    case 'techno':
      resultText = preText + 'Техно';
      break;

    case 'gothic':
      resultText = preText + 'Готический';
      break;

    case 'other':
      resultText = preText + 'Остальные';
      break;

  }

  locationInfo.innerText = resultText

}

function onResult (res) {
  const categoryText = res[0].result.url.split('/')[5];
  activateSaved(categoryText)
  localStorage.setItem('scrollTop', res[0].result.scrollTop)
  localStorage.setItem('url', categoryText)

}

function loadPosition() {
  document.querySelector('html').scrollTo(0, parseInt(localStorage.getItem('scrollTop')));
}