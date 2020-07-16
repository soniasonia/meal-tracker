import React from "react";

const Dashboard = ({ user, logoutAction }) => (
    <div>
      <div>
        Hello, you are authorized as {user.name}
      </div>
      <button onClick={() => logoutAction()} className="item">
        Log out
      </button>
    </div>
  )

export {
  Dashboard
}