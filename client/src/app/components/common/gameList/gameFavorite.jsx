import React from "react";
import Price from "../../ui/price";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "../../../store/favoriteSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const GameFavorite = ({
  _id: id,
  gameId,
  picture,
  price,
  discount,
  data,
  title
}) => {
  const dispatch = useDispatch();
  const handleRemove = (e) => {
    e.preventDefault();

    dispatch(deleteFavorite(id));
    toast.error("Игра удалена!", {
      autoClose: 3000,
      theme: "dark"
    });
  };
  return (
    <div className="osahan-card">
      <div>
        <Link to={`/card/${gameId}`}>
          <img className="img-fluid" src={picture} alt="" />
        </Link>
        <div className="d-flex">
          <a
            href="#"
            onClick={(e) => handleRemove(e)}
            className="bg-danger col text-center p-1 text-white text-uppercase small"
          >
            <i className="feather-trash mr-1"></i> Удалить
          </a>
        </div>
        <div className="osahan-card-body mt-3">
          <Link to={`/card/${gameId}`}>
            <h6 className="text-white mb-1">{title}</h6>
          </Link>
          <p className="mb-0 text-white-50">{data}</p>
          <div className="price mt-3">
            <Price price={price} discount={discount} />
          </div>
        </div>
      </div>
    </div>
  );
};

GameFavorite.propTypes = {
  picture: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  discount: PropTypes.string.isRequired,
  data: PropTypes.string,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  gameId: PropTypes.string.isRequired
};

export default GameFavorite;
