import "../Styles/settings.css";

import OurButton from "./OurButton";
import { InputText } from "./InputText";
import { InputDesc } from "./InputDesc";
import Checkbox from "./Checkbox";
import Dropdown from "../components/Dropdown";
import useGroup from "../hooks/groupHook";
import CloudinaryUploadWidget from "../components/UploadImage";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { eventType } from "../data/helpers";

import GroupDefaultImg from "../assets/group-default-image.webp";
import useAuthentication from "../hooks/userHook";

const Overview = () => {
  const { categories, updateGroup, getGroup, deleteGroup } = useGroup();
  const [publicId, setPublicId] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
  const [deletePopup, setDeletePopup] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthentication();
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });
  const [defaultCategories, setDefaultCategories] = useState<
    { value: string; label: string; category_id: number }[]
  >([]);
  const [eventTypes, setEventTypes] = useState<
    { value: string; label: string; id: number }[]
  >([]);

  const [groupData, setGroupData] = useState({
    name: "",
    location: "",
    description: "",
    group_image: "",
    is_adult_only: false,
    is_private_group: false,
    is_online: false,
    is_f2f: false,
    categories: [],
    owner_id: 0,
  });

  const handleInputChange = (e: any) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    updateGroup(groupData);
    window.location.reload();
  };

  const toggleDeletePopup = () => {
    setDeletePopup(!deletePopup);
  };

  const checkIsOwner = () => {
    setIsOwner(groupData?.owner_id === user?.ID);
  };

  // TBD
  const DeleteGroup = () => {
    confirmName === groupData?.name
      ? (() => {
          deleteGroup(id);
          navigate("/home");
        })()
      : alert("Group name does not match");
  };
  useEffect(() => {
    getGroup(id).then((res) => {
      setGroupData({
        ...res,
        categories: res.categories.map(({ category_id }) => category_id),
      });
      setDefaultCategories(
        res?.categories?.map(({ category_id, name }) => ({
          value: name,
          label: name,
          category_id,
        }))
      );
      const eventTypes = [];
      if (res.is_f2f) {
        eventTypes.push({ id: 1, value: "f2f", label: "f2f" });
      }
      if (res.is_online) {
        eventTypes.push({ id: 2, value: "online", label: "online" });
      }
      setEventTypes(eventTypes);
    });
  }, []);

  useEffect(() => {
    // Fetch the profile image URL using the publicId and update the image source
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;
      // Update the image source in groupData
      setGroupData({ ...groupData, group_image: imageUrl });
    }
  }, [publicId]);

  useEffect(() => {
    checkIsOwner();
  }, [groupData]);

  return (
    <div>
      {deletePopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <>
                <div className="header">
                  <h3>are you sure you want to delete </h3>
                  <h3>{groupData?.name}? </h3>
                  <InputText
                    value={confirmName}
                    placeholder="Enter group name to confirm"
                    onChange={(e: any) => setConfirmName(e.target.value)}
                  />
                  <div className="pop-up-buttn">
                    <OurButton
                      position="center"
                      label="Confirm"
                      onClick={DeleteGroup}
                    />
                  </div>
                </div>
              </>

              <button className="close-popup" onClick={toggleDeletePopup}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="settings-header">Overview</h1>
      <form onSubmit={handleSaveClick}>
        <div className="group-image-name-container">
          <div className="account-image">
            <img
              src={
                groupData?.group_image
                  ? groupData?.group_image
                  : GroupDefaultImg
              }
            />
            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
            />
          </div>
          <div className="group-name-container">
            {isOwner && (
              <div className="delete-group">
                <OurButton
                  label="Delete Group"
                  variant="alert"
                  onClick={toggleDeletePopup}
                />
              </div>
            )}
            <InputText
              label="Group Name"
              placeholder={groupData?.name}
              name="name"
              onChange={handleInputChange}
              defaultValue={groupData?.name}
            />
          </div>
        </div>
        <div className="description-overview-container">
          <InputDesc
            label="Description"
            placeholder={groupData?.description}
            name="description"
            defaultValue={groupData?.description}
            onChange={handleInputChange}
            isTextArea
          />
        </div>
        <div className="checkboxes-dropdowns-container">
          <div className="checkboxes-overview-container">
            <Checkbox
              label="Allow adults only"
              checked={groupData && groupData?.is_adult_only}
              onChange={() =>
                setGroupData({
                  ...groupData,
                  is_adult_only: !groupData?.is_adult_only,
                })
              }
            />
            <Checkbox
              label="I want my group to be private"
              checked={groupData && groupData?.is_private_group}
              onChange={() =>
                setGroupData({
                  ...groupData,
                  is_private_group: !groupData?.is_private_group,
                })
              }
            />
          </div>
          <div className="dropdowns-overview">
            <Dropdown
              list={eventType}
              value={eventTypes}
              onChange={(options: any) => {
                setGroupData({
                  ...groupData,
                  is_f2f: options.some((option: any) => option.value === "f2f"),
                  is_online: options.some(
                    (option) => option.value === "online"
                  ),
                });
                setEventTypes(options);
              }}
              multiSelect={true}
              label="Events Type"
            />

            <Dropdown
              list={categories}
              multiSelect={true}
              label="Group Type"
              value={defaultCategories}
              onChange={(option) => {
                setGroupData({
                  ...groupData,
                  categories: option.map(({ category_id }) => category_id),
                });
                setDefaultCategories(option);
              }}
            />
          </div>
        </div>
        <div className="fixed-button-corner">
          <OurButton position="center" label="Save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Overview;
