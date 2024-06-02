import "../Styles/settings.css";
import OurButton from "./OurButton";
import ImgHolder from "../assets/MartinGarrix.png";
import useGroup from "../hooks/groupHook";
import { useParams, useNavigate } from "react-router-dom";

const BannedInfo = ({ username, imgUrl, ban, banned, setban }) => {
  const { id } = useParams();
  const { removeBan } = useGroup();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/UserProfile/${ban}`);
  };
  const removeBanClick = (e: any) => {
    e.preventDefault();
    removeBan(ban, id);
    setban(() => banned.filter(({ ID }) => ban !== ID));
  };

  return (
    <div className="member-container">
      <div
        className="image-name-container-member cursor-pointer"
        onClick={navigateToProfile}
      >
        <img src={imgUrl} className="image-member-info" />
        <h1
          className="member-name bold cursor-pointer"
          onClick={navigateToProfile}
        >
          {username}
        </h1>
      </div>
      <div className="buttons-member-info">
        <OurButton label="Remove Ban" thin onClick={removeBanClick} />
      </div>
    </div>
  );
};

export default BannedInfo;
