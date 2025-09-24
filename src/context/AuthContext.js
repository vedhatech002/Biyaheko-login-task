import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default user for demo/testing
  const defaultUser = {
    terminalId: "T12345",
    username: "demo",
    password: "demo123",
    fullName: "Demo User",
    email: "demo@example.com",
    phone: "9876543210",
    passportNumber: "P1234567",
    dob: "1990-01-01",
    country: "India",
    state: "Maharashtra",
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (!storedUsers) {
          await AsyncStorage.setItem("users", JSON.stringify([defaultUser]));
        }

        const raw = await AsyncStorage.getItem("user");
        if (raw) setUser(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to load user", e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async ({ username, password }) => {
    try {
      if (!username || !password) {
        const msg = "Username and password are required";
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2: msg,
        });
        return { success: false, message: msg };
      }

      const storedUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];

      const foundUser = storedUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) {
        const exists = storedUsers.some((u) => u.username === username);
        const msg = exists ? "Incorrect password" : "User does not exist";

        return { success: false, message: msg };
      }

      await AsyncStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);

      Toast.show({
        type: "success",
        text1: "Welcome 🎉",
        text2: `Hello, ${foundUser.fullName || foundUser.username}`,
      });

      return { success: true };
    } catch (err) {
      console.warn("login error", err);
      const msg = "Something went wrong";
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: msg,
      });
      return { success: false, message: msg };
    }
  };

  const register = async (formData) => {
    try {
      const storedUsers = JSON.parse(await AsyncStorage.getItem("users")) || [];
      console.log("stored", storedUsers);
      if (storedUsers.some((u) => u.username === formData.username)) {
        return {
          success: false,
          field: "username",
          message: "Username already taken",
        };
      }
      if (storedUsers.some((u) => u.email === formData.email)) {
        return {
          success: false,
          field: "email",
          message: "Email already registered",
        };
      }
      if (storedUsers.some((u) => u.phone === formData.phone)) {
        return {
          success: false,
          field: "phone",
          message: "Phone number already registered",
        };
      }

      const newUser = {
        ...formData,
        token: "local-token-" + Date.now(),
        registeredAt: new Date().toISOString(),
      };

      const updatedUsers = [...storedUsers, newUser];
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
      await AsyncStorage.setItem("user", JSON.stringify(newUser));

      setUser(newUser);
      Toast.show({
        type: "success",
        text1: "Account created 🎉",
        text2: `Welcome, ${newUser.fullName || newUser.username}`,
      });
      return { success: true };
    } catch (e) {
      console.warn("register error", e);
      return { success: false, field: null, message: "Something went wrong" };
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
