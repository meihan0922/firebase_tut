Firebase_Firestore_Tutorial

Firebase fireStore筆記
###### tags: `Firebase`,`Firestore`

# Firebase Firestore Tutorial
https://youtu.be/4d-gIPGzmK4

---
## 001 - Introduction
https://www.youtube.com/watch?v=U5aeM5dvUpA
如果按照傳統的方法，我們要建立和維護數據資料庫，同時又要及時的同步資訊或是支援離線，要花更多的人力跟資源。
firebase，也可以限定誰可以存取資源，並且設定數據的架構
1. Firestore is a real-time database.
他是一個NoSQL（Not Only SQL)的database，NoSQL資料庫具有水平擴充的能力，只要新增伺服器節點，就可以彈性的擴充容量。
不像傳統關聯式資料一樣需要事先架構好Schema欄位，NoSQL改用鍵值（Key-Value）資料模式來儲存資料，資料儲存可以不需要固定的表格模式，彈性高。使用者不論從移動裝置或是網站都可以即時的取的資源。
2. Firestore makes life easier
不用管後端用了甚麼語言怎麼做，前端就只要使用firebase SDK就可以得到想要的檔案。而且!!!支援離線使用，當恢復連線時，會自動去取得檔案，同步到使用者端的本地數據庫。

---
## 002 - Set up
去firebase註冊建立專案，然後進cloud storage建立資料庫
![](https://i.imgur.com/NXdCTTN.png)

![](https://i.imgur.com/ShWTyUD.png)

接著就可以新增想要的資料了

![](https://i.imgur.com/jtdLMJU.png)

![](https://i.imgur.com/jkAv7om.png)

![](https://i.imgur.com/zaKaoRz.png)
![](https://i.imgur.com/vEbJl2l.png)
上面會提示說將這段貼在html內
就完成初階的coding

---
## 003 - Getting Documents
他有很多的功能，但我們只需要使用firebase-firestore的。
在html引入
```htmlembedded=
<script src="https://www.gstatic.com/firebasejs/8.0.0/firebase-firestore.js"></script>
```
就可以在下方使用
```htmlembedded=
<script>
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();
</script>
<script src="app.js"></script>
```
`app.js`直接使用db
```javascript=
db.collection("cafes").get()
.then(snapshot=>{
    //每個集合snapshot.docs
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
})
```
![](https://i.imgur.com/P6FesmV.png)

![](https://i.imgur.com/yF6KoE0.png)

---
## 004 - saving data
```javascript=
db.collection("cafes").add({
    name: "新增的名字value",
    city: "新增的城市value",
});
```
---
## 005 - delete data
```javascript=
db.collection("cafes").doc("指定doc.id").delete();
```
---
## 006 - query data
```javascript=
// .where('要比較的key', '比較值', '要搜尋的字')
db.collection("cafes").where('city', '==', 'manchester')
```
---
## 007 - order data
會照字母排序，但大寫優先於小寫
如果他報錯
![](https://i.imgur.com/OGczydv.png)
則點擊後面網去firebase建立index順序即可
```javascript=
db.collection("cafes").orderBy('name')
```
---
## 008 - Update data
update是更新但保留沒有要更改的部分，set會直接覆蓋掉整個物件
```javascript=
db.collection("cafes").doc("指定doc.id").update({
    city: "要更新的值"
})
db.collection("cafes").doc("指定doc.id").set({
    city: "要覆蓋的值",
    name: "要覆蓋的值"
})
```
---
## 008 - Real-time data
我們想要即時更新畫面，依照database，要怎麼做?
可以使用onSnapshot，他會去監聽database變化!
當第一次load up，會存下一開始抓的資料以及他的狀態，而後發生變化就會做比對，改變狀態
```javascript=
// 就不用使用get了
// db.collection("cafes").get()
// .then(snapshot=>{
//     //每個集合snapshot.docs
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data());
//     })
// })
db.collection("cafes").onSnapshot(snapshot=>{
    let changes = snapshot.docChanges();
    console.log(changes);
})
```
![](https://i.imgur.com/InbDfis.png)
上面的type表示第一次載入狀態是added新增
```javascript=
// real-time data
db.collection("cafes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === "added") {
        // 如果狀態為added則render(為初始狀態)
      render(change.doc);
    } else if (change.type === "removed") {
        // 如果狀態變成removed則操作dom移除他
      let li = cafeList.querySelector("[data-id=" + change.doc.id + "]");
      cafeList.removeChild(li);
    }
  });
});
```
