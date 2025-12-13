# 靜心陰瑜伽 - 後台管理系統

<div align="center">
  
![專案封面](https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop)

**使用 TypeScript + Vue 3 + Firebase 的後台管理系統**

<a href="https://aitong0113.github.io/TS-yogab/" target="_blank"><img src="https://img.shields.io/badge/後台展示-8B7355?style=for-the-badge" alt="Backend Demo"></a> <a href="https://aitong0113.github.io/TS-yogaf/" target="_blank"><img src="https://img.shields.io/badge/前台展示-D4A574?style=for-the-badge" alt="Frontend Demo"></a> <a href="https://github.com/aitong0113/TS-yogab" target="_blank"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github" alt="GitHub"></a>

</div>

---

## 專案簡介

這是「靜心陰瑜伽」電商網站的後台管理系統，提供商品、訂單、優惠券的完整管理功能。使用 TypeScript 開發，搭配 Vue 3 Composition API 與 Firebase 作為後端服務，與前台網站共用同一個 Firebase 資料庫。

**核心功能**

- 商品管理（新增、編輯、刪除、上下架）
- 訂單管理（查看訂單詳情、刪除訂單）
- 優惠券管理（新增、編輯、刪除、啟用/停用）
- 圖片上傳至 Firebase Storage
- Firebase Authentication 登入驗證
- 響應式設計（手機、平板、電腦）

**測試帳號**

- Email: `admin@gmail.com`
- Password: `123456`

---

## 技術棧

**前端框架**

- Vue 3 (Composition API)
- TypeScript
- Vue Router (路由管理)

**UI 框架**

- Bootstrap 5

**後端服務**

- Firebase Authentication (身份驗證)
- Firebase Firestore (資料庫)
- Firebase Storage (圖片儲存)

**建置工具**

- Vite
- GitHub Pages

---

## 專案結構

```
TS-yogab/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/                    # API 層
│   │   ├── coupons.ts         # 優惠券 API
│   │   ├── order.ts           # 訂單 API
│   │   ├── products.ts        # 商品 API
│   │   └── user.ts            # 使用者 API
│   ├── assets/
│   │   ├── images/            # 圖片資源
│   │   └── styles/            # 樣式檔案
│   │       ├── all.scss
│   │       ├── helpers/
│   │       └── layout/
│   ├── components/            # 共用組件
│   │   ├── CouponModal.vue    # 優惠券新增/編輯
│   │   ├── Dashboard.vue      # 主要佈局
│   │   ├── DeleteModal.vue    # 刪除確認
│   │   ├── Header.vue         # 頂部導覽列
│   │   ├── OrderDetailModal.vue  # 訂單詳情
│   │   ├── ProductModal.vue   # 商品新增/編輯
│   │   └── Sidebar.vue        # 側邊選單
│   ├── composable/            # Composition 函數
│   │   ├── useImageUpload.ts  # 圖片上傳邏輯
│   │   └── useProductData.ts  # 商品資料處理
│   ├── firebase/              # Firebase 設定
│   │   └── firestore.ts       # Firebase 初始化
│   ├── router/                # 路由設定
│   │   └── index.ts
│   ├── types/                 # TypeScript 類型定義
│   │   ├── coupon.ts
│   │   ├── order.ts
│   │   ├── product.ts
│   │   └── user.ts
│   ├── utils/                 # 工具函數
│   │   └── date.ts
│   ├── views/                 # 頁面組件
│   │   ├── CouponManagement.vue   # 優惠券管理
│   │   ├── Login.vue              # 登入頁
│   │   ├── OrderManagement.vue    # 訂單管理
│   │   └── ProductManagement.vue  # 商品管理
│   ├── App.vue
│   ├── constants.ts           # 常數定義
│   └── main.ts
├── package.json
├── tsconfig.json              # TypeScript 設定
└── vite.config.ts             # Vite 設定
```

---

## 主要功能說明

### 1. 商品管理

- 商品列表顯示（名稱、分類、價格、庫存狀態）
- 新增/編輯商品（支援圖片上傳至 Firebase Storage）
- 刪除商品
- 商品上下架切換
- 分頁功能

### 2. 訂單管理

- 訂單列表顯示（訂單編號、日期、金額、付款狀態）
- 查看訂單詳情（客戶資訊、商品明細、總金額）
- 刪除訂單
- 自動同步前台建立的訂單

### 3. 優惠券管理

- 優惠券列表顯示（代碼、折扣百分比、到期日、啟用狀態）
- 新增/編輯優惠券（代碼、折扣百分比、到期時間）
- 刪除優惠券
- 啟用/停用切換

### 4. 身份驗證

- Firebase Authentication 登入
- 登入狀態持久化
- 登出功能

