const isElectron = require('is-electron');

window.ipcRenderer = require('electron').ipcRenderer
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
  if (isElectron()) {
    const ipcRenderer = window.ipcRenderer
    ipcRenderer.on('message', (event, data) => {
      console.log('message', data.msg)
    })
  }
})