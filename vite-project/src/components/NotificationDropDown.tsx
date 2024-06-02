import "../Styles/NotificationDropDown.css";
import useAuthentication from "../hooks/userHook";
import { useNavigate } from "react-router-dom";
import Default from "/group-default.jpg";
const NotificationDropDown = ({ imgUrl }) => {
  const { notifications } = useAuthentication();
  const navigate = useNavigate();
  console.log(notifications, "notifications");
  const navigateToPages = (notification: any) => {
    notification?.type === 1 || notification?.type === 2
      ? navigate(`/EventPage/${notification?.event_id}`)
      : navigate(`/GroupPage/${notification?.group_id}`);
  };

  return (
    <div className="flex flex-col drop-down-profile ">
      <div className="flex flex-col gap-4 ">
        {notifications?.map((notification) => (
          <div
            className="NotificationDropDown__item cursor-pointer"
            onClick={() => navigateToPages(notification)}
          >
            {" "}
            <img
              src={
                notification?.type === 1 || notification?.type === 2
                  ? notification?.event_image
                    ? notification?.event_image
                    : Default
                  : notification?.group_image
                  ? notification?.group_image
                  : Default
              }
              alt="notification-img"
              className="image-member-info"
              style={{ marginRight: "1rem" }}
            />
            <p className="notification-message">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationDropDown;
