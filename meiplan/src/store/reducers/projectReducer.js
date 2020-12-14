import { CREATE_PROJECT, CREATE_PROJECT_ERR } from "../actions/actions";
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
      return state;
    case CREATE_PROJECT_ERR:
      console.log("err", action.err);
      return state;
    default:
      console.log("default");
      return state;
  }
};

export default projectReducer;