### 5. 圖片上傳

- 支援圖片上傳至 Firebase Storage
- 自動產生圖片 URL
- 圖片預覽功能

### 6. TypeScript 類型安全

- 完整的類型定義
- API 回傳資料類型檢查
- 減少執行期錯誤

---

## 與前台串接

本後台系統與前台網站 [TS-yogaf](https://github.com/aitong0113/TS-yogaf) 共用同一個 Firebase 專案：

**前台網站：** https://aitong0113.github.io/TS-yogaf/

**資料同步機制**

| 功能 | 前台 | 後台 |
|------|------|------|
| 商品 | 讀取商品列表、商品詳情 | 新增、編輯、刪除商品 |
| 訂單 | 建立訂單（含商品明細） | 查看、刪除訂單 |
| 優惠券 | 套用優惠券折扣 | 新增、編輯、刪除優惠券 |
| 購物車 | 新增、修改、刪除購物車 | - |

**Firebase Collections**

- `products` - 商品資料
- `orders` - 訂單資料（前台建立，後台查看）
- `coupons` - 優惠券資料
- `carts` - 購物車資料（前台專用）

---

## 學到什麼

**技術方面**

- TypeScript 在 Vue 3 專案中的進階應用
- Vue 3 Composition API 與 Composable 函數設計
- Firebase Authentication 身份驗證流程
- Firebase Firestore 進階操作（查詢、分頁、排序）
- Firebase Storage 檔案上傳與管理
- Bootstrap Modal 組件封裝

**架構設計**

- 後台管理系統架構規劃
- 前後台資料庫共用策略
- 組件化開發與狀態管理
- 類型定義與介面設計

**開發流程**

- Git 版本控制與分支管理
- TypeScript 類型檢查與除錯
- Firebase 整合與權限管理
- GitHub Pages 自動化部署

**業務邏輯**

- 電商後台管理流程
- 圖片上傳與儲存最佳實踐
- 訂單資料結構設計
- 優惠券功能實作

---

## 快速開始

### 安裝依賴

```bash
npm install
```

### 開發環境

```bash
npm run dev
```

訪問 http://localhost:5174/TS-yogab/

### 建置生產版本

```bash
npm run build
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

---

## Firebase 設定

### 1. 建立 Firebase 專案

在 [Firebase Console](https://console.firebase.google.com/) 建立專案（與前台共用）

### 2. 啟用服務

- **Authentication**：啟用 Email/Password 登入方式
- **Firestore Database**：建立資料庫
- **Storage**：啟用圖片儲存

### 3. 設定 Firestore 規則

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **注意：** 生產環境需要更嚴格的安全規則

### 4. 設定 Storage 規則

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 5. 建立管理員帳號

在 Firebase Authentication 中手動建立管理員帳號：
- Email: `admin@gmail.com`
- Password: `123456`

### 6. Firebase 配置

在 `src/firebase/firestore.ts` 中設定 Firebase 配置：

```typescript
const firebaseConfig = {
  apiKey: "你的-api-key",
  authDomain: "你的專案.firebaseapp.com",
  projectId: "你的專案ID",
  storageBucket: "你的專案.firebasestorage.app",
  messagingSenderId: "你的sender-id",
  appId: "你的app-id"
};
```

---

## 注意事項

### 開發環境

- 此為展示專案，預設為開放的 Firestore 規則
- 登入帳號密碼為測試用途，請勿使用於正式環境

### 生產環境建議

1. **加強 Firestore 安全規則**
   - 限制只有認證使用者可以寫入
   - 依照角色設定不同權限

2. **環境變數管理**
   - 使用 `.env` 檔案管理 Firebase 配置
   - 不要將敏感資訊上傳至 GitHub

3. **錯誤處理**
   - 加入完整的錯誤處理機制
   - 提供友善的錯誤訊息

4. **效能優化**
   - 實作資料快取機制
   - 圖片壓縮與 lazy loading

### 前後台協作

- 前台建立的訂單會自動顯示在後台
- 後台新增的商品會立即出現在前台
- 優惠券需在後台啟用後，前台才能使用

---

## 相關連結

- **前台網站**：https://aitong0113.github.io/TS-yogaf/
- **前台 GitHub**：https://github.com/aitong0113/TS-yogaf
- **後台網站**：https://aitong0113.github.io/TS-yogab/
- **後台 GitHub**：https://github.com/aitong0113/TS-yogab

---


### 作者

✍️ **Abbie Lin** ｜ Frontend & UI/UX Designer

跨心理 × 設計 × 前端的創作者

💌 GitHub: <a href="https://github.com/aitong0113" target="_blank">aitong0113</a>

---

</div>
