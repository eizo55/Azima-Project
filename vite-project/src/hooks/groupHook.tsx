import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Group } from "../data/types";
import { user } from "../data/helpers";

interface Categories {
  value: string;
  label: string;
  category_id: number;
}

const useGroup = () => {
  const [group, setGroup] = useState({});
  const [categories, setCategories] = useState<Categories[]>([]);

  const navigate = useNavigate();

  const createGroup = async (groupData) => {
    console.log(groupData, "groupData");
    try {
      const response = await axios.post(
        "http://localhost:9000/createGroup",
        groupData
      );

      setGroup(() => response.data);

      navigate(`/GroupPage/${response.data.newGroup.group_id}`);
    } catch (error) {
      console.error("error");
    }
  };

  const getGroup = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroup/${group_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    const response = await axios.get("http://localhost:9000/getCategories");

    const transformedData = response?.data.map((item: any) => ({
      value: item.name,
      label: item.name,
      category_id: item.category_id,
    }));

    setCategories(transformedData);
  };

  const getGroupMembers = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroupMembers/${group_id}`
      );
      return response.data;
    } catch (error) {
      console.error("404 Group Member couldn't be fetched");
    }
  };
  const getGroupRequests = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroupReqs/${group_id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getGroupEvents = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getGroupEvents/${group_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getGroupPastEvents = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getPastEvents/${group_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const getAdmins = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getAdmins/${group_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const updateGroup = async (groupData: any) => {
    try {
      const response = await axios.put(
        `http://localhost:9000/updateGroup`,
        groupData
      );

      alert("Info updated successfully");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const banMember = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/banMember`, {
        group_id: groupID,
        user_id: userID,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const assignAdmin = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/assignAdmin`, {
        group_id: groupID,
        user_id: userID,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const removeAdmin = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/removeAdmin`, {
        group_id: groupID,
        user_id: userID,
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const removeBan = async (userID: any, groupID: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/removeBan`, {
        group_id: groupID,
        user_id: userID,
      });

      return response.data;
    } catch (error) {
      console.error("404 Failed to remove ban");
    }
  };

  const getBannedMembers = async (group_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/BannedMembers/${group_id}`
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const joinGroup = async (user_id: any, group_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/joinGroup`, {
        user_id,
        group_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const leaveGroup = async (user_id: any, group_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/leaveGroup`, {
        user_id,
        group_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const joinGroupResponse = async (
    group_id: any,
    user_id: any,
    status: string
  ) => {
    try {
      const response = await axios.put(`http://localhost:9000/joinGroupRes`, {
        group_id,
        user_id,
        status,
      });
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const deleteGroup = async (group_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/deleteGroup`, {
        group_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  return {
    group,
    categories,
    createGroup,
    getGroup,
    getGroupMembers,
    getGroupEvents,
    getGroupPastEvents,
    getBannedMembers,
    getGroupRequests,
    getAdmins,
    banMember,
    joinGroup,
    removeBan,
    assignAdmin,
    getCategories,
    removeAdmin,
    leaveGroup,
    joinGroupResponse,
    updateGroup,
    deleteGroup,
  };
};

export default useGroup;
