import React from "react";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function DashBoard() {
  let storeObj = useSelector((store) => {
    return store;
  });
  return (
    <div className="dashstyle">
      <TopNavigation />
      <div>
        <h2>Dashboard</h2>
        <h3>
          Welcome: {storeObj.userDetails.firstName}{" "}
          {storeObj.userDetails.lastName}
        </h3>
        <img
          alt="dashimage"
          src={`http://localhost:4444/${storeObj.userDetails.profilePic}`}
        ></img>
      </div>
    </div>
  );
}

export default DashBoard;
