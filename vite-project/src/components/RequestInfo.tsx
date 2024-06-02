import "../Styles/settings.css";
import OurButton from "./OurButton";

import { useParams } from "react-router-dom";
import useGroup from "../hooks/groupHook";
import useEvent from "../hooks/eventHook";

const RequestInfo = ({
  isEvent,
  username,
  imgUrl,
  memberId,
  requests,
  setRequests,
}) => {
  const { id } = useParams();
  const { joinGroupResponse } = useGroup();
  const { conResponse } = useEvent();

  const handleReject = (e: any) => {
    e.preventDefault();
    isEvent
      ? conResponse(id, memberId, "reject")
      : joinGroupResponse(id, memberId, "reject");
    setRequests(() => requests.filter(({ ID }) => memberId !== ID));
  };

  const handleAccept = () => {
    isEvent
      ? conResponse(id, memberId, "accept")
      : joinGroupResponse(id, memberId, "accept");
    setRequests(() => requests.filter(({ ID }) => memberId !== ID));
  };

  return (
    <div>
      <div className="member-container-group">
        <div className="image-name-container-member">
          <img src={imgUrl} className="image-member-info" />
          <h1 className="member-name bold">{username}</h1>
        </div>
        <div className="buttons-member-info">
          <OurButton label="Accept" thin onClick={handleAccept} />
          <OurButton
            label="Reject"
            variant="alert"
            thin
            onClick={handleReject}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestInfo;
