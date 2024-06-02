import { useNavigate } from "react-router-dom";

import Ticket from "../assets/ticket.svg";

import Calendar from "../assets/Schedule.svg";
import location from "../assets/location.svg";
import queue from "../assets/queue.svg";

import { Group, UserGroup, EventType } from "../data/types";
import "../Styles/event.css";
import useGroup from "../hooks/groupHook";
import { useEffect, useState } from "react";
import LockPrivate from "../assets/lockprivate.svg";
import useEvent from "../hooks/eventHook";
import { formatDate } from "../data/helpers";

interface EventProps {
  label: string;
  imageUrl: string;
  id: number;
  isEvent?: boolean;
  isSingle?: boolean;
}

// Fixed
export const Event = ({
  label,
  imageUrl,
  id,
  isEvent = false,
  isSingle = false,
}: EventProps) => {
  const navigate = useNavigate();
  const { getGroupMembers, getGroup } = useGroup();
  const { getEventData } = useEvent();
  const [groupData, setGroupData] = useState<Group | null>(null);
  const [groupMembers, setGroupMembers] = useState<UserGroup[] | null>(null);
  const [eventData, setEventData] = useState<EventType | null>(null);

  useEffect(() => {
    !isEvent && getGroup(id).then((res) => setGroupData(res));
    !isEvent && getGroupMembers(id).then((res) => setGroupMembers(res));

    isEvent && getEventData(id).then((res) => setEventData(res));
  }, [id]);

  return (
    <div
      className={isSingle ? "event-single " : "event"}
      onClick={() =>
        navigate(isEvent ? `/EventPage/${id}` : `/GroupPage/${id}`)
      }
    >
      <div className="image-container-hover">
        <img
          className="event-image"
          src={imageUrl || "/src/assets/group-default-image.webp"}
          alt={label}
        />
        <div className="overlay-hover">
          {isEvent ? (
            <>
              <div className="hovered-items">
                <img src={location} alt="event type" />
                <img src={Calendar} alt="location" />
                <img src={Ticket} alt="date" />
              </div>
              <div className="hovered-texts">
                <p>{eventData?.location || "-"} </p>
                {/*  <p>{groupData?.categories || "-"}</p> */}
                <p>{formatDate(eventData?.event_date) || "-"}</p>
                <p>{eventData?.ticket_price}</p>
              </div>
            </>
          ) : (
            <>
              <div className="hovered-items">
                <img src={LockPrivate} alt="event type" />
                <img src={location} alt="location" />
                <img src={Calendar} alt="date" />
                <img src={queue} alt="Members" />
              </div>
              <div className="hovered-texts">
                <p>
                  {groupData?.is_private_group
                    ? "Private"
                    : !groupData?.is_private_group
                    ? "Public"
                    : "-"}
                </p>
                {/*  <p>{groupData?.categories || "-"}</p> */}
                <p>{groupData?.location || "-"}</p>
                <p>
                  {groupData?.is_online
                    ? "Online"
                    : groupData?.is_f2f
                    ? "F2F"
                    : groupData?.is_online && groupData?.is_f2f
                    ? "F2F, Online"
                    : "-"}{" "}
                </p>
                <p>{groupMembers?.length}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <label className="event-label">{label}</label>
    </div>
  );
};
