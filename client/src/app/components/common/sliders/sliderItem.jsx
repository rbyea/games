import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { loadSliderCategory } from "../../../store/categoriesSlice";
import { Link } from "react-router-dom";

const SliderItem = ({ image, title, gameId, description, category }) => {
  const sliderCategories = useSelector((state) =>
    loadSliderCategory(state, category)
  );

  return (
    <>
      <div className="osahan-slider">
        <div className="bg-dark">
          <div className="row align-items-center">
            <div className="col-lg-8 px-0">
              <img className="img-fluid" src={image} alt="" />
            </div>
            <div className="col-lg-4 px-0">
              <div className="p-5">
                <small className="text-white-50">PC GAMER PRESENTS</small>
                <h3 className="my-4">{title}</h3>
                <p className="font-weight-normal mb-3 text-white-50">
                  {description}
                </p>

                <p className="font-weight-normal mb-3 text-white-50">
                  Жанр:
                  {sliderCategories &&
                    sliderCategories.map((category) => (
                      <span className="slider-category" key={category._id}>
                        {" "}
                        {category.name}
                      </span>
                    ))}
                </p>
                <Link
                  to={`card/${gameId}`}
                  className="btn btn-primary"
                >
                  Перейти
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SliderItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  gameId: PropTypes.string,
  description: PropTypes.string,
  category: PropTypes.array
};

export default SliderItem;
