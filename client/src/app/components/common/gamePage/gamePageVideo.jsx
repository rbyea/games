import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameById } from "../../../store/gamesSlice";

const GamePageVideo = (props) => {
  const { gameId } = useParams();
  const currentGame = useSelector(getGameById(gameId));
  return (
    <>
      {currentGame.video && (
        <div className="section-card pt-4" id="video">
          <h5 className="mb-3 mt-4">Видео</h5>
          <div className="bg-dark">
            <iframe
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              width="100%"
              height="443"
              type="text/html"
              src={currentGame.video}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default GamePageVideo;
