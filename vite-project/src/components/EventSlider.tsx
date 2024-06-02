import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState } from "react";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { Event } from "./Event";
import Filter from "../assets/filter.svg";
import "../Styles/eventslider.css";
import axios from "axios";
import OurButton from "./OurButton";
import { Group } from "../data/types";

interface EventSliderProps {
  object: any;
  label: string;
  isEvent?: boolean;
}

export const EventSlider = ({
  object,
  label,
  isEvent = false,
}: EventSliderProps) => {
  const [filters, setFilters] = useState({
    is_online: false,
    is_f2f: false,
    is_private_group: false,
    is_adult_only: false,
  });
  const [filteredData, setFilteredData] = useState<Group[]>([]);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const toggleFilter = (e: any) => {
    e.preventDefault();
    setFilterDropDown(!filterDropDown);
  };
  const handleFilterChange = (e: any) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const applyFilters = async (e: any) => {
    e.preventDefault();
    const activeFilters = Object.entries(filters)
      .filter(([key, value]) => value)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    try {
      const response = await axios.post(
        "http://localhost:9000/filter-groups",
        activeFilters
      );
      setFilteredData(response.data); // Update the state with filtered data
      console.log(response.data);
    } catch (error: any) {
      console.error(error.response.data.msg);
    }
  };

  return (
    <div className="event-slider">
      <label htmlFor="slider" className="slider-label">
        {label}
        {"  "}
        <img
          src={Filter}
          alt="filter"
          className="filter"
          onClick={toggleFilter}
        />
        <div className="filter-container">
          {" "}
          {filterDropDown && (
            <div className="filter-dropdown">
              <div className="filter-dropdown-gap">
                <div className="filterDropDown__item">
                  <div className="radio-group">
                    <label>
                      <input
                        type="checkbox"
                        name="is_online"
                        onChange={handleFilterChange}
                      />{" "}
                      Online
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="is_f2f"
                        onChange={handleFilterChange}
                      />{" "}
                      Face-to-Face (F2F)
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="is_private_group"
                        onChange={handleFilterChange}
                      />{" "}
                      Private Group
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="is_adult_only"
                        onChange={handleFilterChange}
                      />{" "}
                      Adult Only
                    </label>
                    <OurButton
                      label="Filter"
                      position="center"
                      thin
                      onClick={applyFilters}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </label>

      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={4}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {filteredData.length > 0
          ? filteredData.map((group) => (
              <SwiperSlide key={group.id}>
                <Event
                  isEvent={isEvent}
                  label={group.name}
                  imageUrl={
                    group.group_image ? group.group_image : group.event_image
                  }
                  id={isEvent ? group.event_id : group.group_id}
                />
              </SwiperSlide>
            ))
          : object?.map((group) => (
              <SwiperSlide key={group.id}>
                <Event
                  isEvent={isEvent}
                  label={group.name}
                  imageUrl={
                    group.group_image ? group.group_image : group.event_image
                  }
                  id={isEvent ? group.event_id : group.group_id}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};
