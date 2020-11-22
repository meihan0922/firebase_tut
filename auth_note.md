###### tags: `Firebase`, `Authentication`

# Firebase Authentication Tutorial

https://youtu.be/aN1LnNq4z54

---

### 主要目標為"分級會員"

一般會員: 讀特別會員寫的文章
特別會員: 寫文章並且升級其他一般會員為特別會員
沒有登入的人無法看到文章也無法做任何行為

---

## 01. How Firebase Auth Works

![](https://i.imgur.com/ZCT5HGj.png)

![](https://i.imgur.com/Bl28sMM.png)

![](https://i.imgur.com/QiS7yTh.png)

![](https://i.imgur.com/1c6P0K7.png)

\*從 004 開始，003 是切版

---

## 02. Setting up Firebase Locally

將專案連結到 firebase

`html:`

```htmlembedded=
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-firestore.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBoyLqaXxp05IFzH9_5Fg3Md8xypNh-q4c",
    authDomain: "firestore-tut-ce62c.firebaseapp.com",
    databaseURL: "https://firestore-tut-ce62c.firebaseio.com",
    projectId: "firestore-tut-ce62c",
    storageBucket: "firestore-tut-ce62c.appspot.com",
    messagingSenderId: "360050501440",
    appId: "1:360050501440:web:c86fb50a1dc779b8a9bca5",
    measurementId: "G-8HEJ5PH78B"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const auth = firebase.auth();
  const db = firebase.firestore();
</script>
```

## 03. Creating New User

auth.createUserWithEmailAndPassword(email, password)

`auth.js`

```javascript=
// 註冊
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  console.log(email, password);

  // signup the user，非同步的，不確定完成時間，會回傳token，我們要讓他自動登入
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log("註冊的資訊 => ", cred);
    console.log("使用者資訊 => ", cred.user)
    // materialize library內建的方法，在註冊後關閉並且input清空
    M.Modal.getInstance(modal).close;
    signupForm.reset();
  });
});

```

![](https://i.imgur.com/4qM5j5v.png)

---

## 04. Signing Users Out

auth.signOut()

`auth.js`

```javascript=
// 登出
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  // 一樣是非同步的，但這次不需要使用回傳的response了
  auth.signOut().then(() => {
    console.log("登出");
  });
});
```

---

## 05. Logging User In

auth.signInWithEmailAndPassword(email, password)

`auth.js`

```javascript=
// 登入
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector("#modal-login");
    // materialize library內建的方法，在登入後關閉並且input清空
    M.Modal.getInstance(modal).close;
    loginForm.reset();
  });
});

```

---

## 06. Tracking Auth Status

auth.onAuthStatusChanged()

`auth.js`

```javascript=
// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  // 只有在登入狀態下才會有user資訊
  if (user) {
    console.log("user logged in => ", user);
  } else {
    console.log("user logged out");
  }
});
```

---

## 07. Getting FireStore Data

先去 firebase firestore 建立資料
![](https://i.imgur.com/DLl8wjb.png)
接著就接資料

`auth.js`

```javascript=
db.collection("guides")
  // .get()
  // 及時顯示! .onSnapshot就像是對當下資料做快照，而後發生改變就去比對，只要不一樣就會觸發
  .onSnapshot((snapshot) => {
    setupGuides(snapshot.docs);
  });
```

`index.js`

```javascript=
const guideList = document.querySelector(".guides");

// setup guides
const setupGuides = (data) => {
  let html = "";
  data.forEach((doc) => {
    const guide = doc.data();
    const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white"><span>${guide.content}</span></div>
        </li>`;
    html += li;
  });
  guideList.innerHTML = html;
};
```

![](https://i.imgur.com/UWOQnrB.png)

---

## 08. UI & Firestore Security Rules

https://firebase.google.com/docs/firestore/security/rules-structure
只有在登入狀態下才能取得資料庫內容

`auth.js`

```javascript=
// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides")
    // 及時顯示! .onSnapshot就像是對當下資料做快照，而後發生改變就去比對，只要不一樣就會觸發
      .onSnapshot((snapshot) => {
        setupGuides(snapshot.docs);
      });
  } else {
    setupGuides([]);
  }
});
```

針對登入狀態顯示不同 UI
`index.js`

```javascript=
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
              <li>
                  <div class="collapsible-header grey lighten-4">${guide.title}</div>
                  <div class="collapsible-body white"><span>${guide.content}</span></div>
              </li>`;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = `<h5>請登入看更多...</h5>`;
  }
};
```

