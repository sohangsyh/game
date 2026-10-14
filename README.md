# OpenMAIC-GamePlay：互動學習遊戲館

把課程教材轉化為 3D 網頁學習遊戲，對象為香港中小學生，配合教育局課程。
每款遊戲都是一個獨立的 HTML 檔，用手機或電腦瀏覽器打開即玩，無需登入或安裝。

## 快速開始

打開根目錄的 `index.html`，就是遊戲館入口頁。

建議用本機伺服器預覽，避免部分瀏覽器限制本機檔案：

```bash
python3 -m http.server 8000
# 然後瀏覽 http://localhost:8000
```

### 用 GitHub Pages 發佈

1. 把整個資料夾推送到 GitHub repo。
2. 在 repo 的 **Settings → Pages**，Source 選 `Deploy from a branch`，分支選 `main`，資料夾選 `/ (root)`。
3. 數分鐘後，入口頁會在 `https://<你的帳號>.github.io/<repo 名稱>/` 上線。

## 遊戲列表（11 款，涵蓋 10 種玩法）

| 資料夾 | 遊戲 | 玩法 | 學科 |
|---|---|---|---|
| `games/fish` | 魚我所欲也 | RPG 冒險 | 中國語文（DSE 範文） |
| `games/xiaoyao` | 逍遙遊：大瓠與大樹 | RPG 冒險 | 中國語文（DSE 範文） |
| `games/labsafety` | 實驗室安全 | RPG 冒險 | 初中科學 |
| `games/lunyu` | 論語：杏壇搬運戰 | 限時搬運 | 中國語文（DSE 範文） |
| `games/floatsink` | 浮與沉 | 模擬實驗室 | 小學科學科 |
| `games/xishan` | 始得西山 | 探索漫遊 | 中國語文（DSE 範文） |
| `games/chibi` | 赤壁疑案 | 偵探查案 | 初中中國歷史 |
| `games/shop` | 檸檬茶小店 | 經營決策 | 初中經濟、小學人文科 |
| `games/hkbuddy` | HK Buddy | 對話闖關 | 初中英國語文 |
| `games/site` | 地盤三視圖 | 建造工坊 | 初中數學 |
| `games/shanju` | 山居秋暝 | 節奏表演 | 中國語文（DSE 範文） |

第十種玩法「密室逃脫」的模組（`engine/escape.js`、`engine/escape2.js`）仍保留在 repo 中，但目前沒有遊戲使用。

## 專案結構

```
index.html              遊戲館入口頁
games/<遊戲>/
  content.json          內容層：知識單元、盲點、台詞、提示、題目
  world.json            世界層：場景、地點、角色站位
  game.json             玩法層：計分、時間、規則參數
  recommendation.json   玩法推薦器的判斷紀錄
  index.html            建置後的遊戲（由 build.py 生成，可直接打開）
engine/
  engine.js             共用引擎：渲染、角色與程序動畫、鏡頭、對話、提示、跳過
  rpg.js                RPG 冒險（可選：可走動的玩家角色、場景互動掛鈎）
  carry2.js             限時搬運（多場景版；carry.js 為單場景舊版）
  escape.js, escape2.js 密室逃脫（單房間版、多區域版）
  sim.js                模擬實驗室（浮力模型）
  explore.js            探索漫遊（程序生成地形）
  detective.js          偵探查案
  manage.js             經營決策
  dialogue.js           對話闖關（語音朗讀、可選語音辨識）
  building.js           建造工坊（三視圖、起重機）
  rhythm.js             節奏表演（節拍軌道、合成撥弦音）
  kit_ancient.js        古代場景套件：市集、山亭、村落、府第、杏壇、書院、碑林、江邊、祠堂、莊子寓言場景、山居
  kit_campus.js         現代校園場景套件：實驗室、準備室、走廊、操場集合點
  kit_hk.js             香港城市場景套件：茶餐廳、港鐵月台、天星小輪、街市
  kit_site.js           香港地盤場景套件：塔式起重機、竹棚、圍板
shells/                 各玩法的頁面外殼（版面、樣式、HUD）
build/build.py          建置腳本
docs/                   項目說明書
```

## 修改內容後重新建置

遊戲的文字、題目和參數都在三份 JSON 中，不需要改程式。修改後執行：

```bash
python3 build/build.py          # 重建全部
python3 build/build.py chibi    # 只重建一款
```

需要 Python 3，不需要安裝任何套件。`build.py` 頂部的 `GAMES` 表列出每款遊戲使用的外殼、玩法模組和場景套件。

## 外部依賴

遊戲在瀏覽器中會從網上載入：

- Three.js r128（cdnjs.cloudflare.com）
- Google Fonts（Noto Serif TC、LXGW WenKai TC）

因此需要連線才能遊玩。如需完全離線使用，可下載 `three.min.js` 放入 repo，並把 shells 中的 `<script src>` 改為相對路徑。

## 使用須知

- **跳過**：所有需要答對才能前進的地方，都有「跳過，看答案」按鈕。
- **語音（HK Buddy）**：「讀出對白」使用瀏覽器內建的語音合成。「開口說話」預設關閉；開啟後使用瀏覽器的語音辨識服務，音訊由 Google 或 Apple 等供應商處理，遊戲本身不儲存錄音。老師可在連結後加 `?speak=1` 預設開啟。語音辨識在桌面版 Chrome、Edge 效果最好，Firefox 不支援。
- **聲音（山居秋暝）**：撥弦音和節拍聲以 Web Audio 即時合成，不需要音訊檔。
- **效能**：場景較豐富的遊戲（例如魚我所欲也、逍遙遊、論語）有約一千個物件，需要有顯示晶片的裝置才流暢。一般電腦和近年的手機、平板都沒有問題；非常舊的裝置可能較慢。
- **內容審核**：課文詮釋與學科內容在正式使用前，應由任教老師審核。
- **授權**：請自行選擇授權條款並加入 `LICENSE` 檔。如日後整合 OpenMAIC 的程式碼，需先確認其授權條款。
