import React from "react";
import { getGamePage } from "../../../store/gamesSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadFeaturesCardPage } from "../../../store/featuresSlice";
import { convectorTime } from "../../../utils/convectorTime";
import { loadSliderCategory } from "../../../store/categoriesSlice";

const GamePageAbout = () => {
  const { gameId } = useParams();

  const gamePage = useSelector((state) => getGamePage(state, gameId));
  const getFeaturesList = useSelector((state) =>
    loadFeaturesCardPage(state, gamePage.features)
  );
  const getCategoriesList = useSelector((state) =>
    loadSliderCategory(state, gamePage.categories)
  );

  const time = +gamePage.receipts;

  return (
    <div className="section-card pt-4" id="about">
      <h5 className="mb-3 mt-4">Об игре</h5>
      <div className="p-5 bg-dark">
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="list-icon mb-3">
              <p className="text-white-50 mb-1">Разработчик</p>
              <p className="text-white">{gamePage.developer}</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="list-icon mb-3">
              <p className="text-white-50 mb-1">Категории</p>
              <p className="text-white">
                {getCategoriesList.map((category, index, array) => (
                  <span className="feature-card-item" key={category._id}>
                    {category.name}
                    {index + 1 !== array.length ? "," : "."}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="list-icon mb-3">
              <p className="text-white-50 mb-1">Дата релиза</p>
              <p className="text-white">{convectorTime(time)}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-4">
            <div className="list-icon mb-3">
              <p className="text-white-50 mb-1">Особенности</p>
              <p className="text-white">
                {getFeaturesList.map((feature, index, array) => (
                  <span className="feature-card-item" key={feature._id}>
                    {feature.name}
                    {index + 1 !== array.length ? "," : "."}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-4">
            <div className="list-icon mb-3">
              <p className="text-white-50 mb-1">Платформа</p>
              <p className="text-white">{gamePage.work}</p>
            </div>
          </div>
        </div>
        <hr />
        {/* <p className="mt-4">{gamePage.title}</p> */}
        <p className="text-white-50 mb-0">{gamePage.description}</p>
      </div>
    </div>
  );
};

export default GamePageAbout;
