import React from "react";
import "./projectsummary.scss";

const ProjectSummary = (props) => {
  return (
    <div className="project-summary">
      <div className="card">
        <span className="card-content">{props.title}</span>
        <p>{props.content}</p>
        <p className="grey-text">2020, 11, 25</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
