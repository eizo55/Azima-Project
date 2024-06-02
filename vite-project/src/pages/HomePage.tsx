import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useEvent from "../hooks/eventHook";
import useAuthentication from "../hooks/userHook";

import NavBar from "../components/navbar";
import { Footer } from "../components/Footer";
import { IntroPicture } from "../components/IntroPicture";
import OurButton from "../components/OurButton";
import { EventSlider } from "../components/EventSlider";

import "../Styles/App.css";

export default function HomePage() {
  const { user, preferredGroups, userGroups, userEvents } = useAuthentication();
  const { events } = useEvent();
  const navigate = useNavigate();

  const [comedyData, setComedyData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [sportsData, setSportsData] = useState([]);
  const [religionData, setReligionData] = useState([]);

  const randomGroups = async () => {
    try {
      const response = await axios.get("http://localhost:9000/randomGroups");

      setComedyData(response.data.comedy);
      setEducationData(response.data.education);
      setSportsData(response.data.sports);
      setReligionData(response.data.religion);
    } catch (error) {
      console.error(error);
    }
  };

  // Groups data for the EventSlider component
  const groupsData = [
    { id: 0, label: "Comedy Groups", data: comedyData },
    { id: 1, label: "Sports Groups", data: sportsData },
    { id: 2, label: "Education Groups", data: educationData },
    { id: 3, label: "Religion Groups", data: religionData },
  ];

  // Get groups
  useEffect(() => {
    randomGroups();
  }, []);

  return (
    <div>
      <NavBar navType="Navbar" />
      <IntroPicture />

      <div className="home-container">
        {user && (
          <>
            <div className="create-group">
              <OurButton
                label="Create Group"
                position="right"
                onClick={() => navigate("/CreateGroup")}
              />
            </div>
            {preferredGroups && (
              <EventSlider object={preferredGroups} label="Suggested Groups" />
            )}
            {userGroups && (
              <EventSlider object={userGroups} label="Your Groups" />
            )}

            {events?.length > 0 && (
              <EventSlider object={events} label="Your Events" />
            )}
          </>
        )}

        {groupsData.map(({ id, data, label }) => (
          <EventSlider key={id} object={data} label={label} />
        ))}
      </div>

      <Footer />
    </div>
  );
}
