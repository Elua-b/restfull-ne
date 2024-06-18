import { FC } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
// import { useAuth } from "./contexts/AuthProvider";
import { useAuth } from "@/context/AuthProvider";

import Login from "@/pages/auth/login";
import DashboardLayout from "./Layout/ui/Dashboard/DashboardLayout";


import Account from "@/components/account";
import UsersTable from "@/components/userTable";

import Signup from "@/pages/auth/signup";
import { NoMatch } from "@/pages";
import BookTable from "@/components/BookTable";


const App: FC = () => {
  const { user } = useAuth();

  const token = sessionStorage.getItem("token");
  const AuthRoute = () => {
    if (token) {
      return <Outlet />;
    }
    return <Navigate to="/" />;
  };

  
  return (
    <>
   

      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="users" element={<UsersTable />} />
            <Route path="analytics" element={<BookTable/>} />
            <Route path="account" element={<Account/>} />
          </Route>
        </Routes>
      </BrowserRouter>
   
    </>
  );
};

export default App;
