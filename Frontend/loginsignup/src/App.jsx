import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContextProvider } from "./context";
import AppHome from "./Pages/AppHome";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import OwnerContact from "./Pages/OwnerContact";
import QRCodeGenerator from "./Pages/QRCodeGenerator";
import Signup from "./Pages/Signup";
import axios from "axios";
import UserSavedQrCodeList from "./Pages/UserSavedQrCodeList";

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userLocalToken, setUserLocalToken] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  const toggleUserLog = (val) => {
    setIsUserLoggedIn(val);
  };
  const updateLocalToken = (tokenF) => {
    setUserLocalToken(tokenF);
  };

  const updateUserDetails = (objF) => {
    setUserDetails(objF);
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("Token"));
    console.log(token);
    if (token) {
      updateLocalToken(token);
      toggleUserLog(true);

      // ifToken is There Then Fetch USER DATA
      // FETCH DATA

      const fetchData = (localtoken) => {
        let data = "";
        console.log(localtoken);
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: "http://localhost:3000/getuserdetails",
          headers: { token: localtoken, "Content-Type": "application/json" },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));

            let dataR = JSON.parse(JSON.stringify(response.data));

            console.log(dataR);

            updateUserDetails(dataR);
          })
          .catch((error) => {
            console.log(error.message);
            if (error.message == "Network Error") {
              alert("Please Check Your Internet Connection !");
            }
          });
      };

      fetchData(token);
    } else {
      updateLocalToken(null);
      toggleUserLog(false);
      return;
    }
  }, [isUserLoggedIn]);

  return (
    <>
      <UserContextProvider
        value={{
          isUserLoggedIn,
          userLocalToken,
          userDetails,
          toggleUserLog,
          updateLocalToken,
          updateUserDetails,
        }}
      >
        <Routes>
          <Route exact path="/" element={<AppHome />}>
            <Route index exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/Home" element={<Home />} />
            <Route
              exact
              path="/generatenewqrcodes"
              element={<QRCodeGenerator />}
            />
            <Route
              exact
              path="/savedqrcodes"
              element={<UserSavedQrCodeList />}
            />
            <Route exact path="/contact" element={<OwnerContact />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
}
