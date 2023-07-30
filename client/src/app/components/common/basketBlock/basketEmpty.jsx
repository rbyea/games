import React from "react";
import { Link } from "react-router-dom";

const BasketEmpty = (props) => {
  return (
    <div className="basketContainer">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p className="centerBasket">
        Вероятней всего, вы не выбрали ещё игру. <br />
        Для того, чтобы купить игру, перейди в каталог товаров.
      </p>
      <Link to="/catalog" className="btn btn-primary">
        Каталог товаров
      </Link>
    </div>
  );
};

export default BasketEmpty;
