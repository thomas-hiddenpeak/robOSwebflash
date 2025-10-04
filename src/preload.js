const { contextBridge } = require('electron');

// 在渲染进程中暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 这里可以添加需要的 Node.js API，但目前我们主要依赖 Web Serial API
  isElectron: true,
  platform: process.platform
});

// 确保 Web Serial API 在 Electron 中可用
window.addEventListener('DOMContentLoaded', () => {
  console.log('Electron环境检测:');
  console.log('- 用户代理:', navigator.userAgent);
  console.log('- 是否安全上下文:', window.isSecureContext);
  console.log('- 协议:', window.location.protocol);
  console.log('- 主机:', window.location.hostname);
  
  // 检查 Web Serial API 是否可用
  if (!navigator.serial) {
    console.error('Web Serial API 不可用！');
    console.log('可能的原因:');
    console.log('1. Electron版本不支持');
    console.log('2. 命令行参数未正确设置');
    console.log('3. 权限未正确配置');
  } else {
    console.log('✅ Web Serial API 已可用');
    
    // 测试权限
    navigator.permissions.query({name: 'serial'}).then(result => {
      console.log('串口权限状态:', result.state);
    }).catch(err => {
      console.log('权限查询不支持:', err.message);
    });
  }
});