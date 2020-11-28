import React from "react";
import "./create.scss";

const CreateProject = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      default:
        console.log(e.target.id);
    }
  };
  return (
    <div className="createProject">
      <form action="" onSubmit={handleSubmit}>
        <h5>Sign In</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="content">Content</label>
          <textarea id="content" onChange={handleChange} />
        </div>

        <div className="">
          <button>Create Project</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
