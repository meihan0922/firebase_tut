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
