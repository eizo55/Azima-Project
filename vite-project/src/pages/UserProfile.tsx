import NavBar from "../components/navbar";
import { EventSlider } from "../components/EventSlider";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthentication from "../hooks/userHook";

import { UserGroup, Group, User } from "../data/types";

import { formatDate } from "../data/helpers";

const UserProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [userGroups, setUserGroups] = useState<UserGroup[] | null>(null);
  const [userAdminGroups, setUserAdminGroups] = useState<Group[] | null>(null);
  const [userOwnerGroups, setUserOwnerGroups] = useState<Group[] | null>(null);
  const { id } = useParams();

  const {
    getUser,
    getUserGroupsDiff,
    getUserAdminGroupsDiff,
    getUserOwnerGroupsDiff,
  } = useAuthentication();

  const userInfo = [
    {
      info: "Email",
      details: userData?.email,
      show: !userData?.is_email_private,
    },
    { info: "Birthdate", details: formatDate(userData?.birthdate), show: true },
  ];

  useEffect(() => {
    getUserGroupsDiff(id).then((res) => setUserGroups(res));
    getUserOwnerGroupsDiff(id).then((res) => setUserOwnerGroups(res));
    getUserAdminGroupsDiff(id).then((res) => setUserAdminGroups(res));
    getUser(id).then((res) => {
      setUserData(res);
    });
  }, []);

  return (
    <div>
      <NavBar navType="fnav" />
      <div
        className="profile-container img-container"
        style={{
          position: "relative",
        }}
      >
        <img
          src={"/src/assets/MainPageBackground.png"}
          alt=""
          className="event-img"
        />
        <div className="profile-image-info-container">
          <img
            src={userData?.profile_image}
            alt="profilepic"
            className="profile-image"
          />
          <h1>@{userData?.username}</h1>
          {!userData?.is_name_private && (
            <p>{userData?.name + " " + userData?.surname}</p>
          )}
          {userInfo.map(
            ({ info, details, show }) =>
              show && (
                <div key={info} className="info">
                  <p>
                    <span style={{ fontWeight: 700 }}>{info}:</span> {details}
                  </p>
                </div>
              )
          )}
        </div>
      </div>
      <div className="event-container">
        <h1 className=""></h1>
        {userGroups && (
          <EventSlider
            label={userData?.username + " Groups: " + userGroups?.length}
            object={userGroups}
          />
        )}
        {userOwnerGroups && (
          <EventSlider
            label={
              userData?.username + " Owned Groups: " + userOwnerGroups?.length
            }
            object={userOwnerGroups}
          />
        )}
        {userAdminGroups && (
          <EventSlider
            label={
              userData?.username + " Admin Groups: " + userAdminGroups?.length
            }
            object={userAdminGroups}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
