# QuestKids 小任務島

這是重建版 MVP：純前端、可直接開啟、使用 `localStorage` 保存資料。

目前保存鍵值維持為 `questkids.mvp.v4`，以保留現有示範資料相容性。

## 使用方式

直接用瀏覽器打開 `index.html`。

如果已有舊版示範資料，app 會在載入時自動補齊新欄位，並把計時器狀態重設為安全的初始值。

主要功能：

- 孩子端：心情確認、今日任務、拖延類型偵測、任務拆解、計時器、XP、徽章、進度。
- 收藏系統：完成任務得到探索星，集滿 3 粒可開小任務卡包，解鎖夥伴、物件、地圖裝飾。
- 任務完成確認：如果還未做任何小步驟，而且計時不足 30 秒，完成前會先要求再次確認。
- 能力任務確認：抽到能力卡後，必須先完成練習，再按確認才會真正解鎖能力。
- iPhone-style 孩子端：底部 tab 分成小任務島、成就、圖鑑、家長入口。
- 家長端：總覽、孩子檔案、任務管理、拖延分析、獎勵、隱私安全。
- Demo mode：可一鍵重置示範資料。

設計文件：

- `DESIGN.md`：商業化 iPhone app 的 UI、角色、地圖、內容風險方向。
- `assets/visual-direction-concept.png`：視覺方向參考圖。
- `iphone-home.png`：目前 MVP 在 iPhone 尺寸的首頁驗證截圖。

## 發布到 GitHub Pages

這個專案是純靜態 app，不需要 build。GitHub Pages 使用 branch deployment 發布。

1. 在 GitHub 建立一個新 repository。
2. 把本機專案連到該 repository，並 push 到 `main` branch。
3. 到 GitHub repository 的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 的 `Source` 選 `Deploy from a branch`。
5. `Branch` 選 `main`，folder 選 `/ (root)`，然後按 `Save`。
6. 等待 GitHub 完成 build，網址會是 `https://<username>.github.io/<repo-name>/`。

## 下一階段

- 接 Supabase/Firebase/Postgres API。
- 加入家長登入與孩子 PIN。
- 加入真實審批流程、相片/錄音前的家長同意與資料保留政策。
- 加 Playwright 端到端測試。
