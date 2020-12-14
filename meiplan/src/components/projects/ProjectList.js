import React from "react";
import ProjectSummary from "./ProjectSummary";
import { useSelector } from "react-redux";

const ProjectList = () => {
  const list = useSelector((state) => state.product.project);
  console.log("list", list);
  return (
    <div className="project-list">
      {list.length > 0 &&
        list.map((item) => {
          return (
            <ProjectSummary
              key={item.id}
              title={item.title}
              content={item.content}
            />
          );
        })}
    </div>
  );
};

export default ProjectList;
