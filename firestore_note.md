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