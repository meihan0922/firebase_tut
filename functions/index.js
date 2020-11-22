const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// export 後面接 function名稱，https表示functions的類別
// onCall表示我們可以從前端呼叫，執行return的promise
// data: 是我們往後端送，關於user的資訊，將誰變成admin
exports.addAdminRole = functions.https.onCall((data, context) => {
  if (context.auth.token.admin !== true) {
    return { err: "只有管理員可以新增其他管理員" };
  }

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
