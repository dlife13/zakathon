import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Button } from "@/components/ui/button";

function App() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
