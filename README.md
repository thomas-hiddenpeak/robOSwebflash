# 🔥 RM-01 固件烧录器

基于 [esptool-js](https://github.com/espressif/esptool-js) 的纯静态网页应用，专为烧录 RM-01 的 ESP32-S3 固件而设计。

## ✨ 特性

- 🌐 **纯静态网页** - 无需服务器，直接在浏览器中运行
- 🔌 **Web Serial API** - 通过 USB 串口直接连接 ESP32-S3 设备  
- � **自动加载固件** - 固件文件从 `fw/` 文件夹自动加载，无需手动选择
- ⚙️ **优化参数** - 预设最佳烧录参数（16MB Flash, DIO模式, 80MHz）
- 📊 **实时进度** - 显示烧录进度条和详细操作日志
- 🎨 **现代界面** - 渐变设计，直观的按钮状态指示
- 🔄 **智能重启** - 烧录完成后自动重启设备并运行新固件

## 浏览器要求

此应用基于 Web Serial API，需要以下浏览器之一：

- **Chrome 89+** (推荐)
- **Edge 89+**
- **Chrome for Android 61+** (通过 web-serial-polyfill)

## 🚀 使用方法

### 1. 准备固件文件

确保 `fw/` 文件夹中包含以下三个固件文件：
- `bootloader.bin` - 引导程序（地址 0x0000）
- `partition-table.bin` - 分区表（地址 0x8000）  
- `robOS.bin` - 主应用程序（地址 0x10000）

### 2. 启动应用

#### 方法一：直接打开文件
直接用支持的浏览器打开 `robflash.htm` 文件

#### 方法二：本地服务器 (推荐)
```bash
# 使用 Python 启动本地服务器
python3 -m http.server 8080

# 或使用 Node.js
npx http-server

# 然后访问 http://localhost:8080/robflash.htm
```

### 3. 连接设备

1. 将 RM-01 设备通过 USB 连接到电脑
2. 点击 "🔌 连接设备" 按钮（按钮会显示连接中状态）
3. 在弹出的对话框中选择对应的串口设备
4. 等待连接成功，按钮变为 "⚠️ 断开连接"

### 4. 烧录固件

1. 连接成功后，固件文件会自动加载
2. 点击 "🔥 烧录固件" 按钮开始烧录
3. 观察进度条和日志输出
4. 烧录完成后设备会自动重启并运行新固件

### 5. 其他操作

- **🗑️ 擦除Flash**：完全清空设备的Flash存储器（危险操作）
- **断开连接**：手动断开与设备的连接

## 📁 文件结构

```
webflash/
├── robflash.htm            # RM-01 固件烧录器主程序
├── esptool-complete.js     # esptool-js 库文件
├── fw/                     # 固件文件夹
│   ├── bootloader.bin      # ESP32-S3 引导程序
│   ├── partition-table.bin # 分区表
│   └── robOS.bin          # RM-01 主应用程序
├── README.md              # 项目说明文档
└── VERSIONS.md            # 版本历史记录
```

## 🛠️ 技术栈

- **HTML5** - 页面结构和语义化标记
- **CSS3** - 现代样式设计，渐变效果和动画  
- **JavaScript (ES6+ Modules)** - 模块化应用逻辑
- **Web Serial API** - 浏览器原生串口通信
- **esptool-js 0.4.5** - Espressif 官方 JavaScript 烧录工具

## 🎨 界面特性

- **智能按钮状态**：
  - 🔌 连接设备（蓝色）→ 🔄 连接中（闪烁）→ ⚠️ 断开连接（黄色）
  - 🔥 烧录固件（蓝色，需连接后启用）
  - 🗑️ 擦除Flash（红色，危险操作）
- **实时进度显示**：烧录过程中显示进度条和详细日志
- **响应式设计**：适配不同屏幕尺寸

## ❓ 常见问题

### Q: 浏览器提示不支持 Web Serial API
**A:** 请使用 Chrome 89+ 或 Edge 89+ 浏览器，并确保启用了实验性 Web 平台功能。

### Q: 找不到串口设备
**A:** 请检查：
- USB 线缆连接正常且支持数据传输
- ESP32-S3 设备驱动已正确安装
- 设备未被其他程序（如Arduino IDE、串口监视器等）占用
- 尝试不同的USB端口

### Q: 固件文件加载失败
**A:** 请确认：
- `fw/` 文件夹存在且包含三个 `.bin` 文件
- 文件名正确：`bootloader.bin`、`partition-table.bin`、`robOS.bin`
- 如果使用本地文件访问，建议启动本地服务器

### Q: 烧录过程中失败
**A:** 请尝试：
- 重新连接设备
- 先点击"🗑️ 擦除Flash"清空现有固件
- 确保设备保持连接状态
- 检查USB线缆质量

### Q: 设备无法进入下载模式
**A:** ESP32-S3 通常会自动进入下载模式，如果失败请尝试：
- 按住设备上的 BOOT 按钮
- 短按 RST（复位）按钮
- 释放 BOOT 按钮
- 重新点击连接

### Q: 烧录完成后设备无响应
**A:** 烧录完成后设备会自动重启，如果无响应：
- 手动按下设备的 RST 按钮
- 检查固件文件是否正确
- 确认设备的电源供应

## 🔧 技术参数

- **目标芯片**：ESP32-S3
- **Flash 大小**：16MB
- **Flash 模式**：DIO
- **Flash 频率**：80MHz
- **波特率**：115200

## 🛠️ 开发说明

项目采用纯静态设计，无需构建工具：

```bash
# 直接编辑 robflash.htm 文件
# 使用本地服务器测试
python3 -m http.server 8080
```

核心类：`RM01Flasher` - 包含所有设备连接、文件加载和烧录逻辑

## 📄 许可证

MIT License

## 🙏 致谢

- [esptool-js](https://github.com/espressif/esptool-js) - Espressif 官方 JavaScript 烧录工具库
- [Web Serial API](https://wicg.github.io/serial/) - W3C 串口通信标准
- ESP32-S3 技术文档和社区支持

## 📋 更新日志

详见 [VERSIONS.md](VERSIONS.md) 文件。

---

**🔥 专为 RM-01 设备设计，让固件烧录变得简单快捷！**