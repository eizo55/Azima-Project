import OurButton from "./OurButton";
import { Event } from "./Event";
import Test from "../assets/Eid.png";
import useAuthentication from "../hooks/userHook";
import { useEffect } from "react";
const MyGroups = () => {
  const { userOwnerGroups, userAdminGroups, userGroups } = useAuthentication();

  return (
    <div>
      <h1 className="settings-header push-down">My Groups</h1>
      {userOwnerGroups?.length !== 0 && userOwnerGroups && (
        <>
          {" "}
          <h2 className="my-events-headers bold ">Owner</h2>
          <div className="events-together">
            {userOwnerGroups?.map((group) => (
              <Event
                label={group.name}
                isSingle
                imageUrl={group.group_image}
                id={group.group_id}
              />
            ))}
          </div>
        </>
      )}

      {userAdminGroups?.length !== 0 && userAdminGroups && (
        <>
          {" "}
          <h2 className="my-events-headers bold ">Admin</h2>
          <div className="events-together">
            {userAdminGroups?.map((group) => (
              <Event
                isSingle
                label={group.name}
                imageUrl={group.group_image}
                id={group.group_id}
              />
            ))}
          </div>
        </>
      )}
      {userGroups?.length !== 0 && userGroups && (
        <>
          {" "}
          <h2 className="my-events-headers bold ">Member</h2>
          <div className="events-together">
            {userGroups?.map((group) => (
              <Event
                isSingle
                label={group.name}
                imageUrl={group.group_image}
                id={group.group_id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyGroups;
