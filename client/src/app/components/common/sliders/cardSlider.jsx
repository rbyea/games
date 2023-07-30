import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import { nanoid } from "nanoid";

// css
import "swiper/swiper.min.css";
import "swiper/css/effect-fade";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSliderGame } from "../../../store/sliderCardSlice";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const CardSlider = () => {
  const { gameId } = useParams();

  const getPictures = useSelector((state) => getSliderGame(state, gameId));

  const sliderRef = React.useRef(null);
  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  if (!getPictures) return "Загрузка...";

  return (
    <div className="section-card">
      <div className="card-slider">
        <Swiper
          ref={sliderRef}
          effect={"fade"}
          loop={true}
          modules={[EffectFade]}
          spaceBetween={10}
          slidesPerView={1}
        >
          {getPictures &&
            getPictures.images.map((item) => (
              <SwiperSlide key={nanoid()}>
                <div className="osahan-slider">
                  <div className="bg-dark">
                    <div className="row align-items-center">
                      <div className="col-lg-12">
                        <picture>
                          <img
                            src={item}
                            className="img-fluid"
                            loading="lazy"
                          />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div
          onClick={handlePrev}
          className="carousel-pointer carousel-control-prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true">
            <FaArrowLeft />
          </span>
        </div>
        <div
          onClick={handleNext}
          className="carousel-pointer carousel-control-next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true">
            <FaArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
