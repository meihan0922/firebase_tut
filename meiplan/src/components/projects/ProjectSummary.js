import React from "react";
import "./projectsummary.scss";

const ProjectSummary = () => {
  return (
    <div className="project-summary">
      <div className="card">
        <span className="card-content">Project Title</span>
        <p>Posted by the Mei</p>
        <p className="grey-text">2020, 11, 25</p>
      </div>
    </div>
  );
};

export default ProjectSummary;
