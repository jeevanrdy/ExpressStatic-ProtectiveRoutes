import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function TopNavigation() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => {
    return store;
  });

  useEffect(() => {
    if (storeObj && storeObj.userDetails && storeObj.userDetails.email) {
    } else {
      navigate("/");
    }
  });
  // useEffect(() => {
  //   // Check if user details are available in the Redux store or localStorage
  //    let userDetails = storeObj.userDetails || JSON.parse(localStorage.getItem('userDetails'));

  //   if (userDetails && userDetails.email) {
  //     // If user details exist, store them in localStorage (if not already there)
  //     if (!storeObj.userDetails) {
  //       localStorage.setItem('userDetails', JSON.stringify(userDetails));
  //     }
  //   } else {
  //     navigate("/");
  //   }
  // }, [navigate, storeObj]);

  // // Logout function
  // let handleLogout = () => {
  //   localStorage.removeItem('userDetails'); // Remove user details from localStorage
  //   navigate("/");
  // };

  return (
    <nav>
      <Link to="/dashboard">DashBoard</Link>
      <Link to="/editprofile">EditProfile</Link>
      <Link to="/about">About</Link>
      {/* <Link to="/" onClick={handleLogout}>
        Logout
      </Link> */}
      <Link to="/">Logout</Link>
    </nav>
  );
}

export default TopNavigation;
