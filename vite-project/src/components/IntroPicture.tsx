import MainPageBackground from "../assets/MainPageBackground.png";
import Hangout from "../assets/hangout.jpg";
import Hangout2 from "../assets/hangout2.jpg";
import Party from "../assets/party.jpg";
import "../Styles/introImage.css";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

export const IntroPicture = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className="img-wrapper">
          <img className="home-image" src={MainPageBackground} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img-wrapper">
          <img className="home-image" src={Hangout} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img-wrapper">
          <img className="home-image" src={Hangout2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img-wrapper">
          <img className="home-image" src={Party} alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
