import React from "react";
import { useSelector } from "react-redux";
import { getFavoriteList } from "../../../store/favoriteSlice";
import GameFavorite from "../gameList/gameFavorite";

const FavoritePage = (props) => {
  const favoriteList = useSelector(getFavoriteList());

  return (
    <div className="col-lg-9">
      <div className="d-flex align-item-center title mb-3">
        <h5 className="m-0 font-weight-normal">
          {favoriteList.length === 0 ? "Избранных игр пока нет" : "Избранное"}
        </h5>
      </div>
      <div className="row">
        {favoriteList.map((game) => (
          <div key={game._id} className="col-lg-3 col-md-6">
            <GameFavorite {...game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritePage;
