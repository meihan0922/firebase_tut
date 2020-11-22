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

// 監聽狀態改變
auth.onAuthStateChanged((user) => {
  // 只有在登入狀態下才能取得資料庫內容，同時資料庫也會去阻擋擁有id的人才能讀寫資料
  if (user) {
    if (
      user.getIdTokenResult().then((idTokenResult) => {
        console.log(idTokenResult.claims); // 整個完整的token，email.userId...
        console.log(idTokenResult.claims.admin); //如果是管理者會是true
        user.admin = idTokenResult.claims.admin;
      })
    )
      // 及時顯示! .onSnapshot就像是對當下資料做快照，而後發生改變就去比對，只要不一樣就會觸發
      // 但登出時，後端可能接收到登出但因為非同步，這邊的user還會存在，就會跳出錯誤說沒有權限取得資料庫，因此要catch err
      // onSnapshot的第二個參數專門在處理error
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
      // 有人想用前端改寫資料庫就會報錯
      console.log(err.message);
    });
});

// 註冊
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;
  console.log(email, password);

  // signup the user，非同步的，不確定完成時間，會回傳token，我們要讓他自動登入
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log("註冊的資訊 => ", cred);
      //  後台沒有這個欄位就會自動建立
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
      // 如果成功建立後端的doc時，再把input清空關閉視窗
      const modal = document.querySelector("#modal-signup");
      // materialize library內建的方法，在註冊後關閉並且input清空
      M.Modal.getInstance(modal).close;
      signupForm.reset();
    });
});

// 登出
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  // 一樣是非同步的，但這次不需要使用回傳的response了
  auth.signOut().then(() => {
    console.log("登出");
  });
});

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
