const initState = {
  project: [
    { id: 1, title: "標題A", content: "內容A" },
    { id: 2, title: "標題B", content: "內容B" },
    { id: 3, title: "標題C", content: "內容C" },
  ],
};

const projectReducer = (state = initState, action) => {
  return state;
};

export default projectReducer;
