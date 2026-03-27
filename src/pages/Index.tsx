import { useState } from "react";
import Login from "./Login";
import Dashboard from "@/components/dashboard/Dashboard";

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return <Dashboard onLogout={() => setLoggedIn(false)} />;
};

export default Index;
