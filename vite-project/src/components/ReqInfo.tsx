import "../Styles/settings.css";

import { useNavigate } from "react-router-dom";

const ReqInfo = ({ username, imgUrl, memberId }) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/UserProfile/${memberId}`);
    window.location.reload();
  };
  return (
    <div className="member-container" style={{ width: "50rem" }}>
      <div className="image-name-container-member">
        <img
          onClick={navigateToProfile}
          src={imgUrl}
          className="image-member-info cursor-pointer"
        />
        <h1
          onClick={navigateToProfile}
          className="member-name bold cursor-pointer"
        >
          {username}
        </h1>
      </div>
    </div>
  );
};

export default ReqInfo;