最後，上去資料庫設定權限
![](https://i.imgur.com/topWJ2m.png)

![](https://i.imgur.com/du1vdxP.png)

---

## 09. Conditional Menu Links

針對上面的 nav bar 設定登入狀態顯示規則
![](https://i.imgur.com/MRfC4Qm.png)

`index.js`

```javascript=
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setUpUI = (user) => {
  if (user) {
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};
```

`auth.js`

```javascript=
// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides")
      .onSnapshot((snapshot) => {
        setupGuides(snapshot.docs);
        setUpUI(user);
      });
  } else {
    setupGuides([]);
    setUpUI();
  }
});
```

`index.html`
都先設定是不顯示

```htmlembedded=
<ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="logged-in" style="display: none;">
            <a href="#" class="grey-text modal-trigger" data-target="modal-account">Account</a>
          </li>
          <li class="logged-in" style="display: none;">
            <a href="#" class="grey-text" id="logout">Logout</a>
          </li>
          <li class="logged-in" style="display: none;">
            <a href="#" class="grey-text modal-trigger" data-target="modal-create">Create Guide</a>
          </li>
          <li class="logged-out" style="display: none;">
            <a href="#" class="grey-text modal-trigger" data-target="modal-login">Login</a>
          </li>
          <li class="logged-out" style="display: none;">
            <a href="#" class="grey-text modal-trigger" data-target="modal-signup">Sign up</a>
          </li>
        </span>
      </ul>
```

---

## 10. Adding Guides

登入狀態下，新增資料的功能
![](https://i.imgur.com/onlkxC2.png)
![](https://i.imgur.com/RQXHRfY.png)

`auth.js`

```javascript=
// create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("guides")
    .add({
      content: createForm["content"].value,
      title: createForm["title"].value,
    })
    .then(() => {
      // close modal
      M.Modal.getInstance(modal).close;
      createForm.reset();
    })
    .catch((err) => {
      // 因為後端有設讀寫的權限，防止前端不當改寫資料庫
      console.log(err.message);
    });
});
```

---

## 11. Showing User Info

`index.js`

```javascript=
const accountDetails = document.querySelector('.account-details');

const setupUI = user => {
    if(user){
        const html = `<div>${user.email}</div>`;
        accountDetails.innerHtml = html;
    }else{
        accountDetails.innerHtml = '';
    }
}
```

`auth.js`

```javascript=
// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  // 只有在登入狀態下才能取得資料庫內容，同時資料庫也會去阻擋擁有id的人才能讀寫資料
  if (user) {
    // 及時顯示! .onSnapshot就像是對當下資料做快照，而後發生改變就去比對，只要不一樣就會觸發
    // 但登出時，後端可能接收到登出但因為非同步，這邊的user還會存在，就會跳出錯誤說沒有權限取得資料庫，因此要catch err
    // onSnapshot的第二個參數專門在處理error
    db.collection("guides")
      .onSnapshot(snapshot => {
        setupGuides(snapshot.docs);
        setUpUI(user);
      }, err => console.log(err.message));
  } else {
    setupGuides([]);
    setUpUI();
  }
});
```

---

## 12. Firestore Users Collection

我們假設想要存使用者的相關資訊，不可能存在 auth 當中，因為資訊量可能會很大，所以必須把資料建立在 firestore 內，使用內應的 uid(使用者 id)去找相關資訊!
做實作~在註冊時多新增一個欄位，將這個欄位資訊存在 store 內!

`index.html`

```htmlembedded=
<!-- 在html的modal-signup內新增input框 -->
<div class="input-field">
  <input type="text" id="signup-bio" required />
  <label for="signup-bio">One Line Bio</label>
</div>
```

`auth.js`

```javascript=
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log("註冊的資訊 => ", cred);
      // 回傳在db內新增users資料，後台沒有這個欄位就會自動建立
      // doc(這個集合的keyname)
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
      // 用then銜接本來要做的動作
      // 如果成功建立後端的doc時，再把input清空關閉視窗
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close;
      signupForm.reset();
    });
```

![](https://i.imgur.com/o6lqm1C.png)

然後把資料顯示在`index.js`setupUI 內

```javascript=
const setUpUI = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
        `;
        accountDetails.innerHTML = html;
      });
      // ...省略
}}
```

另外 firestore rule 要設定成存取權限
create 和 write 的不同在於，write 可以編輯。
如果有這個使用者就可以創造這個集合，
但只有使用者本人可以讀這筆資料
![](https://i.imgur.com/1Sqekcp.png)

---

## 13. Intro to Custom Claims

創造管理員!透過判斷是否是管理員來驅動資料權限跟前端的顯示，但這個判斷不能寫在前端裡面，會不安全，可能會被串改，有安全漏洞!
![](https://i.imgur.com/2Jy0uTV.png)

所以要使用 firebase cloud function!
在官方網站有寫說那些情況下會使用到 firebase cloud function，
https://firebase.google.com/docs/functions/use-cases
第一點可以用在 PWA 上面，第三點就是我們要做的事情!
目標是希望從前端可以跟後端說讓某使用者可以變成 admin(管理員)!

![](https://i.imgur.com/d4gCqnk.png)

> **最主要的觀念是:** > **cloud function 是在 server 端上執行的，不會暴露在前端!** > **不能給客戶端使用者執行，但是如果使用者有權限是可以從前端 call 的!!**

**cli 安裝:**

```bash=
npm i firebase-tools -g
```

**cli 登入:**

```bash=
firebase login
```

**cli 初始化:**

```bash=
firebase init functions
```

會開始問很多問題
![](https://i.imgur.com/nthzZF3.png)

![](https://i.imgur.com/SD9Lz7X.png)

最後幫你建立好環境
![](https://i.imgur.com/Hq5Qc8F.png)

---

## 14. Cloud Function / Adding Claims

`functions > index.js`

```javascript=
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// export 後面接 function名稱
// https表示functions的類別
// onCall表示我們可以從前端呼叫，執行return的promise
// data: 是我們往後端送，關於user的資訊，將誰變成admin
exports.addAdminRole = functions.https.onCall((data, context) => {
  // 在登入的狀態下，取得user的資訊並且把他加入到管理者
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      // 設定這個用戶的等級
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `成功設定${data.email}成為管理者`,
      };
    })
    .catch((err) => {
      return err;
    });
});
```

cli 發佈到 firebase

```bash=
firebase deploy --only functions
```

中間需要連結付費帳戶才能開啟限定功能，但其實是免費的
https://ithelp.ithome.com.tw/articles/10249916

看到這個就表示佈屬成功
![](https://i.imgur.com/ZkCv1k3.png)

`index.html` 也要宣告 admin 的變數才能使用

```htmlembedded=
<script src="https://www.gstatic.com/firebasejs/8.0.1/firebase-functions.js"></script>
<script>
const functions = firebase.functions();
</script>
```

`auth.js`前端要呼叫設置的 functions

```javascript=
// 新增管理員連結到cloud functions
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((result) => {
    console.log(result);
  });
});
```

---

## 15. Updating the Admin UI

create guide 是只有 admin 階級才能使用的!
所以要將它改成不顯示，只有在登入時，判斷他是管理階級再改變成顯示狀態，也要去 firestore 只有管理者才能寫資料進去

`index.html`找到 Create Guide，class 加上 admin

```htmlembedded=
<li class="admin" style="display: none;">
    <a href="#" class="grey-text modal-    trigger" data-target="modal-create">
        Create Guide
    </a>
