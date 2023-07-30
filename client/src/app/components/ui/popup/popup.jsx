import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { discountFunc } from "../../../utils/discountFunc";

const Popup = ({
  title,
  gameObj,
  visibleModal,
  visibleDescription,
  setVisibleModal
}) => {
  const handleClose = (e) => {
    setVisibleModal(false);
  };

  return (
    <div className={`modal ${visibleModal ? "show" : ""}`} id="exampleModal">
      <div className="modal-dialog">
        <div className="modal-content bg-dark">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {!visibleDescription ? title : "Товар уже добавлен!"}
            </h5>
            <button
              type="button"
              className="close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {!visibleDescription ? (
            <div className="modal-body">
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item flex-fill">
                  {" "}
                  <img src={gameObj.picture} height={150} alt="" />
                </li>
                <li className="list-group-item flex-fill ">{gameObj.title}</li>
                <li className="list-group-item flex-fill">
                  {gameObj.price -
                    discountFunc(gameObj.price, gameObj.discount)}
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              data-dismiss="modal"
            >
              Закрыть
            </button>

            <Link
              to="/basket"
              className="btn btn-primary"
              onClick={handleClose}
            >
              Перейти в корзину
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  visibleModal: PropTypes.bool.isRequired,
  setVisibleModal: PropTypes.func,
  title: PropTypes.string,
  visibleDescription: PropTypes.bool,
  gameObj: PropTypes.object
};

export default Popup;
