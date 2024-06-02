import NavBar from "../components/navbar";
import SideNav from "../components/SideNav";
import Member from "../components/Member";
import Admins1 from "../components/Admins";
import Bans1 from "../components/Bans";
import Overview1 from "../components/Overview";
import GroupEvents from "../components/GroupEvents";
import { useNavigate, useParams } from "react-router-dom";

import "../Styles/settings.css";

import OverviewWhite from "../assets/overviewwhite.svg";
import OverviewPurple from "../assets/Overview.png";

import MembersWhite from "../assets/memberwhite.svg";
import MembersPurple from "../assets/memberspurple.svg";

import BansWhite from "../assets/Bans.png";
import BansPurple from "../assets/banspurple.svg";

import AdminsWhite from "../assets/Admins.png";
import AdminsPurple from "../assets/adminspurple.svg";

import GroupEventsImage from "../assets/GroupEvents2.png";
import GroupEventPurple from "../assets/groupeventspurple.svg";

import { Group } from "../data/types";
import { useState, useEffect } from "react";
import useGroup from "../hooks/groupHook";
import useAuthentication from "../hooks/userHook";
import OurButton from "../components/OurButton";

const GroupSettings = () => {
  const [groupData, setGroupData] = useState<Group | null>(null);
  const { id } = useParams();
  const { getGroup } = useGroup();
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const [settingStatus, setSettingStatus] = useState("a");
  const handleAccountClick = () => {
    setSettingStatus("a");
  };
  const handleMyGroupsClick = () => {
    setSettingStatus("b");
  };
  const handleMyEventsClick = () => {
    setSettingStatus("c");
  };
  const handleSettingsClick = () => {
    setSettingStatus("d");
  };

  const handleGroupEventsClick = () => {
    setSettingStatus("e");
  };

  var selectedButton = "a";

  useEffect(() => {
    getGroup(id).then((res) => setGroupData(res));
  }, []);

  return (
    <div>
      <div className="go-back-button">
        <OurButton label="Back" onClick={() => navigate(`/GroupPage/${id}`)} />
      </div>
      {settingStatus === "a"
        ? (selectedButton = "a-selected")
        : settingStatus === "b"
        ? (selectedButton = "b-selected")
        : settingStatus === "c"
        ? (selectedButton = "c-selected")
        : settingStatus === "d"
        ? (selectedButton = "d-selected")
        : settingStatus === "e"
        ? (selectedButton = "e-selected")
        : selectedButton}
      <NavBar navType="fnav" />
      <SideNav
        label1="Overview"
        label2="Members"
        label3="Bans"
        label4="Admins"
        label5="Group Events"
        icon1={OverviewWhite}
        icon2={MembersWhite}
        icon3={BansWhite}
        icon4={AdminsWhite}
        icon5={GroupEventsImage}
        icon12={OverviewPurple}
        icon22={MembersPurple}
        icon32={BansPurple}
        icon42={AdminsPurple}
        icon52={GroupEventPurple}
        onClick1={handleAccountClick}
        onClick2={handleMyGroupsClick}
        onClick3={handleMyEventsClick}
        onClick4={handleSettingsClick}
        onClick5={handleGroupEventsClick}
        fifth="true"
        selectedButton={selectedButton}
      />
      <div className="inside-settings">
        {settingStatus === "a" ? (
          <Overview1 />
        ) : settingStatus === "b" ? (
          <Member owner_id={groupData?.owner_id} />
        ) : settingStatus === "c" ? (
          <Bans1 />
        ) : settingStatus === "d" ? (
          <Admins1 />
        ) : settingStatus === "e" ? (
          <GroupEvents />
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default GroupSettings;
