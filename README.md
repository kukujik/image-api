# 🚀 随机图片 API

一个高性能的随机图片服务，使用next.js部署在 Vercel 上。

## vercel一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kukujik/image-api)

点击上方按钮，无需本地安装，直接完成部署。

## 本地部署
### 1. 克隆项目
```bash
git clone https://github.com/kukujik/image-api.git
```
#### 进入目录
```bash
cd image-api
```
### 2. 安装依赖
```bash
npm install next
```
### 3. 启动!
```
npm run dev
```
优先推荐使用上面vercel部署
## 使用方式
将图片目录放在public底下支持多重目录
/public/演示目录/

访问以下格式的 URL 获取随机图片：
```
https://你的域名/演示目录
https://你的域名/一级目录/二级目录
```
