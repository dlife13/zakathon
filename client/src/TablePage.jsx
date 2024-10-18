import "./App.css";

import UserTable from "./components/UserTable.jsx";

export default function TablePage({ users }) {
  return (
    <>
      <div>
        <h1>User Leaderboard</h1>
        <UserTable users={users} />
      </div>
    </>
  );
}
