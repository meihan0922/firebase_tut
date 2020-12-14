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

## 02. Setting Up Router

略過中間的切版影片

```javascript=
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/createproject" component={CreateProject} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

如果需要動態路由的子組建，可以運用`useParams`取得動態 id

```javascript=
import React from "react";
import { useParams } from "react-router-dom";
import "./projectdetails.scss";

const ProjectDetails = () => {
  const { id } = useParams();
  return (
    <div className="project-details">
      <div className="card-content">
        <span className="card-title">Project title - {id}</span>
        <p>
          範例文字範例文字範例文字範例文字範例文字範例文字範例文字範例文字範例文字範例文字
        </p>
      </div>
      <div className="card-action">
        <span>Posted by mei</span>
        <span>2020,11,25</span>
      </div>
    </div>
  );
};

export default ProjectDetails;
```

至於 navbar 上跳轉至各頁面，可以運用`<Link>`、`<NavLink>`，他們兩個的不同在於 navlink 在符合 url 時，可以添加樣式到到組件上，有內建的 activeClassName、activeStyle 等的 props 可以使用。

`navbar.js`

```javascript=
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import SignInLink from "./SignInLink";
import SignOutLink from "./SignOutLink";

const Navbar = () => {
  return (
    <nav className="nav-wrapper">
      <div className="nav-container">
        <Link to="/" className="brand-logo">
          MeiPlan
        </Link>
        <SignOutLink />
        <SignInLink />
      </div>
    </nav>
  );
};

export default Navbar;
```

`signinlink.js`

```javascript=
import React from "react";
import { NavLink } from "react-router-dom";
import "./signlink.scss";

const SignInLink = () => {
  return (
    <ul className="sign-link">
      <li>
        <NavLink to="/createproject">New Project</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn member">
          NN
        </NavLink>
      </li>
    </ul>
  );
};

export default SignInLink;
```

`signoutlink.js`

```javascript=
import React from "react";
import { NavLink } from "react-router-dom";
import "./signlink.scss";

const SignOutLink = () => {
  return (
    <ul className="sign-link">
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>
    </ul>
  );
};

export default SignOutLink;
```

## 03. Setting Up Redux. React-redux. thunk

npm i 這幾項，並加入 middleware

- react-redux 的 hook 版本:
  https://medium.com/enjoy-life-enjoy-coding/react-redux-%E5%B0%8F%E5%AD%A9%E5%AD%90%E6%89%8D%E5%81%9A%E9%81%B8%E6%93%87-hooks-%E5%92%8C-redux-%E6%88%91%E5%85%A8%E9%83%BD%E8%A6%81-1fdd226f5d99
- 關於 thunk 和 middleware:
  https://medium.com/@brianwu291/learn-react-redux-and-redux-thunk-fd06ab2fd652
- 關於 reducer:
  https://medium.com/@brianwu291/learn-react-redux-and-redux-reducers-40c6442cc436

![](https://i.imgur.com/dsRk6S9.png)

`index.js`

```javascript=
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunk
  ),
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

#### reducer

reducer 的設定又分為權限跟呈現列表邏輯兩種，再使用 combine 把他們結合在一起

`rootReducer.js`

```javascript=
import auth from "./authReducer";
import product from "./projectReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth,
  product,
});

export default rootReducer;
```

`projectReducer.js`

```javascript=
import { CREATE_PROJECT } from "../actions/actions";
const initState = {
  project: [
    { id: 1, title: "標題A", content: "內容A" },
    { id: 2, title: "標題B", content: "內容B" },
    { id: 3, title: "標題C", content: "內容C" },
  ],
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      console.log("ccccc", action.project);
      break;
    default:
      console.log("default");
  }
  return state;
};

export default projectReducer;
```

`authReducer.js`

```javascript=
const initState = {};

const authReducer = (state = initState, action) => {
  return state;
};

export default authReducer;
```

#### action

在 thunk 當中可以傳入 function 來處理非同步的問題，並且在處理完成之後再次發送 dispatch
`projectAction.js`

```javascript=
import { CREATE_PROJECT } from "./actions";

export const createProject = (project) => {
  return (dispatch, getState) => {
      //....這中間
    dispatch({
      type: CREATE_PROJECT,
      project: {
        title: project.title,
        content: project.content,
      },
    });
  };
};
```

對應到組件內的 submit 的位置

```javascript=
import { createProject } from "../../store/actions/projectAction";
import { useDispatch } from "react-redux";

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProject({
        title,
        content,
      })
    );
};
```

## 04. Setting Up Firebase, FireStore

firebase 的基本資料儲存起來
`fbConfig.js`

```javascript=
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBoyLqaXxp05IFzH9_5Fg3Md8xypNh-q4c",
  authDomain: "firestore-tut-ce62c.firebaseapp.com",
  databaseURL: "https://firestore-tut-ce62c.firebaseio.com",
  projectId: "firestore-tut-ce62c",
  storageBucket: "firestore-tut-ce62c.appspot.com",
  messagingSenderId: "360050501440",
  appId: "1:360050501440:web:c86fb50a1dc779b8a9bca5",
  measurementId: "G-8HEJ5PH78B",
};

firebase.initializeApp(config);
export default firebase;
```

安裝 redux-firestore, react-redux-firestore
連結 redux.firestore.firebase.react 這四者之間的關係
並使用 compose 連結

- 關於 compose:
  https://medium.com/@shihKai/%E5%BE%9Eredux%E4%BE%86%E5%AD%B8%E7%BF%92functional-programming-compose%E7%AF%87-2934f366b607

`index.js`

```javascript=
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import firebase from "./config/fbConfig";
import "firebase/firestore";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      //讓action取得firebase跟firestore
      thunk.withExtraArgument({
        getFirestore,
      })
    ),
    //連結到哪個資料庫
    reduxFirestore(fbConfig),
  )
);
const rrfConfig = {
  userProfile: "app",
  useFirestoreForProfile: true,
};
const rffProps = {
  firebase,
  useFirestoreForProfile: true,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rffProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
```

這樣我們的 actions 就可以得到 firebase, firestore 的參數
`projectAction.js`

```javascript=
import { CREATE_PROJECT } from "./actions";

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({
      type: CREATE_PROJECT,
      project: {
        title: project.title,
        content: project.content,
      },
    });
  };
};
```
