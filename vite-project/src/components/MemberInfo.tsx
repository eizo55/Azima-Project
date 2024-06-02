import "../Styles/settings.css";
import OurButton from "./OurButton";
import useGroup from "../hooks/groupHook";
import { useParams, useNavigate } from "react-router-dom";
import { GroupMembers } from "../data/types";

const MemberInfo = ({
  username,
  imgUrl,
  memberId,
  isOwner,
  groupMembers,
  setGroupMembers,
  isAdmin,
}) => {
  const { id } = useParams();
  const { banMember, assignAdmin } = useGroup();

  const banMemberClick = (e: any) => {
    e.preventDefault();
    banMember(memberId, id);
    setGroupMembers(() => groupMembers.filter(({ ID }) => memberId !== ID));
  };

  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate(`/UserProfile/${memberId}`);
  };

  const assignAdminClick = () => {
    assignAdmin(memberId, id);
  };
  return (
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
        {!isOwner && !isAdmin ? (
          <>
            <OurButton
              label="Ban"
              thin
              variant="alert"
              onClick={banMemberClick}
            />
            <OurButton label="Assign Admin" thin onClick={assignAdminClick} />
          </>
        ) : (
          <p className="owner-members-settings">
            {isAdmin ? "Admin" : "Owner"}
          </p>
        )}
      </div>
    </div>
  );
};

export default MemberInfo;
