import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on() {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off() {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send() {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke() {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  // You can expose other APTs you need here.
  // ...
})
