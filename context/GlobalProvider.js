import React, { createContext, useContext, useEffect, useState } from "react";

import { getAccount, getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  const initializeAuth = async () => {
    try {
      // First try to load from AsyncStorage
      // const persistedUser = await AsyncStorage.getItem("user");
      // const persistedIsLogged = await AsyncStorage.getItem("isLogged");

      // if (persistedUser && persistedIsLogged) {
      //   setUser(JSON.parse(persistedUser));
      //   setIsLogged(JSON.parse(persistedIsLogged));
      // }

      // Then verify with getCurrentUser
      const currentUser = await getAccount();
      if (currentUser) {
        setIsLogged(true);
        setUser(currentUser);
        // await AsyncStorage.setItem("user", JSON.stringify(currentUser));
        // await AsyncStorage.setItem("isLogged", JSON.stringify(true));
        // console.log("User authenticated:", currentUser);
      } else {
        // Clear everything if no current user
        setIsLogged(false);
        setUser(null);
        // await AsyncStorage.multiRemove(["user", "isLogged"]);
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      // Clear everything on error
      setIsLogged(false);
      setUser(null);
      // await AsyncStorage.multiRemove(["user", "isLogged"]);
    } finally {
      setLoading(false);
    }
  };

  // Update user state with persistence
  const updateUser = async (newUser) => {
    try {
      if (newUser) {
        setUser(newUser);
        // await AsyncStorage.setItem("user", JSON.stringify(newUser));
      } else {
        setUser(null);
        // await AsyncStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Update logged state with persistence
  const updateIsLogged = async (value) => {
    try {
      setIsLogged(value);
      if (value) {
        // await AsyncStorage.setItem("isLogged", JSON.stringify(value));
      } else {
        // await AsyncStorage.removeItem("isLogged");
      }
    } catch (error) {
      console.error("Error updating logged state:", error);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
