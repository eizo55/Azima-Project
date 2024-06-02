import NavBar from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "../components/InputText";
import Checkbox from "../components/Checkbox";

import { Footer } from "../components/Footer";
import "../Styles/creategroup.css";
import { InputDesc } from "../components/InputDesc";
import OurButton from "../components/OurButton";

import imgHolder from "../assets/EventImage.png";

import { useState, useEffect } from "react";
import CloudinaryUploadWidget from "../components/UploadImage";
import useEvent from "../hooks/eventHook";
import useAuthentication from "../hooks/userHook";

const CreateEvent = () => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("dkgrr55re");
  const { id } = useParams();
  const [uploadPreset] = useState("v6wusflm");
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

  const { user } = useAuthentication();
  const { createEvent, joinEvent } = useEvent();
  const [eventData, setEventData] = useState({
    name: "",
    group_id: id,
    event_date: "",
    time: "",
    age_restriction: "",
    event_capacity: "",
    ticket_price: "",
    currency: "",
    ticket_included_items: "",
    ticket_not_included_items: "",
    return_policy: "",
    guests: "",
    is_event_private: false,
    is_contribution_allowed: false,
    rules: "",
    event_image: "",
    location: "",
    description: "",
  });

  const handleCreateEventClick = (e) => {
    e.preventDefault();
    createEvent(eventData, user?.ID);
  };
  const handleInputChange = (e: any) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("The date must be in the future");
    } else {
      setEventData({ ...eventData, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    // Fetch the profile image URL using the publicId and update the image source
    if (publicId) {
      // Construct the Cloudinary image URL with the publicId
      const baseUrl = "https://res.cloudinary.com/dkgrr55re/image/upload/";
      const imageUrl = `${baseUrl}${publicId}`;

      // Update the image source in groupData
      setEventData({ ...eventData, event_image: imageUrl });
    }
  }, [publicId]);
  return (
    <div>
      <NavBar navType="fnav" />
      <form onSubmit={handleCreateEventClick}>
        <div className="create-event-container">
          <div className="form-container">
            <label className="heading purple">Event Info</label>
            <InputText
              label="Event Name *"
              placeholder="Enter your event name here..."
              value={eventData.name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <InputText
              label="Event Location *"
              placeholder="Enter your group location here..."
              value={eventData.location}
              onChange={handleInputChange}
              name="location"
              required
            />
            <InputText
              label="Event Date *"
              placeholder="Enter your group location here..."
              value={eventData.event_date}
              onChange={handleDateChange}
              name="event_date"
              date
              required
            />
            <div className="split-container">
              <InputText
                label="Start Time *"
                placeholder="Example: 6:00 PM"
                value={eventData.time}
                onChange={handleInputChange}
                name="time"
                required
              />
            </div>

            <InputText
              label="Age Restriction"
              placeholder="Add an age..."
              value={eventData.age_restriction}
              onChange={handleInputChange}
              name="age_restriction"
              number
            />
            <InputText
              label="Event Capacity (Attendees) *"
              placeholder="Add a limit for number of attendees..."
              value={eventData.event_capacity}
              onChange={handleInputChange}
              name="event_capacity"
              required
              number
            />

            <InputText
              label="Ticket Price *"
              placeholder="Example: 100"
              value={eventData.ticket_price}
              onChange={handleInputChange}
              name="ticket_price"
              required
              number
            />

            <InputText
              label="What’s included in the ticket price? "
              placeholder="Example: One Soft Drink"
              value={eventData.ticket_included_items}
              onChange={handleInputChange}
              name="ticket_included_items"
            />
            <InputText
              label="What’s not included in the ticket price? "
              placeholder="Example: Food"
              value={eventData.ticket_not_included_items}
              onChange={handleInputChange}
              name="ticket_not_included_items"
            />
            <InputText
              label="Return policy "
              placeholder="Example: Can return before 9 days of event"
              value={eventData.return_policy}
              onChange={handleInputChange}
              name="return_policy"
            />
            <InputText
              label="Guests  "
              placeholder="Example: @AzizAbdulfaham"
              value={eventData.guests}
              onChange={handleInputChange}
              name="guests"
            />
            <InputText
              label="Add Other Rules  "
              placeholder="Example: No entry after 8:00 PM"
              value={eventData.rules}
              onChange={handleInputChange}
              name="rules"
            />
            <InputDesc
              label="Event Description *"
              placeholder="Enter your group description here"
              value={eventData.description}
              onChange={handleInputChange}
              name="description"
              required
            />
            <div className="checkboxes">
              <Checkbox
                label="Allow contribution requests"
                onChange={() =>
                  setEventData({
                    ...eventData,
                    is_contribution_allowed: !eventData.is_contribution_allowed,
                  })
                }
                checked={eventData.is_contribution_allowed}
              />
            </div>
            <OurButton
              position=""
              label="Create Event"
              variant=""
              type="submit"
            />
          </div>

          <div className="image-container-create-event">
            <img
              src={eventData.event_image ? eventData.event_image : imgHolder}
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

export default CreateEvent;
