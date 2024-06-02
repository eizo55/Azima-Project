import "../Styles/settings.css";
import OurButton from "./OurButton";

import { useParams, useNavigate } from "react-router-dom";
import useGroup from "../hooks/groupHook";

const AdminInfo = ({ username, imgUrl, memberId, admins, setAdmins }) => {
  const { id } = useParams();
  const { removeAdmin } = useGroup();
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/UserProfile/${memberId}`);
  };
  const removeAdminClick = (e: any) => {
    e.preventDefault();
    removeAdmin(memberId, id);
    setAdmins(() => admins.filter(({ ID }) => memberId !== ID));
  };

  return (
    <div>
      <div className="member-container">
        <div className="image-name-container-member">
          <img
            src={imgUrl}
            className="image-member-info cursor-pointer"
            onClick={navigateToProfile}
          />
          <h1
            className="member-name bold cursor-pointer"
            onClick={navigateToProfile}
          >
            {username}
          </h1>
        </div>
        <div className="buttons-member-info">
          <OurButton label="Demote" thin onClick={removeAdminClick} />
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
