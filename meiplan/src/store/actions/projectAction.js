export const createProject = (project) => {
  return (dispatch, getState) => {
    dispatch({
      type: "CREATE_PROJECT",
      project: {
        title: project.title,
        content: project.content,
      },
    });
  };
};
