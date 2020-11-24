###### tags: `Firebase`, `React`, `Readux`

# React, Redux & Firebase App Tutorial

https://youtu.be/h9enkZBFCyA

## 01. Planning the App & Setting Up

整個網站的架構
![](https://i.imgur.com/o8kp0p3.png)

前後端的技術運用
![](https://i.imgur.com/OqXk11U.png)

cli，使用 create react app 創建初始

```bash=
npx create-react-app meiplan
```

完成之後，建立好所有的檔案架構
![](https://i.imgur.com/VFz6MII.png)

再安裝 react-router-dom，套件官網:
https://reactrouter.com/web/guides/quick-start，
它的原理:
https://medium.com/%E6%89%8B%E5%AF%AB%E7%AD%86%E8%A8%98/a-little-bit-of-react-router-dom-e5b809fcb127

```bash=
npm i react-router-dom
```

- BrowserRouter 是起手式元件，會包裹在 SPA 元件的外層，它使用 HTML5 History API 讓 UI 與 URL 能夠同步。

`appjs`

```javascript=
import React from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>MeiPlan</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
```