</li>
```

`index.html`找到 Admin form，class 加上 admin，display:none;

```htmlembedded=
 <!-- ADMIN ACTIONS -->
<form class="center-align admin-actions admin" style="margin: 40px auto; max-width: 300px; display:none;">
    <input type="email" placeholder="User email" id="admin-email" required />
    <button class="btn-small yellow darken-2 z-depth-0">Make admin</button>
</form>
```

![](https://i.imgur.com/O6CU70X.png)

`auth.js`

```javascript=
// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  if (user) {
    if (
      user.getIdTokenResult().then((idTokenResult) => {
        console.log(idTokenResult.claims);
        // 整個完整的token，email.userId...
        console.log(idTokenResult.claims.admin);
        //如果是管理者會是true
        user.admin = idTokenResult.claims.admin;
      })
    )
      db.collection("guides").onSnapshot(
        (snapshot) => {
          setupGuides(snapshot.docs);
          setUpUI(user);
        },
        (err) => console.log(err.message)
      );
  } else {
    setupGuides([]);
    setUpUI();
  }
});
```

`index.js`

```javascript=
const adminItems = document.querySelector(".admin");

const setUpUI = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            <div class="pink-text">${user.admin ? "Admin" : ""}</div>
        `;
        accountDetails.innerHTML = html;
      });
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
    }
   // ...省略
  }
};
```

---

## 16. Firestore Rules With Claims

![](https://i.imgur.com/yaUeg3t.png)

---

## 17. Securing the Cloud Function

我們做了一個可以允許別人成為管理者的函式，但ＵＩ其時隱藏在 dom 裡面，只要讓 dom 顯示再送出資料也可以成為管理者！所以必須要在函式裡面做安全判斷！
`functions > index.js`

```javascript=
// context就是用來抓取使用者資訊的
exports.addAdminRole = functions.https.onCall((data, context) => {
    if(context.auth.token.admin !== true)
  // 在登入的狀態下，取得user的資訊並且把他加入到管理者
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      // 設定這個用戶的等級
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `成功設定${data.email}成為管理者`,
      };
    })
    .catch((err) => {
      return err;
    });
});
```
