import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementGame,
  incrementGame,
  removeAllGame,
  removeGame
} from "../../../store/basketSlice";
import { discountFunc } from "../../../utils/discountFunc";
import { FaMinusCircle, FaPlusCircle, FaWindowClose } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUserId } from "../../../store/usersSlice";

const BasketList = ({ listBasket }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const handleIncrementGame = (game) => {
    dispatch(incrementGame(game));
  };

  const handleDecrementGame = (game) => {
    dispatch(decrementGame(game));
  };

  const handleRemove = (gameId) => {
    const confirmDelete = confirm(
      "Уверены, что хотите удалить игру из корзины?"
    );

    if (confirmDelete) {
      toast.error("Игра удалена из корзины!", {
        autoClose: 3000,
        theme: "dark"
      });
      dispatch(removeGame(gameId));
    }
  };

  const handleBtnClear = (gameId) => {
    const confirmClear = confirm(
      "Уверены, что хотите очистить список корзины?"
    );

    if (confirmClear) {
      toast.error("Корзина очищена!", {
        autoClose: 3000,
        theme: "dark"
      });

      dispatch(removeAllGame(currentUserId));
    }
  };

  return (
    <div className="basket-block-list">
      {listBasket.length > 1 && (
        <div className="basketListTopSide">
          <a href="#" onClick={handleBtnClear} className="btn btn-light">
            Очистить список
          </a>
        </div>
      )}
      {listBasket.map((game) => (
        <div className="basket-list" key={game.gameId}>
          <div className="basket-left-side">
            <Link to={`card/${game.gameId}`} className="basket__image">
              <img src={game.picture} alt="" />
            </Link>
            <div className="basket-content-col">
              <Link to={`card/${game.gameId}`} className="basket__name mb-2">
                {game.title}
              </Link>
              <div className="basket__price">
                <div className="price">
                  {game.discount > 0 ? (
                    <>
                      <div
                        className={`${
                          Number(game.discount) > 20
                            ? "bg-danger"
                            : "bg-primary"
                        } d-inline-block text-center px-2 py-1 text-white`}
                      >
                        -{game.discount}%
                      </div>
                      <s className="text-white-50 mx-1">{game.price} руб.</s>
                      <span className="text-white">
                        {game.price - discountFunc(game.price, game.discount)}{" "}
                        руб.
                      </span>
                    </>
                  ) : (
                    <span className="text-white">{game.price} руб.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="basket-right-side__count">
            <a
              href="#"
              onClick={() => handleDecrementGame(game)}
              className={`basket-minus ${game.count === 1 ? "disabled" : ""}`}
            >
              <FaMinusCircle />
            </a>
            <div className="basket-count">{game.count}</div>
            <a
              href="#"
              onClick={() => handleIncrementGame(game)}
              className="basket-plus"
            >
              <FaPlusCircle />
            </a>
          </div>
          <div className="game-price">
            {game.discount > 0
              ? (game.price - discountFunc(game.price, game.discount)) *
                game.count
              : game.price * game.count}
          </div>

          <div className="basket-right-side">
            <a
              href="#"
              onClick={() => handleRemove(game)}
              className="basket-right-side__delete"
            >
              <FaWindowClose />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

BasketList.propTypes = {
  listBasket: PropTypes.array.isRequired
};

export default BasketList;
