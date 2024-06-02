import OurButton from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useAuthentication from "../hooks/userHook";
import { isDateInPast } from "../data/helpers";
const MyEvents = () => {
  const { userEvents, userPastEvents, conEvents } = useAuthentication();
  console.log(userPastEvents?.map((userEvent) => userEvent.name));
  return (
    <div>
      <h1 className="settings-header push-down">My Events</h1>
      {userEvents?.length !== 0 && userEvents && (
        <>
          <h2 className="my-events-headers bold ">Scheduled Events</h2>
          <div className="events-together">
            {userEvents?.map(
              (userEvent) =>
                !isDateInPast(userEvent.event_date) && (
                  <Event
                    label={userEvent.name}
                    isSingle
                    isEvent
                    imageUrl={userEvent.event_image}
                    id={userEvent.event_id}
                  />
                )
            )}
          </div>
        </>
      )}
      {conEvents?.length !== 0 && conEvents && (
        <>
          <h2 className="my-events-headers bold ">You are contributor here</h2>
          <div className="events-together">
            {conEvents?.map(
              (userEvent) =>
                !isDateInPast(userEvent.event_date) && (
                  <Event
                    label={userEvent.name}
                    isSingle
                    isEvent
                    imageUrl={userEvent.event_image}
                    id={userEvent.event_id}
                  />
                )
            )}
          </div>
        </>
      )}
      <p></p>
      {userPastEvents?.length !== 0 && userPastEvents && (
        <>
          <h2 className="my-events-headers bold ">Past Events</h2>
          <div className="events-together">
            {userPastEvents?.map((userEvent) => (
              <Event
                label={userEvent.name}
                isSingle
                isEvent
                imageUrl={userEvent.event_image}
                id={userEvent.event_id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyEvents;
