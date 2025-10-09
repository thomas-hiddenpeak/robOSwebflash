# 🔥 RM-01 robOS 固件烧录器

基于 [esptool-js](https://github.com/espressif/esptool-js) 的智能固件烧录工具，专为 RM-01 的 ESP32-S3 设备设计。支持纯网页和跨平台桌面版本，提供极致的用户体验。

## ✨ 核心特性

### 🚀 智能连接
- **🔍 自动检测** - 智能扫描并识别 RM-01 设备，5秒内自动连接
- **🎯 设备验证** - 确保连接的是真正的 ESP32 芯片，避免误连
- **📱 优先级识别** - 自动优先选择 ESP32 相关设备（Silicon Labs CP210x 等）
- **🔄 备选方案** - 自动连接失败时智能显示手动选择界面

### 🎨 现代界面
- **📱 自适应按钮** - 根据连接状态智能显示/隐藏按钮，界面简洁
- **📊 实时反馈** - 详细的连接过程日志和设备信息显示
- **🌈 渐变设计** - 现代化的视觉体验，直观的状态指示
- **📋 透明化操作** - 完整显示检测过程，用户清楚知道系统在做什么

### 🛠️ 专业功能
- **💾 自动固件加载** - 从 `fw/` 文件夹智能加载所有固件文件
- **⚙️ 优化参数** - 预配置最佳烧录参数（16MB Flash, DIO模式, 80MHz）
- **📈 实时进度** - 精确的烧录进度条和详细操作日志
- **🔄 自动重启** - 烧录完成后自动重启设备并运行新固件

### 🌐 跨平台支持
- **💻 桌面应用** - Windows、macOS、Linux 完整支持
- **🌍 Web 版本** - 无需安装，浏览器直接运行
- **📦 多格式发布** - 安装包、便携版、AppImage 等多种格式

## 🌍 浏览器兼容性

Web 版本基于 Web Serial API，支持以下浏览器：

- **Chrome 89+** ✅ (推荐)
- **Edge 89+** ✅ 
- **Opera 76+** ✅
- **Chrome for Android 61+** ✅

> 💡 **提示**: 如果遇到浏览器兼容性问题，建议使用桌面版本以获得最佳体验。

## 📥 获取烧录器

### 🥇 桌面版本（推荐）
全功能跨平台桌面应用，完美支持 Web Serial API：

#### Windows
- 📦 `RM-01.robOS.Flasher.Setup.exe` - 一键安装版
- 🎒 `RM-01.robOS.Flasher.exe` - 免安装便携版

#### macOS  
- 🍎 `RM-01.robOS.Flasher-arm64.dmg` - Apple Silicon (M1/M2)
- 💻 `RM-01.robOS.Flasher.dmg` - Intel 处理器

#### Linux
- 📱 `RM-01.robOS.Flasher.AppImage` - 通用 AppImage 格式
- 📦 `rm01-robos-flasher_amd64.deb` - Debian/Ubuntu 包

**📥 [下载最新版本 (v1.1.2)](https://github.com/thomas-hiddenpeak/robOSwebflash/releases/latest)**

### 🌐 网页版本
无需安装，浏览器直接使用：
- **在线版本**: [访问 Web 烧录器](https://thomas-hiddenpeak.github.io/robOSwebflash/robflash.htm)
- **本地版本**: 下载源码后打开 `robflash.htm`

### 🔐 安全提示
- **macOS 用户**: 首次运行可能提示"应用已损坏"，请参考 [macOS 安装指南](MACOS_INSTALL.md)
- **Windows 用户**: SmartScreen 可能提示未知发布者，这是正常现象
- **所有版本**: 均为开源项目，可在 GitHub 查看完整源码

## 🚀 快速开始

### 第一步：准备固件文件 📁
确保 `fw/build/` 文件夹包含 RM-01 固件文件：
```
fw/
└── build/
    ├── bootloader/
    │   └── bootloader.bin        # ESP32-S3 引导程序 (0x0000)
    ├── partition_table/
    │   └── partition-table.bin   # 分区表配置 (0x8000)
    └── robOS.bin                # RM-01 主程序 (0x10000)
```

### 第二步：启动烧录器 ⚡

#### 🥇 桌面版（推荐）
1. 下载并安装桌面版本
2. 双击启动，自动打开烧录界面
3. 享受完美的 Web Serial API 支持

#### 🌐 网页版
```bash
# 方法一：本地服务器（推荐）
python3 -m http.server 8080
# 访问 http://localhost:8080/robflash.htm

# 方法二：直接打开（可能有限制）
# 用 Chrome/Edge 浏览器打开 robflash.htm
```

### 第三步：连接设备 🔌

#### 🎯 智能自动连接（推荐）
1. **连接硬件**: USB 连接 RM-01 到电脑
2. **一键连接**: 点击 `🔌 自动连接` 按钮
3. **智能检测**: 系统自动扫描所有串口，优先选择 ESP32 设备
4. **连接确认**: 看到设备信息显示即连接成功

#### 🔍 手动选择连接
- 如果自动连接失败，会显示 `🔍 手动选择` 按钮
- 点击后显示所有可用串口，手动选择正确设备
- 支持设备名称识别，方便选择

### 第四步：烧录固件 🔥
1. **自动加载**: 连接成功后固件文件自动加载
2. **开始烧录**: 点击 `🔥 烧录固件` 按钮
3. **实时监控**: 观察进度条和详细日志
4. **自动完成**: 烧录完成后设备自动重启运行新固件

### 高级操作 🛠️
- **🗑️ 擦除 Flash**: 完全清空设备存储（慎用）
- **🔌 断开连接**: 手动断开设备连接
- **🔄 重新连接**: 断开后重新检测设备

## 🎯 界面预览

### 智能连接过程
```
🚀 开始自动检测 RM-01 设备...
🔌 发现 3 个串口设备，开始逐一检测...
🔍 检测端口 1/3: Silicon Labs CP210x USB to UART Bridge (ESP32设备)
✅ 成功连接到 RM-01 设备！使用端口: Silicon Labs CP210x USB to UART Bridge

🎯 设备已连接
芯片类型: ESP32-S3
MAC地址: 48:27:E2:E6:9C:A4
串口设备: Silicon Labs CP210x USB to UART Bridge
```

### 按钮状态变化
- **初始状态**: `[🔌 自动连接] [🔍 手动选择]`
- **连接成功**: `[🔌 断开连接]` （手动选择按钮自动隐藏）
- **连接失败**: `[🔌 自动连接] [🔍 手动选择]` （手动按钮显示）

## 📁 项目结构

```
webflash/
├── robflash.htm                # 🌟 RM-01 固件烧录器主程序
├── esptool-complete.js         # 📚 esptool-js 库文件 (v0.4.5)
├── fw/                         # 📦 固件文件夹
│   └── build/                  #     编译输出目录
│       ├── bootloader/         #     引导程序目录
│       │   └── bootloader.bin  #         ESP32-S3 引导程序
│       ├── partition_table/    #     分区表目录
│       │   └── partition-table.bin #     分区表配置
│       └── robOS.bin          #     RM-01 主应用程序
├── src/                        # 🖥️ 桌面版源码
│   ├── main.js                 #     Electron 主进程
│   └── preload.js             #     预加载脚本
├── README.md                   # 📖 项目说明文档
├── MACOS_INSTALL.md           # 🍎 macOS 安装指南
└── package.json               # 📦 项目配置文件
```

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (ES6+ Modules)
- **串口通信**: Web Serial API
- **烧录核心**: esptool-js 0.4.5 (Espressif 官方)
- **桌面版**: Electron 26.0.0
- **构建系统**: GitHub Actions (跨平台自动构建)
- **目标硬件**: ESP32-S3 (16MB Flash, DIO模式, 80MHz)

## ❓ 常见问题

### Q: 为什么推荐使用桌面版？
**A:** 桌面版具有以下优势：
- ✅ 完美支持 Web Serial API，无浏览器兼容性问题
- ✅ 内置 HTTP 服务器，避免本地文件访问限制
- ✅ 自动端口检测和权限处理
- ✅ 更稳定的连接体验

### Q: 浏览器提示不支持 Web Serial API
**A:** 解决方案：
1. 使用 Chrome 89+ 或 Edge 89+ 浏览器
2. 确保使用 HTTPS 或 localhost 访问
3. 启用实验性 Web 平台功能：`chrome://flags/#enable-experimental-web-platform-features`
4. **推荐**: 直接使用桌面版避免此问题

### Q: 自动连接找不到设备
**A:** 请检查：
- ✅ RM-01 设备通过 USB 正确连接
- ✅ 设备驱动已安装（通常会自动安装）
- ✅ 设备未被其他程序占用（Arduino IDE、串口监视器等）
- ✅ 尝试点击"🔍 手动选择"查看所有可用端口
- ✅ 检查 USB 线缆是否支持数据传输

### Q: 手动选择显示多个设备，如何选择？
**A:** 选择技巧：
- 🎯 优先选择标有 "ESP32" 标识的设备
- 🔍 查找 "Silicon Labs CP210x" 或 "CH340" 等常见 ESP32 驱动
- 📱 避免选择蓝牙、音频等明显非串口的设备
- 🔄 如果不确定，可以逐个尝试（系统会自动验证）

### Q: 烧录过程中断失败
**A:** 故障排除：
1. 🔄 重新连接设备
2. 🗑️ 先点击"擦除Flash"清空现有固件
3. 🔌 检查 USB 连接稳定性
4. 📱 确保设备保持连接状态
5. 🔋 检查设备电源供应

### Q: ESP32-S3 无法进入下载模式
**A:** ESP32-S3 通常会自动进入下载模式，如果失败：
- 🔘 按住设备上的 **BOOT** 按钮
- ⚡ 短按 **RST**（复位）按钮
- 🔓 释放 **BOOT** 按钮
- 🔄 重新点击连接

### Q: 烧录完成后设备无响应
**A:** 重启设备：
- ⚡ 手动按下设备的 **RST** 按钮
- 🔋 重新插拔 USB 电源
- 📋 检查固件文件是否正确完整
- 🔍 查看烧录日志是否有错误信息

### Q: macOS 提示"应用已损坏"
**A:** 这是正常现象，解决方法：
```bash
# 方法一：移除隔离属性
sudo xattr -rd com.apple.quarantine /Applications/RM-01\ robOS\ Flasher.app

# 方法二：允许任何来源
sudo spctl --master-disable
```
详见：[macOS 安装指南](MACOS_INSTALL.md)

## 🔧 技术参数

| 参数 | 值 |
|------|-----|
| **目标芯片** | ESP32-S3 |
| **Flash 大小** | 16MB |
| **Flash 模式** | DIO |
| **Flash 频率** | 80MHz |
| **通信波特率** | 115200 |
| **连接超时** | 5秒 |
| **烧录地址** | Bootloader: 0x0000<br>Partition: 0x8000<br>Application: 0x10000 |

## 🛠️ 开发说明

### 本地开发
```bash
# 克隆项目
git clone https://github.com/thomas-hiddenpeak/robOSwebflash.git
cd robOSwebflash

# 启动本地服务器测试 Web 版
python3 -m http.server 8080

# 运行桌面版开发环境
npm install
npm start
```

### 核心类结构
- **`RM01Flasher`**: 主烧录类，包含所有连接、检测和烧录逻辑
- **自动检测**: `autoDetectAndConnect()` - 智能端口扫描
- **设备验证**: `tryConnectToPort()` - ESP32 芯片验证
- **UI 管理**: `updateUIConnected()` - 智能按钮状态管理

### 构建系统
- 使用 GitHub Actions 实现跨平台自动构建
- 支持 Windows、macOS、Linux 三大平台
- 自动生成多种安装包格式

## 📈 版本历史

### v1.1.2 (最新)
- ✨ 实现智能按钮显示逻辑
- 🎨 连接成功后自动隐藏手动连接按钮
- 🔧 优化用户界面体验

### v1.1.1
- 🐛 修复手动连接时的 `macAddr.map` 错误
- 🎨 调整按钮尺寸，界面更紧凑
- 🔧 增强 MAC 地址格式化的健壮性

### v1.1.0
- 🚀 实现智能自动连接功能
- 🔍 依次检测所有串口，5秒超时机制
- 🎯 ESP32 设备优先级识别
- 📱 双重连接选项（自动+手动）

### v1.0.9
- 🔧 修复 Electron Web Serial API 支持
- 📊 添加关键的 select-serial-port 事件处理
- 🛠️ 完善权限处理和调试信息

查看完整更新日志：[GitHub Releases](https://github.com/thomas-hiddenpeak/robOSwebflash/releases)

## 📄 许可证

MIT License

## 🙏 致谢

- [esptool-js](https://github.com/espressif/esptool-js) - Espressif 官方 JavaScript 烧录工具库
- [Web Serial API](https://wicg.github.io/serial/) - W3C 串口通信标准
- [Electron](https://www.electronjs.org/) - 跨平台桌面应用框架
- ESP32-S3 技术文档和开源社区支持
- 所有测试和反馈的用户们

## 🌟 贡献指南

欢迎提交 Issue 和 Pull Request！

1. **🐛 Bug 报告**: 请提供详细的复现步骤和环境信息
2. **💡 功能建议**: 描述期望的功能和使用场景
3. **🔧 代码贡献**: Fork 项目后提交 PR，遵循现有代码风格
4. **📖 文档改进**: 帮助完善文档和使用指南

---

<div align="center">

**🔥 专为 RM-01 设备设计，让固件烧录变得简单快捷！**

[![GitHub release](https://img.shields.io/github/release/thomas-hiddenpeak/robOSwebflash.svg)](https://github.com/thomas-hiddenpeak/robOSwebflash/releases/latest)
[![GitHub downloads](https://img.shields.io/github/downloads/thomas-hiddenpeak/robOSwebflash/total.svg)](https://github.com/thomas-hiddenpeak/robOSwebflash/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/thomas-hiddenpeak/robOSwebflash.svg)](https://github.com/thomas-hiddenpeak/robOSwebflash/stargazers)

</div>