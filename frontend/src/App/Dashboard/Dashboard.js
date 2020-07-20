import React from "react";
import Buglist from "./Buglist/Buglist";
import BugDetails from "./BugDetails/BugDetails";
import BugCreate from "./BugCreate/BugCreate";

function Dashboard() {
  return (
    <main>
      <BugCreate bugID="1"/>
    </main>
  );
}

export default Dashboard;
