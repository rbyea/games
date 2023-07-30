import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPrice } from "../../../store/basketSlice";
import PropTypes from "prop-types";
import PopupPayment from "../../ui/popup/popupPayment";

const BasketUnder = ({ listBasket }) => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const totalPrice = useSelector(getTotalPrice());

  const handleOpenModal = (e) => {
    e.preventDefault();

    setVisibleModal(!visibleModal);
  };

  return (
    <>
      <PopupPayment
        title="Оплата"
        visibleModal={visibleModal}
        setVisibleModal={setVisibleModal}
      />
      <div className="cart__bottom">
        <div className="cart__bottom-details">
          <span>
            Всего игр: <b>{listBasket.length} шт.</b>
          </span>
          <span>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </span>
        </div>
        <div className="cart__bottom-buttons">
          <Link className="btn btn-light btn-lg" to="/catalog">
            <span>Каталог товаров</span>
          </Link>
          <a
            href="#"
            onClick={(e) => handleOpenModal(e)}
            className="btn btn-primary btn-lg"
          >
            <span>Оплатить сейчас</span>
          </a>
        </div>
      </div>
    </>
  );
};

BasketUnder.propTypes = {
  listBasket: PropTypes.array.isRequired
};

export default BasketUnder;
