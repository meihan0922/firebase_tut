import React from "react";
import Notification from "./Notification";
import ProjectList from "../projects/ProjectList";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <ProjectList />
      <Notification />
    </div>
  );
};

export default Dashboard;
