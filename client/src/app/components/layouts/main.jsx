import React from "react";
// import GameList from "../common/gameList/gameList";
import { windowScroll } from "../../utils/windowScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/swiper.min.css";
import "swiper/css/effect-fade";
import { useSelector } from "react-redux";
import { getLoadingSliderStatus, getSliderList } from "../../store/sliderSlice";
import { getLoadingStatusCategories } from "../../store/categoriesSlice";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import SliderCard from "../common/sliders/sliderItem";
import { getTopSalesGames } from "../../store/gamesSlice";
import GameListCard from "../common/gameList/gameListCard";
import Button from "../ui/button";

const Main = (props) => {
  React.useEffect(() => {
    windowScroll();
  }, []);

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
  const [data, setData] = React.useState([]);
  const topSalesGames = useSelector(getTopSalesGames);

  React.useEffect(() => {
    setData(topSalesGames);
  }, []);
  return (
    <>
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
                          >
                            <FaArrowLeft />
                          </span>
                        </div>
                        <div
                          onClick={handleNext}
                          className="carousel-pointer carousel-control-next"
                        >
                          <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                          >
                            <FaArrowRight />
                          </span>
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
      <section className="pb-5">
        <div className="container">
          <div className="d-flex align-item-center title mb-3">
            <h5 className="m-0 font-weight-normal">Лидеры продаж</h5>
            <Button
              link="catalog/"
              title="Смотреть все"
              name="btn-sm btn-outline-light ml-auto"
            />
          </div>
          <div className="row">
            {data.map((game) => (
              <GameListCard key={game._id} {...game} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Main;
