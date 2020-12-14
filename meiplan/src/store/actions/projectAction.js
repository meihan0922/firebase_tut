import { CREATE_PROJECT, CREATE_PROJECT_ERR } from "./actions";

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection("app")
      .add({
        ...project,
        authorFirstName: "黃",
        authorLastName: "美美",
        authorId: 12345,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({
          type: CREATE_PROJECT,
          project: {
            title: project.title,
            content: project.content,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: CREATE_PROJECT_ERR,
          err,
        });
      });
  };
};
