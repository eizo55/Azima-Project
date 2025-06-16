import "swiper/css";
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Star from "../assets/star-icon.svg";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

import RequestInfo from "../components/RequestInfo";
import { InputText } from "../components/InputText";
import RatingSlide from "../components/RatingSlide";
import NavBar from "../components/navbar";
import OurButton from "../components/OurButton";
import { Footer } from "../components/Footer";

import "../Styles/eventpage.css";
import Location from "../assets/Location.png";
import Description from "../assets/Description.png";
import Ticket from "../assets/Ticket.svg";
import Members from "../assets/Neighbor.svg";
import _Date from "../assets/date.svg";

import "../Styles/groupPage.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventType, EventUser, RatingType } from "../data/types";
import useEvent from "../hooks/eventHook";

import useAuthentication from "../hooks/userHook";

import { formatDate } from "../data/helpers";
import { InputDesc } from "../components/InputDesc";
import { auto } from "@cloudinary/url-gen/actions/resize";

const EventPage = () => {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [eventUser, setEventUser] = useState<EventUser | null>(null);
  const [eventRequests, setEventRequests] = useState<EventUser[] | null>([]);
  const [ratings, setRatings] = useState<RatingType[] | null>(null);
  const [deleteEventPopup, setDeleteEventPopup] = useState(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  const [isOwner, setIsOwner] = useState(false);
  const [conPopup, setConPopup] = useState(false);
  const [ratePopup, setRatePopup] = useState(false);
  const [conRequestsPopup, setConRequestsPopup] = useState(false);
  const navigate = useNavigate();
  const [didUserRate, setDidUserRate] = useState(false);
  const [isPast, setIsPast] = useState(false);
  const { id } = useParams();
  const {
    getEventData,
    joinEvent,
    leaveEvent,
    sendConRequest,
    rateEvent,
    getEventUsers,
    getEventRatings,
    getEventOwner,
    deleteEvent,
    getEventContributors,
    conResponse,
  } = useEvent();
  const { user } = useAuthentication();
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [confirmName, setConfirmName] = useState("");

  const eventInfo = [
    { imgSrc: Location, info: eventData?.location },
    {
      imgSrc: Description,
      info: eventData?.event_capacity + " Available tickets",
    },
    { imgSrc: Members, info: eventData?.guests },
    {
      imgSrc: _Date,
      info: formatDate(eventData?.event_date) + " - " + eventData?.time,
    },
    { imgSrc: Ticket, info: eventData?.ticket_price },
  ];

  const toggleConRequestsPopup = (e: any) => {
    e.preventDefault();
    setConRequestsPopup(!conRequestsPopup);
  };

  const toggleDeleteEventPopup = (e: any) => {
    e.preventDefault();
    setDeleteEventPopup(!deleteEventPopup);
  };

  const handleDeleteClick = (e: any) => {
    e.preventDefault();
    eventData?.name === confirmName
      ? (() => {
          deleteEvent(id);
          navigate(`/GroupPage/${eventData?.group_id}`);
        })()
      : alert("Name does not match");
  };

  const handleRateClick = (e: any) => {
    e.preventDefault();
    rateEvent(star, comment, id, user?.ID);
    window.location.reload();
  };
  const handleJoinClick = (e: any) => {
    e.preventDefault();
    !eventUser && joinEvent(id, user?.ID);
    window.location.reload();
  };
  const handleLeaveClick = (e: any) => {
    e.preventDefault();
    leaveEvent(user?.ID, id);
    window.location.reload();
  };

  const handleContributeReq = (e: any) => {
    e.preventDefault();
    sendConRequest(id, user?.ID);
    window.location.reload();
  };

  const toggleConPopUp = () => {
    setConPopup(!conPopup);
  };

  const toggleRatePopUp = () => {
    setRatePopup(!ratePopup);
  };

  conPopup
    ? document.body.classList.add("active-popup")
    : document.body.classList.remove("active-popup");

  function isDateInPast(date) {
    const inputDate = new Date(date); // Convert the input to a Date object

    const currentDate = new Date(); // Get the current date and time

    // Compare the input date with the current date
    return inputDate < currentDate;
  }
  const calculateRatingAvg = () => {
    let total = 0;
    ratings?.map((rating) => {
      total += rating.star;
    });
    return total / (ratings?.length ?? 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventData(id);
      setEventData(data);
      const eventOwner = await getEventOwner(id);
      setOwnerId(eventOwner);

      const eventRequests = await getEventContributors(id);
      setEventRequests(eventRequests);
      const ratings = await getEventRatings(id);
      setRatings(ratings);
      if (data?.event_date && isDateInPast(data.event_date)) {
        setIsPast(true);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    getEventUsers(id).then((res) => {
      res?.map((eventUser: EventUser) => {
        if (eventUser.ID === user?.ID) {
          setEventUser(() => eventUser);
        }
      });
    });
  }, [user]);

  useEffect(() => {
    if (ratings) {
      ratings.map((rating) => {
        if (rating.user_id === user?.ID) {
          setDidUserRate(true);
        }
      });
    }
  }, [ratings]);

  useEffect(() => {
    if (ownerId === user?.ID) {
      setIsOwner(true);
    }
  }, [ownerId]);

  useEffect(() => {
    if (ownerId === user?.ID) {
      setIsOwner(true);
    }
  }),
    [ownerId];
  console.log(eventRequests, "isOwner");
  return (
    <div>
      {deleteEventPopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <>
                <div className="header">
                  <h3>are you sure you want to delete </h3>
                  <h3>{eventData?.name}</h3>
                  <InputText
                    value={confirmName}
                    placeholder="Enter event name to confirm"
                    onChange={(e: any) => setConfirmName(e.target.value)}
                  />
                  <div className="pop-up-buttn">
                    <OurButton
                      position="center"
                      label="Confirm"
                      onClick={handleDeleteClick}
                    />
                  </div>
                </div>
              </>

              <button className="close-popup" onClick={toggleDeleteEventPopup}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      {conPopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <h1 className="do-you-want">
                Do you want to help orignize this event
              </h1>
              <p className="by-clicking">
                By clicking on the button below you will send a request to the
                event owner to help organize the event.
              </p>
              <OurButton
                label="Send Request"
                position="center"
                thin
                onClick={handleContributeReq}
              />

              <button className="close-popup" onClick={toggleConPopUp}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      {ratePopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <Box
                sx={{
                  "& > legend": {
                    mt: 2,
                    fontSize: "2.7rem",
                    marginLeft: "11.5rem",
                    width: "20rem",
                    color: "rgb(86, 17, 113)",
                    fontWeight: "700",
                  },

                  "& .MuiRating-icon": {
                    fontSize: "4rem",
                    marginLeft: "4rem",
                  },
                }}
              >
                <Typography component="legend">Rate the event</Typography>
                <Rating
                  size="large"
                  name="simple-controlled"
                  value={star}
                  onChange={(event, newValue) => {
                    setStar(newValue || 0);
                  }}
                />
              </Box>
              <div className="rating-comment">
                <InputDesc
                  isTextArea
                  placeholder={"Leave a comment"}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />

                <OurButton
                  label="Rate"
                  position="center"
                  thin
                  onClick={handleRateClick}
                />
              </div>

              <button className="close-popup" onClick={toggleRatePopUp}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      {conRequestsPopup && (
        <div className="popup">
          <div className="overlay">
            <div className="popup-content">
              <h3 className="requests-header">Requests: </h3>
              {eventRequests && eventRequests.length !== 0 ? (
                eventRequests.map((user) => (
                  <RequestInfo
                    username={user.username}
                    imgUrl={user.profile_image}
                    memberId={user.ID}
                    requests={eventRequests}
                    setRequests={setEventRequests}
                    isEvent
                  />
                ))
              ) : (
                <p className="no-req-found">No requests found</p>
              )}

              <button className="close-popup" onClick={toggleConRequestsPopup}>
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
      <NavBar navType="fnav" />
      <div
        className="img-container-event"
        style={{
          position: "relative",
        }}
      >
        <img
          src={eventData?.event_image || "/event-default.jpg"}
          alt={eventData?.name}
          className="event-img"
        />
        <div className="top-part1">
          <h1>{eventData?.name}</h1>

          <div className="admin-buttons">
            {isOwner && (
              <>
                {" "}
                <div className="requests-notification-counter-2">
                  {eventRequests?.length}
                </div>
                <OurButton
                  label="Contribution Requests"
                  thin
                  variant="transparent"
                  onClick={toggleConRequestsPopup}
                />
                <OurButton
                  label="Delete Event"
                  variant="alert"
                  thin
                  onClick={toggleDeleteEventPopup}
                />
              </>
            )}
            {isPast && !isOwner && (
              <OurButton
                label={didUserRate ? "Rating Submited" : "Rate Event"}
                onClick={toggleRatePopUp}
                variant="transparent"
                thin
                disabled={didUserRate}
              />
            )}
            {!eventUser && !isPast && !isOwner && (
              <OurButton
                label={"Join"}
                onClick={handleJoinClick}
                variant="transparent"
                thin
              />
            )}
            {!isPast && (
              <>
                {!isOwner && eventUser && (
                  <>
                    <OurButton
                      label={"Leave"}
                      onClick={handleLeaveClick}
                      variant="transparent"
                      thin
                    />
                    <OurButton
                      label={
                        eventUser?.is_con_pending
                          ? "Request sent"
                          : eventUser?.is_contributer
                          ? "Contributor"
                          : "Contribute"
                      }
                      thin
                      variant="transparent"
                      onClick={toggleConPopUp}
                      disabled={
                        eventUser?.is_con_pending || eventUser?.is_contributer
                      }
                    />
                  </>
                )}
              </>
            )}
            {!eventData?.is_contribution_allowed && eventUser && (
              <OurButton label="Joined" thin variant="transparent" disabled />
            )}
          </div>
        </div>
        {isPast && (
          <div className="star-container">
            <p>{ratings?.length !== 0 && calculateRatingAvg().toFixed(1)}</p>
            <img src={Star} alt="star" className="star-icon" />
          </div>
        )}
        <div className="info-container">
          {eventInfo.map(({ imgSrc, info }, index) => (
            <div key={index} className="info">
              <img src={imgSrc} alt="" />
              <p>{info || " -"}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="event-description">
        <h3>Event Program</h3>
        <p>{eventData?.description}</p>
        <h3>Rules: </h3>
        <p>{eventData?.rules}</p>
      </div>
      <div className="others">
        <p>
          <span className="bold">Ticket Price:</span> {eventData?.ticket_price}
        </p>
        <p>
          <span className="bold">Included:</span>{" "}
          {eventData?.ticket_included_items}
        </p>
        <p>
          <span className="bold">Not Included:</span>{" "}
          {eventData?.ticket_not_included_items}
        </p>
        <p>
          <span className="bold">Age restriction:</span>{" "}
          {eventData?.age_restriction}
        </p>
        <p>
          <span className="bold">Available tickets:</span>{" "}
          {eventData?.event_capacity}
        </p>
        <p>
          <span className="bold">Return policy: </span>
          {eventData?.return_policy}
        </p>
        <p>
          <span className="bold">Guests:</span> {eventData?.guests}
        </p>
      </div>

      {ratings && ratings.length !== 0 && (
        <div style={{ padding: "5rem" }}>
          <h2 className="purple" style={{ paddingBottom: "2rem" }}>
            Event Ratings
          </h2>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={4}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {ratings?.map((rating) => (
              <SwiperSlide>
                <RatingSlide rating={rating} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default EventPage;
