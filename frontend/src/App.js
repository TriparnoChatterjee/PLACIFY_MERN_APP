import React from "react";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Auth from "./user/pages/Auth";
import Users from "./user/pages/Users";
 

const App = () => {
  const {token,login,logout,userId} = useAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users></Users>}></Route>
        <Route
          path="/:userId/places"
          element={<UserPlaces></UserPlaces>}
        ></Route>
        <Route path="/places/new" element={<NewPlace></NewPlace>}></Route>
        <Route
          path="/places/:placeId"
          element={<UpdatePlace></UpdatePlace>}
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/" element={<Users></Users>}></Route>
        <Route
          path="/:userId/places"
          element={<UserPlaces></UserPlaces>}
        ></Route>
        <Route path="/auth" element={<Auth></Auth>}></Route>
        <Route path="*" element={<Navigate to="/auth" replace />}></Route>
      </React.Fragment>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,

        login: login,
        logout: logout,
      }}
      prop=""
    >
      <Router>
        <MainNavigation></MainNavigation>
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
