import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export const appContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backend_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get(backend_URL + "/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const authstatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const { data } = await axios.get(backend_URL + "/auth/isauth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setisLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    backend_URL,
    isLoggedIn,
    setisLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  useEffect(() => {
    authstatus();
  }, []);

  return (
    <appContext.Provider value={value}>{props.children}</appContext.Provider>
  );
};
