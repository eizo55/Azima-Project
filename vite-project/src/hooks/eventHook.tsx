import { useEffect, useState } from "react";
import axios from "axios";
import useAuthentication from "./userHook";

import { useNavigate } from "react-router-dom";

const useEvent = () => {
  const [event, setEvent] = useState([]);

  const navigate = useNavigate();

  const createEvent = async (eventData: any, user_id: any) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/createEvent",
        eventData
      );

      setEvent(() => response.data);

      navigate(`/EventPage/${response.data.event_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getEventData = async (event_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/getEventData/${event_id}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const joinEvent = async (event_id: any, user_id: any) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/joinEvent/${event_id}`,
        { user_id }
      );

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const leaveEvent = async (user_id: any, event_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/leaveEvent`, {
        user_id,
        event_id,
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
      console.log("error");
    }
  };

  const getEventUsers = async (event_id: any) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/eventUsers/${event_id}`
      );

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const sendConRequest = async (event_id: any, user_id: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/sendConRequest`, {
        event_id,
        user_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const rateEvent = async (
    star: number,
    comment: string,
    event_id: any,
    user_id: any
  ) => {
    try {
      const response = await axios.post(`http://localhost:9000/rateEvent`, {
        star,
        comment,
        event_id,
        user_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const getEventRatings = async (event_id: any) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/getEventRatings`,
        {
          event_id,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const deleteRating = async (rate_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/deleteRating`, {
        rate_id,
      });

      window.location.reload();
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const getEventOwner = async (event_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/getEventOwner`, {
        event_id,
      });

      return response.data;

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const deleteEvent = async (event_id: any) => {
    try {
      const response = await axios.post(`http://localhost:9000/deleteEvent`, {
        event_id,
      });

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const getEventContributors = async (event_id: any) => {
    try {
      const response = await axios.post(
        `http://localhost:9000/getContributors`,
        {
          event_id,
        }
      );

      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  const conResponse = async (event_id: any, user_id: any, status: any) => {
    try {
      const response = await axios.put(`http://localhost:9000/conResponse`, {
        event_id,
        user_id,
        status,
      });
      console.log("event_id", event_id, "user_id", user_id, "status", status);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };
  return {
    conResponse,
    event,
    getEventContributors,
    createEvent,
    getEventData,
    joinEvent,
    leaveEvent,
    sendConRequest,
    getEventUsers,
    getEventOwner,
    rateEvent,
    getEventRatings,
    deleteRating,
    deleteEvent,
  };
};

export default useEvent;
