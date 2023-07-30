import React from "react";

// import swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";

// css
import "swiper/swiper.min.css";
import "swiper/css/effect-fade";
import { useSelector } from "react-redux";
import {
  getLoadingSliderStatus,
  getSliderList
} from "../../../store/sliderSlice";
import SliderCard from "./sliderItem";
import { getLoadingStatusCategories } from "../../../store/categoriesSlice";

const MainSlider = (props) => {
  const sliderRef = React.useRef(null);
  const sliderList = useSelector(getSliderList());
  const sliderLoadingStatus = useSelector(getLoadingSliderStatus());
  const isLoadingCategories = useSelector(getLoadingStatusCategories());

  const handlePrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <>
      {!sliderLoadingStatus && !isLoadingCategories && (
        <section className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-slider">
                  <Swiper
                    ref={sliderRef}
                    effect={"fade"}
                    loop={true}
                    modules={[EffectFade]}
                    spaceBetween={10}
                    slidesPerView={1}
                  >
                    {sliderList.map((slide) => (
                      <SwiperSlide key={slide._id}>
                        <SliderCard {...slide} />
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {sliderList.length > 1 && (
                    <>
                      <div
                        onClick={handlePrev}
                        className="carousel-pointer carousel-control-prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">Пред.</span>
                      </div>
                      <div
                        onClick={handleNext}
                        className="carousel-pointer carousel-control-next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="sr-only">След.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MainSlider;
