let script = document.createElement('script');
script.src = chrome.extension.getURL('external-script.js');
(document.head || document.documentElement).appendChild(script);

console.log('Pontech extension for Cadastre is now available!');
