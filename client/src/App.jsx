import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import TablePage from "./TablePage";
import HomePage from "./HomePage";

function App() {
  const [users, setUsers] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <Routes>
      <Route path="/table" element={<TablePage users={users} />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
