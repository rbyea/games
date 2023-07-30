import React from "react";
import CardSlider from "../sliders/cardSlider";
import GamePageAbout from "./gamePageAbout";
import GamePageSpecification from "./gamePageSpecification";
import { useSelector } from "react-redux";
import GameListCard from "../gameList/gameListCard";
import { Link, useParams } from "react-router-dom";
import { getCurrentUserId } from "../../../store/usersSlice";
import { getFavoriteCard } from "../../../store/favoriteSlice";
import GamePageVideo from "./gamePageVideo";
import Comments from "../comments/comments";

const GamePageItem = () => {
  const { gameId } = useParams();
  const currentUserId = useSelector(getCurrentUserId());
  const favoriteCard = useSelector(getFavoriteCard(gameId));
  return (
    <div className="col-lg-9">
      <div className="row">
        <div className="col-lg-12">
          <CardSlider />
          <GamePageAbout />
          <GamePageVideo />
          <GamePageSpecification />

          <div className="section-card pt-4" id="offers">
            <div className="d-flex align-item-center title mb-3 mt-4">
              <h5 className="m-0">Избранные игры</h5>
              <Link
                to={`/account/${currentUserId}/favorite`}
                className="btn btn-sm btn-outline-light ml-auto"
              >
                Смотреть все
              </Link>
            </div>
            <div className="row">
              {favoriteCard.length > 0 ? (
                favoriteCard.map((game) => (
                  <GameListCard
                    key={game._id}
                    title={game.title}
                    discount={game.discount}
                    price={game.price}
                    picture={game.picture}
                    _id={game.gameId}
                  />
                ))
              ) : (
                <div className="col-md-6">Пусто</div>
              )}
            </div>
          </div>

          <Comments />
        </div>
      </div>
    </div>
  );
};

export default GamePageItem;
