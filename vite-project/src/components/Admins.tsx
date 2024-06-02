import "../Styles/settings.css";
import AdminInfo from "./AdminInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useGroup from "../hooks/groupHook";
import { GroupMembers } from "../data/types";

const Admins = () => {
  const [admins, setAdmins] = useState<GroupMembers[]>([]);
  const { id } = useParams();
  const { getAdmins } = useGroup();

  useEffect(() => {
    getAdmins(id).then((res) => setAdmins(res));
  }, []);

  return (
    <div className="members-container-group">
      <h1 className="settings-header">Admins</h1>\
      <h1 className="bold set-label">{admins?.length} Admins</h1>
      <div className="members-container-members">
        {admins?.map((admin) => (
          <AdminInfo
            username={admin.username}
            imgUrl={admin.profile_image}
            memberId={admin.ID}
            admins={admins}
            setAdmins={setAdmins}
          />
        ))}
      </div>
    </div>
  );
};

export default Admins;
