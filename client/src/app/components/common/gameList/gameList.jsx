import React from "react";
import { useSelector } from "react-redux";
import {
  getTopSalesGames
} from "../../../store/gamesSlice";
import GameListCard from "./gameListCard";
import PropTypes from "prop-types";
import Button from "../../ui/button";

const GameList = ({ title, guid }) => {
  const [data, setData] = React.useState([]);

  const topSalesGames = useSelector(getTopSalesGames);

  React.useEffect(() => {
    setData(topSalesGames);
  }, []);

  return (
    <section className="pb-5">
      <div className="container">
        <div className="d-flex align-item-center title mb-3">
          <h5 className="m-0 font-weight-normal">{title}</h5>
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
  );
};

GameList.propTypes = {
  title: PropTypes.string,
  guid: PropTypes.string
};

export default GameList;
