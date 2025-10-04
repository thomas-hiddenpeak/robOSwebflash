const { contextBridge } = require('electron');

// 在渲染进程中暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 这里可以添加需要的 Node.js API，但目前我们主要依赖 Web Serial API
  isElectron: true,
  platform: process.platform
});

// 确保 Web Serial API 在 Electron 中可用
window.addEventListener('DOMContentLoaded', () => {
  // 检查 Web Serial API 是否可用
  if (!navigator.serial) {
    console.warn('Web Serial API 不可用，可能需要启用实验性功能');
  } else {
    console.log('Web Serial API 已可用');
  }
});