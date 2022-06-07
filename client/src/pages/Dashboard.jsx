// import hooks
import React, { useState, useEffect } from "react";

// import utils
import Security from "../utils/security";
import { fetchAllActivities, getUserData, createActivity } from "../utils/API";

//import components
import Navbar from "../components/Navbar";
import ActivityBank from "../components/ActivityBank";
import UserActivities from "../components/UserActivities";
import CreateActivityForm from "../components/CreateActivityForm";
import MyDay from "../components/MyDay";

function Dashboard() {
  // state for activities to be added to the my day box
  // will be passed into the myDay Component
  const [myDayActivities, setMyDayActivities] = useState([]);

  // state for all activities fetch
  const [communityActivities, setCommunityActivities] = useState([]);

  const [userActivities, setUserActivities] = useState([]);

  const [formState, setForm] = useState({});

  const handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm({ ...formState, [name]: value });
  };

  // happens on page load, but may need to also happen when userActivities change
  useEffect(() => {
    const communityDataFetch = async () => {
      try {
        const res = await fetchAllActivities();

        if (!res.ok) {
          alert("Something went wrong with fetching all activities");
        }

        const data = await res.json();
        setCommunityActivities(data);
      } catch (err) {
        alert("Something went wrong with the communityDataFetch");
      }
    };

    const userDataFetch = async () => {
      try {
        const token = Security.loggedIn() ? Security.getToken() : null;

        if (!token) {
          alert("something went wrong with the token");
          return false;
        }

        const res = await getUserData(token);

        if (!res.ok) {
          alert("Something Went Wrong with getting user data");
        }

        const data = await res.json();
        // console.log(data.user.createdActivities);
        setUserActivities(data.user.createdActivities);
      } catch (err) {
        alert("Something Went Wrong with the userdatafetch function");
      }
    };

    userDataFetch();
    communityDataFetch();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = Security.loggedIn() ? Security.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const res = await createActivity(formState, token);
      if (!res.ok) {
        alert("something went wrong while creating activity");
      }
      const newAct = await res.json();
      debugger;
      console.log(newAct);
      debugger;
      setUserActivities([newAct, ...userActivities]);
      debugger;
    } catch (err) {
      alert("Something went wrong with whole function");
    }
  };

  // const handleMoveToMyDay = () => {};

  return (
    <>
      <Navbar />
      <div className="grid md:grid-rows-2-md md:grid-flow-col m-3 gap-3 text-center">
        <div className="card md:col-span-8 bg-neutral w-full p-3 text-center">
          <h2 className="card-header text-3xl font-bold">Build your Day</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {/* comment */}
            {/* this should be the user activities component, being passed userActivities stateful value */}
            <UserActivities
              className="md:col-span-8"
              userActivities={userActivities}
            />
            {/* create activity form */}
            <CreateActivityForm
              handleFormChange={handleFormChange}
              handleFormSubmit={handleFormSubmit}
              className="md:col-span-4"
            />
          </div>
          <ActivityBank />
        </div>
        <div className="md:col-span-4">
          <MyDay />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
