import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function MyDay({ myDayActivities }) {
  if (myDayActivities.length === 0) {
    return (
      <div className="card bg-neutral w-full p-3">
        <h2 className="card-header text-2xl mb-3">My Day</h2>
        <div>
          <div>
            <h1 className="text-3xl">Nothing So Far...</h1>
            <h1 className="text-xl">Click an activity add to YourDay!</h1>
          </div>
        </div>
      </div>
    );
  }

  const color = "primary";
  return (
    <div className="card bg-neutral w-full p-3">
      <h2 className="car-header text-2xl ">My Day</h2>
      <div className="grid grid-cols-2 gap-3 my-3">
        {myDayActivities.map((activity) => (
          <Button key={activity._id} activity={activity} color={color} handleMoveToMyDay={()=>{}} />
        ))}
      </div>
      <Link to="/YourDay" state={{ from: myDayActivities }}>
        <button className="btn btn-warning w-full">Start my Day!</button>
      </Link>
    </div>
  );
}

export default MyDay;
