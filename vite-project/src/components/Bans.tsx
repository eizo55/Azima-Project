import "../Styles/settings.css";
import BannedInfo from "./BannedInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GroupMembers } from "../data/types";
import useGroup from "../hooks/groupHook";

const Bans = () => {
  const [bannedMembers, setBannedMembers] = useState<GroupMembers[]>([]);
  const { id } = useParams();
  const { getBannedMembers } = useGroup();

  useEffect(() => {
    getBannedMembers(id).then((res) => setBannedMembers(res));
  }, []);

  return (
    <div className="members-container-group">
      <h1 className="settings-header">Bans</h1>
      <h1 className="bold set-label">{bannedMembers?.length} Bans</h1>
      <div className="members-container-members">
        {bannedMembers?.map((member) => (
          <BannedInfo
            username={member.username}
            imgUrl={member.profile_image}
            ban={member.ID}
            setban={setBannedMembers}
            banned={bannedMembers}
          />
        ))}
      </div>
    </div>
  );
};

export default Bans;
