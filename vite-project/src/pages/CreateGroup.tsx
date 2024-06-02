import NavBar from "../components/navbar";
import Checkbox from "../components/Checkbox";
import Dropdown from "../components/Dropdown";
import OurButton from "../components/OurButton";
import { Footer } from "../components/Footer";
import { InputText } from "../components/InputText";
import { InputDesc } from "../components/InputDesc";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CloudinaryUploadWidget from "../components/UploadImage";

import "../Styles/creategroup.css";

import imgHolder from "../assets/EventImage.png";
import useGroup from "../hooks/groupHook";
import useAuthentication from "../hooks/userHook";
import { eventType } from "../data/helpers";

const CreateGroup = () => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const [uploadPreset] = useState("v6wusflm");
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
  const [groupData, setGroupData] = useState({
    name: "",
    location: "",
    description: "",
    group_image: "",
    is_adult_only: false,
    is_private_group: false,
    is_online: false,
    is_f2f: false,
    owner_id: user?.ID,
    categories: [],
  });
  const [defaultCategories, setDefaultCategories] = useState<
    { value: string; label: string; category_id: number }[]
  >([]);
  const [eventTypes, setEventTypes] = useState<
    { value: string; label: string; id: number }[]
  >([]);

  const { categories, createGroup } = useGroup();

  const handleCreateGroupClick = async (e) => {
    e.preventDefault();

    await setGroupData({ ...groupData, owner_id: user?.ID });
    createGroup(groupData);
  };

  const handleInputChange = (e: any) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
    console.log(groupData);
  };

  useEffect(() => {
    /* setGroupData({ ...groupData, owner_id: user?.ID || "" }); */
    setDefaultCategories(
      groupData?.categories?.map(({ category_id, name }) => ({
        value: name,
        label: name,
        category_id,
      }))
    );

    const eventTypes = [];
    if (groupData.is_f2f) {
      eventTypes.push({ id: 1, value: "f2f", label: "f2f" });
    }
    if (groupData.is_online) {
      eventTypes.push({ id: 2, value: "online", label: "online" });
    }
    setEventTypes(eventTypes);
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

  return (
    <div>
      <NavBar navType="fnav" />
      <form onSubmit={handleCreateGroupClick}>
        <div className="create-event-container">
          <div className="form-container">
            <label className="heading purple">Create your group! </label>
            <InputText
              label="Group Name *"
              placeholder="Enter your group name here..."
              value={groupData.name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <InputText
              label="Location *"
              placeholder="Enter your group location here..."
              value={groupData.location}
              onChange={handleInputChange}
              name="location"
              required
            />
            <div className="dropdowns">
              <Dropdown
                list={eventType}
                value={eventTypes}
                onChange={(options) => {
                  setGroupData({
                    ...groupData,
                    is_f2f: options.some(
                      (option: any) => option.value === "f2f"
                    ),
                    is_online: options.some(
                      (option: any) => option.value === "online"
                    ),
                  });
                  setEventTypes(options);
                }}
                multiSelect={true}
                label="Events Type"
              />
              <Dropdown
                list={categories}
                label="Group Type"
                multiSelect={true}
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
            <InputDesc
              label="Group Description *"
              placeholder="Enter your group description here"
              value={groupData.description}
              onChange={handleInputChange}
              name="description"
              required
              isTextArea
            />
            <div className="checkboxes">
              <Checkbox
                label="Allow adults only"
                checked={groupData.is_adult_only}
                onChange={() =>
                  setGroupData({
                    ...groupData,
                    is_adult_only: !groupData.is_adult_only,
                  })
                }
              />
              <Checkbox
                label="I want my group to be private"
                checked={groupData.is_private_group}
                onChange={() =>
                  setGroupData({
                    ...groupData,
                    is_private_group: !groupData.is_private_group,
                  })
                }
              />
            </div>

            <OurButton
              position=""
              label="Create Group"
              type="submit"
              variant=""
            />
          </div>

          <div className="import-image-container">
            <img
              className=""
              src={groupData.group_image ? groupData.group_image : imgHolder}
            />

            <CloudinaryUploadWidget
              uwConfig={uwConfig}
              setPublicId={setPublicId}
            />
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateGroup;
