import { RatingType } from "../data/types";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import useEvent from "../hooks/eventHook";
import "swiper/css";
import "swiper/swiper-bundle.css";
import useAuthentication from "../hooks/userHook";
import "../Styles/rating.css";
import { formatDateTwo } from "../data/helpers";
import { useNavigate } from "react-router-dom";
type RatingSlideProps = {
  rating: RatingType | null;
};

const RatingSlide = ({ rating }: RatingSlideProps) => {
  const { user } = useAuthentication();
  const { deleteRating } = useEvent();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/UserProfile/${rating?.user_id}`);
  };
  return (
    <div className="rating-slide">
      <div className="stars-image">
        <img
          src={rating?.profile_image}
          alt="stars"
          className="rating-image"
          onClick={navigateToProfile}
          style={{ cursor: "pointer" }}
        />
        <Box
          sx={{
            "& > legend": { mt: 2 },
            "& .MuiRating-icon": {
              fontSize: "2.5rem",
              marginLeft: "0.5rem",
            },
          }}
        >
          <Rating name="read-only" value={rating?.star} readOnly />
        </Box>
        {user?.ID === rating?.user_id && (
          <button
            className="delete-rating-button"
            onClick={() => deleteRating(rating?.rate_id)}
          >
            Delete
          </button>
        )}
      </div>
      <p>
        <span
          onClick={navigateToProfile}
          style={{ cursor: "pointer" }}
          className="rating-username"
        >
          {" "}
          {rating?.username}
        </span>{" "}
        <span className="rating-date"> {formatDateTwo(rating?.rate_date)}</span>
      </p>
      <p className="user-comment">{rating?.comment}</p>
    </div>
  );
};

export default RatingSlide;
