# 🚀 GitHub Actions 自动构建指南

## 📦 **自动构建流程**

当你推送版本标签到GitHub时，会自动触发构建流程：

### 1. **创建发布版本**
```bash
# 在本地项目中
git add .
git commit -m "准备发布 v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

### 2. **自动构建**
GitHub Actions 会自动：
- 在 **Windows**, **macOS**, **Linux** 三个平台同时构建
- 生成以下安装包：
  - **Windows**: `.exe` 安装程序 + 便携版
  - **macOS**: `.dmg` 磁盘镜像 (支持Intel和Apple Silicon)
  - **Linux**: `.AppImage` + `.deb` 包

### 3. **自动发布**
构建完成后自动发布到 GitHub Releases，用户可以直接下载。

## 🎯 **支持的平台和格式**

### Windows
- `RM-01-robOS-Flasher-Setup-1.0.0.exe` - 安装程序
- `RM-01-robOS-Flasher-1.0.0.exe` - 便携版

### macOS  
- `RM-01-robOS-Flasher-1.0.0.dmg` - 通用版本
- `RM-01-robOS-Flasher-1.0.0-arm64.dmg` - Apple Silicon
- `RM-01-robOS-Flasher-1.0.0-x64.dmg` - Intel Mac

### Linux
- `RM-01-robOS-Flasher-1.0.0.AppImage` - 通用AppImage
- `rm01-robos-flasher_1.0.0_amd64.deb` - Debian/Ubuntu包

## 🔧 **手动触发构建**

如果需要手动触发构建（不创建正式发布）：

1. 进入 GitHub 仓库页面
2. 点击 "Actions" 标签  
3. 选择 "Build and Release Electron App"
4. 点击 "Run workflow" 按钮

## 📋 **项目结构**

```
webflash/
├── .github/
│   └── workflows/
│       └── build.yml          # GitHub Actions 工作流
├── src/
│   └── main.js               # Electron 主进程
├── robflash.htm              # Web 界面
├── esptool-complete.js       # 库文件
├── fw/                       # 固件文件夹
├── package.json              # 项目配置
└── README.md                 # 说明文档
```

## ⚡ **优势**

- **零配置** - 推送标签即可自动构建发布
- **多平台** - 一次配置，三平台同时构建  
- **免费** - GitHub 提供的免费服务
- **专业** - 自动版本管理和发布记录
- **用户友好** - 用户直接下载安装包即可使用

## 🏷️ **版本管理**

使用语义化版本：
- `v1.0.0` - 主版本
- `v1.1.0` - 功能更新  
- `v1.0.1` - 错误修复

每次推送新标签都会触发新的构建和发布。