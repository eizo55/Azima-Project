import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

// Types
import {
  Group,
  User,
  UserSignUp,
  UserGroup,
  EventType,
  UserEvents,
  Notification,
} from "../data/types";

const useAuthentication = (): {
  user: User | null;
  setUser: (user: User) => void;
  preferences: number[] | null;
  setPreferences: (preferences: number[] | null) => void;
  preferredGroups: Group[] | null;
  userGroups: UserGroup[] | null;
  userOwnerGroups: Group[] | null;
  userAdminGroups: Group[] | null;
  userEvents: UserEvents[] | null;
  conEvents: UserEvents[] | null;
  userPastEvents: UserEvents[] | null;
  notifications: Notification[] | null;
  register: (e: React.FormEvent<HTMLFormElement>, formData: UserSignUp) => void;
  login: (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => void;
  logout: () => void;
  updateUser: (user_id: number | undefined, userData: any) => void;
  updatePassword: (id: any, password: string) => void;
  getUser: (user_id: string | undefined) => void;
  getUserGroupsDiff: (user_id: any) => void;
  getUserOwnerGroupsDiff: (user_id: any) => void;
  getUserAdminGroupsDiff: (user_id: any) => void;
  getConEvents: (user_id: any) => void;
  getUserPastEvents: (user_id: any) => void;
  deleteAccount: (id: any) => void;
} => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [userEvents, setUserEvents] = useState<UserEvents[] | null>(null);
  const [userPastEvents, setUserPastEvents] = useState<UserEvents[] | null>(
    null
  );
  const [conEvents, setConEvents] = useState<UserEvents[] | null>(null);
  const [preferredGroups, setPreferredGroups] = useState<Group[] | null>(null);
  const [preferences, setPreferences] = useState<number[] | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[] | null>(null);
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );

  const [userOwnerGroups, setUserOwnerGroups] = useState<Group[] | null>(null);
  const [userAdminGroups, setUserAdminGroups] = useState<Group[] | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const groups = localStorage.getItem("preferredGroups");
    const storedUserEvents = localStorage.getItem("userEvents");

    const storedPreferences = localStorage.getItem("preferences");
    if (storedUser && storedUser !== "undefined") {
      setUser(() => storedUser && JSON.parse(storedUser));
    }
    if (groups) {
      setPreferredGroups(() => groups && JSON.parse(groups));
    }
    if (storedPreferences) {
      setPreferences(() => storedPreferences && JSON.parse(storedPreferences));
    }

    if (storedUserEvents) {
      setUserEvents(() => storedUserEvents && JSON.parse(storedUserEvents));
    }
  }, []);

  useEffect(() => {
    user && getUserGroups(user?.ID);
    user && getUserOwnerGroups(user?.ID);
    user && getUserAdminGroups(user?.ID);
    user && getUserEvents(user?.ID);
    user && getUserNot(user?.ID);
    user && getUserPastEvents(user?.ID);
    user && getConEvents(user?.ID);
    user && getUserNot(user?.ID);
  }, [user]);

  const register = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: UserSignUp
  ) => {
    e.preventDefault();

    const {
      name,
      surname,
      username,
      email,
      password,
      profile_image,
      birthdate,
      preferences,
    } = formData;
    try {
      const response = await axios.post("http://localhost:9000/register", {
        name,
        surname,
        username,
        email,
        password,
        profile_image,
        birthdate,
        preferences,
      });

      console.log("Registration successful:", response?.data);
      navigate("/signin");
    } catch (error: any) {
      console.error("Registration failed:", error.response?.data);
      alert(error?.response?.data?.msg);
    }
  };

  const login = async (
    e: React.FormEvent<HTMLFormElement>,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const response = await axios
        .post("http://localhost:9000/login", {
          email,
          password,
        })
        .then((res) => {
          const { user, userPreferences, groups } = res.data;

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("preferredGroups", JSON.stringify(groups));
          localStorage.setItem("preferences", JSON.stringify(userPreferences));

          navigate("/home");
        });
    } catch (error: any) {
      console.error("Error occurred during login:", error);
      alert(error?.response?.data?.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("preferredGroups");

    navigate("/home");

    setUser(null);
    setPreferredGroups(null);
  };

  const getUserGroups = async (user_id: any) => {
    try {
      await axios
        .post(`http://localhost:9000/userGroups`, {
          user_id,
        })
        .then((res) => setUserGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };
  const getUserGroupsDiff = async (user_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/userGroups`, {
        user_id,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserOwnerGroups = async (user_id: any) => {
    try {
      await axios
        .get(`http://localhost:9000/myOwnerGroups/${user_id}`)
        .then((res) => setUserOwnerGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };
  const getUserOwnerGroupsDiff = async (user_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/myOwnerGroups/${user_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserAdminGroups = async (user_id: any) => {
    try {
      await axios
        .get(`http://localhost:9000/myAdminGroups/${user_id}`)
        .then((res) => setUserAdminGroups(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserAdminGroupsDiff = async (user_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/myAdminGroups/${user_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (user_id: number | undefined, userData: User) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/updateUser/${user_id}`,
        userData
      );
      const user = { ...response.data };
      const userPreferences = response.data.user_preferences;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("preferences", JSON.stringify(userPreferences));
      alert("User updated successfully");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updatePassword = async (id: any, password: string) => {
    try {
      const response = await axios.put(`http://localhost:9000/updatePassword`, {
        id,
        password,
      });
      alert("Password updated successfully");
      setUser({ ...user, password: password } as User);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserEvents = async (user_id: number | undefined) => {
    try {
      const response = await axios.post(`http://localhost:9000/userEvents`, {
        user_id,
      });

      localStorage.setItem("userEvents", JSON.stringify(response.data));
    } catch (error: any) {}
  };

  const getUser = async (user_id: string | undefined) => {
    try {
      const response = await axios.post(`http://localhost:9000/userData`, {
        user_id,
      });
      const user = response.data;

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const getUserNot = async (user_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/getUserNots`, {
        user_id,
      });

      setNotifications(() => response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getConEvents = async (user_id: any) => {
    try {
      await axios
        .post(`http://localhost:9000/getConEvents`, {
          user_id,
        })
        .then((res) => setConEvents(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };
  const getUserPastEvents = async (user_id: any) => {
    try {
      const response = await axios
        .post(`http://localhost:9000/getUserPastEvents`, {
          user_id,
        })
        .then((res) => setUserPastEvents(() => res.data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAccount = async (id: any) => {
    try {
      await axios.post(`http://localhost:9000/deleteAccount`, { id });
      alert("Account deleted successfully");
      logout();
      navigate("/home");
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };
  return {
    user,
    userEvents,
    userPastEvents,
    conEvents,
    setUser,
    preferredGroups,
    userGroups,
    preferences,
    setPreferences,
    userOwnerGroups,
    userAdminGroups,
    register,
    login,
    logout,
    updateUser,
    updatePassword,
    notifications,
    getUser,
    getUserGroupsDiff,
    getUserAdminGroupsDiff,
    getUserOwnerGroupsDiff,
    getUserPastEvents,
    getConEvents,
    deleteAccount,
  };
};

export default useAuthentication;
