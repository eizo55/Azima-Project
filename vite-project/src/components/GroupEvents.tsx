import "../Styles/settings.css";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useGroup from "../hooks/groupHook";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EventType } from "../data/types";

const GroupEvents = () => {
  const [groupEvents, setGroupEvents] = useState<EventType[]>([]);
  const { id } = useParams();
  const { getGroupEvents } = useGroup();

  useEffect(() => {
    getGroupEvents(id).then((res) => setGroupEvents(res));
  });

  return (
    <div>
      <h1 className="settings-header">Group Events</h1>
      <div className="events-together">
        {groupEvents?.map((event) => (
          <Event isSingle label={event.name} imageUrl={event.event_image} />
        ))}
      </div>
    </div>
  );
};

export default GroupEvents;
